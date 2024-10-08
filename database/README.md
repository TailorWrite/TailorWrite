<p align="center"> 
  <h1 align="center"> Deploying via Docker - Database </h1> 
  <h6 align="center">August 2024 - James Robiony-Rogers & Corban Surtees</h6> 
  
  <p align="center"> 
    This README provides instructions for getting started developing using Supabase as the database for the Job Application Tracker
  </p> 
</p>

---

## Overview 

Supabase is an open-source alternative to Firebase that provides a suite of tools for building applications. It includes a database, authentication, object storage, and more. This project uses Supabase as the database for the Job Application Tracker. 

For more information on developing and hosting Supabase locally, visit [Supabase's guide here](https://supabase.com/docs/guides/hosting/docker).

## Tech Stack

- **Database:** [Supabase x Postgres](https://supabase.com/database)
- **Auth:** [Supabase](https://supabase.com/storage) - Currently using Basic Auth
- **Object Storage:** [Supabase](https://supabase.com/storage) - Coming soon...

## Folder Structure

The database tier contains a mix of folders and files that are used to configure the Supabase database. The project is structured as follows:

- `dev` - Contains configuration for the database
- `volumes` - Contains the volumes and persistent storage for the database
- `init` - Contains the SQL scripts and Dockerfile for initialising the database
  - `init.sh` - Contains the script for initialising the database
  - `schema.sql` - Contains the SQL schema for the database
  - `data.sql` - Contains the example users and data for the database
  - `Dockerfile` - Contains the Dockerfile for initialising the database
- `.env` - Contains the environment variables for the configuring supabase
- `docker-compose.yml` - Contains the configuration for running all of supabase's services

---


## Running the Database for Development 

Running supabase locally is simple and can be done using Docker. To get started, follow these steps:

1. Change into the database directory:
```zsh
cd database
```

2. Build all services using Docker Compose:
```zsh
docker compose build
```

3. Start all services using Docker Compose:
```zsh
docker compose up -d
```

4. Open the browser and navigate to [`http://localhost:8000`](http://localhost:8000) to view the Supabase Studio dashboard.

5. Logging into the Supabase Studio dashboard requires a username and password. The default username is 
```js
DASHBOARD_USERNAME = "supabase"
DASHBOARD_PASSWORD = "this_password_is_insecure_and_should_be_updated"
```


### Shutting Down the Database
6. To shut down the database, run:
```zsh
docker compose down
```

---

## Database Configuration Environment Variables

The `.env` file contains the environment variables for the database. Some of the important variables include:

- `JWT_SECRET` - The secret key used to sign the JWT tokens
- `ANON_KEY` - The anonymous key used for public access to the database
- `SERVICE_ROLE_KEY` - The service role key used for service access to the database (server only)

Supabase studio requires a username and password to log in. These credentials are stored in the `.env` file: 

- `DASHBOARD_USERNAME` - The username for the Supabase Studio dashboard
- `DASHBOARD_PASSWORD` - The password for the Supabase Studio dashboard

Finally, additional configuration options can be found in the `.env` file such as: 

- `ENABLE_EMAIL_SIGNUP` - Enables email signup for new users
- `ENABLE_EMAIL_AUTOCONFIRM` - Enables automatic email confirmation for new users

