import pytest
from flask.testing import FlaskClient
from flask import Flask
from app import app
from config import TestConfig

login_data = {
        'email': 'test@example.com',
        'password': 'securepassword123'
    }

user_data = {
    "email": "test@example.com",
    "password": "securepassword123",
    "account_info": {
    "first_name": "Test",
    "last_name": "Subject",
    "bio": "Developer at XYZ Company",
    "phone": "1234567890"
  }
}

@pytest.fixture
def client() -> FlaskClient:
    app.testing = True
    with app.test_client() as client:     
        yield client
        
@pytest.fixture
def login(client):
    # Perform login and yield user ID and auth token for other tests
    response = client.post('/users/login', json=login_data)
    assert response.status_code == 200
    user_id = response.json['user_id']
    basic_auth_token = response.json['basic_auth_token']
    yield user_id, basic_auth_token
    
def test_create_user(client):
    
    response = client.post('/users', json=user_data)
    
    assert response.status_code == 201

# Testing user login function.
def test_user_login(client):
    
    response = client.post('/users/login', json=login_data)
    
    assert response.status_code == 200
    assert 'user_id' in response.json
    assert 'basic_auth_token' in response.json

# Test get user details function    
def test_get_user(client, login):
     # Get login credentials
    user_id, basic_auth_token = login

    # Set authorization header
    headers = {
        'Authorization': f"Basic {basic_auth_token}"
    }

    # Send GET request to fetch the user
    response = client.get(f'/users/{user_id}', headers=headers)

    response_data = response.get_json()

    assert response.status_code == 200
    assert response_data[0]['email'] == login_data['email']

# Test updating user information
def test_update_user(client, login):
    # Get login credentials
    user_id, basic_auth_token = login

    # Define update data
    update_data = {
        'first_name': 'Test',
        'last_name': 'Subject',
        "bio": "Developer at XYZ Company",
        "phone": "0987654321"
    }

    # Set authorization header
    headers = {
        'Authorization': f"Basic {basic_auth_token}"
    }

    # Send PUT request to update the user
    response = client.put(f'/users/{user_id}', json=update_data, headers=headers)

    assert response.status_code == 200
    assert response.json['first_name'] == 'Test'
    assert response.json['last_name'] == 'Subject'
    
# Test Delete User  
def test_delete_user(client, login):
    # Get login credentials
    user_id, basic_auth_token = login

    # Set authorization header
    headers = {
        'Authorization': f"Basic {basic_auth_token}"
    }

    # Send DELETE request to delete the user
    response = client.get(f'/users/{user_id}', headers=headers)

    response_data = response.get_json()

    assert response_data.status_code == 200
    