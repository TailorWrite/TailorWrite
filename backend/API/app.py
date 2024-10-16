from flask import Flask, request
from flask_cors import CORS
from flask_restx import Api
from routes import register_routes
from dotenv import load_dotenv
load_dotenv()
from config import Config


authorizations = {
    'apikey': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
    }
}

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app, resources={r"/*": {
        "origins": "*",
        "allow_headers": ["Content-Type", "Authorization", "Authenticate_token"],
        "expose_headers": ["Content-Type", "Authorization", "Authenticate_token"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }})

    api = Api(
        app,
        version='1.0',
        title='API TailorWrite Swagger',
        description='Your API Description',
        authorizations=authorizations,
        security='apikey',
        doc='/'
    )

    with app.app_context():
        register_routes(api)

    @app.before_request
    def handle_preflight():
        if request.method == 'OPTIONS':
            response = app.make_default_options_response()
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authenticate_token, Authorization'
            return response

    return app

# Run the application
if __name__ == '__main__':
    app = create_app()
    app.run(debug=False, host="0.0.0.0", port="5000")
