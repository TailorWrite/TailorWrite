<p align="center"> 
  <h1 align="center"> Contributing to the Frontend </h1> 
  <h6 align="center">July 2024 - October 2024</h6> 
  
  <p align="center"> 
    This document outlines the steps to contribute to the frontend of the TailorWrite project.
  </p> 
</p>

---

## Tech Stack

- **Build Tool:** [Vite](https://vitejs.dev)
- **Framework:** [React](https://reactjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Testing:** [Vitest](https://vitejs.dev/guide/features.html#testing)

## Querying the Database

Queuing the database via the frontend is done using react-router `loaders` and `actions`. 

- **Loaders:** Loaders are functions that are used to fetch data from the database. They are called when a component is mounted and, in our case, are used to fetch data from the database.
- **Actions:** Actions are functions that are used to update the database. They are called when a user interacts with the application, such as submitting a form when creating a new job application.

Below is a guide to implementing loaders and actions in the frontend:

### Loaders

React-router documentation on loaders can be found [here](https://reactrouter.com/en/main/route/loader).

1. Open the file `frontend/src/loaders.ts`. This file contains all the loaders used in the frontend.

2. Create a new loader function. The function should follow the the naming convention `nameLoader` where `name` is the name of the data being fetched. This function should also return a promise that resolves to the data fetched from the database. For example:

```typescript
export async function applicationLoader({ params }: LoaderFunctionArgs) {
    // OPTIONAL: Extract the params from the URL 
    const { uuid } = params;

    // OPTIONAL: Implement parameter validation here 
    if (!uuid) {
        return json({ error: 'Invalid parameters' }, { status: 400 });
    }

    try { 
        // Query the backend api via the path defined in APIConstants 
        const response = await axios.get(APIConstants.APPLICATION(uuid), { headers });)

        // Handle any errors here ...
        if (!response.data) {
            return json({ error: 'No data found' }, { status: 404 });
        }

        // Return the data to the component
        return json(response.data);
    } catch (error) {
        // Extracting the error message from the database
        const errorMessage = (error as AxiosError).response.data.error || "Failed to <do_operation>";

        // Handle any errors here ...
        return json({ error: error.message }, { status: 500 });
    }
```

Now that the loader function has been created, it must be called in `main.tsx` to fetch the data when the component is mounted.

3. Open the file `frontend/src/main.tsx`. This file contains the routes for the frontend application.

```tsx
import React from 'react';
// All other imports ...

// Import the loader function
import { applicationLoader, /* other loader imports */ } from './loaders';

const router = createBrowserRouter([
    // All other routes ...
    {
        // Define the path and element to be rendered when the route is accessed
        path: PathConstants.APPLICATION,
        element: <ApplicationDetails />,
        // Define the loader function to be called when the route is accessed
        loader: applicationLoader,
    },
    // All other routes ...
]); 

// All other code ...
```

The loader function is now called when the component is mounted and the data is fetched from the database. Now we need to get the data from the loader function from within the component.

4. Open the component file where the data is to be used. For example, if the data is to be used in the `ApplicationDetails` component, open the file `frontend/src/pages/Application.tsx`.

```tsx
import React, { useState } from 'react';

// Import the useLoaderData hook from react-router
import { useLoaderData } from 'react-router-dom';

export default function ApplicationDetails() {
    // Get the data from the loader function
    const loaderData: ApplicationData = useLoaderData() as ApplicationData;

    // Load the data into a useState hook to access it in the component
    const [data, setData] = useState<ApplicationData>(loaderData);

    // Use the data in the component
    return (
        <Form>
            <input type="text" name="job_title" defaultValue={data.job_title} />
            <input type="text" name="company_name" defaultValue={data.company_name} />
            <input type="text" name="application_date" defaultValue={data.application_date} />
            <input type="text" name="status" defaultValue={data.status} />
        </Form>
    );
}
```

The data is now fetched from the database and displayed in the component.

### Actions

React-router documentation on actions can be found [here](https://reactrouter.com/en/main/route/action).

1. Open the file `frontend/src/actions.ts`. This file contains all the actions used in the frontend.

2. Create a new action function. The function should follow the naming convention `handleAction` where `Action` is the name of the action being performed. This function should also return a promise that resolves to the data fetched from the database. For example:

```typescript
export async function handleAddApplication({ request }: { request: Request }): Promise<{ error?: string; success?: string }> {
    // OPTIONAL: Extract the userId from the session storage
    const userId = sessionStorage.getItem('userId');
    
    // Get the form data from the request
    const formData = await request.formData();

    // Extract the fields from the form data
    const job_title = formData.get('job_title');
    const company_name = formData.get('company_name');
    const application_date = formData.get('application_date');
    const status = formData.get('status');

    // OPTIONAL: Implement parameter validation here
    if (!job_title || !company_name || !application_date || !status) {
        return json({ error: 'Invalid parameters' }, { status: 400 });
    }

    // Construct the payload to be sent to the backend
    const payload = {
        user_id: userId,    // OPTIONAL: Include only if userId is required
        job_title,
        company_name,
        application_date,
        status,
    };


    try { 
        // Query the backend api via the path defined in APIConstants 
        const response = await axios.post(APIConstants.APPLICATION, payload, { headers });

        // Handle any errors here ...
        if (!response.data) {
            return json({ error: 'Failed to create application' }, { status: 500 });
        }

        // Implement a toast notification here ...

        // Return the data to the component
        return json(response.data);
    } catch (error) {
        // Extracting the error message from the database
        const errorMessage = (error as AxiosError).response.data.error || "Failed to create application";

        // Handle any errors here ...
        return json({ error: error.message }, { status: 500 });
    }
```

Now that the action function has been created, it must be called in `main.tsx` to be run when the form is submitted.

2. Open the file `frontend/src/main.tsx`. This file contains the routes for the frontend application.

```tsx
import React from 'react';
// All other imports ...

// Import the action function
import { handleAddApplication, /* other action functions */ } from './actions';

const router = createBrowserRouter([
    // All other routes ...
    {
        // Define the path and element to be rendered when the route is accessed
        path: PathConstants.APPLICATION,
        element: <AddApplication />,
        // Define the action function to be called when the form is submitted
        action: handleAddApplication,
    },
    // All other routes ...
]); 

// All other code ...
```

The action function is now called when the form within the rendered component is submitted. Now we need to update the form. 


3. Open the component file where the action is to be performed. For example, if the action is to be performed in the `AddApplication` component, open the file `frontend/src/pages/AddApplication.tsx`. 

```tsx
import React from 'react';
// All other imports ...

// Import the Form component from react-router
import { Form } from 'react-router-dom';

export default function AddApplication() {

    return (
        // Simply replace all the <form> tags with the new react-router <Form> tags and add the method used to submit the form
        <Form method="post">
            <input type="text" name="job_title" placeholder="Job Title" />
            <input type="text" name="company_name" placeholder="Company Name" />
            <input type="text" name="application_date" placeholder="Application Date" />
            <input type="text" name="status" placeholder="Status" />

            {/* Finally make sure that the form has a button of type="submit" */}
            <button type="submit">Add Application</button>
        </Form>
    );
};
```

The action function is now called when the form is submitted and the data is sent to the database.

---

