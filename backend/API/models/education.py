# models/educations.py
from models import supabase

def create_education(data):
    return supabase.table('education').insert(data).execute()

def get_education(education_id):
    return supabase.table('education').select('*').eq('id', education_id).execute()

def update_education(education_id, data):
    return supabase.table('education').update(data).eq('id', education_id).execute()

def delete_education(education_id):
    return supabase.table('education').delete().eq('id', education_id).execute()

def get_educations_by_user(user_id):
    return supabase.table('education').select('*').eq('user_id', user_id).order(column='updated_at', desc=True).execute()
