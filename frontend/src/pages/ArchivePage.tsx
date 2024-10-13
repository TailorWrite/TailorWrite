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
            <h2>Archived Applications</h2>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead className="bg-gray-50 dark:bg-neutral-900">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-neutral-800 dark:divide-neutral-700">
                    {/* Loop over the data array */}
                    <tr key={data[0].id}> {/* Use data.id since it's a single object */}
                        <td className="px-6 py-4 whitespace-nowrap">{data[0].id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{data[0].job_title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{data[0].company_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{data[0].application_date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{data[0].status}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
