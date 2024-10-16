import pytest

# Sample update data for the application
update_application_data = {
    'job_title': 'Software Engineer',
    'status': 'Interviewed',
    'notes': 'Had an interview with the hiring manager.'
}
    
@pytest.fixture
def get_application(client, login):
    
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}
    # Fetch application for the user
    response = client.get(f'/applications/user/{user_id}', headers=headers)
    
    assert response.status_code == 200
    application_id = response.json[0]['id']
    yield application_id
    
def test_create_experience(client, login, create_user):
    create_response = create_user
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}
    
    # Sample job application data
    application_data = {
        "user_id": f"{user_id}",
        "application_url": "https://example.com/apply",
        "job_title": "Software Engineer",
        "company_name": "University of Otago",
        "application_date": "2024-08-26T14:30:00Z",
        "status": "Pending",
        "notes": "Submitted resume and cover letter."
    }
    
    # Create Experience
    response = client.post(f'/applications', json=application_data, headers=headers)
    
    assert create_response == 201
    assert response.status_code == 201

# Test fetching a job application by ID
def test_get_application(client, login, get_application):
    # First, create an application to retrieve
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    application_id = get_application

    # Fetch the created application
    response = client.get(f'/applications/{application_id}', headers=headers)

    assert response.status_code == 200
    assert response.json[0]['job_title'] == "Software Engineer"

# Test updating a job application
def test_update_application(client, login, get_application):
    # First, create an application to update
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    application_id = get_application

    # Update the job application
    response = client.put(f'/applications/{application_id}', json=update_application_data, headers=headers)

    assert response.status_code == 200
    assert response.json[0]['status'] == 'Interviewed'
    assert response.json[0]['job_title'] == 'Software Engineer'

# Test fetching all applications for a specific user
def test_get_applications_by_user(client, login):
    # First, create an application for the user
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    # Fetch all applications for the user
    response = client.get(f'/applications/user/{user_id}', headers=headers)

    assert response.status_code == 200
    assert len(response.json) > 0

def test_delete_application(client, login, get_application):
    
    user_id, basic_auth_token = login
    headers = {'Authorization': f"Basic {basic_auth_token}"}

    application_id = get_application

    # Delete the application
    response = client.delete(f'/applications/{application_id}', headers=headers)
    
    assert response.status_code == 200