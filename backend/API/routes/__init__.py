from flask_restx import Api

def register_routes(api: Api):
    from routes.users_routes import users_ns
    api.add_namespace(users_ns, path='/users')
