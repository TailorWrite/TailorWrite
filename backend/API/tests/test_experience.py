import pytest
from flask.testing import FlaskClient
from flask import Flask
from app import app

# Sample login data for authentication
login_data = {
    'email': 'user@example.com',
    'password': 'securepassword123'
}

# Sample experience data
experience_data = {
    "job_title": "Software Engineer",
    "company_name": "OpenAI",
    "is_current_job": True,
    "start_date": "2024-09-14",
    "end_date": "2024-08-30",
    "description": "A Junior Software Engineer at OpenAI focusing on Frontend Dev"
  }

# Sample update data for the experience
update_experience_data = {
    "job_title": "Software Engineer",
    "company_name": "OpenAI",
    "is_current_job": True,
    "start_date": "2024-09-14",
    "end_date": "2024-08-30",
     "description": "A Junior Software Engineer at OpenAI focusing on Backend Dev"
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
def get_experience(client, login):
    
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}
    # Fetch all experiences for the user
    response = client.get(f'/experiences/user/{user_id}', headers=headers)
    
    assert response.status_code == 200
    experience_id = response.json[0]['id']
    yield experience_id

# Test fetching a experience by ID
def test_get_experience(client, login, get_experience):
    # First, create an experience to retrieve
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    experience_id = get_experience

    # Fetch the created experience
    response = client.get(f'/experiences/{experience_id}', headers=headers)

    assert response.status_code == 200
    assert response.json[0]['job_title'] == experience_data['job_title']

# Test updating a experience
def test_update_experience(client, login, get_experience):
    # First, create an experience to update
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    experience_id = get_experience

    # Update the experience
    response = client.put(f'/experiences/{experience_id}', json=update_experience_data, headers=headers)

    assert response.status_code == 200
    assert response.json[0]['is_current_job'] == update_experience_data["is_current_job"]
    assert response.json[0]['job_title'] == update_experience_data["job_title"]

# Test fetching all experiences for a specific user
def test_get_experiences_by_user(client, login):
    # First, create an experience for the user
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    # Fetch all experiences for the user
    response = client.get(f'/experiences/user/{user_id}', headers=headers)

    assert response.status_code == 200
    assert len(response.json) > 0
