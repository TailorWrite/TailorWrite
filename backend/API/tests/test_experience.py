import pytest

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
def get_experience(client, login):
    
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}
    # Fetch all skills for the user
    response = client.get(f'/experiences/user/{user_id}', headers=headers)
    
    assert response.status_code == 200
    skills_id = response.json[0]['id']
    yield skills_id
    
def test_create_experience(client, create_user, login):
    create_response = create_user
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}
    
    experience_data = {
        "user_id": f"{user_id}",
        "job_title": "Software Engineer",
        "company_name": "OpenAI",
        "is_current_job": True,
        "start_date": "2024-09-14",
        "end_date": "2024-08-30",
        "description": "A Junior Software Engineer at OpenAI focusing on Frontend Dev"
    }
    
    # Create Experience
    response = client.post(f'/experiences', json=experience_data, headers=headers)
    
    assert create_response == 201
    assert response.status_code == 201

# Test fetching a experience by ID
def test_get_experience(client, login, get_experience):
    # First, create an experience to retrieve
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    experience_id = get_experience

    # Fetch the created experience
    response = client.get(f'/experiences/{experience_id}', headers=headers)

    assert response.status_code == 200
    assert response.json[0]['job_title'] == "Software Engineer"

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

def test_delete_experience(client, login, get_experience):
    
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    experience_id = get_experience

    # Delete the experience
    response = client.delete(f'/experiences/{experience_id}', headers=headers)
    
    assert response.status_code == 200
        
    response_client = client.delete(f'/users/{user_id}', headers=headers)

    response_data = response_client.get_json()

    assert response_data["message"] == "User deleted successfully"