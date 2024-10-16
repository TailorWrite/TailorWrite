
const PathConstants = {
    BASENAME: '/',
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/register',
    
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log('API_BASE_URL:', API_BASE_URL);
const APIConstants = {
    BASE_URL: API_BASE_URL,

    // Auth routes
    LOGIN: `${API_BASE_URL}/users/login`,
    REGISTER: `${API_BASE_URL}/users`,

    // User routes
    USER: (uuid: string) => `${API_BASE_URL}/users/${uuid}`,
    USER_COVER_LETTER: (uuid: string) => `${API_BASE_URL}/users/${uuid}/cover-letter`,

    APPLICATIONS: `${API_BASE_URL}/applications`,
    APPLICATION: (application_id: string) => `${API_BASE_URL}/applications/${application_id}`,
    ALL_APPLICATIONS: (user_id: string) => `${API_BASE_URL}/applications/user/${user_id}`,
    DOCUMENTS: (application_id: string) => `${API_BASE_URL}/applications/${application_id}/documents`,
    SKILLS: (uuid: string) => `${API_BASE_URL}/skills/user/${uuid}`,
    EDUCATION: (uuid: string) => `${API_BASE_URL}/educations/user/${uuid}`,
    EXPERIENCE: (uuid: string) => `${API_BASE_URL}/experiences/user/${uuid}`,
    SKILLS_BY_ID: (id: string) => `${API_BASE_URL}/skills/${id}`,
    EDUCATION_BY_ID: (id: string) => `${API_BASE_URL}/educations/${id}`,
    EXPERIENCE_BY_ID: (id: string) => `${API_BASE_URL}/experiences/${id}`,
    ADD_SKILL: () => `${API_BASE_URL}/skills`,
    ADD_EDUCATION: () => `${API_BASE_URL}/educations`,
    ADD_EXPERIENCE: () => `${API_BASE_URL}/experiences`,
    USERS: `${API_BASE_URL}/users`,
    COVER_LETTER_GENERATE: `${API_BASE_URL}/cover-letter/generate`,

    APPLICATIONS_SCRAPE: `${API_BASE_URL}/applications/scrape`,

    ALL_COVER_LETTERS: (user_id: string) => `${API_BASE_URL}/cover-letter/user/${user_id}`,


}

export default PathConstants;
export { API_BASE_URL, APIConstants };