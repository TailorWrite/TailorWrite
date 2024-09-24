

const PathConstants = {
    BASENAME: '/',
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    
    DASHBOARD: '/dashboard',
    APPLICATIONS: '/dashboard/applications',
    NEW_APPLICATION: '/dashboard/applications/new',
    APPLICATION: '/dashboard/applications/:uuid',
    GENERATE: '/dashboard/generate',
    ARCHIVE: '/dashboard/archive',

    SETTINGS: '/dashboard/settings',
    PROFILE: '/dashboard/settings/profile',
    SETTINGS_DATA: '/dashboard/settings/data',
}

const API_BASE_URL = 'http://localhost:5001';
const APIConstants = {
    BASE_URL: API_BASE_URL,
    APPLICATIONS: `${API_BASE_URL}/applications`,
    APPLICATION: (uuid: string) => `${API_BASE_URL}/applications/${uuid}`,
    ALL_APPLICATIONS: (user_id: string) => `${API_BASE_URL}/applications/user/${user_id}`,
    USERS: `${API_BASE_URL}/users`,
}

export default PathConstants;
export { API_BASE_URL, APIConstants };