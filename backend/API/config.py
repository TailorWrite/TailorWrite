# config.py
import os

class Config:
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("ANON_KEY")
    SUPABASE_SERVICE_ROLE_KEY = os.getenv("SERVICE_ROLE_KEY")
    GEMINI_API_URL = os.getenv("GEMINI_API_URL")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    