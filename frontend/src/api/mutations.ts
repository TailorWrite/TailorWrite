import axios from 'axios';

import { APIConstants } from '../pathConstants';
import { headers } from '.';

export async function handleDeleteApplication(id: string) {
    try {
        const response = await axios.delete(APIConstants.APPLICATION(id), { headers });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}