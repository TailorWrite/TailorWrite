import { useEffect, useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { toast } from 'react-toastify'
import clsx from 'clsx'


export default function GeneralSettings() {

    const coverLetterData = '';

    const SettingsOptions = [
        {
            title: 'Appearance',
            description: 'Change how you dashboard looks and feels',
            component: <Appearance />
        },
        {
            title: 'Cover Letter',
            description: 'Generate cover letters in a similar writing style to your writing. Paste your cover letter here to get started.',
            component: <CoverLetter coverLetter={coverLetterData} />
        },
        {
            title: 'Language',
            description: 'Change the language of the dashboard',
            component: <Language />
        },
    ]

    return (
        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
            {
                SettingsOptions.map((option) => (
                    <div key={option.title} className="px-4 py-6 col-span-3 border-b border-gray-200 dark:border-neutral-700 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold leading-6 text-gray-900">
                            {option.title}
                            <p className="font-normal text-gray-400">{option.description}</p>
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {option.component}
                        </dd>
                    </div>
                ))
            }
        </div>
    )
}


interface ThemeOption {
    title: string;
    description: string;
    image: string;
}

const ThemeOptions: ThemeOption[] = [
    {
        title: 'Light Mode',
        description: 'Default branding',
        image: 'https://s3-alpha.figma.com/hub/file/4175018723/d9fd69a3-ffbc-4f9f-9f8f-294ae6155eaf-cover.png',
    },
    {
        title: 'Dark Mode',
        description: 'Default branding',
        image: 'https://s3-alpha.figma.com/hub/file/4175018723/d9fd69a3-ffbc-4f9f-9f8f-294ae6155eaf-cover.png',
    }
];

const Appearance = () => {
    const initialTheme = sessionStorage.getItem('theme');
    const initialThemeObject = initialTheme ? JSON.parse(initialTheme) : ThemeOptions[0];

    const [selected, setSelected] = useState(initialThemeObject);

    const handleThemeSelection = (option: ThemeOption) => {
        setSelected(option);
        sessionStorage.setItem('theme', JSON.stringify(option));
    };

    return (
        <div className="grid gap-x-10 grid-cols sm:grid-cols-2 lg:grid-cols-3">
            {ThemeOptions.map((option) => (
                <div
                    key={option.title}
                    className="flex flex-col focus:outline-none hover:cursor-pointer"
                    onClick={() => handleThemeSelection(option)}
                >
                    <div className="relative flex flex-col bg-gray-300/20 pt-[50%] sm:pt-[70%] rounded-xl">

                        <span 
                            // Implemented this way to preserve the transition effect
                            className={clsx(
                                "absolute p-1 z-10 -top-1 -right-1 bg-blue-600 rounded-full transition-all duration-300 ease-in-out",
                                // Highlight the selected theme
                                selected.title === option.title ? 'opacity-100' : 'opacity-0',
                            )} >
                            <CheckIcon className="size-3 text-white"/>
                        </span>

                        <img
                            className={clsx(
                                'size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-all duration-300 ease-in-out rounded-xl',
                                // Highlight the selected theme
                                selected.title === option.title ? 'border-blue-500 border-4' : 'border-gray-300 border-4',
                            )}
                            src={option.image}
                            alt={option.title}
                        />
                    </div>
                    <div className="mt-3">
                        <p className="font-bold text-gray-800 dark:text-neutral-200">
                            {option.title}
                        </p>
                        <p className="font-normal text-gray-400 dark:text-neutral-200">
                            {option.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const CoverLetter = ({ coverLetter }: { coverLetter?: string }) => {

    const updateCoverLetter = () => {
        const toastId = toast.loading('Saving cover letter...')
        setTimeout(() => {
            toast.update(toastId, {
                type: 'success',
                isLoading: false,
                render: 'Cover letter saved successfully!',
                autoClose: 2000,
            })
        }, 2000)
    }

    return (
        <div className="max-w-4xl pr-4 sm:pr-6 lg:pr-8">

            <div className="relative">
                <textarea
                    className="p-4 pb-20 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Paste your cover letter here to get started"
                    defaultValue={coverLetter ?? ''}
                ></textarea>

                <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-white dark:bg-neutral-900">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">

                            <label className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 cursor-pointer">
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={() => toast('🚀 Feature coming soon... Implement word scraping from pdf document')}
                                />
                                <PaperClipIcon className="shrink-0 size-4" />
                            </label>
                        </div>

                        <div className="flex items-center gap-x-1">

                            <button
                                type="button"
                                className="inline-flex shrink-0 justify-center items-center font-bold h-8 px-2 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:bg-blue-500"
                                onClick={updateCoverLetter}
                            >
                                Save
                                {/* <CheckIcon className="shrink-0 size-3.5" /> */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


interface Language {
    language: string
    countryCode: string
}

const getFlagURL = (countryCode: string) => `https://www.flagsapi.com/${countryCode}/flat/64.png`
const Languages: Language[] = [
    { language: "English", countryCode: "NZ" },
    { language: "Spanish", countryCode: "ES" },
    { language: "French", countryCode: "FR" },
]

const Language = () => {
    // When the component is mounted, check if the language is already set in the session storage
    const initialLanguage = sessionStorage.getItem('language')
    const initialLanguageObject = initialLanguage ? JSON.parse(initialLanguage) : Languages[0]

    const [selected, setSelected] = useState<Language>(initialLanguageObject)

    useEffect(() => {
        // Update session storage with selected language
        sessionStorage.setItem('language', JSON.stringify(selected))
    }, [selected])

    return (
        <div className="max-w-4xl">
            <Listbox value={selected} onChange={setSelected}>

                <div className="relative w-60 mt-2">

                    <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                            <img alt="" src={getFlagURL(selected.countryCode)} className="size-5 object-cover" />
                            <span className="ml-3 block">{`${selected.language} (${selected.countryCode})`}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon aria-hidden="true" className="size-5 text-gray-400" />
                        </span>
                    </ListboxButton>

                    <ListboxOptions
                        transition
                        className="absolute z-10 w-full mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                    >
                        {Languages.map(({ language, countryCode }) => (
                            <ListboxOption
                                key={countryCode}
                                value={{ language, countryCode }}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                            >
                                <div className="flex items-center">
                                    <img alt="" src={getFlagURL(countryCode)} className="size-5 object-cover" />
                                    <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                        {`${language} (${countryCode})`}
                                    </span>
                                </div>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                    <CheckIcon aria-hidden="true" className="size-5" />
                                </span>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>

            </Listbox>
        </div>
    )
}