import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    LinkIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";

import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
// import { useOutletContext } from "react-router-dom";

const TABS = [
    { label: "All", value: "all", },
    { label: "Applied", value: "applied", },
    { label: "Interview", value: "interview", },
    { label: "Rejected", value: "rejected", },
    { label: "Offer", value: "offer", },
];

const TABLE_HEAD = ["Company", "Role", "Status", "Date", "Actions"];

const TABLE_ROWS = [
    {
        img: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
        name: "Google",
        job: "Graduate Software Engineer",
        org: "",
        status: "Applied",
        date: "23/04/18",
        link: "https://www.google.com",
    },
    {
        img: "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png",
        name: "Spotify",
        job: "Fullstack Engineer",
        org: "",
        status: "Interview",
        date: "23/04/18",
        link: "https://www.google.com",
    },
    {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Logo_2023.png/768px-Facebook_Logo_2023.png",
        name: "Facebook",
        job: "Graduate QA Engineer",
        org: "",
        status: "Rejected",
        date: "23/04/18",
        link: "https://www.google.com",
    },
    {
        img: "https://freelogopng.com/images/all_img/1659761207uber-app-logo-png.png",
        name: "Uber",
        job: "Principal Software Engineer",
        org: "",
        status: "Offer",
        date: "23/04/18",
        link: "https://www.google.com",
    },
];

type ChipColor = "blue" | "yellow" | "red" | "green";

// Define the STATUS_MAP using the ChipColor type
const STATUS_MAP: { [key: string]: ChipColor } = {
    Applied: "blue",
    Interview: "yellow",
    Rejected: "red",
    Offer: "green",
};

export default function DashboardTable() {

    const addJobApplication = () => {
        console.log("Add Job Application");
    };

    let isFetching = false;
    const getJobApplications = () => {
        // TODO: Query the API to get the job applications for the user
        console.log("Get Job Applications");
    }
    
    
    const [filter, setFilter] = useState('all'); 
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (e: { target: { value: string; }; }) => setSearchTerm(e.target.value.toLowerCase());
    
    useEffect(() => {
        if (!isFetching) getJobApplications();
        isFetching = true;
    }, [])

    // const { setTitle } = useOutletContext();
    // setTitle("Application Tracker");

    return (
        <Card className="w-full dark:bg-gray-800" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

            <CardHeader floated={false} shadow={false} className="rounded-none dark:bg-gray-800">
                <div className="mb-8 flex items-center justify-between gap-8 ">
                    <div>
                        <Typography variant="h5" color="blue-gray" className="dark:text-white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            Application Tracker
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal dark:text-gray-400" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
                            Track the status of your job applications 
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button className="flex items-center gap-3 dark:bg-white dark:text-black" size="sm" onClick={addJobApplication} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Job Application
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value="all" className="w-full md:w-max">
                        <TabsHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value} onClick={() => setFilter(value)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            onChange={handleSearch}
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                        />
                    </div>
                </div>
            </CardHeader>

            <CardBody className="px-0 min-h-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 dark:bg-gray-900"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className={`flex items-center justify-between gap-2 font-normal leading-none opacity-70 ${(index === TABLE_HEAD.length - 1) ? "justify-end pr-4" : ""} dark:text-white`} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                    >
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
                        {TABLE_ROWS.filter(
                            ({ name, job, status }) =>
                                (filter === "all" || status.toLowerCase() === filter) &&
                                (name.toLowerCase().includes(searchTerm) || job.toLowerCase().includes(searchTerm))
                        ).map(
                            ({ img, name, job, org, status, date, link }, index) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={img} alt={name} size="sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal dark:text-white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                                                    >
                                                        {name}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal dark:text-white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                                >
                                                    {job}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70 dark:text-white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                                                >
                                                    {org}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={status}
                                                    color={STATUS_MAP[status]}
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal dark:text-white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                                            >
                                                {date}
                                            </Typography>
                                        </td>
                                        <td className={`${classes} flex gap-2 justify-center`}>
                                            <Tooltip content="Cover Letter">
                                                <IconButton variant="text" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                    <DocumentTextIcon className="h-4 w-4 text-blue-400" />
                                                </IconButton>
                                            </Tooltip>
                                            <a href={link} target="_blank">
                                                <Tooltip content="Application Link">
                                                    <IconButton variant="text" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                        <LinkIcon className="h-4 w-4 dark:text-white" />
                                                    </IconButton>
                                                </Tooltip>
                                            </a>
                                            <Tooltip content="Edit Application">
                                                <IconButton variant="text" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                    <PencilIcon className="h-4 w-4 dark:text-white" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>

            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Typography variant="small" color="blue-gray" className="font-normal dark:text-white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm" className="dark:text-white dark:border-gray-400" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm" className="dark:text-white dark:border-gray-400" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}