import pytest

# Sample update data for the skill
update_skills_data = {
    "skill_name": "Software Development",
    "proficiency_level": "Expert"
}

@pytest.fixture
def get_skills(client, login):
    
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}
    # Fetch all skills for the user
    response = client.get(f'/skills/user/{user_id}', headers=headers)
    
    assert response.status_code == 200
    skills_id = response.json[0]['id']
    yield skills_id

def test_create_skill(client, create_user, login):
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

    # Delete the skill
    response = client.delete(f'/skills/{skill_id}', headers=headers)
    
    assert response.status_code == 200
        
    response_client = client.delete(f'/users/{user_id}', headers=headers)

    response_data = response_client.get_json()

    assert response_data["message"] == "User deleted successfully"