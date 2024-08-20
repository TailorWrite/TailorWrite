from flask_restx import Namespace, Resource, fields
from flask import request, jsonify
from models.users import create_user, create_account, get_user, update_user, delete_user

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
            user_id = str(response).split("user=User(id='")[1].split("'")[0]
            account = data.get('account_info', {})
            account['id'] = user_id
            create_account(account)
            return {'message': 'User created successfully', 'id': user_id}, 201
        except Exception as e:
            return {'error': str(e)}, 400

@users_ns.route('/<string:user_id>')
class User(Resource):
    @users_ns.response(200, 'Success', account_model)
    @users_ns.response(404, 'User not found')
    def get(self, user_id):
        """Fetch a user by ID"""
        try:
            response = get_user(user_id)
            user = response.data
            if user:
                return jsonify(user[0])
            else:
                return {'message': 'User not found'}, 404
        except Exception as e:
            return {'error': str(e)}, 400

    @users_ns.expect(account_model)
    @users_ns.response(200, 'User updated successfully', user_model)
    @users_ns.response(400, 'Bad Request')
    def put(self, user_id):
        """Update a user by ID"""
        data = request.json
        try:
            response = update_user(user_id, data)
            response = jsonify(response.data[0])
            response.status_code = 200
            return response
        except Exception as e:
            return {'error': str(e)}, 400

    @users_ns.response(200, 'User deleted successfully')
    @users_ns.response(400, 'Bad Request')
    def delete(self, user_id):
        """Delete a user by ID"""
        try:
            delete_user(user_id)
            return {'message': 'User deleted successfully'}, 200
        except Exception as e:
            return {'error': str(e)}, 400
