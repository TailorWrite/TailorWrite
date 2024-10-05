/**
 * This file contains react-router action functions that are used when the user 
 * submits a form within the application. These functions are called within main.tsx
 * @see frontend/src/main.tsx
 * @reference https://reactrouter.com/en/main/route/action
*/

import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { redirect } from "react-router-dom";

import { parseDateString } from "./utils";
import { AxiosError } from "./types";
import { headers } from "./api";
import { APIConstants } from "./pathConstants";

const toastSettings = {
    isLoading: false,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    transition: Bounce,
};

interface ActionProps {
    request: Request;
}

type ActionReturn = Promise<{ error?: string; success?: string }>;

export async function handleLogin({ request }: { request: Request }) {
    const toastId = toast.loading('Logging in...');

    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        toast.update(toastId, {
            render: 'Email and password required ',
            type: 'info',
            ...toastSettings,
        });

        return { error: "All fields are required." };
    }
    
    const payload = {
        email: email,
        password: password
    };

    try {
        const response = await axios.post(APIConstants.LOGIN, payload);

        if (!response.data) {
            const errorMessage = response.data.error || "Failed to login.";
            console.log("Error:", errorMessage);
            return { error: errorMessage };
        }

        const basicAuth = response.data.basic_auth_token;
        const userId = response.data.user_id;

        if (!basicAuth || !userId) return { error: "Failed to login." };

        sessionStorage.setItem('basic_auth_token', basicAuth);
        sessionStorage.setItem('user_id', userId);

        setUserInformation();


        toast.update(toastId, {
            render: 'Login successful',
            type: 'success',
            ...toastSettings,
        });

        
        return redirect("/dashboard/applications");
    }

    catch (error) {
        const errorMessage = (error as AxiosError).response.data.error || "Failed to login.";

        toast.update(toastId, {
            render: errorMessage,
            type: 'error',
            ...toastSettings,
        });

        return { error: errorMessage };
    }
}


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

        return redirect("/dashboard/applications");
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

    // Checking what the intent of the form submission was
    const formData = await request.formData();
    const intent = formData.get("intent") as string;
    
    // Call the appropriate function based on the intent
    switch (intent) {
        case "add":
            return handleAddApplication({ request: requestPassOn });
        case "update":
            return handleUpdateApplication({ request: requestPassOn });
        case "delete":
            return handleDeleteApplication({ request: requestPassOn });
        case "upload-document": 
            console.log("Uploading document...");
            return handleUploadApplicationDocument({ request: requestPassOn });
        default:
            return handleUpdateApplication({ request: requestPassOn });
    }

    // if ( intent == "delete") {
    //     return handleDeleteApplication({ request: requestPassOn });
    // }

    // return handleUpdateApplication({ request: requestPassOn });
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

export async function handleUploadApplicationDocument({ request }: ActionProps): ActionReturn {
    const toastId = toast.loading('Uploading document...');
    // const userId = sessionStorage.getItem("user_id");

    const formData = await request.formData();

    // Extract form fields from formData
    const document = formData.get("document");
    const size = formData.get("size");
    const applicationId = formData.get("application_id") as string;

    // Perform validation or API request
    if (!document) {
        toast.update(toastId, {
            render: 'Document required ',
            type: 'info',
            ...toastSettings,
        });

        return { error: "All fields are required." };
    }

    const payload = {
        document: document,
        size: size
    };

    console.log("Payload:", payload);

    try {
        const response = await axios.post(
            APIConstants.DOCUMENTS(applicationId), 
            payload, 
            { 
                headers: {
                    'Authorization': `Basic ${sessionStorage.getItem('basic_auth_token')}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
        );

        if (!response.data) {
            const errorMessage = response.data.error || "Failed to upload document.";
            console.log("Error:", errorMessage);
            return { error: errorMessage };
        }

        toast.update(toastId, {
            render: 'Document uploaded successfully',
            type: 'success',
            ...toastSettings,
        });

        return { success: "Document uploaded successfully!" };
    }
    catch (error) {
        // const errorMessage = (error as AxiosError).response.data.error ?? "Failed to upload document.";

        toast.update(toastId, {
            render: 'Failed to upload document',
            type: 'error',
            ...toastSettings,
        });
        return { error: "Failed to upload document" };
    }

}

export async function setUserInformation() {
    const userId = sessionStorage.getItem("user_id");
    const basicAuth = sessionStorage.getItem("basic_auth_token");

    if (!userId || !basicAuth) return;

    try {
        const userResponse = await axios.get(APIConstants.USER(userId), {
            headers: {
                'Authorization': `Basic ${basicAuth}`,
                'Content-Type': 'application/json'
            }
        });

        if (!userResponse.data) {
            throw new Error('Failed to fetch user information');
        }

        const userData = userResponse.data;
        

        sessionStorage.setItem('first_name', userData.first_name);
        sessionStorage.setItem('last_name', userData.last_name);
        sessionStorage.setItem('email', userData.email);

    }
    catch (error) {
        console.error('Failed to fetch user information');
    }
}