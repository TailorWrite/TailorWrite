## Accessing the Project

Accessing TailorWrite is simple can be done locally or via our deployed website. The deployed website can be accessed [here](https://tailorwrite.github.io/).

## Deploying the Project Locally

### Prerequisites
- **Python** - The backend of the project is built using Python. You can download Python from [here](https://www.python.org/downloads/).
- **Node.js** - The frontend of the project is built using React.js. You can download Node.js from [here](https://nodejs.org/en/download/).
- **Docker** - The project is containerized using Docker. You can download Docker from [here](https://www.docker.com/products/docker-desktop).

### Running Locally

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
-   Swagger API Documentation: [`http://localhost:5001`](http://localhost:5001)
<!-- -   Supabase Studio Dashboard: [`http://localhost:8000`](http://localhost:8000) -->


5. Shut down the application:
```sh
docker compose down
```

---