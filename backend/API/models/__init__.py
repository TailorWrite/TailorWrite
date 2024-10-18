# models/__init__.py
from supabase import create_client, Client
from flask import current_app

def get_supabase_client():
    # Access config from the current app context
    supabase_url = current_app.config['SUPABASE_URL']
    supabase_service_role_key = current_app.config['SUPABASE_SERVICE_ROLE_KEY']
    
    if not supabase_url or not supabase_service_role_key:
        raise ValueError("Supabase URL or Service Role Key is not set.")
    
    return create_client(supabase_url, supabase_service_role_key)

# Initialize Supabase client dynamically when needed
supabase: Client = get_supabase_client()
