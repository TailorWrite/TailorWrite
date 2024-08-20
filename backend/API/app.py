from flask import Flask, request
from flask_cors import CORS
from flask_restx import Api, Resource
from routes import register_routes

app = Flask(__name__)
CORS(app)  # This handles CORS preflight requests automatically
api = Api(app, doc='/swagger')  # Swagger UI available at /swagger

register_routes(api)  # Modify this function to accept 'api' instead of 'app'

@app.before_request
def handle_options():
    if request.method == 'OPTIONS':
        response = app.make_response('')
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

if __name__ == '__main__':
    app.run(debug=True)
