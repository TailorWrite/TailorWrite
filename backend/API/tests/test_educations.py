import pytest
from flask.testing import FlaskClient
from flask import Flask
from app import app

# Sample login data for authentication
login_data = {
    'email': 'user@example.com',
    'password': 'securepassword123'
}

# Sample education data
education_data = {
    "user_id": "5a4245c0-5404-4be3-9061-f728d77fdb42",
    "institution_name": "MIT",
    "degree": "Bachelor of Science",
    "field_of_study": "AI Engineering",
    "start_date": "2024-08-26",
    "end_date": "2024-08-26",
    "description": "Majoring in Software Engineering"
  }

# Sample update data for the education
update_education_data = {
    "institution_name": "MIT",
    "degree": "Bachelor of Science",
    "field_of_study": "AI Engineering",
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
    
@pytest.fixture
def get_education(client, login):
    
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}
    # Fetch all educations for the user
    response = client.get(f'/educations/user/{user_id}', headers=headers)
    
    assert response.status_code == 200
    education_id = response.json[0]['id']
    yield education_id

# Test fetching a education by ID
def test_get_education(client, login, get_education):
    # First, create an education to retrieve
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    education_id = get_education

    # Fetch the created education
    response = client.get(f'/educations/{education_id}', headers=headers)

    assert response.status_code == 200
    assert response.json[0]['field_of_study'] == education_data['field_of_study']

# Test updating a education
def test_update_education(client, login, get_education):
    # First, create an education to update
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    education_id = get_education

    # Update the education
    response = client.put(f'/educations/{education_id}', json=update_education_data, headers=headers)

    assert response.status_code == 200
    assert response.json[0]['institution_name'] == update_education_data["institution_name"]
    assert response.json[0]['field_of_study'] == update_education_data["field_of_study"]

# Test fetching all educations for a specific user
def test_get_educations_by_user(client, login):
    # First, create an education for the user
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    # Fetch all educations for the user
    response = client.get(f'/educations/user/{user_id}', headers=headers)

    assert response.status_code == 200
    assert len(response.json) > 0
