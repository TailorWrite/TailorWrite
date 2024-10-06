
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

const API_BASE_URL = "http://localhost:5001";
console.log('API_BASE_URL:', API_BASE_URL);
const APIConstants = {
    BASE_URL: API_BASE_URL,

    // Auth routes
    LOGIN: `${API_BASE_URL}/users/login`,
    REGISTER: `${API_BASE_URL}/users`,

    // User routes
    USER: (uuid: string) => `${API_BASE_URL}/users/${uuid}`,

    APPLICATIONS: `${API_BASE_URL}/applications`,
    APPLICATION: (application_id: string) => `${API_BASE_URL}/applications/${application_id}`,
    ALL_APPLICATIONS: (user_id: string) => `${API_BASE_URL}/applications/user/${user_id}`,
    DOCUMENTS: (application_id: string) => `${API_BASE_URL}/applications/${application_id}/documents`,
    COVER_LETTER_GENERATE: `${API_BASE_URL}/cover-letter/generate`,

    APPLICATIONS_SCRAPE: `${API_BASE_URL}/applications/scrape`,
}

export default PathConstants;
export { API_BASE_URL, APIConstants };