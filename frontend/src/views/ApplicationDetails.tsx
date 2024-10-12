import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, Form, useNavigate, useLoaderData, useSubmit, Await, useLocation, useAsyncValue, useActionData } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel, Field, Menu, MenuButton, MenuItem, MenuItems, Textarea } from '@headlessui/react';
import { PlusIcon, CheckIcon, ChevronDownIcon, ClockIcon, LinkIcon, CalendarDaysIcon, PaperClipIcon } from '@heroicons/react/20/solid';
import { ArrowDownTrayIcon, DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { BuildingOffice2Icon, NoSymbolIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Breadcrumbs, Drawer, Timeline, TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem } from '@material-tailwind/react';
import { Bounce, toast } from 'react-toastify';
import { Document, Page } from 'react-pdf';
import clsx from 'clsx';


import StatusSelector from '../components/common/StatusSelector';
import DateSelector from '../components/common/DateSelector';
import WarningModal from '../components/modals/WarningModal';
import NotFound from '../components/common/NotFound';

import ApplicationDetailsSkeleton from '../components/skeletons/ApplicationDetailsSkeleton';

import { appendHttpsToLink, formatDate, getCompanyLogoUrl } from '../utils';

import PathConstants, { APIConstants } from '../pathConstants';
import { ApplicationAction, ApplicationData, ApplicationDocuments, ApplicationStatus, suppressMissingAttributes } from '../types';
import axios from 'axios';
import { headers } from '../api';


export default function ApplicationDetails() {
    const navigate = useNavigate();
    const data = useLoaderData() as { application: ApplicationData };



    const [showDrawer, setShowDrawer] = useState(true);
    const handleCloseDrawer = () => {
        setShowDrawer(false);
        // Timer to allow the drawer to close before navigating
        setTimeout(() => navigate(PathConstants.APPLICATIONS), 200);
    }

    const isNewApplication = useLocation().pathname === PathConstants.NEW_APPLICATION;

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

            {!isNewApplication ? (
                <Suspense fallback={<ApplicationDetailsSkeleton />}>
                    <Await
                        resolve={data.application}
                        errorElement={<NotFound />}
                    >
                        <ApplicationView setShowDrawer={setShowDrawer} />
                    </Await>
                </Suspense>
            ) : (
                <ApplicationView setShowDrawer={setShowDrawer} />
            )
            }

        </Drawer>

    );
}


interface ApplicationViewProps {
    setShowDrawer: (show: boolean) => void;
}
const ApplicationView = ({ setShowDrawer }: ApplicationViewProps) => {
    const submit = useSubmit();
    const navigate = useNavigate();
    const location = useLocation();
    const application = useAsyncValue() as ApplicationData;

    const isNewApplication = location.pathname === PathConstants.NEW_APPLICATION;
    const [applicationData] = useState<ApplicationData>(application ?? {} as ApplicationData);
    applicationData.img = getCompanyLogoUrl(applicationData.company_name);

    const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>(applicationData.status as ApplicationStatus ?? "Applied");
    const handleStatusSelect = (status: ApplicationStatus) => setSelectedStatus(status)

    // Managing component state 
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(applicationData.application_date ?? new Date()));

    const handleShowDatePicker = () => setShowCalendar(true);
    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setShowCalendar(false);
    };

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

    const jobTitleRef = useRef<HTMLInputElement>(null);
    const companyNameRef = useRef<HTMLInputElement>(null);
    const jobDescriptionTextAreaRef = useRef<HTMLTextAreaElement>(null);

    const applicationUrlRef = useRef<HTMLInputElement>(null);
    const handleScrapeJobDescription = async () => {
        // Check if the url is a valid URL
        debugger;
        const url = applicationUrlRef.current?.value;
        const isSeekJobUrl = url?.includes("seek.co.nz/job");
        if (!isSeekJobUrl) return;

        if (!jobDescriptionTextAreaRef.current || jobDescriptionTextAreaRef.current.value) return;

        // Check if the the jobDescriptionTextAreaRef is not null and does not have a value
        // if (jobDescriptionTextAreaRef.current && !jobDescriptionTextAreaRef.current.value) {
        // Scrape the job description from the application URL
        const toastId = toast.loading('🔍 Scraping job description...', { autoClose: false });
        try {
            const lambdaFunctionUrl = import.meta.env.VITE_LAMBDA_WEB_SCRAPING_URL;
            if (!lambdaFunctionUrl) return;

            const payload = { url: url };
            const response = await axios.post(APIConstants.APPLICATIONS_SCRAPE, payload);

            toast.update(toastId, {
                render: 'Job description scraped successfully',
                type: 'success',
                isLoading: false,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            });

            // Replace the job description with the scraped job description
            jobDescriptionTextAreaRef.current.value = response.data.body.job_description;

            if (jobTitleRef.current && jobTitleRef.current.value === '') {
                jobTitleRef.current.value = response.data.body.job_title;
            }

            if (companyNameRef.current && companyNameRef.current.value === '') {
                companyNameRef.current.value = response.data.body.company_name;
            }

        } catch (error) {
            toast.update(toastId, {
                render: '🚫 Error scraping job description',
                type: 'error',
                isLoading: false,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            });
            console.error('Error scraping job description:', error);
        }
    }

    const toastFiredRef = useRef(false);
    useEffect(() => {
        if (!isNewApplication || toastFiredRef.current) return;
        // Initial toast message to prompt the user to paste a seek url
        toast.info('Paste a seek.co.nz job link to scrape the job description', { 
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Bounce,
        });
        toastFiredRef.current = true;
    });


    const ACTIONS: ApplicationAction[] = [
        { name: 'Add event to timeline', color: 'text-gray-500 dark:text-secondaryDarkText', icon: PlusIcon, action: () => handleComingSoon() },
        { name: 'Mark as Rejected', color: 'text-red-500', icon: NoSymbolIcon, action: () => handleStatusSelect('Rejected') },
        { name: 'Delete this application', color: 'text-red-500', icon: TrashIcon, action: () => handleDeleteApplication() },
    ]

    return (
        <>
            <Form method="post" className="relative h-full ">
                
                <div className="absolute z-50 bottom-0 left-0 mb-5 ml-5 flex flex-row gap-x-5 md:hidden">
                    <ApplicationButtons applicationData={applicationData} />
                </div>

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
                <div className="flex flex-col gap-y-5 m-5 mt-0">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-row gap-5 min-w-0 flex-1">
                            {applicationData.img && (<img className="size-9 rounded-full inline-block" src={applicationData.img} alt={applicationData.company_name} />)}
                            <h2 className="w-full text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                <input
                                    name="job"
                                    type="text"
                                    ref={jobTitleRef}
                                    defaultValue={applicationData.job_title}
                                    placeholder="Job Title"
                                    className="-m-2 p-2 w-full flex-grow text-2xl font-bold leading-7 bg-transparent text-gray-900 dark:text-primaryDarkText dark:placeholder-secondaryDarkText border-transparent focus:border-transparent md:text-3xl"
                                />
                            </h2>
                        </div>

                        {/* Save & View Listing Buttons */}
                        <ApplicationButtons className="hidden md:flex" applicationData={applicationData} />
                    </div>

                    {/* Form components  */}
                    <div className="flex flex-col justify-between gap-x-5 gap-y-3 sm:flex-row sm:flex-wrap">

                        {/* Application Status */}
                        <div className="mt-auto mb-[0.125rem]">
                            <StatusSelector onStatusSelect={handleStatusSelect} statusSelected={selectedStatus} setStatusSelected={setSelectedStatus} />
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
                                        ref={companyNameRef}
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
                        <div className="flex-grow">
                            <div>
                                {/* <label htmlFor="hs-inline-add-on" className="block text-sm font-medium mb-2 dark:text-white">Website URL</label> */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="url"
                                        ref={applicationUrlRef}
                                        placeholder="www.application-link.com"
                                        defaultValue={applicationData.application_url}
                                        onChange={handleScrapeJobDescription}
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
                <div className="py-4 px-2 grid grid-cols-[auto_38%] gap-y-10 gap-x-3  md:gap-x-5 ">
                    <div className="flex flex-col gap-y-10">
                        {/* Job description & Timeline */}
                        <section className="col-span-6 row-span-2 sm:order-1 md:order-none">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-primaryDarkText">Job Description</h3>
                            <hr className="my-2 border-lightBorder dark:border-darkBorder" />
                            <Field className=" ">
                                <Textarea
                                    name="description"
                                    ref={jobDescriptionTextAreaRef}
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

                        {!isNewApplication && (
                            <DocumentUploadSection
                                applicationData={applicationData}
                                documents={applicationData.documents ?? []}
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-y-10">
                        {/* Cover Letter */}
                        <CoverLetterSection application={applicationData} />

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

            <WarningModal open={warningModelOpen} onClose={handleWarningModalClose} onConfirm={handleWarningModalConfirm} />
        </>
    )
}

interface ApplicationButtonsProps {
    className?: string;
    applicationData: ApplicationData;
}

const ApplicationButtons = ({ className, applicationData } : ApplicationButtonsProps) => {
    return (
        <div className={clsx(
            "flex flex-row gap-2 items-center",
            className, 
        )}>
            {
                // Display application link button only if the application has a link
                applicationData.application_url && (
                    <span className="hidden md:block">
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

            <span className="">
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
            <Menu as="div" className="relative md:hidden">
                <MenuButton className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                    More
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" />
                </MenuButton>

                <MenuItems
                    transition
                    className="absolute bottom-full right-0 z-10 -mr-1 mb-2 w-48 origin-bottom-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <MenuItem>
                        <a href={appendHttpsToLink(applicationData.application_url)} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                            View Listing
                        </a>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    )
}

interface DocumentUploadProps {
    applicationData: ApplicationData;
    documents: ApplicationDocuments[];
}

const DocumentUploadSection = ({ applicationData, documents }: DocumentUploadProps) => {
    const submit = useSubmit();
    const actionData = useActionData();
    console.log('actionData:', actionData);

    const [allDocuments, setAllDocuments] = useState<ApplicationDocuments[]>(documents)

    const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files || files.length === 0) return;

        // Create a FormData object to hold the files
        const formData = new FormData();

        // Append the intent to the form data
        formData.append('intent', 'upload-document');
        formData.append('application_id', applicationData.id);
        formData.append('document', files[0]);
        formData.append('size', files[0].size.toString());

        // Adding it to the list of documents
        setAllDocuments([
            ...allDocuments,
            {
                name: files[0].name,
                size: `${(files[0].size / 1024).toFixed(2)}KB`,
                link: '',
                uploaded: false
            }
        ]);

        // Submit the form data
        submit(formData, { method: 'post', encType: 'multipart/form-data' });
    };

    // documents = [
    //     { name: 'Resume.pdf', size: '1.2MB', link: 'https://www.google.com' },
    //     { name: 'CoverLetter.pdf', size: '1.2MB', link: 'https://www.google' },
    // ];

    return (
        <section className="col-span-6 row-span-3 sm:order-3 md:order-none">
            <div className="mb-2 flex flex-row justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-primaryDarkText">Documents</h3>
                <label
                    htmlFor="file-upload"
                    className="inline-flex gap-2 items-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                >
                    <PlusIcon className="h-4 w-4" />
                    <span className="text-sm text-white">Upload Document</span>
                    <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleDocumentUpload}
                        multiple
                    />
                </label>
            </div>

            {
                // Check if documents exist
                (allDocuments.length > 0) ?

                    (<ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200 dark:border-darkBorder dark:divide-darkBorder">

                        {
                            allDocuments.map((document, index) => (
                                <li key={index} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                    <div className="flex w-0 flex-1 items-center dark:text-secondaryDarkText">
                                        <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                            <span className="truncate font-medium dark:text-primaryDarkText">{document.name}</span>
                                            <span className="flex-shrink-0 text-gray-400 dark:text-secondaryDarkText/60">{document.size}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-x-3 items-center ml-4 flex-shrink-0">
                                        {document.uploaded ? (
                                            <CheckIcon aria-hidden="true" className="h-5 w-5 text-green-400 dark:text-green-400" />
                                        ) : (
                                            // <div className="relative">
                                            //     <span className="absolute top-0 size-2 bg-orange-400 rounded-full"></span>
                                            //     <span className="absolute top-0 animate-ping size-2 bg-orange-400 rounded-full"></span>
                                            // </div>
                                            <ClockIcon aria-hidden="true" className="h-5 w-5 text-gray-400 dark:text-secondaryDarkText" />
                                        )}

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
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleDocumentUpload} multiple />
                                </label>
                                <p className="pl-1">documents here</p>
                            </div>
                        </div>
                    </div>)
            }

        </section>
    )
}



interface CoverLetterProps {
    document?: string;
    application: ApplicationData;
}
const CoverLetterSection = ({ document, application }: CoverLetterProps) => {

    const downloadLinkRef = useRef<HTMLAnchorElement>(null);
    const coverLetterContainerRef = useRef<HTMLDivElement>(null);
    const [file, setFile] = useState<string | undefined>(document);
    const [coverLetterPageHeight, setCoverLetterPageHeight] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

    // When the page loads and window resizes, set the width of the page
    useEffect(() => {
        // Check if the cover letter container exists and set the width of the page 
        if (coverLetterContainerRef.current) {
            setCoverLetterPageHeight(coverLetterContainerRef.current.offsetHeight);
        }

        // Add event listener to resize the window and set the width of the page
        window.addEventListener('resize', () => {
            if (coverLetterContainerRef.current) {
                setCoverLetterPageHeight(coverLetterContainerRef.current.offsetHeight);
            }
        });
    }, [file]);

    const handleGenerateCoverLetter = () => {
        const toastId = toast('Generating cover letter...', { autoClose: false });
        // Get the cover letter from the server
        console.log(application.id)
        const payload = {
            user_id: sessionStorage.getItem('user_id'),
            application_id: application.id
        }

        axios.post(APIConstants.COVER_LETTER_GENERATE, payload, { headers, responseType: 'blob' })
            .then(response => response.data)
            .then(blob => {
                const file = new Blob([blob], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                setFile(fileURL);
                toast.update(toastId, {
                    render: 'Cover letter generated successfully',
                    type: 'success',
                    isLoading: false,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                    transition: Bounce,
                });
            })
            .catch(error => {
                console.error('Error fetching PDF:', error)
                toast.update(toastId, {
                    render: `Error generating cover letter: ${error}`,
                    type: 'error',
                    isLoading: false,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                    transition: Bounce,
                });
            });
    }; 

    const handleDownloadCoverLetter = () => {
        if (file) {
            downloadLinkRef.current?.click();
        }
    }

    return (

        <section className="relative row-span-6 flex flex-col sm:order-4 sm:row-span-4 md:order-none">
            <div className="flex flex-row justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-primaryDarkText">Cover Letter</h3>
                { file && <button
                    type="button"
                    className="inline-flex gap-2 items-center rounded-md bg-primaryLightAccent px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryLightAccent"
                    onClick={() => downloadLinkRef.current?.click()}
                >
                    Download
                    <ArrowDownTrayIcon className="size-4" />
                </button> } 
                <a ref={downloadLinkRef} href={file} className="hidden" download="cover-letter.pdf">Download</a>
            </div>
            <div ref={coverLetterContainerRef} className={clsx(
                "flex-grow mt-2 flex justify-center items-center rounded-lg overflow-hidden border border-dashed border-gray-900/25 dark:border-secondaryDarkText/60",
                file ? "aspect-[3/4]" : "px-6"
            )}>
                { file ? (
                    // <object data={file} type="application/pdf" className="w-full h-full"></object>
                    <Document onClick={() => setIsModalOpen(true)} className="w-full h-full hover:cursor-pointer" file={file}>
                        <Page pageNumber={1} height={coverLetterPageHeight + 20}/>
                    </Document>
                ) : (
                    <div className="text-center py-32 pb-[8.25rem] text-gray-600 dark:text-secondaryDarkText">
                        <DocumentTextIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300 dark:text-secondaryDarkText" />
                        <div className="mt-4 flex text-sm leading-6">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md font-semibold text-primaryLightAccent focus-within:outline-none focus-within:ring-2 focus-within:ring-primaryLightAccent focus-within:ring-offset-2 hover:text-indigo-500 dark:text-primaryDarkAccent"
                            >
                                <span onClick={handleGenerateCoverLetter}>Generate</span>
                                {/* <input id="file-upload" name="file-upload" type="file" className="sr-only" /> */}
                            </label>
                            <p className="pl-1">a cover letter here</p>
                        </div>
                        <p className="text-xs leading-5">TXT or PDF. Up to 3 options</p>
                    </div>
                )}
            </div>


            { file && <CoverLetterModal file={file} open={isModalOpen} onClose={setIsModalOpen} onDownload={handleDownloadCoverLetter} /> }

        </section>
    )
}

interface CoverLetterModalProps {
    file: string;
    open: boolean;
    onClose: (value: boolean) => void;
    onDownload: () => void;
}
const CoverLetterModal = ({ file, open, onClose, onDownload }: CoverLetterModalProps ) => {

    const coverLetterModalContainerRef = useRef<HTMLDivElement>(null);
    const [coverLetterPageWidth, setCoverLetterPageWidth] = useState<number>(0)
    const [isModalMounted, setIsModalMounted] = useState<boolean>(false);
    
    const updatePageWidth = useCallback(() => {
        if (coverLetterModalContainerRef.current) {
            const width = coverLetterModalContainerRef.current.offsetWidth;
            console.log("Width: ", width);
            setCoverLetterPageWidth(width);
        }
    }, []);

    useLayoutEffect(() => {
        if (open) {
            setIsModalMounted(true);
        }
    }, [open]);

    useLayoutEffect(() => {
        console.log('Calculating width');
        console.log('Open:', open, 'Mounted:', isModalMounted);

        if (open && isModalMounted) {
            // Add a small delay to ensure the DOM has rendered
            const timer = setTimeout(() => {
                updatePageWidth();
            }, 0);

            window.addEventListener('resize', updatePageWidth);

            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', updatePageWidth);
            };
        }
    }, [open, isModalMounted, updatePageWidth]);

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 dark:bg-primaryDark/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
                    <DialogPanel
                        transition
                        className="relative p-4 transform overflow-hidden rounded-lg bg-white dark:transparent text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 md:max-w-4xl"
                    >
                        <div className="flex flex-col">
                            <div className="flex justify-end">
                                <button onClick={() => onClose(false)} className="text-gray-400 dark:text-secondaryDarkText">
                                    <span className="sr-only">Close</span>
                                    <XMarkIcon className="size-6" />
                                </button>
                            </div>

                            <div className="flex justify-start">
    <button 
        onClick={() => onDownload()} 
        className="ml-20 mt-10 inline-flex gap-2 items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 ease-in-out">
        <span>Download</span>
        <ArrowDownTrayIcon className="h-5 w-5" />
    </button>
</div>

                            
                            <div ref={coverLetterModalContainerRef} className="flex justify-around rounded-lg overflow-hidden">
                                <Document file={file}>
                                    <Page renderTextLayer={false} renderAnnotationLayer={false} pageNumber={1} width={coverLetterPageWidth} />
                                </Document>
                            </div>

                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
