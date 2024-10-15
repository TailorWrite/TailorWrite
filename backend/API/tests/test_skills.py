import pytest
from flask.testing import FlaskClient
from flask import Flask
from app import app

# Sample login data for authentication
login_data = {
    'email': 'user@example.com',
    'password': 'securepassword123'
}

# Sample update data for the skill
update_skills_data = {
    "skill_name": "Software Development",
    "proficiency_level": "Expert"
}

@pytest.fixture
def client() -> FlaskClient:
    app.testing = True
    with app.test_client() as client:
        yield client
        
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
def login(client):
    # Perform login and yield user ID and auth token for other tests
    response = client.post('/users/login', json=login_data)
    assert response.status_code == 200
    user_id = response.json['user_id']
    basic_auth_token = response.json['basic_auth_token']
    yield user_id, basic_auth_token
    
@pytest.fixture
def get_skills(client, login):
    
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}
    # Fetch all skills for the user
    response = client.get(f'/skills/user/{user_id}', headers=headers)
    
    assert response.status_code == 200
    skills_id = response.json[0]['id']
    yield skills_id

def test_create_skill(client, login, create_user):
    create_response = create_user
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}
    
    skills_data = {
    "user_id": f"{user_id}",
    "skill_name": "Software Development",
    "proficiency_level": "Basic"
    }
    
    # Create Skill
    response = client.post(f'/skills', json=skills_data, headers=headers)
    
    assert create_response == 201
    assert response.status_code == 201
    

# Test fetching a skill by ID
def test_get_skill(client, login, get_skills):
    # First, create an skill to retrieve
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    skill_id = get_skills

    # Fetch the created skill
    response = client.get(f'/skills/{skill_id}', headers=headers)

    assert response.status_code == 200
    assert response.json[0]['skill_name'] == "Software Development"

# Test updating a skill
def test_update_skill(client, login, get_skills):
    # First, create an skill to update
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    skill_id = get_skills

    # Update the skill
    response = client.put(f'/skills/{skill_id}', json=update_skills_data, headers=headers)

    assert response.status_code == 200
    assert response.json[0]['skill_name'] == update_skills_data["skill_name"]

# Test fetching all skills for a specific user
def test_get_skills_by_user(client, login):
    # First, create an skill for the user
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    # Fetch all skills for the user
    response = client.get(f'/skills/user/{user_id}', headers=headers)

    assert response.status_code == 200
    assert len(response.json) > 0
    
def test_delete_skills(client, login, get_skills):
    # First, create an skill to update
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    skill_id = get_skills

    # Update the skill
    response = client.delete(f'/skills/{skill_id}', headers=headers)
    
    assert response.status_code == 200
    
    response_client = client.delete(f'/users/{user_id}', headers=headers)

    response_data = response_client.get_json()

    assert response_data['message'] == "User deleted successfully"
