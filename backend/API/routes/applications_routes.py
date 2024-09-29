import datetime
import pytz
from flask_restx import Namespace, Resource, fields
from flask import request, jsonify
from models.applications import create_application, get_application, update_application, delete_application, get_applications_by_user
from models.authentication import token_required
import requests
from bs4 import BeautifulSoup
from flask import jsonify


# Define the namespace
applications_ns = Namespace('applications', description='Job application operations')

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
            response = get_application(application_id)
            user_id = response.data[0]['user_id']
            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            if response.data:
                return jsonify(response.data)
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
                return {'message': 'No job applications found for this user'}, 404
        except Exception as e:
            return {'error': str(e)}, 400

@applications_ns.route('/extractDescription')
class JobApplicationJobDescription(Resource):
    # @applications_ns.expect(application_model)
    @applications_ns.response(201, 'Job application created successfully')
    @applications_ns.response(400, 'Bad Request')
    @applications_ns.response(403, 'Forbidden')
    
    def get(self):
        url = 'https://www.seek.co.nz/job/79026786?ref=search-standalone&type=standout&origin=jobTitle#sol=63fecb2e91ddb6228b46626a6176806314f42c79'
        output_file = 'job_description.txt'
        
        # Send a GET request to the URL
        response = requests.get(url)
        
        # Check if the request was successful
        if response.status_code == 200:
            # Parse the page content with BeautifulSoup
            soup = BeautifulSoup(response.text, 'html.parser')

            # Extract the job title
            job_title_advert = soup.find('h1')
            job_title = job_title_advert.get_text(strip=True) if job_title_advert else "No job title found"

            # Extract the job description
            job_description_section = soup.find('section')
            job_description = job_description_section.get_text(strip=True) if job_description_section else "No job description found"
            
            # Return the data as a JSON object
            return jsonify({
                "job_title": job_title,
                "job_description": job_description
            })
        
        else:
            # Handle the error when the page couldn't be retrieved
            return jsonify({
                "error": f"Failed to retrieve the page. Status code: {response.status_code}"
            }), response.status_code



