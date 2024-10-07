import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '../components/icons';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Prevent default form submission
    
        const payload = {
            email: email,
            password: password
        };
    
        try {
            // Send login request
            const response = await fetch('http://localhost:5001/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            console.log('Login Response:', result);
    
            // Save tokens and user ID in sessionStorage
            if (result.basic_auth_token) {
                sessionStorage.setItem('basic_auth_token', result.basic_auth_token);
            }
            if (result.user_id) {
                sessionStorage.setItem('user_id', result.user_id);
    
                // Fetch user information
                const userResponse = await fetch(`http://localhost:5001/users/${result.user_id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Basic ${result.basic_auth_token}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user information');
                }
    
                const userData = await userResponse.json();
                console.log('User Data:', userData);
    
                // Store user information in sessionStorage
                if (userData.first_name) {
                    sessionStorage.setItem('first_name', userData.first_name);
                }
                if (userData.last_name) {
                    sessionStorage.setItem('last_name', userData.last_name);
                }
                if (userData.email) {
                    sessionStorage.setItem('email', userData.email);
                }
    
                window.location.href = '/dashboard/applications';
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    

    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-gray-900">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Logo className="mx-auto h-10 w-auto" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" onSubmit={signIn} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                        Not a member?{' '}
                        <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                            Create an account now!
                        </Link>
                    </p>
                </div>
            </div>

        </>
    )
}