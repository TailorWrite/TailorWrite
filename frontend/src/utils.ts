
/**
 * Formats a date string in the format '2024-09-07' to '7th September 2024'.
 * @param dateString The date string to format
 * @returns The formatted date string
 */
export function formatDate(dateString: string | Date): string {
    const date = new Date(dateString);
    const days = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = date.getDate();
    const month = days[date.getMonth()];
    const year = date.getFullYear();

    // Determine the ordinal suffix
    function getOrdinalSuffix(day: number) {
        if (day >= 11 && day <= 13) return 'th'; // Special case for 11th, 12th, 13th
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    const suffix = getOrdinalSuffix(day);

    return `${day}${suffix} ${month} ${year}`;
}

/**
 * Parses a date string in the format '7th September 2024' and returns a Date object.
 * @param dateString The date string to parse
 * @returns The Date object representing the parsed date
 */
export function parseDateString(dateString: string): Date {
    // Define a regular expression to extract the day, month, and year
    const datePattern = /^(\d+)(?:st|nd|rd|th)? (\w+) (\d{4})$/;
    const match = dateString.match(datePattern);

    if (!match) {
        throw new Error("Invalid date format. Expected format: '7th September 2024'");
    }

    const [, day, monthName, year] = match;

    // Map month names to month numbers (0-based index for JavaScript Date)
    const monthNames: { [key: string]: number } = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11
    };

    const month = monthNames[monthName];
    if (month === undefined) {
        throw new Error(`Invalid month name: ${monthName}`);
    }

    // Create and return the Date object
    return new Date(parseInt(year, 10), month, parseInt(day, 10));
}


/**
 * Extracts the base URL from a given job application URL.
 * @param jobApplicationUrl The URL of the job application
 * @returns The base URL (domain) of the job application URL or null if the URL is invalid
 */
export function extractBaseUrl(jobApplicationUrl: string): string | null {
    try {
        // Create a URL object
        const url = new URL(jobApplicationUrl);
        
        // Extract the hostname (which contains the domain)
        let baseUrl: string = url.hostname;
        
        // Remove the 'www.' prefix if present
        baseUrl = baseUrl.replace(/^www\./, '');
        
        return baseUrl;
    } catch (error) {
        console.error('Invalid URL provided:', error);
        return null;
    }
}

/**
 * Generates a URL to fetch the logo of a given company.
 * @param company The name of the company
 * @returns The URL to fetch the company logo or null if the company name is invalid
 * 
 * @note This function uses the Clearbit Logo API to fetch the company logo and may not work for all companies.
 * or all company names. This API may also stop working in the future. Try https://www.logo.dev/dashboard for a free alternative.
 */
export function getCompanyLogoUrl(company: string): string | null{
    if (!company) return null;

    company = company.replace(/\s/g, '').toLowerCase();
    const companyLogoUrl = `https://logo.clearbit.com/${company}.com`;
    return companyLogoUrl;
}

export function appendHttpsToLink(link: string): string {
    if (!link) return '';
    if (!link.startsWith('http') && !link.startsWith('https')) {
        return `https://${link}`;
    }
    return link;
}

