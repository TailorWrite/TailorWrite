import { Cog6ToothIcon, CubeTransparentIcon, FolderOpenIcon, PowerIcon, PresentationChartBarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import DashboardNav from '../components/DashboardNav';
import PathConstants from './pathConstants';
import { useState } from 'react';

export default function NewDashboardRouter() {

    const navigation = [
        { name: 'Dashboard', route: PathConstants.DASHBOARD, current: true, icon: <PresentationChartBarIcon className="h-5 w-5" /> },
        { name: 'Generate Cover Letter', route: PathConstants.GENERATE, current: false, icon: <CubeTransparentIcon className="h-5 w-5" /> },
        { name: 'Archive', route: PathConstants.ARCHIVE, current: false, icon: <FolderOpenIcon className="h-5 w-5" /> },
    ]
    const userNavigation = [
        { name: 'Your Profile', route: PathConstants.PROFILE, current: false, icon: <UserCircleIcon className="h-5 w-5" /> },
        { name: 'Settings', route: PathConstants.SETTINGS, current: false, icon: <Cog6ToothIcon className="h-5 w-5" /> },
        { name: 'Sign out', route: '#', current: false, icon: <PowerIcon className="h-5 w-5" /> },
    ]

    const [title, setTitle] = useState("");

    return (
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
            <DashboardNav />

            <Sidebar title={title} navigation={navigation} userNavigation={userNavigation} />            

            <main className="md:ml-80 h-screen pt-20 p-5 bg-white dark:bg-gray-800">
                <Outlet context={{ setTitle }} />
            </main>
        </div>
    )
}