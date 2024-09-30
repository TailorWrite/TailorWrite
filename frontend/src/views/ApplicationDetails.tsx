import { useState } from 'react';
import { Link, Form, useNavigate, useLoaderData, useSubmit } from 'react-router-dom';
import { Field, Menu, MenuButton, MenuItem, MenuItems, Textarea } from '@headlessui/react';
import { PlusIcon, CheckIcon, ChevronDownIcon, ClockIcon, LinkIcon, CalendarDaysIcon, PaperClipIcon } from '@heroicons/react/20/solid';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { BuildingOffice2Icon, NoSymbolIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Avatar, Breadcrumbs, Drawer, Timeline, TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem } from '@material-tailwind/react';
import { toast } from 'react-toastify';

import StatusSelector from '../components/common/StatusSelector';
import DateSelector from '../components/common/DateSelector';
import WarningModal from '../components/modals/WarningModal';

import { appendHttpsToLink, formatDate, getCompanyLogoUrl } from '../utils';

import PathConstants from '../pathConstants';
import { ApplicationAction, ApplicationData, ApplicationDocuments, ApplicationStatus, suppressMissingAttributes } from '../types';


export default function ApplicationDetails() {
    const submit = useSubmit();
    const navigate = useNavigate();
    const loaderData: ApplicationData[] = useLoaderData() as ApplicationData[];

    // Processing the application details from the loader function
    const application: ApplicationData = loaderData[0] as ApplicationData ?? {};
    const [applicationData, setApplicationData] = useState<ApplicationData>(application);

    applicationData.img = getCompanyLogoUrl(applicationData.company_name);


    // Managing component state 
// Function to handle input change and update applicationData.description
const handleInputChangeApplicationURL = (e) => {
    const url = e.target.value; // Get the input value
    console.log('Typed URL:', url); // Perform action, e.g., logging the input value

    // Make an API call to the localhost endpoint with URL as a query parameter
    fetch(`http://localhost:5001/applications/extractDescription?url=${encodeURIComponent(url)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data); // Log the returned job title and description
            
            // Update applicationData with the description from the API response
            setApplicationData((prevData) => ({
                ...prevData,
                description: data.job_description // Update the description in the state
            }));
        })
        .catch(error => {
            console.error('There was an error with the API request:', error);
        });
};



    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(applicationData.application_date ?? new Date()));

    const handleShowDatePicker = () => setShowCalendar(true);
    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setShowCalendar(false);
    };
    
    const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>(application.status as ApplicationStatus ?? "Applied");
    const handleStatusSelect = (status: ApplicationStatus) => setSelectedStatus(status)
    

    const [showDrawer, setShowDrawer] = useState(true);
    const handleCloseDrawer = () => {
        setShowDrawer(false);
        // Timer to allow the drawer to close before navigating
        setTimeout(() => navigate(PathConstants.APPLICATIONS), 200);
    }

    const [warningModelOpen, setWarningModelOpen] = useState(false);
    const handleWarningModalClose = () => setWarningModelOpen(false);
    const handleWarningModalConfirm = () => {
        // Close the drawer and modal 
        setShowDrawer(false);
        setWarningModelOpen(false);

        // Submit the delete request and navigate to the applications page after drawer closes
        submit({ intent: "delete", id: applicationData.id }, { method: "post" })
        setTimeout(() => navigate(PathConstants.APPLICATIONS), 200);
    }

    // Managing application quick actions
    const handleDeleteApplication = () => setWarningModelOpen(true);
    const handleComingSoon = () => toast('🚀 Feature coming soon!');

    const ACTIONS: ApplicationAction[] = [
        { name: 'Add event to timeline', color: 'text-gray-500 dark:text-secondaryDarkText', icon: PlusIcon, action: () => handleComingSoon()  },
        { name: 'Mark as Rejected', color: 'text-red-500', icon: NoSymbolIcon, action: () => handleStatusSelect('Rejected') },
        { name: 'Delete this application', color: 'text-red-500', icon: TrashIcon, action: () => handleDeleteApplication() },
    ]

    return (
        <Drawer
            placement="right"
            open={showDrawer}
            onClose={handleCloseDrawer}
            overlay={false}
            size={1200}
            className="p-4 z-40 border border-lightBorder dark:border-darkBorder dark:bg-secondaryDark rounded-xl overflow-scroll"
            {...suppressMissingAttributes}
        >

            <Form method="post" className="relative h-full ">
                <Breadcrumbs
                    className="mx-5 px-0 bg-transparent "
                    separator={<span className="mx-2 dark:text-secondaryDarkText">/</span>}
                    {...suppressMissingAttributes}>
                    <Link to={PathConstants.DASHBOARD} className=" dark:text-secondaryDarkText dark:hover:text-blue-400"> Dashboard </Link>
                    <Link to={PathConstants.APPLICATIONS} className=" dark:text-secondaryDarkText dark:hover:text-blue-400"> Application Tracker </Link>
                    <Link to={PathConstants.NEW_APPLICATION} className=" dark:text-secondaryDarkText dark:hover:text-blue-400"> New Application </Link>
                </Breadcrumbs>

                <input type="hidden" name="id" value={applicationData.id} />

                {/* Heading */}
                <div className="m-5 mt-0">
                    <div className="lg:flex lg:items-center lg:justify-between">
                        <div className="flex flex-row gap-5 min-w-0 flex-1">
                            { applicationData.img && ( <Avatar src={applicationData.img} alt={applicationData.company_name} size="sm" className="flex-shrink-0 my-auto border-transparent" {...suppressMissingAttributes} /> ) }
                            <h2 className="w-full text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                <input
                                    name="job"
                                    type="text"
                                    defaultValue={applicationData.job_title}
                                    placeholder="Job Title"
                                    className="-m-2 p-2 w-full flex-grow text-2xl font-bold leading-7 bg-transparent text-gray-900 dark:text-primaryDarkText dark:placeholder-secondaryDarkText border-transparent focus:border-transparent md:text-3xl"
                                />
                            </h2>
                        </div>

                        {/* Save & View Listing Buttons */}
                        <div className="mt-5 flex lg:ml-4 lg:mt-0">

                            {
                                // Display application link button only if the application has a link
                                applicationData.application_url && (
                                    <span className="ml-3 hidden sm:block">
                                        <a
                                            href={appendHttpsToLink(applicationData.application_url)}
                                            target="_blank"
                                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-primaryDark dark:text-primaryDarkText dark:hover:bg-primaryDark dark:hover:text-white dark:ring-darkBorder"
                                        >

                                            <LinkIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
                                            View Listing
                                        </a>
                                    </span>
                                )

                            }

                            <span className="sm:ml-3">
                                <button
                                    type="submit"
                                    name="intent"
                                    value="save"
                                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <CheckIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
                                    Save
                                </button>
                            </span>

                            {/* Dropdown */}
                            <Menu as="div" className="relative ml-3 sm:hidden">
                                <MenuButton className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                                    More
                                    <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" />
                                </MenuButton>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <MenuItem>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                            View
                                        </a>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>

                    {/* Form components  */}
                    <div className="flex flex-col align-baseline sm:mt-3 sm:flex-row sm:flex-wrap sm:space-x-6">

                        {/* Application Status */}
                        <div className="mt-auto mb-[0.125rem]">
                            <StatusSelector onStatusSelect={handleStatusSelect} statusSelected={selectedStatus} setStatusSelected={setSelectedStatus}/>
                            <input type="hidden" name="status" value={selectedStatus} />
                        </div>

                        {/* Company name */}
                        <div className="max-w-sm space-y-3">
                            <div className="flex gap-2">
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                        <BuildingOffice2Icon className="h-5 w-5 text-gray-400" />
                                    </div>

                                    <input 
                                        id="hs-leading-icon" 
                                        type="text" 
                                        name="company" 
                                        placeholder="Company name" 
                                        defaultValue={applicationData.company_name}
                                        className="py-1 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-primaryDark dark:border-darkBorder dark:text-primaryDarkText dark:placeholder-secondaryDarkText/50 dark:focus:ring-blue-600" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Date selector */}
                        <div className="relative max-w-sm space-y-3">
                            <div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                        <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
                                    </div>

                                    {/* Needs to be refactored to bring the input into the date picker DateSelector component */}
                                    <input 
                                        type="text" 
                                        name="date" 
                                        placeholder="Select a date" 
                                        value={selectedDate ? formatDate(selectedDate) : ''}
                                        onClick={handleShowDatePicker}
                                        readOnly
                                        className="py-1 px-4 ps-11 block w-56 border-gray-200 shadow-sm rounded-lg text-sm hover:cursor-pointer focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-primaryDark dark:border-darkBorder dark:text-primaryDarkText dark:placeholder-secondaryDarkText/50 dark:focus:ring-blue-600" 
                                    />
                                </div>
                            </div>

                            {showCalendar && (
                                <div className="absolute z-10 mt-1">
                                    <DateSelector onDateSelect={handleDateSelect} dateSelected={selectedDate} />
                                </div>
                            )}


                        </div>

                        {/* Application URL */}
                        <div className="max-w-sm space-y-3 mt-auto">
                            <div>
                                {/* <label htmlFor="hs-inline-add-on" className="block text-sm font-medium mb-2 dark:text-white">Website URL</label> */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="url"
                                        placeholder="www.application-link.com"
                                        defaultValue={applicationData.application_url}
                                        className="py-1 px-4 ps-14 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-primaryDark dark:border-darkBorder dark:text-primaryDarkText dark:placeholder-secondaryDarkText/50 dark:focus:ring-blue-600"
                                    />
                                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                        <span className="text-sm text-gray-500 dark:text-neutral-500">http://</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-2 border-lightBorder dark:border-darkBorder" />

                {/* Body */}
                <div className="py-4 px-2 grid grid-cols-[auto_38%] gap-y-10  md:gap-x-5 ">
                    <div className="flex flex-col gap-y-10">
                        {/* Job description & Timeline */}
                        <section className="col-span-6 row-span-2 sm:order-1 md:order-none">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-primaryDarkText">Job Description</h3>
                            <hr className="my-2 border-lightBorder dark:border-darkBorder" />
                            <Field className=" ">
                                <Textarea
                                    name="description"
                                    defaultValue={applicationData.description}
                                    placeholder="No job description provided"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-primaryDark dark:ring-darkBorder dark:text-primaryDarkText dark:placeholder-secondaryDarkText/60"
                                    rows={3}
                                />
                            </Field>

                            <div onClick={handleComingSoon} className="ml-3">
                                <span className="w-[28px] grid justify-center"><span className="h-4 border-l-2 border-neutral-300 dark:border-darkBorder"></span></span>
                                <Timeline id="material-tailwind-TimelineConnector" className="text-gray-500 text-sm md:text-[16px] dark:text-secondaryDarkText">
                                    
                                    <TimelineItem>
                                        <TimelineConnector id="material-tailwind-TimelineConnector" />
                                        <TimelineHeader>
                                            <TimelineIcon className="bg-neutral-300 dark:bg-darkBorder">
                                                <ClockIcon className="size-4 dark:text-lightBorder" />
                                            </TimelineIcon>
                                            <div className="flex flex-row items-center gap-1 ">
                                                <span className="font-medium">Application submitted on the</span>
                                                {formatDate(selectedDate ?? new Date())}
                                            </div>
                                        </TimelineHeader>
                                        <TimelineBody className="pb-2" />
                                    </TimelineItem>

                                </Timeline>
                            </div>
                        </section>

                        {/* Additional Notes  */}
                        <section className="flex flex-col col-span-6 row-span-2 sm:order-2 md:order-none">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-primaryDarkText">Additional Notes</h3>
                            <hr className="my-2 border-blue-gray-50 dark:border-darkBorder" />
                            <Field className=" flex flex-col">
                                <Textarea
                                    name="notes"
                                    defaultValue={applicationData.notes}
                                    placeholder="Oops... No notes here. &#13;&#10;&#13;&#10;Keep track of things such as the hiring manager's name, the interview date, or any other important details here."
                                    className="block w-full flex-grow rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-primaryDark dark:text-primaryDarkText dark:ring-darkBorder dark:placeholder-secondaryDarkText/60"
                                    rows={5}
                                />
                            </Field>
                        </section>


                        <DocumentUploadSection documents={applicationData.documents ?? []} />
                    </div>

                    <div className="flex flex-col gap-y-10">
                        {/* Cover Letter */}
                        <section onClick={handleComingSoon} className="relative row-span-6 flex flex-col sm:order-4 sm:row-span-4 md:order-none">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-primaryDarkText">Cover Letter</h3>
                            <div className="flex-grow mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 dark:border-secondaryDarkText/60">
                                <div className="text-center py-32 pb-[8.25rem] text-gray-600 dark:text-secondaryDarkText">
                                    <DocumentTextIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300 dark:text-secondaryDarkText" />
                                    <div className="mt-4 flex text-sm leading-6">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 dark:text-primaryDarkAccent"
                                        >
                                            <span>Generate</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">a cover letter here</p>
                                    </div>
                                    <p className="text-xs leading-5">TXT or PDF. Up to 3 options</p>
                                </div>
                            </div>
                        </section>

                        {/* Actions section */}
                        <section className="row-span-2 sm:order-last md:order-none">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-primaryDarkText">Actions</h3>
                            <hr className="my-2 border-blue-gray-50 dark:border-darkBorder" />
                            <ul className="flex flex-col gap-3">
                                {
                                    ACTIONS.map((action, index) => (
                                        <li key={index} className={`text-sm font-semibold ${action.color}`}>
                                            <button type="button" onClick={action.action} className="flex flex-row gap-2">
                                                <action.icon aria-hidden="true" className="h-5 w-5" />
                                                {action.name}
                                            </button>

                                        </li>
                                    ))
                                }
                            </ul>
                        </section>
                    </div>

                </div>
            </Form>

            <WarningModal open={warningModelOpen} onClose={handleWarningModalClose} onConfirm={handleWarningModalConfirm}/>
        </Drawer>

    );
}

interface DocumentUploadProps {
    documents: ApplicationDocuments[];
}

const DocumentUploadSection = ({ documents }: DocumentUploadProps) => {

    // TODO: Implement handle upload of document 
    const handleDocumentUpload = () => toast('🚀 Feature coming soon!');

    documents = [
        { name: 'Resume.pdf', size: '1.2MB', link: 'https://www.google.com' },
        { name: 'CoverLetter.pdf', size: '1.2MB', link: 'https://www.google' },
    ]


    return (
        <section className="col-span-6 row-span-3 sm:order-3 md:order-none">
            <div className="mb-2 flex flex-row justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-primaryDarkText">Documents</h3>
                <button
                    type="button"
                    className=" inline-flex gap-2 items-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleDocumentUpload}
                >
                    <PlusIcon className="h-4 w-4" />
                    <span className="text-sm text-white">Upload Document</span>
                </button>
            </div>

            {
                // Check if documents exist
                (documents.length > 0) ?

                    (<ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200 dark:border-darkBorder dark:divide-darkBorder">

                        {
                            documents.map((document, index) => (
                                <li key={index} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                    <div className="flex w-0 flex-1 items-center dark:text-secondaryDarkText">
                                        <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                            <span className="truncate font-medium dark:text-primaryDarkText">{document.name}</span>
                                            <span className="flex-shrink-0 text-gray-400 dark:text-secondaryDarkText/60">{document.size}</span>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <a href={document.link} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-primaryDarkAccent">
                                            Download
                                        </a>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>)
                    :
                    (<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-8 dark:border-secondaryDarkText/60">
                        <div className="text-center flex flex-row gap-4">
                            <DocumentTextIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300 dark:text-secondaryDarkText" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-secondaryDarkText">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 dark:text-primaryDarkAccent"
                                >
                                    <span>Upload</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">documents here</p>
                                {/* <p className="text-xs leading-5 text-gray-600">TXT or PDF. Up to 3 options</p> */}
                            </div>
                        </div>
                    </div>)
            }

        </section>
    )
}
