[Architecture-Diagram]: https://taiga.otago.ac.nz/media/attachments/2/2/1/4/0549835cbae300bcaabb9689e80a37d376cacf622b8382a6c989fbb59723/image_2024-10-17_234032486.png
[ERD-Diagram]: https://taiga.otago.ac.nz/media/attachments/3/e/0/e/a4d751597f35e56f07de06bb842bf442cce791c141958f559d0a0e46af13/updated-erd.png
[UseCase-Diagram]: https://taiga.otago.ac.nz/media/attachments/6/c/0/a/c0c6d0fe2da01d31a950fb7fc1b581f4a502daa58c9996729073b31b2de6/image_2024-08-16_212259906.png
[Sequence-Diagram]: https://taiga.otago.ac.nz/media/attachments/b/d/e/6/68259ac0373d627593b8abb14f0d81203b2ac615d56354af1db6dfc03daa/image_2024-08-16_212502552.png

# **TailorWrite Technical Documentation**

## Running the Project Locally

## Built With

-   **Frontend:** [React.js](https://reactjs.org) **&** [Tailwind CSS](https://tailwindcss.com)
-   **Backend:** [Python Flask REST API](https://flask.palletsprojects.com/en/2.0.x/)
-   **Database:** [Supabase](https://supabase.io)
-   **Large Language Model:** [Google Gemini](https://gemini.google.com/app) 

## File Tree 
- `frontend` - Contains the React project for the frontend
- `backend` - Contains the files for the backend
- `database` - Contains the Supabase docker compose file and related files
- `infrastructure` - Contains the Terraform files for deploying the infrastructure to AWS


## Running the Project Locally

Running the project locally requires Docker to be installed on your machine.

1. Clone the Repository using the following command:
```sh
git clone https://github.com/TailorWrite/TailorWrite.git
```

2. Change into the project directory:
```sh
cd TailorWrite
```

3. Build and run the TailorWrite:
```sh
docker compose up -d --build
```

4. Access the application via the following URLs:
-   Frontend Application: [`http://localhost:80`](http://localhost:80)
-   Supabase Studio Dashboard: [`http://localhost:8000`](http://localhost:8000)
-   Python Flask API: [`http://localhost:5001`](http://localhost:5001)


5. Shut down the application:
```sh
docker compose down
```

---


## System Architecture

### **Architecture Overview**
TailorWrite is built as a full-stack web application with a decoupled frontend and backend. The backend handles user authentication, cover letter generation, and data management, while the frontend provides a user-friendly interface for job seekers.

### **Architecture Diagram**

Below is the system architecture for TailorWrite:

![Architecture Diagram][Architecture-Diagram]

### **Components Explanation**
- **Frontend**: React.js application deployed on S3 styled with TailwindCSS.
- **Backend**: Flask-based REST API running on an EC2 instance, interfacing with Supabase (PostgreSQL) for database operations.
- **Supabase**: Manages the relational database and provides user authentication.
- **AWS Services**: Includes S3 for static site hosting and EC2 for hosting the backend.

---

## Data Models

### **ERD (Entity-Relationship Diagram)**

![ERD][ERD-Diagram]

### **Database Schema and Relationships**
TailorWrite uses a relational database to store information related to users, job applications, cover letters, and user profiles.

---

## Use Case

### **Use Case Diagram**

![Use Case Diagram][UseCase-Diagram]

### **User Flows and Scenarios**
The core flow includes:
1. **User Registration and Login**: Users create an account or log in.
2. **Creating a Job Application**: Users enter job details and generate cover letters based on job-specific information.
3. **Managing Applications**: Users can view, edit, and track applications.

---

## Sequence Diagram

![Sequence Diagram][Sequence-Diagram]


## API Documentation

### **Overview of API Endpoints**
The backend exposes several RESTful API endpoints to manage job applications, generate cover letters, and more. Swagger UI API documentation can be accessed at [http://localhost:5001](http://localhost:5001) when the backend is running.

---

## Deployment

### **Overview of Deployment Process**
TailorWrite is designed to be deployed on AWS, with the following services:
- **Frontend**: Deployed on S3 for static hosting.
- **Backend**: Deployed on an EC2 instance, using Docker to run the Flask app.
- **Supabase**: Hosted externally and accessed via the backend.

### **CI/CD Pipeline**
The project uses GitHub Actions for automated testing and deployment:
1. On push to `master`, the pipeline builds the frontend and backend, runs a build and tests. 

---

## 8. Troubleshooting and FAQs

### **Common Issues**
- **Docker Compose Not Running**: Ensure Docker is installed and running, and that the ports required by the app are not in use by other processes.
  - These ports include `80`, `5001`, and `8000`.
- **Supabase Connection Issues**: Verify your `./backend/.env` file has the correct Supabase URL and keys.

### **Debugging Tips**
- Use `docker-compose logs` to view container logs.
- For API issues, inspect the server logs via Flask’s debug output.
