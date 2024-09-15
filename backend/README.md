<p align="center"> 
  <h1 align="center"> Deploying via Docker - Backend </h1> 
  <h6 align="center">July 2024 - October 2024</h6> 
  
  <p align="center"> 
    This README provides instructions for getting started developing the backend for the Job Application Tracker
  </p> 
</p>

---

## Tech Stack

- **Language:** [Python 3.9](https://www.python.org)
- **Framework:** [Flask](https://flask.palletsprojects.com/en/2.0.x/)
- **API Documentation:** [Swagger UI](https://swagger.io/tools/swagger-ui/)

## Folder Structure

The backend tier contains a mix of folders and files that are used to configure the Flask backend. The project is structured as follows:

- `api` - Contains the Flask API endpoints
  - `models` - Contains the models for the API such as users, authentication, and more
  - `routes` - Contains the routes for each of the API endpoints
  - `app.py` - Contains the main Flask application and API configuration
  - `config.py` - Contains the database configuration for the Flask application
  - `.env` - Contains the environment variables, such as the database URL and secret keys
- `requirements.txt` - Contains the required packages and their versions 
- `Dockerfile` - Contains the Dockerfile for building the Flask application


---

## Running the Backend for Development 

Running the backend locally is simple and can be done using Python. To get started, follow these steps:

1. Install Python 3.9 or higher using your package manager of choice (e.g., Homebrew, apt, or Chocolatey):


2. Change directories into the backend folder and install the required packages using the following command:
```sh
cd backend
pip install -r requirements.txt
```

3. Run the following command to start the server:
```sh
python ./api/app.py
```

4. Open the browser and navigate to [`http://localhost:5001`](http://localhost:5001) to view the API Swagger documentation.

5. To shut down the server, press `Ctrl + C` in the terminal window where the server is running.

## Testing the Backend

Testing of the backend can be performed through the Swagger UI documentation. Launch the server and navigate to [`http://localhost:5001/docs`](http://localhost:5001/docs) to view the API documentation and test the endpoints.
