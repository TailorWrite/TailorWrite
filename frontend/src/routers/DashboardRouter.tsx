import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Cog6ToothIcon, CubeTransparentIcon, FolderOpenIcon, PowerIcon, PresentationChartBarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Bounce, ToastContainer } from 'react-toastify';

import PathConstants from '../pathConstants';

import Sidebar from '../components/dashboard/Sidebar';
import DashboardNav from '../components/dashboard/DashboardNav';

export default function DashboardRouter() {
    const navigation = [
        { name: 'Dashboard', route: PathConstants.DASHBOARD, current: true, icon: <PresentationChartBarIcon className="h-5 w-5" /> },
        { name: 'Applications', route: PathConstants.APPLICATIONS, current: false, icon: <PresentationChartBarIcon className="h-5 w-5" /> },
        { name: 'Generate Cover Letter', route: PathConstants.GENERATE, current: false, icon: <CubeTransparentIcon className="h-5 w-5" /> },
        { name: 'Archive', route: PathConstants.ARCHIVE, current: false, icon: <FolderOpenIcon className="h-5 w-5" /> },
    ];
    const userNavigation = [
        { name: 'Your Profile', route: PathConstants.PROFILE, current: false, icon: <UserCircleIcon className="h-5 w-5" /> },
        { name: 'Settings', route: PathConstants.SETTINGS, current: false, icon: <Cog6ToothIcon className="h-5 w-5" /> },
        { name: 'Sign out', route: '#', current: false, icon: <PowerIcon className="h-5 w-5" /> },
    ];

    const [title, setTitle] = useState("");

    return (
        <div className="antialiased bg-gray-50 dark:bg-gray-950 h-screen">

            <Sidebar title={title} navigation={navigation} userNavigation={userNavigation} />

            <main className="md:ml-80 h-full pr-2 py-2 max-h-screen overflow-hidden dark:bg-gray-950">
                <div className="relative rounded-2xl border border-blue-gray-50 bg-white h-full flex flex-col overflow-hidden">
                    <DashboardNav />

                    <div id="outlet-container" className="relative flex-1 overflow-auto no-scrollbar">
                        <Outlet context={{ setTitle }} />
                    </div>

                </div>
            </main>

            <ToastContainer
                stacked
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

        </div>
    );
}

