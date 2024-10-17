import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

import { ApplicationData } from '../types';
import { APIConstants } from '../pathConstants';
import axios from 'axios';
import { headers } from '../api';

interface ArchiveData {
    application_id: string,
    content: string,
    created_at: string,
    id: Number,
    job_applications: ApplicationData,
    updated_at: string
}


export default function ArchivePage() {
    // Load the hardcoded data from the loader
    const loaderData = useLoaderData() as ArchiveData[];

    // Manage the data with useState
    const [data,] = useState<ArchiveData[]>(loaderData);

    const handleDownloadCoverLetter = async (job_title: string, application_id: string, content: string) => {
        const toastId = toast.loading(`Downloading cover letter ${application_id}...`);


        const payload = {
            user_id: sessionStorage.getItem('user_id'),
            content: content,
        }

        try {
            const response = await axios.post(APIConstants.COVER_LETTER_PDF(application_id), payload, { headers: headers(), responseType: 'blob' }).then(response => response.data)
                .then(blob => {
                    const file = new Blob([blob], { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    toast.update(toastId, {
                        render: 'Cover letter downloaded successfully',
                        type: 'success',
                        isLoading: false,
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        theme: "light",
                        transition: Bounce,
                    });
                    const anchor = document.createElement('a');
                    anchor.href = fileURL;
                    
                    // Set the file name for the download
                    const fileTitle = job_title.replaceAll(" ", "");
                    anchor.download = `${fileTitle}_cover-letter.pdf`;
                
                    // Append the anchor to the body
                    document.body.appendChild(anchor);
                
                    // Programmatically click the anchor to trigger the download
                    anchor.click();
                    // Remove the anchor from the DOM
                    document.body.removeChild(anchor);
                })
                
                    return response
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
                                data.map(({ application_id, content, job_applications }) => (
                                    <tr key={application_id}> {/* Use id directly since it is already destructured */}
                                        <td className="px-6 py-4 whitespace-nowrap">{application_id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{job_applications.job_title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{job_applications.company_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{job_applications.application_date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{job_applications.status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p
                                                className="font-bold text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
                                                onClick={() => handleDownloadCoverLetter(job_applications.job_title, application_id, content)}  // Handle button click for each row
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
