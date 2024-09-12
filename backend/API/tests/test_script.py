import pytest
from flask.testing import FlaskClient
from flask import Flask
from app import app

test_user_id = ""
test_basic_auth_token = ""

@pytest.fixture
def client() -> FlaskClient:
    app.testing = True
    with app.test_client() as client:
        yield client

# Testing user login function.
# Server must be running please refer to md file for running server
def test_user_login(client):
    login_data = {
        'email': 'user@example.com',
        'password': 'securepassword123'
    }
    response = client.post('/users/login', json=login_data)
    
    print(response)
    assert response.status_code == 200
    assert 'user_id' in response.json
    assert 'basic_auth_token' in response.json

