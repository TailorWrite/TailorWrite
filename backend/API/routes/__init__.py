# routes/__init__.py
from flask import Blueprint
from routes.users_routes import users_bp

def register_routes(app):
    app.register_blueprint(users_bp, url_prefix='/users')
