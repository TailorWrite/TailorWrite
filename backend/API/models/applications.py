# models/job_applications.py
from models import supabase

def create_application(data):
    return supabase.table('job_applications').insert(data).execute()

def get_application(application_id):
    return supabase.table('job_applications').select('*').eq('id', application_id).execute()

def update_application(application_id, data):
    return supabase.table('job_applications').update(data).eq('id', application_id).execute()

def delete_application(application_id):
    return supabase.table('job_applications').delete().eq('id', application_id).execute()

def get_applications_by_user(user_id):
    return supabase.table('job_applications').select('*').eq('user_id', user_id).order(column='updated_at', desc=True).execute()

def create_file_upload(data):
    return supabase.table('file_uploads').insert(data).execute()

def get_file_uploads_by_application(application_id):
    return supabase.table('file_uploads').select('*').eq('application_id', application_id).order(column='updated_at', desc=True).execute()
