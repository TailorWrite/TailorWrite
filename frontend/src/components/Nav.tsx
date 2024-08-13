import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Switch } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import Logo from './Logo';
import PathConstants from '../routes/pathConstants';
import SunIcon from './SunIcon';
import MoonIcon from './MoonIcon';

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: PathConstants.DASHBOARD },
]

export default function Nav() {
    const [darkMode, setDarkMode] = useState(true)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // 
    useEffect(() => {
        if (darkMode) {
            window.document.documentElement.classList.add('dark')
            // localStorage.theme = 'dark'
        } else {
            window.document.documentElement.classList.remove('dark')
            // localStorage.theme = 'light'
        }
    }, [darkMode])


    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link to={PathConstants.HOME} className="-m-1.5 p-1.5">
                        <span className="sr-only">TailorWrite</span>
                        <Logo className="h-8 w-auto" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:gap-4 lg:justify-end">
                    <Switch checked={darkMode} onChange={setDarkMode} className="group my-auto inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600 ">
                        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6">
                            
                            {
                                // Toggling between sun and moon icons within the toggle 
                                darkMode ? 
                                    <SunIcon className="size-4" /> : 
                                    <MoonIcon className="size-4" />
                            }
                        
                        </span>
                    </Switch>
                    <Link to={PathConstants.LOGIN} className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"> 
                        Log in <span aria-hidden="true">&rarr;</span> 
                    </Link>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900">
                    <div className="flex items-center justify-between">
                        <Link to={PathConstants.HOME} className="-m-1.5 p-1.5">
                            <span className="sr-only">TailorWrite</span>
                            <Logo className="h-8 w-auto" />
                        </Link>
                        <div className="flex     gap-2 grid-cols-2 justify-end">
                            <Switch checked={darkMode} onChange={setDarkMode} className="group my-auto inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600 ">
                                <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6">

                                    {
                                        // Toggling between sun and moon icons within the toggle 
                                        darkMode ?
                                            <SunIcon className="size-4" /> :
                                            <MoonIcon className="size-4" />
                                    }

                                </span>
                            </Switch>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white flex justify-end"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>

                        </div>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <Link 
                                    to={PathConstants.LOGIN}
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                                >
                                    Log in <span aria-hidden="true">&rarr;</span>
                                </Link>
                            </div>
                            
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}