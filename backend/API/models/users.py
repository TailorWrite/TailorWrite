# models/users.py
import base64
from models import supabase

def create_user(data):
    email = data["email"]
    password = data["password"]
    return supabase.auth.admin.create_user(
        {"email": email, "password": password, "email_confirm": True}
    )
    
def create_account(data):
    return supabase.table('accounts').insert(data).execute()

def get_user(user_id: str):
    return supabase.table('accounts').select('*').eq('id', user_id).execute()

def update_user(user_id, data):
    return supabase.table('accounts').update(data).eq('id', user_id).execute()

def delete_user(user_id):
    return supabase.auth.admin.delete_user(user_id)

def login_user(email, password):
    # the sign in will error if email or password incorrect, if they are correct then we return basic auth token
    response = supabase.auth.sign_in_with_password(
        {"email": email, "password": password}
    )
    supabase.auth.sign_out()
    id = response.user.id
    credentials = f"{email}:{password}"
    basic_auth_token = base64.b64encode(credentials.encode()).decode()
    return [basic_auth_token, id]



