import pytest
from flask.testing import FlaskClient
from flask import Flask
from app import create_app
from config import TestConfig

@pytest.fixture
def client(login) -> FlaskClient: # type: ignore
    app = create_app(TestConfig)
    app.testing = True
    with app.test_client() as client: 
        
        yield client
        
        user_id, basic_auth_token = login
        headers = {'Authorization': f"Basic {basic_auth_token}"}
        client.delete(f'/users/{user_id}', headers=headers)
        
@pytest.fixture
def login_data():
    login = {
        'email': 'test@test.com',
        'password': 'securepassword123'
    }
    yield login
        
@pytest.fixture
def create_user(client):
    # Create a user for testing purposes
    user_data = {
    "email": "test@test.com",
    "password": "securepassword123",
    "account_info": {
    "first_name": "Test",
    "last_name": "Subject",
    "bio": "Developer at XYZ Company",
    "phone": "1234567890"
    }
    }
    
    response = client.post('/users', json=user_data)
    
    assert response.status_code == 201
    yield response.status_code
    
@pytest.fixture
def login(client, login_data):
    # Perform login and yield user ID and auth token for other tests
    response = client.post('/users/login', json=login_data)
    assert response.status_code == 200
    user_id = response.json['user_id']
    basic_auth_token = response.json['basic_auth_token']
    yield user_id, basic_auth_token
    