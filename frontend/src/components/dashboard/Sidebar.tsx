import React from "react";

import { Link } from "react-router-dom";

import { Card, Typography, List, ListItem, ListItemPrefix, Avatar, MenuItem } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ChevronUpDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";

import { suppressMissingAttributes } from "../../types";


interface NavigationItem {
    name: string;
    route: string;
    current: boolean;
    icon: React.ReactNode;
}

interface SidebarProps {
    title: string;
    navigation: NavigationItem[];
    userNavigation: NavigationItem[];
}

export default function DefaultSidebar({ title, navigation, userNavigation }: SidebarProps) {

    const check = true; 

    return (
        <Card
            className="fixed top-0 left-0 h-screen w-full max-w-[20rem] p-4 rounded-none bg-gray-50 shadow-none  dark:bg-neutral-950"
            placeholder=""
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
        >

            <Menu as="div" className="relative">
                <MenuButton className="p-2 flex flex-row gap-5 justify-start rounded-md hover:bg-blue-gray-50 focus:bg-blue-gray-50">

                    {
                        (check) ? (<UserCircleIcon className="w-8 h-8" />) : (<Avatar src={"https://docs.material-tailwind.com/img/face-2.jpg"} alt="avatar" variant="rounded" size="sm" {...suppressMissingAttributes} />)
                    }
                    <div className="flex flex-col justify-start">
                        <Typography variant="h6" color="blue-gray" className="pb-1 leading-none text-left dark:text-white" {...suppressMissingAttributes}>
                            {sessionStorage.getItem("first_name")} {sessionStorage.getItem("last_name")}
                        </Typography>
                        <Typography color="gray" className="m-0 leading-none dark:text-white" {...suppressMissingAttributes}>
                            {sessionStorage.getItem("email")}
                        </Typography>

                    </div>
                    <ChevronUpDownIcon className="w-8 h-8 my-auto text-gray-400" />
                </MenuButton>

                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-full max-w-[20rem] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <MenuItem {...suppressMissingAttributes}>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                            Your Profile
                        </a>
                    </MenuItem>
                    <MenuItem {...suppressMissingAttributes}>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                            Settings
                        </a>
                    </MenuItem>
                    <MenuItem {...suppressMissingAttributes}>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                            Sign out
                        </a>
                    </MenuItem>
                </MenuItems>
            </Menu>
            <hr className=" mt-2 border-blue-gray-50" />


            <List className="pt-10" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                {
                    navigation.map((item, index) => {
                        const { name, route, icon } = item;

                        const className = (name === title) ? "dark:text-white bg-blue-gray-50" : "dark:text-white";

                        return (
                            <Link to={route} key={index}>
                                <ListItem
                                    key={index} className={className} placeholder=""
                                    onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                                >
                                    <ListItemPrefix
                                        placeholder=""
                                        onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                                    >
                                        {icon}
                                    </ListItemPrefix>
                                    {name}
                                </ListItem>
                            </Link>
                        );
                    })
                }
            </List>

            <List className="mt-auto" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                <hr className=" mt-2 border-blue-gray-50" />
                {
                    userNavigation.map((item, index) => {
                        const { name, route, icon } = item;

                        return (
                            <Link to={route} key={index}>
                                <ListItem
                                    key={index} className="dark:text-white" placeholder=""
                                    onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                                >
                                    <ListItemPrefix
                                        placeholder=""
                                        onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                                    >
                                        {icon}
                                    </ListItemPrefix>
                                    {name}
                                </ListItem>
                            </Link>
                        );
                    })
                }
            </List>
        </Card>
    );
}