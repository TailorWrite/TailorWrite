export { fetchApplicationData as fetchApplicationData } from './queries';

export const headers = {
    'Authorization': `Basic ${sessionStorage.getItem('basic_auth_token')}`,
    'Content-Type': 'application/json'
};