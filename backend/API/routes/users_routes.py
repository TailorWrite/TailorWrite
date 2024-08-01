# routes/users_routes.py
from flask import Blueprint, request, jsonify
from models.users import create_user, create_profile, get_user, update_user, delete_user

users_bp = Blueprint('users', __name__)

@users_bp.route('', methods=['POST'])
def create():
    data = request.json
    print(data)
    try:
        response = create_user(data)
        id = str(response).split("user=User(id='")[1].split("'")[0]
        profile = data['profile']
        profile['id'] = id
        response = create_profile(profile)
        return str(response), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@users_bp.route('/<string:user_id>', methods=['GET'])
def read(user_id):
    try:
        response = get_user(user_id)
        user = response.data
        if user:
            return jsonify(user[0]), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@users_bp.route('/<string:user_id>', methods=['PUT'])
def update(user_id):
    data = request.json
    try:
        response = update_user(user_id, data)
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@users_bp.route('/<string:user_id>', methods=['DELETE'])
def delete(user_id):
    try:
        response = delete_user(user_id)
        return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
