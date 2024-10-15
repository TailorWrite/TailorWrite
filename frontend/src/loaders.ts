/**
 * This file contains react-router loader functions that are used when a component
 * is loaded via a route. These functions are called within main.tsx
 * @see frontend/src/main.tsx
 * @reference https://reactrouter.com/en/main/route/loader
*/

import axios from "axios";
import { json, LoaderFunctionArgs } from "react-router-dom";

// import { fetchApplicationData } from "./api";
import { APIConstants } from "./pathConstants";
import { AxiosError } from "./types";
import { headers } from "./api";



export async function applicationLoader({ params }: LoaderFunctionArgs) {
    const { uuid } = params;

    if (!uuid) return json([]);

    try {
        const response = await axios.get(APIConstants.APPLICATION(uuid), { headers });

        if (!response.data) {
            return json({ error: `Failed to fetch application with id = ${uuid}` });
        }

        return json(response.data);
    }
    catch (error) {
        const errorMessage = (error as AxiosError).response.data.error || "Failed to fetch application.";

        console.error(errorMessage);
        return json([]);
    }
}

export async function allApplicationLoader() {
    const user_id = sessionStorage.getItem('user_id') ?? 'no-id';

    try { 
        const response = await axios.get(APIConstants.ALL_APPLICATIONS(user_id), { headers });

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

export async function archiveLoader({ params }: LoaderFunctionArgs) {

    try { 
        const response = {
            data: [{
            id : "1234",
            job_title : "Software Developer",
            company_name : "Spotify",
            application_date : "25 Dec, 12:01pm",
            status : "Applied"
        },
        {
            id : "1234",
            job_title : "Software Developer",
            company_name : "Spotify",
            application_date : "25 Dec, 12:01pm",
            status : "Applied"
        },
        {
            id : "1234",
            job_title : "Software Developer",
            company_name : "Spotify",
            application_date : "25 Dec, 12:01pm",
            status : "Applied"
        }]}

        if (!response.data) {
            return json({ error: 'No data found' }, { status: 404 });
        }

        console.log("archiveLoader:", response)
        return json(response.data);
    } catch (error) {
        const errorMessage = (error as AxiosError).response.data.error || "Failed to <do_operation>";

        return json({ error: "Error" }, { status: 500 });
    }
}
