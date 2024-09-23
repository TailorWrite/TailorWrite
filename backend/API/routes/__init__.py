from flask_restx import Api

def register_routes(api: Api):
    
    from routes.users_routes import users_ns
    api.add_namespace(users_ns, path='/users')
    
    from routes.applications_routes import applications_ns
    api.add_namespace(applications_ns, path='/applications')
    
    from routes.educations_routes import educations_ns
    api.add_namespace(educations_ns, path='/educations')
    
    from routes.experience_routes import experiences_ns
    api.add_namespace(experiences_ns, path='/experiences')
    
    from routes.skills_routes import skills_ns
    api.add_namespace(skills_ns, path='/skills')
    
    from routes.cover_letter_routes import cover_letter_ns
    api.add_namespace(cover_letter_ns, path='/cover-letter')