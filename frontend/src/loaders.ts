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

    if (!uuid) return json({});

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
        return json({ error: errorMessage });
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
        return json({ error: errorMessage });
    }
}
