import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Card, CardHeader, Input, Typography, Button, CardBody, CardFooter, Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { MagnifyingGlassIcon, ChevronUpDownIcon, UserPlusIcon } from "@heroicons/react/24/outline";

import { ApplicationData, ApplicationStatus, suppressMissingAttributes } from "../types";
import { formatDate, getCompanyLogoUrl } from "../utils";
import BasicChip, { Color } from "../components/common/BasicChip";
import CompanyLogo from "../components/common/CompanyLogo";

const FILTER_TABS = [
    { label: "All", value: "all" },
    { label: "Applied", value: "applied" },
    { label: "Interview", value: "interview" },
    { label: "Rejected", value: "rejected" },
    { label: "Offer", value: "offer" },
];

const TABLE_HEAD = ["Company", "Role", "Status", "Date", "Actions"];

const STATUS_MAP: Record<ApplicationStatus, Color> = {
    Applied: "blue",
    Interview: "yellow",
    Rejected: "red",
    Offer: "green",
};

export default function ApplicationTracker() {
    const navigate = useNavigate();
    const loaderData = useLoaderData();
    const allApplications: ApplicationData[] = loaderData as ApplicationData[] ?? [];

    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchTerm(e.target.value.toLowerCase()); setPage(1); }
    const handleFilter = (value: string) => { setFilter(value); setPage(1); }

    const recordsPerPage = 5;
    const [page, setPage] = useState(1);

    const filteredApplications = allApplications.filter(({ job_title, company_name, status }) => {
        const isFilterMatch = filter === "all" || status.toLowerCase() === filter;
        const isSearchMatch = company_name.toLowerCase().includes(searchTerm) || job_title.toLowerCase().includes(searchTerm);
        return isFilterMatch && isSearchMatch;
    });

    const pageCount = Math.ceil(filteredApplications.length / recordsPerPage);
    const currentApplications = filteredApplications.slice((page - 1) * recordsPerPage, page * recordsPerPage);

    const handleAddApplication = () => navigate('/dashboard/applications/new');

    return (
        <Card className="flex flex-col h-full shadow-none bg-transparent" {...suppressMissingAttributes}>
            <CardHeader floated={false} shadow={false} className="rounded-none bg-transparent" {...suppressMissingAttributes}>
                <div className="mb-8 flex items-center justify-between gap-8 ">
                    <div>
                        <h3 className="mb-2 text-2xl font-bold dark:text-primaryDarkText">
                            Application Tracker
                        </h3>

                        <p className=" dark:text-secondaryDarkText">
                            Track the status of your job applications
                        </p>

                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button onClick={handleAddApplication} className="py-2 px-4 flex items-center gap-3 border dark:bg-primaryDark dark:text-primaryDarkText dark:border-neutral-700" size="sm" {...suppressMissingAttributes}>
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Job Application
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value="all" className="w-full md:w-max">
                        <TabsHeader {...suppressMissingAttributes}>
                            {FILTER_TABS.map(({ label, value }) => (
                                <Tab
                                    className="px-4" // dark:bg-secondaryDark dark:text-primaryDarkText focus:bg-primaryDark 
                                    key={value}
                                    value={value}
                                    onClick={() => handleFilter(value)}
                                    {...suppressMissingAttributes}
                                >
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                        <Input
                            id="search"
                            label="Search"
                            className="dark:text-primaryDarkText dark:border-darkBorder dark:bg-primaryDark"
                            onChange={handleSearch}
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}
                        />
                    </div>
                </div>
            </CardHeader>

            <CardBody className="px-0 flex-1 overflow-auto" {...suppressMissingAttributes} >
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 dark:bg-primaryDark dark:border-darkBorder" {...suppressMissingAttributes}
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className={`flex items-center justify-between gap-2 font-normal leading-none opacity-70 ${(index === TABLE_HEAD.length - 1) ? "justify-end pr-4" : ""} dark:text-white`}
                                        {...suppressMissingAttributes}
                                    >
                                        {head}{" "}
                                        {index < TABLE_HEAD.length - 1 && (
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        )}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentApplications.map(
                                ({ id, img, job_title, company_name, status, application_date }: ApplicationData, index) => {
                                    const viewApplication = () => navigate(`/dashboard/applications/${id}`);

                                    const imgUrl = img ? img : getCompanyLogoUrl(company_name);

                                    return (
                                        <tr key={index} onClick={viewApplication} className="hover:cursor-pointer border-b dark:border-darkBorder">
                                            <td className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <CompanyLogo url={imgUrl} alt={company_name} /> 
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal dark:text-white"
                                                            {...suppressMissingAttributes}
                                                        >
                                                            {company_name}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal dark:text-white"
                                                        {...suppressMissingAttributes}
                                                    >
                                                        {job_title}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="w-max">
                                                    <BasicChip value={status} color={STATUS_MAP[status]} />
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal dark:text-white"
                                                    {...suppressMissingAttributes}
                                                >
                                                    {formatDate(application_date)}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
                                                    {...suppressMissingAttributes}
                                                >
                                                    Edit
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                }
                            )
                        }
                    </tbody>
                </table>
            </CardBody>

            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 dark:border-darkBorder p-4" {...suppressMissingAttributes} >
                <Typography variant="small" color="blue-gray" className="font-normal dark:text-white" {...suppressMissingAttributes}>
                    Page {page} of {pageCount}
                </Typography>

                {
                    pageCount > 1 && (
                        <div className="flex gap-2">
                            <Button
                                onClick={() => setPage(page - 1)}
                                variant="outlined"
                                size="sm"
                                className="dark:text-white dark:border-gray-400"
                                disabled={page === 1}
                                {...suppressMissingAttributes}
                            >
                                Previous
                            </Button>
                            <Button
                                onClick={() => setPage(page + 1)}
                                variant="outlined"
                                size="sm"
                                className="dark:text-white dark:border-gray-400"
                                disabled={page === pageCount}
                                {...suppressMissingAttributes}
                            >
                                Next
                            </Button>
                        </div>
                    )
                }
            </CardFooter>
        </Card>
    );
}