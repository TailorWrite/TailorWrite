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
    if (intent == "delete") {
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
    // OPTIONAL: Extract the userId from the session storage
    const userId = sessionStorage.getItem('user_id') as string;

    // Get the form data from the request
    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData);

    // Helper function to make an API request
    async function makeAPIRequest(url: string, method: 'POST' | 'PUT', data: any) {
        const response = await fetch(url, {
            method,
            headers: headers,
            body: JSON.stringify(data),
        });
        return response.json();
    }

    // Update user profile (first name, last name, and email)
    const userProfile = {
        first_name: formEntries['first-name'],
        last_name: formEntries['last-name']
    };

    if (userId) {
        // Update existing user profile
        await makeAPIRequest(APIConstants.USER(userId), 'PUT', userProfile);
    } else {
        // Handle case if the user ID is not found or needs to be created
        // Optionally, you could throw an error or handle profile creation here
        return { error: "User ID not found. Cannot update profile." };
    }


    // Process experiences
    let i = 0;
    while (formEntries[`experience-id-${i}`] || formEntries[`job_title-${i}`]) {
        const experience = {
            job_title: formEntries[`job_title-${i}`],
            company_name: formEntries[`company_name-${i}`],
            start_date: formEntries[`experience-start_date-${i}`],
            end_date: formEntries[`end_date-${i}`],
            description: formEntries[`experience-description-${i}`],
            is_current_job: formEntries[`is_current_job-${i}`] === 'on',
        };

        const experienceId = formEntries[`experience-id-${i}`];
        if (experienceId) {
            // Update existing experience
            await makeAPIRequest(APIConstants.EXPERIENCE_BY_ID(experienceId.toString()), 'PUT', experience);
        } else {
            // Create new experience
            const newExperience = { ...experience, user_id: userId };
            await makeAPIRequest(APIConstants.ADD_EXPERIENCE(), 'POST', newExperience);
        }
        i++;
    }

    // Process skills
    i = 0;
    while (formEntries[`skill_name-${i}`]) {
        const skill = {
            skill_name: formEntries[`skill_name-${i}`],
            proficiency_level: formEntries[`proficiency_level-${i}`],
        };

        const skillId = formEntries[`skill-id-${i}`];
        if (skillId) {
            // Update existing skill
            await makeAPIRequest(APIConstants.SKILLS_BY_ID(skillId.toString()), 'PUT', skill);
        } else {
            // Create new skill
            const newSkill = { ...skill, user_id: userId };
            await makeAPIRequest(APIConstants.ADD_SKILL(), 'POST', newSkill);
        }
        i++;
    }

    // Process education
    i = 0;
    while (formEntries[`institution_name-${i}`]) {
        const education = {
            institution_name: formEntries[`institution_name-${i}`],
            degree: formEntries[`degree-${i}`],
            field_of_study: formEntries[`field_of_study-${i}`],
            start_date: formEntries[`education_start_date-${i}`],
            end_date: formEntries[`education_end_date-${i}`],
            description: formEntries[`education_description_${i}`],
        };

        const educationId = formEntries[`education-id-${i}`];
        if (educationId) {
            // Update existing education
            await makeAPIRequest(APIConstants.EDUCATION_BY_ID(educationId.toString()), 'PUT', education);
        } else {
            // Create new education
            const newEducation = { ...education, user_id: userId };
            await makeAPIRequest(APIConstants.ADD_EDUCATION(), 'POST', newEducation);
        }
        i++;
    }

    return { success: "Profile successfully updated" };
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