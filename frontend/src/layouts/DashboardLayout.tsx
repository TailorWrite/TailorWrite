import { Outlet } from 'react-router-dom';
import { Cog6ToothIcon, FolderOpenIcon, PowerIcon, PresentationChartBarIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import PathConstants from '../pathConstants';

import Sidebar from '../components/dashboard/Sidebar';
import DashboardNav from '../components/dashboard/DashboardNav';

const logOut = () => {
    sessionStorage.clear();
    window.location.href = PathConstants.HOME;
};

export default function DashboardLayout() {
    const navigation = [
        { name: 'Dashboard', route: PathConstants.DASHBOARD, current: true, icon: <PresentationChartBarIcon className="h-5 w-5" /> },
        { name: 'Applications', route: PathConstants.APPLICATIONS, current: false, icon: <PresentationChartBarIcon className="h-5 w-5" /> },
        // { name: 'Generate Cover Letter', route: PathConstants.GENERATE, current: false, icon: <CubeTransparentIcon className="h-5 w-5" /> },
        { name: 'Archive', route: PathConstants.ARCHIVE, current: false, icon: <FolderOpenIcon className="h-5 w-5" /> },
    ];
    const userNavigation = [
        { name: 'Your Profile', route: PathConstants.PROFILE, current: false, icon: <UserCircleIcon className="h-5 w-5" /> },
        { name: 'Settings', route: PathConstants.SETTINGS, current: false, icon: <Cog6ToothIcon className="h-5 w-5" /> },
        { name: 'Sign out', route: PathConstants.HOME, current: false, icon: <PowerIcon className="h-5 w-5" />, onClick: logOut }, // Call logOut here
    ];

    return (
        <div className="antialiased bg-gray-50 dark:bg-primaryDark h-screen">

            <Sidebar navigation={navigation} userNavigation={userNavigation} />

            <div className="md:ml-80 h-full pr-2 py-2 max-h-screen overflow-hidden ">
                <main className="relative rounded-2xl h-full flex flex-col overflow-hidden bg-white border border-lightBorder dark:border-darkBorder dark:bg-secondaryDark ">
                    <DashboardNav />

                    <div id="outlet-container" className="relative flex-1 overflow-auto no-scrollbar">
                        <Outlet />
                    </div>

                </main>
            </div>

        </div>
    );
}

