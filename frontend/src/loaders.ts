/**
 * This file contains react-router loader functions that are used when a component
 * is loaded via a route. These functions are called within main.tsx
 * @see frontend/src/main.tsx
 * @reference https://reactrouter.com/en/main/route/loader
*/

import axios from "axios";
import { defer, json, LoaderFunctionArgs } from "react-router-dom";

// import { fetchApplicationData } from "./api";
import { APIConstants } from "./pathConstants";
import { AxiosError } from "./types";
import { headers } from "./api";



export async function applicationLoader({ params }: LoaderFunctionArgs) {
    const { uuid } = params;

    if (!uuid) return defer({ application: Promise.resolve([]) });

    const fetchApplication = async () => {
        try {
            const response = await axios.get(APIConstants.APPLICATION(uuid), { headers: headers() });

            if (!response.data) {
                throw new Error(`Failed to fetch application with id = ${uuid}`);
            }
            
            return response.data[0];
        }
        catch (error) {
            const errorMessage = (error as AxiosError).response?.data?.error || "Failed to fetch application.";
            console.error(errorMessage);
            throw error;
        }
    };

    return defer({ application: fetchApplication() });
}

export async function allApplicationLoader() {
    const user_id = sessionStorage.getItem('user_id') ?? 'no-id';
    
    try {
        const response = await axios.get(APIConstants.ALL_APPLICATIONS(user_id), { headers: headers() });

        if (!response.data) {
            return json({ error: "Failed to fetch applications." });
        }

        return json(response.data);
    }
    catch (error) {
        const errorMessage = (error as AxiosError).response.data.error || "Failed to fetch applications.";

        console.error(errorMessage);
        return json([]);
    }
}

export async function archiveLoader() {
    const user_id = sessionStorage.getItem('user_id') ?? 'no-id'; 

    try {
        const response = await axios.get(APIConstants.ALL_COVER_LETTERS(user_id), { headers: headers() });
        if (!response.data) {
            return json({ error: "Failed to fetch applications." });
        }

        return json(response.data);
    }
    catch (error) {
        const errorMessage = (error as AxiosError).response.data.error || "Failed to fetch applications.";

        console.error(errorMessage);
        return json([]);
    }
}

export async function profileLoader() {
    // OPTIONAL: Extract the params from the URL 
    const uuid = sessionStorage.user_id;

    // OPTIONAL: Implement parameter validation here 
    if (!uuid) {
        return json({ error: 'Invalid parameters' }, { status: 400 });
    }

    try { 

        const data = new Map<string, any>();
        
        // Query the backend api via the path defined in APIConstants 
        try {
            const response = await axios.get(APIConstants.SKILLS(uuid), { headers: headers() });
            // Handle any errors here ...
            if (!response.data) {
                return json({ error: 'No data found' }, { status: 404 });
            }
            data.set("skills", response.data);
        } catch {}

        try {
            // Query the backend api via the path defined in APIConstants 
            const response2 = await axios.get(APIConstants.EDUCATION(uuid), { headers: headers() });
    
            // Handle any errors here ...
            if (!response2.data) {
                return json({ error: 'No data found' }, { status: 404 });
            }
            data.set("education", response2.data);
        } catch {}

        try {
            // Query the backend api via the path defined in APIConstants 
            const response3 = await axios.get(APIConstants.EXPERIENCE(uuid), { headers: headers() });
    
            // Handle any errors here ...
            if (!response3.data) {
                return json({ error: 'No data found' }, { status: 404 });
            }
            data.set("experience", response3.data);
        } catch {}


        try {
            // Query the backend api via the path defined in APIConstants 
            const response4 = await axios.get(APIConstants.USER(uuid), { headers: headers() });
    
            // Handle any errors here ...
            if (!response4.data) {
                return json({ error: 'No data found' }, { status: 404 });
            }
            data.set("user", response4.data);   
        } catch {}

        // Return the data to the component
        return data;
    } catch (error) {
        // Extracting the error message from the database
        const errorMessage = (error as AxiosError).response.data.error || "Failed to <do_operation>";

        // Handle any errors here ...
        return json({ error: errorMessage }, { status: 500 });
    }


};