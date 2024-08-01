# models/users.py
from models import supabase

def create_user(data):
    email = data["email"]
    password = data["password"]
    return supabase.auth.sign_up(
        credentials={"email": email, "password": password}
    )
    
def create_profile(data):
    return supabase.table('profiles').insert(data).execute()

def get_user(user_id):
    print(user_id)
    return supabase.table('profiles').select('*').eq('id', user_id).execute()

def update_user(user_id, data):
    return supabase.table('profiles').update(data).eq('id', user_id).execute()

def delete_user(user_id):
    return supabase.table('profiles').delete().eq('id', user_id).execute()
