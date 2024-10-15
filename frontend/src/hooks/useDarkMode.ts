import { useEffect, useState } from 'react';

export function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check if the user has dark mode enabled in their OS
    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeMediaQuery.matches);      // Set the initial value

        // Listen for changes in the OS dark mode preference
        const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        darkModeMediaQuery.addEventListener('change', handleChange);

        // Clean up
        return () => darkModeMediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Adding or removing the dark class to the html element
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Return the state and the setter
    return [isDarkMode, setIsDarkMode] as const;
}
