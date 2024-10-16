import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ApplicationData } from '../types';
import { APIConstants } from '../pathConstants';
import axios from 'axios';
import { headers } from '../api';


export default function ArchivePage() {
    // Load the hardcoded data from the loader
    const loaderData: ApplicationData[] = useLoaderData() as ApplicationData[];
    console.log("loaderData:", loaderData)

    // Manage the data with useState
    const [data, ] = useState<ApplicationData[]>(loaderData);
    debugger; 

    const handleDownloadCoverLetter = (application_id: string) => {
        const toastId = toast.loading(`Downloading cover letter ${application_id}...`);

        const cover_letter_content = "This is a cover letter content";

        const payload = {
            user_id: sessionStorage.getItem('user_id'),
            content: cover_letter_content,
        }

        try { 
            const response = axios.post(APIConstants.COVER_LETTER_PDF(application_id), { application_id: application_id }, { headers: headers(), responseType: 'blob' });
        }
        catch (error) {
            console.error('Error fetching PDF:', error)
            toast.update(toastId, {
                render: `Error generating cover letter: ${error}`,
                type: 'error',
                isLoading: false,
                autoClose: 5000,
            });
        }

        // Implement the download logic here

        // Remove the toast after 3 seconds
        setTimeout(() => {
            toast.dismiss(toastId);
        }, 3000);
    }

    // Render the archive table
    return (
        <div className="archive-table">
                <div className="col-span-2 flex flex-col gap-y-2 max-w-[85rem] px-4 py-2 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-800"> Archived Applications </h1>
                    <h2>All previous cover letters are stored here</h2>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                        <thead className="bg-gray-50 dark:bg-neutral-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Download</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-neutral-800 dark:divide-neutral-700">
                            {
                                data.map(({ id, job_title, company_name, application_date, status }) => (
                                    <tr key={id}> {/* Use id directly since it is already destructured */}
                                        <td className="px-6 py-4 whitespace-nowrap">{id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{job_title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{company_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{application_date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p 
                                                className="font-bold text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
                                                onClick={() => handleDownloadCoverLetter(id)}  // Handle button click for each row
                                            >
                                                Download
                                            </p>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
        </div>
    );
}
