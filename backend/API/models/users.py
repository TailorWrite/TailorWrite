# models/users.py
from models import supabase
from config import Config
import requests

def create_user(data):
    email = data["email"]
    password = data["password"]
    return supabase.auth.admin.create_user(
        {"email": email, "password": password, "email_confirm": True}
    )
    
def create_account(data):
    return supabase.table('accounts').insert(data).execute()

def get_user(user_id):
    return supabase.table('accounts').select('*').eq('id', user_id).execute()

def update_user(user_id, data):
    return supabase.table('accounts').update(data).eq('id', user_id).execute()

def delete_user(user_id):
    return supabase.auth.admin.delete_user(user_id)

def login_user(email, password):
    return supabase.auth.sign_in_with_password(
        {"email": email, "password": password}
    )

def validate_token(access_token):
    url = Config.SUPABASE_URL + "/auth/v1/user"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'apikey': Config.SUPABASE_KEY
    }

    try:
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            return {'valid': True, 'user': response.json()}
        else:
            return {'valid': False, 'message': response.json().get('message', 'Invalid token')}
    except requests.RequestException as e:
        return {'valid': False, 'message': str(e)}

