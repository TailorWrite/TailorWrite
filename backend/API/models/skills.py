# models/skills.py
from models import supabase

def create_skills(data):
    return supabase.table('skills').insert(data).execute()

def get_skills(skills_id):
    return supabase.table('skills').select('*').eq('id', skills_id).execute()

def update_skills(skills_id, data):
    return supabase.table('skills').update(data).eq('id', skills_id).execute()

def delete_skills(skills_id):
    return supabase.table('skills').delete().eq('id', skills_id).execute()

def get_skills_by_user(user_id):
    return supabase.table('skills').select('*').eq('user_id', user_id).order(column='updated_at', desc=True).execute()
