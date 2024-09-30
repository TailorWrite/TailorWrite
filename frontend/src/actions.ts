/**
 * This file contains react-router action functions that are used when the user 
 * submits a form within the application. These functions are called within main.tsx
 * @see frontend/src/main.tsx
 * @reference https://reactrouter.com/en/main/route/action
*/

import axios from "axios";
import { Bounce, toast } from "react-toastify";

import { parseDateString } from "./utils";
import { AxiosError } from "./types";
import { headers } from "./api";
import { APIConstants } from "./pathConstants";

export async function handleAddApplication({ request }: { request: Request }): Promise<{ error?: string; success?: string }> {
    const toastId = toast.loading('Uploading application...');
    const userId = sessionStorage.getItem("user_id");
    
    const formData = await request.formData();

    // Extract form fields from formData
    const job = formData.get("job");
    const company = formData.get("company");
    const status = formData.get("status");
    const date = parseDateString(formData.get("date") as string);
    const url = formData.get("url");
    const description = formData.get("description");
    const notes = formData.get("notes");

    // Perform validation or API request
    if (!job || !company) {
        toast.update(toastId, {
            render: 'Job title and company name required ',
            type: 'info',
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
            transition: Bounce,
        });

        return { error: "All fields are required." };
    }

    const payload = {
        user_id: userId,
        job_title: job,
        company_name: company,
        status: status,
        application_date: date,
        application_url: url,
        description: description,
        notes: notes,
    };

    try {
        const response = await axios.post(APIConstants.APPLICATIONS, payload, { headers });

        if (!response.data) {
            const errorMessage = response.data.error || "Failed to add application.";
            console.log("Error:", errorMessage);
            return { error: errorMessage };
            // return { error: `Failed to add application. ${response.statusText}` };
        }

        toast.update(toastId, {
            render: 'Application uploaded successfully',
            type: 'success',
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
            transition: Bounce,
        });

        return { success: "Application added successfully!" };
    }
    catch (error) {
        const errorMessage = (error as AxiosError).response.data.error || "Failed to fetch applications.";

        console.error(errorMessage);
        return { error: errorMessage };
    }

}

export async function handleApplicationSubmit({ request }: { request: Request }): Promise<{ error?: string; success?: string }> {
    // Clone the request to read the body
    const requestPassOn = request.clone(); 

    // TODO: Implement this function with checking for the request method (POST, PUT, DELETE)

    // Checking what the intent of the form submission was
    const formData = await request.formData();
    const intent = formData.get("intent") as string;

    // Call the appropriate function based on the intent
    if ( intent == "delete") {
        return handleDeleteApplication({ request: requestPassOn });
    }

    return handleUpdateApplication({ request: requestPassOn });
}

export async function handleUpdateApplication({ request }: { request: Request }): Promise<{ error?: string; success?: string }> {
    const toastId = toast.loading('Updating application...');

    // Extract all the form fields from the request
    const formData = await request.formData();

    // Extract form fields from formData
    const applicationId = formData.get("id") as string;
    const job = formData.get("job");
    const company = formData.get("company");
    const status = formData.get("status");
    const date = parseDateString(formData.get("date") as string);
    const url = formData.get("url");
    const description = formData.get("description");
    const notes = formData.get("notes");

    // Perform validation or API request
    if (!job || !company) {
        toast.update(toastId, {
            render: 'Job title and company name required ',
            type: 'info',
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
            transition: Bounce,
        });

        return { error: "All fields are required." };
    }

    const payload = {
        job_title: job,
        company_name: company,
        status: status,
        application_date: date,
        application_url: url,
        description: description,
        notes: notes,
    };

    try {
        const response = await axios.put(APIConstants.APPLICATION(applicationId), payload, { headers });

        if (!response.data) {
            const errorMessage = response.data.error || "Failed to update application.";
            console.log("Error:", errorMessage);
            return { error: errorMessage };
        }

        toast.update(toastId, {
            render: 'Application updated successfully',
            type: 'success',
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
            transition: Bounce,
        });

        return { success: "Application updated successfully!" };
    }
    catch (error) {
        const errorMessage = (error as AxiosError).response.data.error || "Failed to update application.";

        toast.update(toastId, {
            render: errorMessage,
            type: 'error',
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
            transition: Bounce,
        });

        console.error(errorMessage);
        return { error: errorMessage };
    }
}

export async function handleProfile({ request }: { request: Request }): Promise<{ error?: string; success?: string }> {

    console.log("test");

    // OPTIONAL: Extract the userId from the session storage
    const userId = sessionStorage.getItem('userId') as string;
    
    // Get the form data from the request
    const formData = await request.formData();

    // Extract the fields from the form data
    const job_title = formData.get('job_title-name-${index}');
    const company_name = formData.get('company_name');
    const is_current_job = formData.get('is_current_job ');
    const start_date = formData.get('start_data');
    const end_date = formData.get('end_data');
    const description = formData.get('description');

    // OPTIONAL: Implement parameter validation here
    if (!job_title || !company_name || !is_current_job || !start_date || !end_date || !description ) {
        return json({ error: 'Invalid parameters' }, { status: 400 });
    }

    // Construct the payload to be sent to the backend
    const payload = {
        user_id: userId,    // OPTIONAL: Include only if userId is required
        job_title,
        company_name,
        is_current_job,
        start_date,
        end_date,
        description
    };


    try { 
        // Query the backend api via the path defined in APIConstants 
        const response = await axios.post(APIConstants.EXPERIENCE(userId), payload, { headers });

        // Handle any errors here ...
        if (!response.data) {
            return json({ error: 'Failed to update profile' }, { status: 500 });
        }

        // Implement a toast notification here ...
        if (!job_title || !company_name) {
            toast.info('Job title and company name required ', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
                transition: Bounce,
            });
            return { error: "All fields are required." };
        }

        // Return the data to the component
        return json(response.data);
    } catch (error) {
        // Extracting the error message from the database
        const errorMessage = (error as AxiosError).response.data.error || "Failed to create application";

        // Handle any errors here ...
        return json({ error: errorMessage }, { status: 500 });
    }
}


export async function handleDeleteApplication({ request }: { request: Request }): Promise<{ error?: string; success?: string }> {
    const toastId = toast.loading('Deleting application...');

    // Extract all the form fields from the request
    const formData = await request.formData();

    // Extract form fields from formData
    const applicationId = formData.get("id") as string;

    try {
        const response = await axios.delete(APIConstants.APPLICATION(applicationId), { headers });

        if (!response.data) {
            const errorMessage = response.data.error || "Failed to delete application.";
            console.log("Error:", errorMessage);
            return { error: errorMessage };
        }

        toast.update(toastId, {
            render: 'Application deleted successfully',
            type: 'success',
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
            transition: Bounce,
        });

        return { success: "Application deleted successfully!" };
    }
    catch (error) {
        const errorMessage = (error as AxiosError).response.data.error || "Failed to delete application.";

        toast.update(toastId, {
            render: errorMessage,
            type: 'error',
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
            transition: Bounce,
        });

        console.error(errorMessage);
        return { error: errorMessage };
    }
} 