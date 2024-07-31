# models/users.py
from models import supabase

def create_user(data):
    return supabase.table('users').insert(data).execute()

def get_user(user_id):
    return supabase.table('users').select('*').eq('id', user_id).execute()

def update_user(user_id, data):
    return supabase.table('users').update(data).eq('id', user_id).execute()

def delete_user(user_id):
    return supabase.table('users').delete().eq('id', user_id).execute()
