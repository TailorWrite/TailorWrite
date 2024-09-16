import datetime
import pytz
from flask_restx import Namespace, Resource, fields
from flask import request, jsonify
from models.experience import create_experience, get_experience, update_experience, delete_experience, get_experiences_by_user
from models.authentication import token_required

# Define the namespace
experiences_ns = Namespace('experiences', description='Job experience operations')

# Define the job experience model
experience_model = experiences_ns.model('Experience', {
    'user_id': fields.String(required=True, description='User ID of the applicant', example='5a4245c0-5404-4be3-9061-f728d77fdb42'),
    'job_title': fields.String(required=True, description='Title of Job Position', example='Software Engineer'),
    'company_name': fields.String(required=True, description='Name of Company', example='OpenAI'),
    'is_current_job': fields.Boolean(required=True, description='Status of Job', example=True),
    'start_date': fields.String(required=True, format='date', description='Start Date of Study', example='2024-09-14'),
    'end_date': fields.String(required=False, format='date', description='End Date of Study', example='2024-08-30'),
    'description': fields.String(required=False, description='Description of Job Experience', example='A Junior Software Engineer at OpenAI focusing on Frontend Dev')
})

update_experience_model = experiences_ns.model('UpdateExperience', {
    'job_title': fields.String(required=True, description='Title of Job Position', example='Software Engineer'),
    'company_name': fields.String(required=True, description='Name of Company', example='OpenAI'),
    'is_current_job': fields.Boolean(required=True, description='Status of Job', example=True),
    'start_date': fields.String(required=True, format='date', description='Start Date of Study', example='2024-09-14'),
    'end_date': fields.String(required=False, format='date', description='End Date of Study', example='2024-08-30'),
    'description': fields.String(required=False, description='Description of Job Experience', example='A Junior Software Engineer at OpenAI focusing on Frontend Dev')
})

@experiences_ns.route('')
class ExperienceList(Resource):
    @token_required
    @experiences_ns.expect(experience_model)
    @experiences_ns.response(201, 'Experience record created successfully')
    @experiences_ns.response(400, 'Bad Request')
    @experiences_ns.response(403, 'Forbidden')
    def post(self, token_user_id):
        """Create a new experience record for a user"""
        data = request.json
        user_id = data['user_id']
        if user_id != token_user_id:
            return {'error': 'No you\'re not allowed this with that auth key'}, 403
        try:
            response = create_experience(data)
            return {'message': 'Experience record created successfully', 'experience_id': response.data[0]['id'], 'experience_id': response.data[0]['id']}, 201
        except Exception as e:
            return {'error': str(e)}, 400

@experiences_ns.route('/user/<string:user_id>')
class experienceList(Resource):
    @token_required
    @experiences_ns.response(200, 'Success', [experience_model])
    @experiences_ns.response(404, 'User or experience records not found')
    @experiences_ns.response(403, 'Forbidden')
    def get(self, user_id, token_user_id):
        """Fetch all job experiences for a specific user"""
        if user_id != token_user_id:
            return {'error': 'No you\'re not allowed this with that auth key'}, 403
        try:
            experiences = get_experiences_by_user(user_id)
            if experiences.data:
                return jsonify(experiences.data)
            else:
                return {'message': 'No experience records found'}, 404
        except Exception as e:
            return {'error': str(e)}, 400

@experiences_ns.route('/<int:experience_id>')
class experience(Resource):
    @token_required
    @experiences_ns.doc(security='apikey')
    @experiences_ns.response(200, 'Success', experience_model)
    @experiences_ns.response(404, 'Job experience not found')
    @experiences_ns.response(403, 'Forbidden')
    def get(self, experience_id, token_user_id):
        """Fetch a job experience by ID"""
        try:
            response = get_experience(experience_id)
            user_id = response.data[0]['user_id']
            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            if response.data:
                return jsonify(response.data)
            else:
                return {'message': 'Experience not found'}, 404
        except Exception as e:
            return {'error': str(e)}, 400

    @token_required
    @experiences_ns.doc(security='apikey')
    @experiences_ns.expect(update_experience_model)
    @experiences_ns.response(200, 'Job experience updated successfully', experience_model)
    @experiences_ns.response(400, 'Bad Request')
    @experiences_ns.response(403, 'Forbidden')
    def put(self, experience_id, token_user_id):
        """Update a job experience by ID"""
        data = request.json
        try:
            response = get_experience(experience_id)
            user_id = response.data[0]['user_id']
            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            utc_now = datetime.datetime.now(pytz.utc)
            formatted_time = utc_now.strftime('%Y-%m-%dT%H:%M:%SZ')
            data['updated_at'] = formatted_time
            response = update_experience(experience_id, data)
            if response.data:
                return jsonify(response.data)
            else:
                return {'message': 'Failed to update job experience'}, response.status_code
        except Exception as e:
            return {'error': str(e)}, 400

    @token_required
    @experiences_ns.doc(security='apikey')
    @experiences_ns.response(200, 'Job experience deleted successfully')
    @experiences_ns.response(400, 'Bad Request')
    @experiences_ns.response(403, 'Forbidden')
    def delete(self, experience_id, token_user_id):
        """Delete a job experience by ID"""
        try:
            response = get_experience(experience_id)
            user_id = response.data[0]['user_id']
            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            response = delete_experience(experience_id)
            if response.data:
                return {'message': 'Job experience deleted successfully'}, 200
            else:
                return {'message': 'Failed to delete job experience'}, response.status_code
        except Exception as e:
            return {'error': str(e)}, 400