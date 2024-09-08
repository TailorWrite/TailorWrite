import { ClockIcon } from '@heroicons/react/24/outline';
import { Timeline, TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem } from '@material-tailwind/react';
import React from 'react';
import { formatDate } from '../utils';

const DashboardHome: React.FC = () => {

    return (
        <div className="grid grid-cols-3 gap-4 pr-2">
            <div className="col-span-2 flex flex-col gap-y-2 max-w-[85rem] px-4 py-2 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-800"> Hey James </h1>
                <p className="text-gray-400" >
                    Welcome to your dashboard. Here are some stats on your job search...
                </p>

            </div>

            <div className="row-span-2">
                <div className="flex flex-col h-full bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        Card title
                    </h3>
                    <p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-neutral-500">
                        Card subtitle
                    </p>
                    <p className="mt-2 text-gray-500 dark:text-neutral-400">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600" href="#">
                        Card link
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </a>
                </div>
            </div>

            <div className="col-span-2 max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ">
                    {/* Card */}
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                        <div className="p-4 md:p-5">
                            <div className="flex items-center gap-x-2">
                                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                    Total users
                                </p>
                                <div className="hs-tooltip">
                                    <div className="hs-tooltip-toggle">
                                        <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                            <path d="M12 17h.01" />
                                        </svg>
                                        <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700" role="tooltip">
                                            The number of daily users
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-1 flex items-center gap-x-2">
                                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                    72,540
                                </h3>
                                <span className="flex items-center gap-x-1 text-green-600">
                                    <svg className="inline-block size-4 self-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                                        <polyline points="16 7 22 7 22 13" />
                                    </svg>
                                    <span className="inline-block text-sm">
                                        1.7%
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* End Card */}

                    {/* Card */}
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                        <div className="p-4 md:p-5">
                            <div className="flex items-center gap-x-2">
                                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                    Sessions
                                </p>
                            </div>

                            <div className="mt-1 flex items-center gap-x-2">
                                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                    29.4%
                                </h3>
                            </div>
                        </div>
                    </div>
                    {/* End Card */}

                    {/* Card */}
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                        <div className="p-4 md:p-5">
                            <div className="flex items-center gap-x-2">
                                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                    Avg. Click Rate
                                </p>
                            </div>

                            <div className="mt-1 flex items-center gap-x-2">
                                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                    56.8%
                                </h3>
                                <span className="flex items-center gap-x-1 text-red-600">
                                    <svg className="inline-block size-4 self-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                                        <polyline points="16 17 22 17 22 11" />
                                    </svg>
                                    <span className="inline-block text-sm">
                                        1.7%
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* End Card */}

                    {/* Card */}
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                        <div className="p-4 md:p-5">
                            <div className="flex items-center gap-x-2">
                                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                    Pageviews
                                </p>
                            </div>

                            <div className="mt-1 flex items-center gap-x-2">
                                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                    92,913
                                </h3>
                            </div>
                        </div>
                    </div>
                    {/* End Card */}
                </div>
                {/* End Grid */}
            </div>


        </div>
    );
};

export default DashboardHome;