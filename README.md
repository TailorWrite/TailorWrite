
<!-- PROJECT LOGO -->
<br />
<p align="center">
    <!-- <img src="frontend/public/images/Stucal Blue.png" alt="Logo"> -->
    <h1 align="center">TailorWrite</h1>
    <!-- <h1 align="center"> StuCal</h1> -->
    <h6 align="center">July 2024 - October 2024</h6>
    

  <p align="center">
   Create beautiful tailored cover letters in minutes with <a align="center" href="https://isgb.otago.ac.nz/info301/TailorWrite/TailorWrite/pages/">TailorWrite</a>
  </p>
</p>

___


## Overview 
TailorWrite addresses the time-consuming challenge of tailoring CVs and cover letters for each job application, a common problem for students and job seekers. By streamlining this process, TailorWrite aims to improve the chances of securing interviews in the competitive job market, particularly for students in their penultimate year, new graduates, and job seekers.


## Built With

-   **Frontend:** [React.js](https://reactjs.org) **&** [Tailwind CSS](https://tailwindcss.com)
-   **Backend:** [Python Flask REST API](https://flask.palletsprojects.com/en/2.0.x/)
-   **Database:** [Supabase](https://supabase.io)
-   **Large Language Model:** [Llama 3.1](https://ollama.com/library/llama3.1) 

## File Tree 
- `docs` - Contains the currently deployed website build
- `backend` - Contains the files for the backend
- `frontend` - Contains the React project for the frontend


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

<!-- USAGE EXAMPLES -->
## View Project

<div align="center"> 
  <img style="width: 100%" src="https://github.com/user-attachments/assets/7aea7190-993b-422e-aadc-511469c496b7"> 
</div>

---

## Container Structure

This project is built utilising two containers. The containers are as follows:

- **Frontend Tier:** This container hosts the React.js application interface via nginx.
- **Backend Tier:** This container runs the Python Flask REST API.
<!-- - **Database Tier:** The database tier is a collection of services running in containers that run make up the Supabase database and its services. -->

By separating the application into different containers, we can achieve a modular design where each container handles a distinct aspect of the application. This setup enhances scalability, maintenance, and isolation of services.

## Docker Compose Configuration

The project uses Docker Compose to manage the setup of all necessary services. The [`docker-compose.yaml`](docker-compose.yaml) file in the root directory defines the services required to run the application. After the initial setup, the application will preload test data for demonstration purposes.

Through the build process, the application will automatically download and configure all required components. For a fresh build, this involves downloading Docker images and setting up containers, with approximate download volumes specified in the project report.

---

## Example Data 

The application comes preloaded with example data to demonstrate its functionality. The example data includes two users, each with their own applications. The users are as follows:

<!-- Create table for user data -->
| Name | Email Address | Password |
|---------|---------------|----------|
| John Doe | john.doe@example.com | password123 |
| Jane Smith | jane.smith@example.com | password123 |

---

## Further Development      

The Job Application Tracker is a versatile application that can be extended in various ways. Below are links to the various tiers README files to get up to speed with development on the project.

- **Frontend README:** [here](frontend/README.md)
- **Backend README:** [here](backend/README.md)
<!-- - **Database README:** [here](database/README.md) -->
