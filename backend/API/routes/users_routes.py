import datetime
import pytz
from flask_restx import Namespace, Resource, fields, reqparse, api
from flask import request, jsonify
from models.users import *  # create_user, create_account, get_user, update_user, delete_user, login_user
from models.authentication import token_required
import bcrypt

# Define the namespace
users_ns = Namespace('users', description='User operations')

# Define the user model
user_model = users_ns.model('User', {
    'email': fields.String(required=True, description='The user email', example='user@example.com'),
    'password': fields.String(required=True, description='The user password', example='securepassword123'),
    'account_info': fields.Nested(users_ns.model('AccountInfo', {
        'first_name': fields.String(required=True, description='First name of the user', example='John'),
        'last_name': fields.String(required=True, description='Last name of the user', example='Doe'),
        'bio': fields.String(required=True, description='A short bio of the user', example='Developer at XYZ Company'),
        'phone': fields.String(required=False, description='The user phone number', example="1234567890")
    }), description='Additional account information')
})

account_model = users_ns.model('Account', {
    'id': fields.String(required=True, description='The user\'s database id'),
    'email': fields.String(required=True, description='The user email', example='user@example.com'),
    'password': fields.String(required=True, description='The user password', example='securepassword123'),
    'first_name': fields.String(required=True, description='First name of the user', example='John'),
    'last_name': fields.String(required=True, description='Last name of the user', example='Doe'),
    'bio': fields.String(required=True, description='A short bio of the user', example='Developer at XYZ Company'),
    'phone': fields.String(required=False, description='The user phone number', example="1234567890")
})

update_account_model = users_ns.model('Account', {
    'first_name': fields.String(required=True, description='First name of the user', example='John'),
    'last_name': fields.String(required=True, description='Last name of the user', example='Doe'),
    'bio': fields.String(required=True, description='A short bio of the user', example='Developer at XYZ Company'),
    'phone': fields.String(required=False, description='The user phone number', example="1234567890")
})

login_model = users_ns.model('Login', {
    'email': fields.String(required=True, description='The user email', example='user@example.com'),
    'password': fields.String(required=True, description='The user password', example='securepassword123')
})


@users_ns.route('')
class UserList(Resource):
    @users_ns.expect(user_model)
    @users_ns.response(201, 'User created successfully')
    @users_ns.response(400, 'Bad Request')
    def post(self):
        """Create a new user"""
        data = request.json
        try:
            response = create_user(data)
            user_id = response.user.id
            email = response.user.email
            account = data.get('account_info', {})
            account['id'] = user_id
            account['email'] = email
            hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            account['password'] = hashed_password
            create_account(account)
            return {'message': 'User created successfully', 'id': user_id}, 201
        except Exception as e:
            return {'error': str(e)}, 400

@users_ns.route('/<string:user_id>')
class User(Resource):
    @token_required
    @users_ns.doc(security='apikey')
    @users_ns.response(200, 'Success', account_model)
    @users_ns.response(403, 'Forbidden')
    @users_ns.response(404, 'User not found')
    def get(self, user_id, token_user_id):
        """Fetch a user by ID"""
        try:
            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            user = get_user(user_id).data[0]
            if user:
                if 'password' in user:
                    del user['password']
                return jsonify(user)
            else:
                return {'message': 'User not found'}, 404
        except Exception as e:
            return {'error': str(e)}, 400

    @token_required  # Require token for this route
    @users_ns.doc(security='apikey')
    @users_ns.expect(update_account_model)
    @users_ns.response(200, 'User updated successfully', user_model)
    @users_ns.response(400, 'Bad Request')
    @users_ns.response(403, 'Forbidden')
    def put(self, user_id, token_user_id):
        """Update a user by ID"""
        data = request.json
        try:
            response = get_user(user_id).data
            user_id = response[0]['id']
            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            utc_now = datetime.datetime.now(pytz.utc)
            formatted_time = utc_now.strftime('%Y-%m-%dT%H:%M:%SZ')
            data['updated_at'] = formatted_time
            response = update_user(user_id, data)
            response = jsonify(response.data[0])
            response.status_code = 200
            return response
        except Exception as e:
            return {'error': str(e)}, 400

    @token_required
    @users_ns.doc(security='apikey')
    @users_ns.response(200, 'User deleted successfully')
    @users_ns.response(400, 'Bad Request')
    def delete(self, user_id, token_user_id):
        """Delete a user by ID"""
        try:
            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            delete_user(user_id)
            return {'message': 'User deleted successfully'}, 200
        except Exception as e:
            return {'error': str(e)}, 400

# Implement a route for updating the user's cover letter 
@users_ns.route('/<string:user_id>/cover-letter')
class UserCoverLetter(Resource):
    @token_required
    @users_ns.doc(security='apikey')
    @users_ns.expect({'cover_letter': fields.String(required=True, description='The user cover letter')})
    @users_ns.response(200, 'Cover letter updated successfully')
    @users_ns.response(400, 'Bad Request')
    @users_ns.response(403, 'Forbidden')
    def get(self, user_id, token_user_id):
        """Update a user's cover letter"""
        try:
            user_id = get_user(user_id).data[0]['id']

            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            
            cover_letter = get_user_cover_letter(user_id).data[0]
            
            return cover_letter, 200
        except Exception as e:
            return {'error': str(e)}, 400

    @token_required
    @users_ns.doc(security='apikey')
    @users_ns.expect({'cover_letter': fields.String(required=True, description='The user cover letter')})
    @users_ns.response(200, 'Cover letter updated successfully')
    @users_ns.response(400, 'Bad Request')
    @users_ns.response(403, 'Forbidden')
    def put(self, user_id, token_user_id):
        """Update a user's cover letter"""
        data = request.json
        cover_letter = data.get("coverLetter")
        try:
            user_id = get_user(user_id).data[0]['id']

            if user_id != token_user_id:
                return {'error': 'No you\'re not allowed this with that auth key'}, 403
            
            response = update_user_cover_letter(user_id, cover_letter)
            return {'success': 'Updated cover letter successfully'}, 200
        except Exception as e:
            return {'error': str(e)}, 400

@users_ns.route('/login')
class UserLogin(Resource):
    @users_ns.expect(login_model)
    @users_ns.doc(parser=None)  # Exclude auth parser for login
    @users_ns.response(200, 'Login successful')
    @users_ns.response(401, 'Unauthorized')
    def post(self):
        """Login a user"""
        data = request.json
        email = data.get('email')
        password = data.get('password')

        try:
            response = login_user(email, password)
            if response is None:
                return {'error': 'Invalid credentials'}, 401
            access_token = response[0]
            user_id = response[1]
            return {'message': 'Login successful', 'user_id': user_id, 'basic_auth_token': access_token}, 200
        except Exception as e:
            return {'error': str(e)}, 401