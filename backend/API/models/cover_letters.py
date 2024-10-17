# models/cover_letters.py
from models import supabase

def create_cover_letter(data):
    # Query the table to count rows with the same application_id
    max_id_response = supabase.table('cover_letters').select('id').eq('application_id', data['application_id']).order('id', desc=True).limit(1).execute()
    if max_id_response.data:
        max_id = max_id_response.data[0]['id']
        data['id'] = max_id + 1
    else:
        data['id'] = 1

    return supabase.table('cover_letters').insert(data).execute()

def get_cover_letter(application_id, cover_letter_id):
    return supabase.table('cover_letters').select('*').eq('application_id', application_id).eq('id', cover_letter_id).execute()

def update_cover_letter(application_id, cover_letter_id, data):
    return supabase.table('cover_letters').update(data).eq('application_id', application_id).eq('id', cover_letter_id).execute()

def delete_cover_letter(application_id, cover_letter_id):
    return supabase.table('cover_letters').delete().eq('application_id', application_id).eq('id', cover_letter_id).execute()

def get_cover_letters_by_application(application_id):
    return supabase.table('cover_letters').select('*').eq('application_id', application_id).order(column='updated_at', desc=True).execute()

def get_cover_letters_by_user(user_id):
    return supabase.table('cover_letters').select('*, job_applications(*)').eq('job_applications.user_id', user_id).execute()
