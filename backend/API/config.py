# config.py
import os

class Config(object):
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("ANON_KEY")
    SUPABASE_SERVICE_ROLE_KEY = os.getenv("SERVICE_ROLE_KEY")   
    GEMINI_API_URL = os.getenv("GEMINI_API_URL")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


class TestConfig(Config):
    SUPABASE_URL = os.getenv("SUPABASE_TEST_URL")
    SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_TEST_SERVICE_ROLE_KEY") 
    TESTING = True    