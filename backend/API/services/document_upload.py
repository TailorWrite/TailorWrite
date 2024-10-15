import uuid
from supabase import create_client
from werkzeug.utils import secure_filename

# from models import supabase


supabase = create_client(
    supabase_url="https://zxaxcaejqogycvxvygqy.supabase.co", 
    supabase_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4YXhjYWVqcW9neWN2eHZ5Z3F5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMjQ2NzI3NCwiZXhwIjoyMDM4MDQzMjc0fQ.GgxP6IlCirQF9sNudZCPiLKO_3OVob6X3TdaaSGNZZE"
)

def get_unique_filename(filename):
    """Generate a unique filename for the uploaded document"""
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

def upload_document_to_supabase(user_id, document) -> dict: 
    """
    Upload a document to Supabase Storage

    Args:
    user_id (str): The user ID
    document (FileStorage): The document to upload

    Returns:
    dict: A dictionary containing the message and the path of the uploaded document
    """

    # Generating a 
    supabase_storage_path = f"{user_id}"      # f"{user_id}/documents"
    # filename = "README.md"            # TESTING: 
    filename = secure_filename(document.filename)

    try: 
        supabase.storage.from_("file-storage").upload(
            file=document,
            path=f"{supabase_storage_path}/{filename}", 
            file_options={"content-type": "text/markdown"}
            # file_options={"content-type": document.content_type}
        )

        return {
            "message": "Document uploaded successfully", 
            "path": f"{supabase_storage_path}/{filename}"
        }, 200
    except Exception as e: 
        print(e)
        return {"error": str(e)}, 400



if __name__ == "__main__":
    # Run from project root directory ./TailorWrite
    with open("./README.md", "rb") as f: 
        document = f.read()

    upload_document_to_supabase(
        user_id="1234", 
        document=document
    )