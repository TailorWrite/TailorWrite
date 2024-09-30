import { useEffect, useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { toast } from 'react-toastify'
import clsx from 'clsx'

import DataDisplay, { DataDisplayRow } from '../../components/common/DataDisplay'
import lightModeImage from '../../assets/lightMode.png'
import darkModeImage from '../../assets/darkMode.png'


export interface GeneralSettingsProps {
    coverLetter?: string;
}

export default function GeneralSettings({ coverLetter }: GeneralSettingsProps) {

    coverLetter = '';

    const SettingsOptions: DataDisplayRow[] = [
        {
            title: 'Appearance',
            description: 'Change how you dashboard looks and feels.',
            component: <Appearance />
        },
        {
            title: 'Cover Letter',
            description: 'Generate cover letters in a similar writing style to your writing. Paste your cover letter here to get started.',
            component: <CoverLetter coverLetter={coverLetter} />
        },
        {
            title: 'Default Cover Letter Template',
            description: 'Select the default cover letter template to use when generating cover letters in PDF format.',
            component: <CoverLetterTemplate />
        },
        {
            title: 'Language',
            description: 'Change the language of the dashboard.',
            component: <Language />
        },
    ]

    return <DataDisplay data={SettingsOptions} />
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
        image: lightModeImage,
    },
    {
        title: 'Dark Mode',
        description: 'Dark mode for night owls',
        image: darkModeImage, 
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
                    <div className={clsx(
                        "relative flex flex-col rounded-xl bg-gray-300/20 aspect-[1.54/1]",
                        // option.title.includes('Light') ? 'bg-gray-300/20' : 'bg-primaryDark'
                        selected.title === option.title ? 'border-4 border-primaryDarkAccent' : 'border-4 border-gray-300 dark:border-darkBorder',
                    )}>

                        <span 
                            // Implemented this way to preserve the transition effect
                            className={clsx(
                                "absolute p-1 z-10 -top-2 -right-2 bg-primaryDarkAccent rounded-full transition-all duration-300 ease-in-out",
                                // Highlight the selected theme
                                selected.title === option.title ? 'opacity-100' : 'opacity-0',
                            )} >
                            <CheckIcon className="size-3 text-white"/>
                        </span>

                        <div className="relative size-full overflow-hidden">
                            <div className="absolute top-7 start-7">
                                <figure className="ms-auto me-20 relative z-[1] max-w-full w-[50rem] h-auto shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)] rounded-b-lg">
                                    <div className={clsx(
                                        "relative flex items-center h-6 max-w-[50rem] rounded-t-lg px-32 ",
                                        option.image.includes('light') ? 'bg-neutral-200' : 'bg-secondaryDark/95'
                                    )}>
                                        <div className="flex gap-x-1 absolute top-2/4 start-4 -translate-y-1">
                                            <span className="size-2 bg-[#FF605C] rounded-full"></span>
                                            <span className="size-2 bg-[#FFBD44] rounded-full"></span>
                                            <span className="size-2 bg-[#00CA4E] rounded-full"></span>
                                        </div>
                                        <div className={clsx(
                                            "flex justify-center items-center w-full h-3 my-4 text-[.25rem] text-gray-400 rounded-sm sm:text-[.5rem] dark:text-neutral-400",
                                            option.image.includes('light') ? 'bg-neutral-300' : 'bg-primaryDark'
                                        )}>
                                            <span>www.tailorwrite.com</span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-800 rounded-b-lg">
                                        <img className="max-w-full h-auto rounded-b-lg pr-[40%]" src={option.image} alt="Browser Placeholder" />
                                    </div>
                                </figure>
                            </div>

                        </div>
                    </div>

                    <div className="mt-3">
                        <p className="font-bold text-gray-800 dark:text-primaryDarkText">
                            {option.title}
                        </p>
                        <p className="font-normal text-gray-400 dark:text-secondaryDarkText">
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
        <div className="max-w-4xl">

            <div className="relative">
                <textarea
                    className="p-4 pb-20 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-primaryDark dark:border-darkBorder dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
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


interface CoverLetterTemplate {
    title: string;
    description?: string;
    author: string;
    image: string;
    link: string; 
}

const CoverLetterTemplateOptions: CoverLetterTemplate[] = [
    {
        title: 'Professional',
        author: 'Rajib Das Bhagat',
        image: 'https://writelatex.s3.amazonaws.com/published_ver/24156.jpeg?X-Amz-Expires=14400&X-Amz-Date=20240922T035749Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWJBOALPNFPV7PVH5/20240922/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=9a43b24cd2b7ffaf1ce768583fcf0ccea5d61b4e27abb64768fdcdf33ca6eb29',
        link: 'https://www.overleaf.com/latex/templates/job-application-cover-letter/jgbntsgkcvvz'
    }, 
    {
        title: 'Modern',
        description: '',
        author: 'Apurv Mishra',
        image: 'https://writelatex.s3.amazonaws.com/published_ver/14620.jpeg?X-Amz-Expires=14400&X-Amz-Date=20240922T035944Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWJBOALPNFPV7PVH5/20240922/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=3e813c9b3eb2f78161792d0d1a3e065e02bdd5f747e78a090d044ba02045f31a',
        link: 'https://www.overleaf.com/latex/templates/deedy-cover-letter/yhdwrhyvqjwy',
    },
    {
        title: 'Simple',
        author: 'Vebjørn S. Førde',
        image: 'https://writelatex.s3.amazonaws.com/published_ver/27439.jpeg?X-Amz-Expires=14400&X-Amz-Date=20240922T041718Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWJBOALPNFPV7PVH5/20240922/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=740e67e01453164962d9472d59368193638d7c9296cd11832feefa47206de908',
        link: 'https://www.overleaf.com/latex/templates/job-application-letter/yztqhwkcbnsf'
    },
];

const CoverLetterTemplate = () => {
    const initialTemplate = sessionStorage.getItem('template');
    const initialTemplateObject = initialTemplate ? JSON.parse(initialTemplate) : CoverLetterTemplateOptions[0];

    const [selected, setSelected] = useState(initialTemplateObject);

    const handleTemplateSelection = (option: CoverLetterTemplate) => {
        setSelected(option);
        sessionStorage.setItem('template', JSON.stringify(option));
    };

    return (
        <div className="grid gap-x-10 grid-cols sm:grid-cols-2 lg:grid-cols-3">

            {CoverLetterTemplateOptions.map((option) => (
                <div
                    key={option.title}
                    className="flex flex-col focus:outline-none hover:cursor-pointer"
                    onClick={() => handleTemplateSelection(option)}
                >
                    <div className="relative aspect-[3/4] flex flex-col bg-gray-300/20 pt-[50%] sm:pt-[70%] rounded-xl">

                        <span 
                            // Implemented this way to preserve the transition effect
                            className={clsx(
                                "absolute p-1 z-10 -top-1 -right-1 bg-primaryDarkAccent rounded-full transition-all duration-300 ease-in-out",
                                // Highlight the selected theme
                                selected.title === option.title ? 'opacity-100' : 'opacity-0',
                            )} >
                            <CheckIcon className="size-3 text-white"/>
                        </span>

                        <img
                            className={clsx(
                                'size-full absolute top-0 start-0 object-cover object-top group-hover:scale-105 group-focus:scale-105 transition-all duration-300 ease-in-out rounded-xl',
                                // Highlight the selected theme
                                selected.title === option.title ? 'border-4 border-primaryDarkAccent' : 'border-4 border-gray-300 dark:border-darkBorder',
                            )}
                            src={option.image}
                            alt={option.title}
                        />
                    </div>
                    <div className="mt-3">
                        <p className="font-bold text-gray-800 dark:text-primaryDarkText">
                            {option.title}
                        </p>
                        <p className="text-gray-400 dark:text-secondaryDarkText">
                            {option.description}
                        </p>
                        <p className="text-gray-400 dark:text-secondaryDarkText">
                            Authored by
                            <a className="ml-1 text-blue-400 underline" href={option.link}>
                                {option.author}
                            </a>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );

}


export interface LanguageOption {
    language: string
    countryCode: string
}

const Languages: LanguageOption[] = [
    { language: "English", countryCode: "NZ" },
    { language: "Spanish", countryCode: "ES" },
    { language: "French", countryCode: "FR" },
]
const getFlagURL = (countryCode: string) => `https://www.flagsapi.com/${countryCode}/flat/64.png`

const Language = () => {
    // When the component is mounted, check if the language is already set in the session storage
    const initialLanguage = sessionStorage.getItem('language')
    const initialLanguageObject = initialLanguage ? JSON.parse(initialLanguage) : Languages[0]

    const [selected, setSelected] = useState<LanguageOption>(initialLanguageObject)

    useEffect(() => {
        // Update session storage with selected language
        sessionStorage.setItem('language', JSON.stringify(selected))
    }, [selected])

    return (
        <div className="max-w-4xl">
            <Listbox value={selected} onChange={setSelected}>

                <div className="relative w-60 mt-2">

                    <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 dark:bg-primaryDark dark:ring-darkBorder">
                        <span className="flex items-center dark:text-primaryDarkText">
                            <img alt="" src={getFlagURL(selected.countryCode)} className="size-5 object-cover" />
                            <span className="ml-3 block">{`${selected.language} (${selected.countryCode})`}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon aria-hidden="true" className="size-5 text-gray-400" />
                        </span>
                    </ListboxButton>

                    <ListboxOptions
                        transition
                        className="absolute bottom-10 z-10 w-full mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm dark:bg-primaryDark"
                    >
                        {Languages.map(({ language, countryCode }) => (
                            <ListboxOption
                                key={countryCode}
                                value={{ language, countryCode }}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                            >
                                <div className="flex items-center dark:text-primaryDarkText">
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