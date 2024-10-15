// Headers is an arrow function because of an issue occurring we leading applications
// after logging in. headers as a const left the auth token null until the page refreshed
// Thus now we are querying the auth key every time headers are required
export const headers = () => ({
    'Authorization': `Basic ${sessionStorage.getItem('basic_auth_token')}`,
    'Content-Type': 'application/json'
});