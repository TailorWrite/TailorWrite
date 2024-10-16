import base64
import datetime
import json
import pytz
import uuid
from flask_restx import Namespace, Resource, fields
from flask import request, jsonify
from models import supabase
from werkzeug.utils import secure_filename
import requests
from bs4 import BeautifulSoup
import io

# from config import Config
from models.applications import create_application, get_application, update_application, delete_application, get_applications_by_user, create_file_upload, get_file_uploads_by_application
from models.authentication import token_required

# Define the namespace
applications_ns = Namespace(
    'applications', description='Job application operations')

# Define the job application model
application_model = applications_ns.model('JobApplication', {
    'user_id': fields.String(required=True, description='User ID of the applicant', example='123e4567-e89b-12d3-a456-426614174000'),
    'application_url': fields.String(required=True, description='URL of the job application', example='https://example.com/apply'),
    'job_title': fields.String(required=True, description='Title of the job', example='Software Engineer'),
    'company_name': fields.String(required=True, description='Name of the company', example='Tech Company Inc.'),
    'application_date': fields.String(required=False, format='date-time', description='Date of application', example='2024-08-26T14:30:00Z'),
    'status': fields.String(required=False, description='Status of the application', example='Pending'),
    'notes': fields.String(required=False, description='Additional notes', example='Submitted resume and cover letter.')
})

# Define the update job application model
update_application_model = applications_ns.model('UpdateJobApplication', {
    'application_url': fields.String(required=False, description='URL of the job application', example='https://example.com/apply'),
    'job_title': fields.String(required=False, description='Title of the job', example='Software Engineer'),
    'company_name': fields.String(required=False, description='Name of the company', example='Tech Company Inc.'),
    'application_date': fields.String(required=False, format='date-time', description='Date of application', example='2024-08-26T14:30:00Z'),
    'status': fields.String(required=False, description='Status of the application', example='Pending'),
    'notes': fields.String(required=False, description='Additional notes', example='Submitted resume and cover letter.')
})

from flask_restx import fields

upload_model = applications_ns.model('UploadModel', {
    'file_data': fields.String(required=True, description='Base64 encoded file content'),
    'file_name': fields.String(required=True, description='Name of the file to be uploaded'),
    'bucket_name': fields.String(required=False, description='Name of the Supabase storage bucket (default: "documents")')
})

@applications_ns.route('')
class JobApplicationList(Resource):
    @token_required
    @applications_ns.expect(application_model)
    @applications_ns.response(201, 'Job application created successfully')
    @applications_ns.response(400, 'Bad Request')
    @applications_ns.response(403, 'Forbidden')
    def post(self, token_user_id):
        """Create a new job application"""
        data = request.json
        user_id = data['user_id']
        if user_id != token_user_id:
            return {'error': 'No you\'re not allowed this with that auth key'}, 403
        try:
            response = create_application(data)
            return {'message': 'Job application created successfully', 'application_id': response.data[0]['id']}, 201
        except Exception as e:
            return {'error': str(e)}, 400


@applications_ns.route('/<int:application_id>')
class JobApplication(Resource):
    @token_required
    @applications_ns.doc(security='apikey')
    @applications_ns.response(200, 'Success', application_model)
    @applications_ns.response(404, 'Job application not found')
    @applications_ns.response(403, 'Forbidden')
    def get(self, application_id, token_user_id):
        """Fetch a job application by ID"""
        try:
            file_uploads = get_file_uploads_by_application(application_id).data
            response = get_application(application_id)
            application = response.data
            application[0]['documents'] = file_uploads
            user_id = response.data[0]['user_id']
            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            if response.data:
                return jsonify(application)
            else:
                return {'message': 'Job application not found'}, 404
        except Exception as e:
            return {'error': str(e)}, 400

    @token_required
    @applications_ns.doc(security='apikey')
    @applications_ns.expect(update_application_model)
    @applications_ns.response(200, 'Job application updated successfully', application_model)
    @applications_ns.response(400, 'Bad Request')
    @applications_ns.response(403, 'Forbidden')
    def put(self, application_id, token_user_id):
        """Update a job application by ID"""
        data = request.json
        try:
            response = get_application(application_id)
            user_id = response.data[0]['user_id']
            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            utc_now = datetime.datetime.now(pytz.utc)
            formatted_time = utc_now.strftime('%Y-%m-%dT%H:%M:%SZ')
            data['updated_at'] = formatted_time
            response = update_application(application_id, data)
            if response.data:
                return jsonify(response.data)
            else:
                return {'message': 'Failed to update job application'}, response.status_code
        except Exception as e:
            return {'error': str(e)}, 400

    @token_required
    @applications_ns.doc(security='apikey')
    @applications_ns.response(200, 'Job application deleted successfully')
    @applications_ns.response(400, 'Bad Request')
    @applications_ns.response(403, 'Forbidden')
    def delete(self, application_id, token_user_id):
        """Delete a job application by ID"""
        try:
            response = get_application(application_id)
            user_id = response.data[0]['user_id']
            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            response = delete_application(application_id)
            if response.data:
                return {'message': 'Job application deleted successfully'}, 200
            else:
                return {'message': 'Failed to delete job application'}, response.status_code
        except Exception as e:
            return {'error': str(e)}, 400


@applications_ns.route('/user/<string:user_id>')
class JobApplicationsByUser(Resource):
    @token_required
    @applications_ns.doc(security='apikey')
    @applications_ns.response(200, 'Success', [application_model])
    @applications_ns.response(404, 'No job applications found')
    @applications_ns.response(403, 'Forbidden')
    def get(self, user_id, token_user_id):
        """Fetch all job applications for a specific user"""
        if user_id != token_user_id:
            return {'error': 'No you\'re not allowed this with that auth key'}, 403
        try:
            response = get_applications_by_user(user_id)
            if response.data:
                return jsonify(response.data)
            else:
                return [], 200
        except Exception as e:
            return {'error': str(e)}, 400


@applications_ns.route('/<int:application_id>/documents')
class JobApplicationDocuments(Resource):
    @token_required
    @applications_ns.doc(security='apikey')
    @applications_ns.response(200, 'Success', application_model)
    @applications_ns.response(404, 'Job application not found')
    @applications_ns.response(403, 'Forbidden')
    def post(self, application_id, token_user_id):
        """Upload a document to Supabase"""
        if 'document' not in request.files:
            return {'error': 'No file provided in the request'}, 400
        try:
            document = request.files['document']
            response = upload_document_to_supabase(token_user_id, application_id, document)
            path = supabase.storage_url + "/object/public/file-storage/" + response[0]['path']
            data = {
                    "application_id": application_id,
                    "link": path,
                    "size": f"{round(request.content_length / 1024, 2)} KB",
                    "name": document.filename
                }
            create_file_upload(data)
            return {'data': data}, 200
        except:
            return {'error': 'Failed to upload document'}, 400
        


    @token_required 
    @applications_ns.doc(security='apikey')
    @applications_ns.response(200, 'Success', [application_model])
    @applications_ns.response(404, 'No job applications found')
    @applications_ns.response(403, 'Forbidden')
    def get(self, application_id, token_user_id):
        """Fetch all files for a specific application"""
        response = get_application(application_id)
        print(response)
        user_id = response.data[0]['user_id']
        if user_id != token_user_id:
            return {'error': 'No you\'re not allowed this with that auth key'}, 403
        try:
            response = get_file_uploads_by_application(application_id)
            if response.data:
                return jsonify(response.data)
            else:
                return [], 200
        except Exception as e:
            return {'error': str(e)}, 400

    def allowed_file(self, filename):
        ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    def get_unique_filename(self, filename):
        ext = filename.rsplit(".", 1)[1].lower()
        unique_filename = uuid.uuid4().hex
        return f"{unique_filename}.{ext}"


@applications_ns.route('/scrape')
class WebscrapeJobApplication(Resource):
    @applications_ns.expect(application_model)
    @applications_ns.response(200, 'Success', application_model)
    @applications_ns.response(404, 'Job application not found')
    @applications_ns.response(403, 'Forbidden')
    def post(self):
        """Using AWS Lambda, web scrape a job application from Seek"""
        data = request.json
        url = str(data['url'])
        if not url.startswith("https://") and not url.startswith("http://"):
            url = f'https://{url}'
        
        print(url)

        # Check if the URL is not an seek.co.nz/jobs URL
        if 'seek.co.nz/job' not in url:
            return {
                'statusCode': 400,
                'body': 'Invalid URL. Please provide a valid seek.co.nz/job URL'
            }

        # Send a GET request to the URL
        response = requests.get(url)

        # Check if the request was successful
        if response.status_code == 200:
            # Parse the page content with BeautifulSoup
            soup = BeautifulSoup(response.text, 'html.parser')

            # Extract the job title
            job_title_advert = soup.find('h1')
            job_title = job_title_advert.get_text(
                strip=True) if job_title_advert else "No job title found"

            # Extract the job description
            job_description_section = soup.find('section')
            job_description = job_description_section.get_text(
                strip=True) if job_description_section else "No job description found"

            # Extract the company name via the element with data-automation="advertiser-name"
            company_name = soup.find(
                'span', {'data-automation': 'advertiser-name'}).get_text(strip=True)

            payload = {
                "job_title": job_title,
                "company_name": company_name,
                "job_description": job_description
            }

            # Return the data as a JSON object
            return {
                'statusCode': 200,
                'body': payload
            }

        else:
            # Handle the error when the page couldn't be retrieved
            return {
                'statusCode': response.status_code,
                'body': f"Failed to retrieve the page. Status code: {response.status_code}"
            }


def upload_document_to_supabase(user_id, application_id, document) -> dict: 
    """
    Upload a document to Supabase Storage

    Args:
    user_id (str): The user ID
    document (FileStorage): The document to upload

    Returns:
    dict: A dictionary containing the message and the path of the uploaded document
    """

    # Generating a 
    supabase_storage_path = f"{user_id}/{application_id}"
    filename = secure_filename(document.filename)
    content_type = document.content_type
    document = io.BufferedReader(document)

    try: 
        supabase.storage.from_("file-storage").upload(
            file=document,
            path=f"{supabase_storage_path}/{filename}", 
            file_options={"content-type": content_type}
            # file_options={"content-type": "text/markdown"}
        )

        return {
            "message": "Document uploaded successfully", 
            "path": f"{supabase_storage_path}/{filename}"
        }, 200
    except Exception as e: 
        print(e)
        return {"error": str(e)}, 400