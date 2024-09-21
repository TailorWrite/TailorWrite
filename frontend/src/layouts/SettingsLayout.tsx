import { Link, Outlet, useLocation } from 'react-router-dom'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

import PathConstants from '../pathConstants'



const SettingsLayout = () => {
    return (
        <div className="flex flex-col gap-10 h-full px-10 ">
            <SettingsHeader />
            <Outlet />
        </div>
    )
}

export default SettingsLayout


const Navigation = [
    { title: "General", icon: Cog6ToothIcon, link: PathConstants.SETTINGS },
    { title: "Profile", icon: Cog6ToothIcon, link: PathConstants.PROFILE },
    // { title: "Security", icon: Cog6ToothIcon, link: PathConstants.SETTINGS_SECURITY },
    // { title: "Notifications", icon: Cog6ToothIcon, link: PathConstants.SETTINGS_NOTIFICATIONS },
    // { title: "Billing", icon: Cog6ToothIcon, link: PathConstants.SETTINGS_BILLING },
    // { title: "Integrations", icon: Cog6ToothIcon, link: PathConstants.SETTINGS_INTEGRATIONS },
    // { title: "API", icon: Cog6ToothIcon, link: PathConstants.SETTINGS_API },
    // { title: "Advanced", icon: Cog6ToothIcon, link: PathConstants.SETTINGS_ADVANCED },
    // { title: "About", icon: Cog6ToothIcon, link: PathConstants.SETTINGS_ABOUT },
    // { title: "Support", icon: Cog6ToothIcon, link: PathConstants.SETTINGS_SUPPORT },
]

const SettingsHeader = () => {
    // Check the location and highlight the active tab
    const location = useLocation()
    const currentPath = location.pathname


    return (
        <div className=" flex flex-col gap-1 border-b border-gray-200 dark:border-neutral-700">
            <h3 className="text-2xl font-bold dark:text-white">Settings</h3>
            <nav className="mx-auto -mt-12 flex gap-x-3" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
                {
                    Navigation.map((item) => (
                        <Link key={item.title} to={item.link}>
                            <button 
                                type="button" 

                                className={clsx(
                                    "py-4 px-1 inline-flex items-center gap-x-1 text-sm whitespace-nowrap hover:text-blue-600 focus:outline-none", 
                                    "focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500",
                                    // Highlight the active tab
                                    currentPath === item.link ? "font-semibold text-blue-600" : "text-gray-500"

                                )}

                                // className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-1 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500" 
                            >
                                {item.title}
                            </button>
                        </Link>
                    ))
                }
            </nav>
        </div>
    )
}
