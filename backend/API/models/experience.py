# models/experiences.py
from models import supabase

def create_experience(data):
    return supabase.table('experience').insert(data).execute()

def get_experience(experience_id):
    return supabase.table('experience').select('*').eq('id', experience_id).execute()

def update_experience(experience_id, data):
    return supabase.table('experience').update(data).eq('id', experience_id).execute()

def delete_experience(experience_id):
    return supabase.table('experience').delete().eq('id', experience_id).execute()

def get_experiences_by_user(user_id):
    return supabase.table('experience').select('*').eq('user_id', user_id).order(column='updated_at', desc=True).execute()
