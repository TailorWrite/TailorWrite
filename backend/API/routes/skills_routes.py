import datetime
import pytz
from flask_restx import Namespace, Resource, fields
from flask import request, jsonify
from models.skills import create_skills, get_skills, update_skills, delete_skills, get_skills_by_user
from models.authentication import token_required

# Define the namespace
skills_ns = Namespace('skills', description='User Skills operations')

# Define the skills model
skills_model = skills_ns.model('Skills', {
    'user_id': fields.String(required=True, description='User ID', example='5a4245c0-5404-4be3-9061-f728d77fdb42'),
    'skill_name': fields.String(required=True, description='Name of Skill for User', example='Software Development'),
    'proficiency_level': fields.String(required=True, description='Proficiency Level of Skill for User', example='Expert'),
})

update_skills_model = skills_ns.model('UpdateSkills', {
    'skill_name': fields.String(required=True, description='Name of Skill for User', example='Software Development'),
    'proficiency_level': fields.String(required=True, description='Proficiency Level of Skill for User', example='Expert'),
})

@skills_ns.route('')
class SkillsList(Resource):
    @token_required
    @skills_ns.expect(skills_model)
    @skills_ns.response(201, 'Skill record created successfully')
    @skills_ns.response(400, 'Bad Request')
    @skills_ns.response(403, 'Forbidden')
    def post(self, token_user_id):
        """Create a new skill record for a user"""
        data = request.json
        user_id = data['user_id']
        if user_id != token_user_id:
            return {'error': 'No you\'re not allowed this with that auth key'}, 403
        try:
            response = create_skills(data)
            return {'message': 'Skill record created successfully', 'Skill_id': response.data[0]['id']}, 201
        except Exception as e:
            return {'error': str(e)}, 400

@skills_ns.route('/user/<string:user_id>')
class SkillsList(Resource):
    @token_required
    @skills_ns.response(200, 'Success', [skills_model])
    @skills_ns.response(404, 'User or skills records not found')
    @skills_ns.response(403, 'Forbidden')
    def get(self, user_id, token_user_id):
        """Fetch all skills for a specific user"""
        if user_id != token_user_id:
            return {'error': 'No you\'re not allowed this with that auth key'}, 403
        try:
            skills = get_skills_by_user(user_id)
            if skills.data:
                return jsonify(skills.data)
            else:
                return {'message': 'No skills records found'}, 404
        except Exception as e:
            return {'error': str(e)}, 400

@skills_ns.route('/<int:skills_id>')
class Skills(Resource):
    @token_required
    @skills_ns.doc(security='apikey')
    @skills_ns.response(200, 'Success', skills_model)
    @skills_ns.response(404, 'Skills not found')
    @skills_ns.response(403, 'Forbidden')
    def get(self, skills_id, token_user_id):
        """Fetch a Skill by ID"""
        try:
            response = get_skills(skills_id)
            user_id = response.data[0]['user_id']
            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            if response.data:
                return jsonify(response.data)
            else:
                return {'message': 'Skills not found'}, 404
        except Exception as e:
            return {'error': str(e)}, 400

    @token_required
    @skills_ns.doc(security='apikey')
    @skills_ns.expect(update_skills_model)
    @skills_ns.response(200, 'Skills updated successfully', skills_model)
    @skills_ns.response(400, 'Bad Request')
    @skills_ns.response(403, 'Forbidden')
    def put(self, skills_id, token_user_id):
        """Update a Skill by ID"""
        data = request.json
        try:
            response = get_skills(skills_id)
            user_id = response.data[0]['user_id']
            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            utc_now = datetime.datetime.now(pytz.utc)
            formatted_time = utc_now.strftime('%Y-%m-%dT%H:%M:%SZ')
            data['updated_at'] = formatted_time
            response = update_skills(skills_id, data)
            if response.data:
                return jsonify(response.data)
            else:
                return {'message': 'Failed to update skills'}, response.status_code
        except Exception as e:
            return {'error': str(e)}, 400

    @token_required
    @skills_ns.doc(security='apikey')
    @skills_ns.response(200, 'Skill deleted successfully')
    @skills_ns.response(400, 'Bad Request')
    @skills_ns.response(403, 'Forbidden')
    def delete(self, skills_id, token_user_id):
        """Delete an Skills by ID"""
        try:
            response = get_skills(skills_id)
            user_id = response.data[0]['user_id']
            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            response = delete_skills(skills_id)
            if response.data:
                return {'message': 'Skill deleted successfully'}, 200
            else:
                return {'message': 'Failed to delete job skills'}, response.status_code
        except Exception as e:
            return {'error': str(e)}, 400