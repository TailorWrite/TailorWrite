import datetime
import pytz
from flask_restx import Namespace, Resource, fields
from flask import request, jsonify
from models.education import create_education, get_education, update_education, delete_education, get_educations_by_user
from models.authentication import token_required

# Define the namespace
educations_ns = Namespace('educations', description='User Education operations')

# Define the job education model
education_model = educations_ns.model('Education', {
    'user_id': fields.String(required=True, description='User ID of the applicant', example='5a4245c0-5404-4be3-9061-f728d77fdb42'),
    'institution_name': fields.String(required=True, description='Name of Institution for Study', example='MIT'),
    'degree': fields.String(required=True, description='Name of Degree', example='Bachelor of Science'),
    'field_of_study': fields.String(required=True, description='Field of Study', example='AI Engineering'),
    'start_date': fields.String(required=False, format='date', description='Start Date of Study', example='2024-08-26'),
    'end_date': fields.String(required=False, format='date', description='End Date of Study', example='2024-08-26'),
    'description': fields.String(required=False, description='Description of Study', example='Majoring in Software Engineering')
})

update_education_model = educations_ns.model('UpdateEducation', {
    'institution_name': fields.String(required=True, description='Name of Institution for Study', example='MIT'),
    'degree': fields.String(required=True, description='Name of Degree', example='Bachelor of Science'),
    'field_of_study': fields.String(required=True, description='Field of Study', example='AI Engineering'),
    'start_date': fields.String(required=False, format='date', description='Start Date of Study', example='2024-08-26'),
    'end_date': fields.String(required=False, format='date', description='End Date of Study', example='2024-08-26'),
    'description': fields.String(required=False, description='Description of Study', example='Majoring in Software Engineering')
})

@educations_ns.route('')
class EducationList(Resource):
    @token_required
    @educations_ns.expect(education_model)
    @educations_ns.response(201, 'Education record created successfully')
    @educations_ns.response(400, 'Bad Request')
    @educations_ns.response(403, 'Forbidden')
    def post(self, token_user_id):
        """Create a new education record for a user"""
        data = request.json
        user_id = data['user_id']
        if user_id != token_user_id:
            return {'error': 'No you\'re not allowed this with that auth key'}, 403
        try:
            response = create_education(data)
            return {'message': 'Education record created successfully', 'Education_id': response.data[0]['id']}, 201
        except Exception as e:
            return {'error': str(e)}, 400

@educations_ns.route('/user/<string:user_id>')
class EducationList(Resource):
    @token_required
    @educations_ns.response(200, 'Success', [education_model])
    @educations_ns.response(404, 'User or education records not found')
    @educations_ns.response(403, 'Forbidden')
    def get(self, user_id, token_user_id):
        """Fetch all job educations for a specific user"""
        if user_id != token_user_id:
            return {'error': 'No you\'re not allowed this with that auth key'}, 403
        try:
            educations = get_educations_by_user(user_id)
            if educations.data:
                return jsonify(educations.data)
            else:
                return {'message': 'No education records found'}, 404
        except Exception as e:
            return {'error': str(e)}, 400

@educations_ns.route('/<int:education_id>')
class Education(Resource):
    @token_required
    @educations_ns.doc(security='apikey')
    @educations_ns.response(200, 'Success', education_model)
    @educations_ns.response(404, 'Job education not found')
    @educations_ns.response(403, 'Forbidden')
    def get(self, education_id, token_user_id):
        """Fetch a job education by ID"""
        try:
            response = get_education(education_id)
            user_id = response.data[0]['user_id']
            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            if response.data:
                return jsonify(response.data)
            else:
                return {'message': 'Education not found'}, 404
        except Exception as e:
            return {'error': str(e)}, 400

    @token_required
    @educations_ns.doc(security='apikey')
    @educations_ns.expect(update_education_model)
    @educations_ns.response(200, 'Job education updated successfully', education_model)
    @educations_ns.response(400, 'Bad Request')
    @educations_ns.response(403, 'Forbidden')
    def put(self, education_id, token_user_id):
        """Update a job education by ID"""
        data = request.json
        try:
            response = get_education(education_id)
            user_id = response.data[0]['user_id']
            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            utc_now = datetime.datetime.now(pytz.utc)
            formatted_time = utc_now.strftime('%Y-%m-%dT%H:%M:%SZ')
            data['updated_at'] = formatted_time
            response = update_education(education_id, data)
            if response.data:
                return jsonify(response.data)
            else:
                return {'message': 'Failed to update job education'}, response.status_code
        except Exception as e:
            return {'error': str(e)}, 400

    @token_required
    @educations_ns.doc(security='apikey')
    @educations_ns.response(200, 'Job education deleted successfully')
    @educations_ns.response(400, 'Bad Request')
    @educations_ns.response(403, 'Forbidden')
    def delete(self, education_id, token_user_id):
        """Delete a job education by ID"""
        try:
            response = get_education(education_id)
            user_id = response.data[0]['user_id']
            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            response = delete_education(education_id)
            if response.data:
                return {'message': 'Job education deleted successfully'}, 200
            else:
                return {'message': 'Failed to delete job education'}, response.status_code
        except Exception as e:
            return {'error': str(e)}, 400