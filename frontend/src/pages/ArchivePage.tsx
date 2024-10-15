import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ApplicationData } from '../types';



export default function ArchivePage() {
    // Load the hardcoded data from the loader
    const loaderData: ApplicationData[] = useLoaderData() as ApplicationData[];
    console.log("loaderData:", loaderData)

    // Manage the data with useState
    const [data, setData] = useState<ApplicationData[]>(loaderData);

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
                                data.map(({ id, job_title, company_name, application_date, status }, index) => (
                                    <tr key={id}> {/* Use id directly since it is already destructured */}
                                        <td className="px-6 py-4 whitespace-nowrap">{id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{job_title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{company_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{application_date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => handleButtonClick(id)}  // Handle button click for each row
                                            >
                                            </button>
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
