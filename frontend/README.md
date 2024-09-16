<p align="center"> 
  <h1 align="center"> Deploying via Docker - Frontend </h1> 
  <h6 align="center">July 2024 - October 2024</h6> 
  
  <p align="center"> 
    This README provides instructions for getting started developing the frontend of the Job Application Tracker
  </p> 
</p>

---

## Tech Stack

- **Build Tool:** [Vite](https://vitejs.dev)
- **Framework:** [React](https://reactjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Testing:** [Vitest](https://vitejs.dev/guide/features.html#testing)

## Folder Structure

The frontend project is structured as follows:

- `public` - Contains the public assets for the project
- `src` - Contains the source code for the project
  - `api` - Contains functions for making API requests separated by queries and mutations
  - `components` - Contains the React components for the project separated into different categories such as `common`, `dashboard`, `icons`, `modals`, etc...
  - `pages` - Contains simple pages for the project, such as 404, Login, Register, etc...
  - `layouts` - Contains components that define the layout of the application
  - `views` - Contains the main views for the application, such as the, application tracker, etc...
  -
  - `ts_files` - Various typescript files used throughout the project such as types, util functions, etc...
  - `main.tsx` - The main application component that renders the application and defines the routes

- `tests` - Contains the tests for the project nested in the same structure as the `src` directory
---


## Running the Frontend for Development

Running the project website in development mode requires the following commands:

1. Change into the frontend directory and install the dependencies:
```zsh
cd frontend
npm install
```

2. Start the development server:
```zsh
npm run dev
```

3. Open the browser and navigate to [`http://localhost:5173`](http://localhost:5173) to view the application.

## Running the Frontend using Docker

To run the frontend using Docker, you can use the following commands:

1. Build the Docker image:
```zsh
docker build -t job-tracker-frontend .
```

2. Run the Docker container:
```zsh
docker run -d -p 5173:80 job-tracker-frontend
```
This will run the container in detached mode and expose the frontend on port 5173.

3. Open the browser and navigate to [`http://localhost:80`](http://localhost:80) to view the application.

--- 

## Testing the Frontend

You have two options when running tests for the frontend: 

1. Running basic tests using Vitest in the terminal:

```zsh
npm run test
```

2. Running tests with an interactive web UI:

```zsh
npm run test:ui
```
This should open a browser window where you can interact with the tests. If not navigate to [`http://localhost:51204/__vitest__/#/`](http://localhost:51204/__vitest__/#/) to view the tests.
