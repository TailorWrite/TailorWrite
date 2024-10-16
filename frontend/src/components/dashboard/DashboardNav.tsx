import { Disclosure, DisclosurePanel, Switch } from '@headlessui/react'

import { DarkModeIcon, LightModeIcon } from '../icons';
import { useDarkMode } from '../../hooks/useDarkMode';



export default function DashboardNav() {

    const [isDarkMode, setIsDarkMode] = useDarkMode();

    // const [darkMode, setDarkMode] = useState(false)
    // useEffect(() => {
    //     if (darkMode) {
    //         window.document.documentElement.classList.add('dark')
    //         // localStorage.theme = 'dark'
    //     } else {
    //         window.document.documentElement.classList.remove('dark')
    //         // localStorage.theme = 'light'
    //     }
    // }, [darkMode])

    const formatDate = () => {
        const date = new Date();
        const options = { weekday: 'long' as const, year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const };
        return date.toLocaleDateString(undefined, options);
    }


    return (
        <>
            <Disclosure as="nav" className="relative flex flex-row justify-between p-3 w-full z-40">

                <div className="flex flex-col px-3 justify-start">
                    {/* <Typography variant="h6" color="blue-gray" className="pb-1 leading-none text-left dark:text-white">
                        Hey, Jane
                    </Typography>
                    <Typography color="gray" className="mt-1 text-sm leading-none dark:text-white">
                        {formatDate()}
                    </Typography> */}

                    <h6 className="block antialiased tracking-normal font-sans text-base font-semibold text-blue-gray-900 pb-1 leading-none text-left dark:text-white">
                        Hey, {sessionStorage.getItem("first_name")}
                    </h6>
                    <p className="block antialiased font-sans font-light text-gray-700 mt-1 text-sm leading-none dark:text-white">
                        {formatDate()}
                    </p>

                </div>


                <div className="absolute inset-y-0 right-0 flex gap-2 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                    <Switch checked={isDarkMode} onChange={setIsDarkMode} className="group my-auto inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600 ">
                        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6">

                            {
                                // Toggling between sun and moon icons within the toggle 
                                isDarkMode ?
                                    <LightModeIcon className="size-4" /> :
                                    <DarkModeIcon className="size-4" />
                            }

                        </span>
                    </Switch>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">

                    </div>
                </DisclosurePanel>
            </Disclosure>

            <hr className=" my-2 pb-2 border-blue-gray-50 dark:border-darkBorder" />
        </>
    )
}
