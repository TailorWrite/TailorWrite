from functools import wraps
from flask import request  # Change this import based on your web framework
from config import Config
from models.users import login_user
import base64

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # Extract token from the 'Authorization' header
        token = request.headers.get('Authorization')
        if not token:
            return {'message': 'Authentication token is missing'}, 401
        
        # Remove 'Bearer ' prefix if present
        if token.startswith('Bearer '):
            token = token[7:]

        try:
            result = validate_token(token)
            # print(result)
            if not result['valid']:
                return {'message': 'Invalid authentication token'}, 401
        except Exception as e:
            return {'message': str(e)}, 401
        
        # Call the original function with the arguments
        return f(*args, token_user_id=result['id'], **kwargs)
    
    return decorated

def validate_token(access_token):
    # Check if the header starts with "Basic "
    if not access_token.startswith("Basic "):
        raise ValueError("Invalid Authorization header")

    # Extract the encoded credentials from the header
    encoded_credentials = access_token[len("Basic "):]

    # Decode the Base64 encoded credentials
    decoded_credentials = base64.b64decode(encoded_credentials).decode('utf-8')

    # Split the credentials into email and password
    email, password = decoded_credentials.split(":", 1)
    
    try:
        id = login_user(email, password)[1]
        return {'valid': True, 'id': id}
    except Exception as e:
        return {'valid': False, 'error': e}
    
