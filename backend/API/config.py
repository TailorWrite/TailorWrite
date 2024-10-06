# config.py
import os
import boto3 

class Config:
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("ANON_KEY")
    SUPABASE_SERVICE_ROLE_KEY = os.getenv("SERVICE_ROLE_KEY")
    GEMINI_API_URL = os.getenv("GEMINI_API_URL")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

    s3 = boto3.client('s3', 
                      aws_access_key_id=os.environ.get('AWS_ACCESS_KEY'),
                      aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
                      aws_session_token=os.environ.get('AWS_SESSION_TOKEN'))   
    
    lambda_client = boto3.client('lambda', 
                                 region_name="us-west-2",
                                 aws_access_key_id=os.environ.get('AWS_ACCESS_KEY'),
                                 aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
                                 aws_session_token=os.environ.get('AWS_SESSION_TOKEN'))   


    BUCKET_NAME = os.environ.get('S3_BUCKET')
    