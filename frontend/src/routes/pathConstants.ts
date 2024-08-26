const APIBasePath = 'http://localhost:5000';

const PathConstants = {
    BASENAME: '/info301/TailorWrite/TailorWrite/pages/',
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    DASHBOARD: '/dashboard',
    GENERATE: '/dashboard/generate',
    ARCHIVE: '/dashboard/archive',
    PROFILE: '/dashboard/profile',
    SETTINGS: '/dashboard/settings',
    API: {
        USERS: APIBasePath + '/users',
    }
}

export default PathConstants;