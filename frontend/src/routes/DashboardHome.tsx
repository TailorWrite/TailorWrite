import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    LinkIcon,
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
        img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
        name: "Google",
        job: "Graduate Software Engineer",
        org: "",
        status: "Applied",
        date: "23/04/18",
        link: "https://www.google.com",
    },
    {
        img: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
        name: "Google",
        job: "Graduate Software Engineer",
        org: "",
        status: "Interview",
        date: "23/04/18",
        link: "https://www.google.com",
    },
];

const STATUS_MAP: { [key: string]: string } = {
    Applied: "blue",
    Interview: "yellow",
    Rejected: "red",
    Offer: "green",
};

export default function DashboardTable() {

    const addJobApplication = () => {
        console.log("Add Job Application");
    };


    return (
        <Card className="w-full dark:bg-gray-800">

            <CardHeader floated={false} shadow={false} className="rounded-none dark:bg-gray-800">
                <div className="mb-8 flex items-center justify-between gap-8 ">
                    <div>
                        <Typography variant="h5" color="blue-gray" className="dark:text-white">
                            Application Tracker
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal dark:text-gray-400" >
                            Track status of your job applications 
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button variant="outlined" size="sm" className="dark:text-white dark:border-gray-400">
                            view all
                        </Button>
                        <Button className="flex items-center gap-3 dark:bg-white dark:text-black" size="sm" onClick={addJobApplication}>
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Job Application
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value="all" className="w-full md:w-max">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value}>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>
                </div>
            </CardHeader>

            <CardBody className="px-0 min-h-full">
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
                                        className={`flex items-center justify-between gap-2 font-normal leading-none opacity-70 ${(index === TABLE_HEAD.length - 1) ? "justify-end pr-4" : ""} dark:text-white`}
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
                        {TABLE_ROWS.map(
                            ({ img, name, job, org, status, date }, index) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={name}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={img} alt={name} size="sm" />
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal dark:text-white"
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
                                                    className="font-normal dark:text-white"
                                                >
                                                    {job}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70 dark:text-white"
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
                                                className="font-normal dark:text-white"
                                            >
                                                {date}
                                            </Typography>
                                        </td>
                                        <td className={`${classes} flex gap-2 justify-end`}>
                                            <Tooltip content="Application Link">
                                                <IconButton variant="text">
                                                    <LinkIcon className="h-4 w-4 dark:text-white" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip content="Edit Application">
                                                <IconButton variant="text">
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

            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal dark:text-white">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm" className="dark:text-white dark:border-gray-400">
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm" className="dark:text-white dark:border-gray-400">
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}