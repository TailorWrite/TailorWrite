import os
import subprocess
import requests
import json
import datetime
import pytz
from flask_restx import Namespace, Resource, fields
from flask import request, jsonify, send_file
from models.authentication import token_required
from models.users import get_user
from models.education import get_educations_by_user
from models.experience import get_experiences_by_user
from models.skills import get_skills_by_user
from models.applications import get_application
from models.cover_letters import *
from config import Config



# Define the namespace
cover_letters_ns = Namespace('cover_letters', description='Cover Letter operations')

# Define the cover letter model
cover_letter_model = cover_letters_ns.model('CoverLetter', {
    'application_id': fields.Integer(required=True, description='Job Application ID', example=1),
    'content': fields.String(required=True, description='Cover letter content', example='Dear Hiring Manager...'),
})

cover_letter_model_pdf = cover_letters_ns.model('CoverLetter', {
    'user_id': fields.String(required=True, description='User ID of the applicant', example='5a4245c0-5404-4be3-9061-f728d77fdb42'),
    'content': fields.String(required=True, description='Cover letter content', example='Dear Hiring Manager...'),
})

# Model for updating a cover letter
update_cover_letter_model = cover_letters_ns.model('UpdateCoverLetter', {
    'content': fields.String(required=True, description='Cover letter content', example='Dear Hiring Manager...')
})

# Define the cover letter generation model
cover_letter_generate_model = cover_letters_ns.model('CoverLetterGeneration', {
    'user_id': fields.String(required=True, description='User ID of the applicant', example='5a4245c0-5404-4be3-9061-f728d77fdb42'),
    'application_id': fields.String(required=False, description='ID number of the application', example='10')
})

GEMINI_API_URL = Config.GEMINI_API_URL
API_KEY = Config.GEMINI_API_KEY

@cover_letters_ns.route('')
class CoverLetterList(Resource):
    @token_required
    @cover_letters_ns.expect(cover_letter_model)
    @cover_letters_ns.response(201, 'Cover letter created successfully')
    @cover_letters_ns.response(400, 'Bad Request')
    @cover_letters_ns.response(403, 'Forbidden')
    def post(self, token_user_id):
        """Create a new cover letter for a specific job application"""
        data = request.json
        application_id = data['application_id']
        try:
            response = create_cover_letter(data)
            return {'message': 'Cover letter created successfully', 'CoverLetter_id': response.data[0]['id']}, 201
        except Exception as e:
            return {'error': str(e)}, 400

@cover_letters_ns.route('/user/<string:user_id>')
class CoverLetterListByUser(Resource):
    @token_required
    @cover_letters_ns.response(200, 'Success', [cover_letter_model])
    @cover_letters_ns.response(404, 'No cover letters found')
    @cover_letters_ns.response(403, 'Forbidden')
    def get(self, user_id, token_user_id):
        """Fetch all cover letters for a specific user"""
        if user_id != token_user_id:
            return "Not allowed"
        try:
            response = get_cover_letters_by_user(user_id)
            print(len(response.data))
            return jsonify(response.data)
        except Exception as e:
            return {'error': str(e)}, 400

@cover_letters_ns.route('/application/<int:application_id>')
class CoverLetterListByApplication(Resource):
    @token_required
    @cover_letters_ns.response(200, 'Success', [cover_letter_model])
    @cover_letters_ns.response(404, 'No cover letters found')
    @cover_letters_ns.response(403, 'Forbidden')
    def get(self, application_id, token_user_id):
        """Fetch all cover letters for a specific job application"""
        try:
            application = get_application(application_id)
            if not application.data:
                return "Not allowed"
            if application.data[0]["user_id"] != token_user_id:
                return "Not allowed"
            cover_letters = get_cover_letters_by_application(application_id)
            if cover_letters.data:
                return jsonify(cover_letters.data)
            else:
                return {'message': 'No cover letters found'}, 404
        except Exception as e:
            return {'error': str(e)}, 400

@cover_letters_ns.route('/application/<int:application_id>/<int:cover_letter_id>')
class CoverLetter(Resource):
    @token_required
    @cover_letters_ns.response(200, 'Success', cover_letter_model)
    @cover_letters_ns.response(404, 'Cover letter not found')
    @cover_letters_ns.response(403, 'Forbidden')
    def get(self, application_id, cover_letter_id, token_user_id):
        """Fetch a cover letter by ID"""
        try:
            response = get_cover_letter(application_id, cover_letter_id)
            application = get_application(application_id)
            if not application.data or application.data[0]["user_id"] != token_user_id:
                return {'message': 'Cover letter not found or unauthorized'}, 404
            return jsonify(response.data[0])
        except Exception as e:
            return {'error': str(e)}, 400

    @token_required
    @cover_letters_ns.expect(update_cover_letter_model)
    @cover_letters_ns.response(200, 'Cover letter updated successfully', cover_letter_model)
    @cover_letters_ns.response(400, 'Bad Request')
    @cover_letters_ns.response(403, 'Forbidden')
    def put(self, cover_letter_id, application_id, token_user_id):
        """Update a cover letter by ID"""
        data = request.json
        try:
            response = get_cover_letter(application_id, cover_letter_id)
            response = get_application(response.data[0]["application_id"])
            if response.data and response.data[0]['user_id'] == token_user_id:
                utc_now = datetime.datetime.now(pytz.utc)
                data['updated_at'] = utc_now.strftime('%Y-%m-%dT%H:%M:%SZ')
                updated_response = update_cover_letter(application_id, cover_letter_id, data)
                if updated_response.data:
                    return jsonify(updated_response.data)
                else:
                    return {'message': 'Failed to update cover letter'}, 400
            else:
                return {'error': 'Unauthorized access or cover letter not found'}, 403
        except Exception as e:
            return {'error': str(e)}, 400

    @token_required
    @cover_letters_ns.response(200, 'Cover letter deleted successfully')
    @cover_letters_ns.response(400, 'Bad Request')
    @cover_letters_ns.response(403, 'Forbidden')
    def delete(self, application_id, cover_letter_id, token_user_id):
        """Delete a cover letter by ID"""
        try:
            response = get_cover_letter(application_id, cover_letter_id)
            response = get_application(response.data[0]["application_id"])
            if response.data and response.data[0]['user_id'] == token_user_id:
                delete_response = delete_cover_letter(application_id, cover_letter_id)
                if delete_response.data:
                    return {'message': 'Cover letter deleted successfully'}, 200
                else:
                    return {'message': 'Failed to delete cover letter'}, 400
            else:
                return {'error': 'Unauthorized access or cover letter not found'}, 403
        except Exception as e:
            return {'error': str(e)}, 400


@cover_letters_ns.route('/generate')
class GenerateCoverLetter(Resource):
    @token_required
    @cover_letters_ns.expect(cover_letter_generate_model)
    @cover_letters_ns.response(200, 'Cover letter generated successfully')
    @cover_letters_ns.response(400, 'Bad Request')
    @cover_letters_ns.response(500, 'Internal Server Error')
    def post(self, token_user_id):
        """Generate a cover letter based on job description and personal description"""
        
        data = request.json
        job_description = data.get('job_description')
        application_id = data.get('application_id')
        style = data.get('style', 'professional')

        user_id = data.get('user_id')
        if user_id != token_user_id:
            return {'error': 'No you\'re not allowed this with that auth key'}, 403
        
        response = get_user(user_id)
        user_data = json.loads(response.json())['data'][0]
        # Create a formatted description
        user_description = (
            f"{user_data['first_name']} {user_data['last_name']} "
            f"can be reached at {user_data['email']} "
            f"and their phone number is {user_data['phone']}."
        )
        
        response = get_educations_by_user(user_id)
        education_data = json.loads(response.json())['data']
        education_descriptions = []
        full_education_description = ""
        for entry in education_data:
            description = f"{entry['degree']} in {entry['field_of_study']} from {entry['institution_name']} (start date: {entry['start_date']}, end date: {entry['end_date']})."
            education_descriptions.append(description)
        full_education_description = " ".join(education_descriptions)
        
        response = get_experiences_by_user(user_id)
        experience_data = json.loads(response.json())['data']
        experience_descriptions = []
        full_experience_description = ""
        for entry in experience_data:
            description = f"{entry['job_title']} at {entry['company_name']} (start date: {entry['start_date']}, end date: {entry['end_date']}) - {entry['description']}"
            experience_descriptions.append(description)
        full_experience_description = " ".join(experience_descriptions)
        
        response = get_skills_by_user(user_id)
        skills_data = json.loads(response.json())['data']
        skills_descriptions = []
        full_skills_description = ""
        for entry in skills_data:
            description = f"{entry['skill_name']} (Proficiency: {entry['proficiency_level']})"
            skills_descriptions.append(description)
        full_skills_description = ", ".join(skills_descriptions)
        
        full_application_description = ""
        if application_id:
            response = get_application(application_id)
            application_data = json.loads(response.json())['data'][0]

            full_application_description = (
                f"Applied for {application_data['job_title']} at {application_data['company_name']} "
                f"on {application_data['application_date']} - Status: {application_data['status']}. "
            )
            if application_data['notes']:
                full_application_description += f"Notes: {application_data['notes']}. "

        if job_description:
            full_application_description += "Further description: " + job_description
            
        if full_application_description == "":
            full_application_description = "No Job Application"
        if full_education_description == "":
            full_education_description = "No Job Application"
        if full_experience_description == "":
            full_experience_description = "No Job Application"
        if full_skills_description == "":
            full_skills_description = "No Job Application"

        

        if not user_description or not full_education_description or not full_experience_description or not full_skills_description or not full_application_description:
            return {'error': 'All user descriptions are required'}, 400

        try:
            # Prepare the payload for Gemini API
            payload = {
                "contents": [{
                    "parts": [{
                        "text": f"Generate a cover letter based on the following job description and personal description. Do not include any fields for the user to fill such as [Your Name] or [platform where you found the job listing]. This cover letter is to be used in a professional manner, and will not be modified after you create it:\n\nPersonal Description: {user_description}\nJob Description: {full_application_description}\nEducation Description: {full_education_description}\nExperience Description: {full_experience_description}\nSkills Description: {full_skills_description}"
                    }]
                }]
            }

            # generated_text = EXAMPLE_COVER_LETTER

            # Send POST request to Gemini API
            response = requests.post(f"{Config.GEMINI_API_URL}?key={Config.GEMINI_API_KEY}", json=payload)
            generated_text = ""
            if response.status_code == 200:
                generated_text = response.json()['candidates'][0]['content']['parts'][0]['text']

                # Add this cover letter to the database
                response = create_cover_letter({
                    "application_id": application_id,
                    "content": generated_text
                })

                return GeneratePDF(generated_text, user_data, application_data, style)
            else:
                return {'error': 'Failed to generate cover letter', 'details': response.text}, response.status_code

        except requests.RequestException as e:
            return {'error': 'Failed to connect to cover letter generation service', 'details': str(e)}, 500
        
        
@cover_letters_ns.route('/<int:application_id>/pdf')
class GeneratePDFClass(Resource):
    @token_required
    @cover_letters_ns.expect(cover_letter_model_pdf)
    @cover_letters_ns.response(200, 'PDF generated successfully')
    @cover_letters_ns.response(400, 'Bad Request')
    @cover_letters_ns.response(500, 'Internal Server Error')
    def post(self, application_id, token_user_id):
        """Generate a PDF from a cover letter"""
        data = request.json
        user_id = data["user_id"]
        cover_letter_text = data["content"]
        style = data.get('style', 'professional')
        response = get_user(user_id)
        user_data = json.loads(response.json())['data'][0]
        response = get_application(application_id)
        application_data = json.loads(response.json())['data'][0]
        if user_id == token_user_id:
            return GeneratePDF(cover_letter_text, user_data, application_data, style)
        else:
            return "Not authorized for this.", 400
        
def GeneratePDF(generated_text, user_data, application_data, style):
    TEMPLATES_BASE_PATH = f"{os.getcwd()}/cover_letter_templates"
    OUTPUT_BASE_PATH = f"{os.getcwd()}/tmp"
    TEMPLATE_INSERT_TOKEN = "INSERT-COVER-LETTER-HERE"
    LINE_SPACING = "\n\n\\vspace{1em}\n"
    
    # Replace double newlines with custom spacing
    generated_text = generated_text.replace("\n\n", LINE_SPACING)

    # Read the LaTeX template
    template_path = f"{TEMPLATES_BASE_PATH}/{style}.tex"
    if not os.path.exists(template_path):
        return {"error": f"Template '{style}' not found.", "path": template_path}, 404

    with open(template_path, "r") as template:
        template_contents = template.read()

    # Create the output LaTeX file
    output_tex_path = f"{OUTPUT_BASE_PATH}/cover_letter.tex"
    
    with open(output_tex_path, "w") as output:
        content = template_contents.replace(TEMPLATE_INSERT_TOKEN, generated_text)
        
        content = content.replace("INSERT-NAME-HERE", f"{user_data['first_name']} {user_data['last_name']}")
        content = content.replace("INSERT-PHONE-HERE", f"{user_data['phone']}")
        content = content.replace("INSERT-EMAIL-HERE", f"{user_data['email']}")
        content = content.replace("INSERT-LOCATION-HERE", "")
        
        content = content.replace("INSERT-JOB-TITLE-HERE", application_data['job_title'])
        
        # Replace all & with \& to escape them in LaTeX
        content = content.replace("&", "\&")


        output.write(content)

    # Compile the LaTeX file to PDF
    output_pdf_path = f"{OUTPUT_BASE_PATH}/cover_letter.pdf"[4:]
    try:
        subprocess.run(['pdflatex', '-interaction=nonstopmode', '-output-directory', OUTPUT_BASE_PATH, output_tex_path], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        # Clean up auxiliary files
        for ext in ['.aux', '.log', '.out']:
            aux_file = f"{OUTPUT_BASE_PATH}/cover_letter{ext}"
            if os.path.exists(aux_file):
                os.remove(aux_file)
        
        output_pdf_path = f"{os.getcwd()}{output_pdf_path}"
        return send_file(output_pdf_path, as_attachment=True, download_name="cover_letter.pdf", mimetype='application/pdf')
    except subprocess.CalledProcessError as e:
        return {"error": f"LaTeX compilation failed: {str(e)}"}, 500
    except Exception as e:
        return {'error': 'Failed to connect to cover letter generation service', 'details': str(e)}, 500
