import pytest

# Sample update data for the education
update_education_data = {
    "institution_name": "MIT",
    "degree": "Bachelor of Science",
    "field_of_study": "AI Engineering",
}
    
@pytest.fixture
def get_education(client, login):
    
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}
    # Fetch education for the user
    response = client.get(f'/educations/user/{user_id}', headers=headers)
    
    assert response.status_code == 200
    education_id = response.json[0]['id']
    yield education_id
    
def test_create_education(client, create_user, login):
    create_response = create_user
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}
    
    # Sample education data
    education_data = {
    "user_id": f"{user_id}",
    "institution_name": "MIT",
    "degree": "Bachelor of Science",
    "field_of_study": "AI Engineering",
    "start_date": "2024-08-26",
    "end_date": "2024-08-26",
    "description": "Majoring in Software Engineering"
    }
    
    # Create Experience
    response = client.post(f'/educations', json=education_data, headers=headers)
    
    assert create_response == 201
    assert response.status_code == 201

# Test fetching a education by ID
def test_get_education(client, login, get_education):
    # First, create an education to retrieve
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    education_id = get_education

    # Fetch the created education
    response = client.get(f'/educations/{education_id}', headers=headers)

    assert response.status_code == 200
    assert response.json[0]['field_of_study'] == "AI Engineering"

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

def test_delete_education(client, login, get_education):
    
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    education_id = get_education

    # Delete the experience
    response = client.delete(f'/educations/{education_id}', headers=headers)
    
    assert response.status_code == 200
        
    response_client = client.delete(f'/users/{user_id}', headers=headers)

    response_data = response_client.get_json()

    assert response_data["message"] == "User deleted successfully"