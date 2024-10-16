import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { Card, List, ListItem, ListItemPrefix, MenuItem } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import { suppressMissingAttributes, UserProfile } from "../../types";
import PathConstants from "../../pathConstants";


interface NavigationItem {
    name: string;
    route: string;
    current: boolean;
    icon: React.ReactNode;
    onClick?: () => void; // Optional click handler
}


interface SidebarProps {
    navigation: NavigationItem[];
    userNavigation: NavigationItem[];
}

export default function DefaultSidebar({ navigation, userNavigation }: SidebarProps) {
    const location = useLocation();
    const currentPath = location.pathname;

    const getUserProfile = (): UserProfile => ({
        name: `${sessionStorage.getItem("first_name") ?? ""} ${sessionStorage.getItem("last_name") ?? ""}`,
        email: sessionStorage.getItem("email") ?? "",
        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" // null,
    })

    const [profile] = useState<UserProfile>(getUserProfile());

    return (
        <Card
            className="fixed top-0 left-0 h-screen w-full max-w-[20rem] p-4 rounded-none bg-gray-50 shadow-none dark:bg-transparent"
            placeholder=""
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
        >

            <Menu as="div" className="relative p-2">
                <MenuButton className="w-full flex flex-row gap-2 justify-between rounded-md hover:bg-blue-gray-50 focus:bg-blue-gray-50 dark:hover:bg-secondaryDark dark:focus:bg-secondaryDark">

                    {profile.img && (
                        <img className="inline-block size-9 rounded-lg mr-2" src={profile.img} alt="Profile image" />
                    )}

                    <div className="flex-grow flex flex-col gap-y-1 justify-start truncate">
                        <h6 className="leading-none text-left font-semibold truncate text-neutral-800 dark:text-primaryDarkText">
                            {profile.name}
                        </h6>
                        <p className="leading-none text-left text-sm font-thin truncate dark:text-secondaryDarkText">
                            {profile.email}
                        </p>

                    </div>

                    <ChevronUpDownIcon className="size-8 my-auto text-neutral-800 dark:text-secondaryDarkText" />

                </MenuButton>

                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-full max-w-[20rem] origin-top-right rounded-md py-1 bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in dark:bg-primaryDark dark:text-primaryDarkText dark:ring-darkBorder"
                >
                    <MenuItem className="dark:hover:bg-secondaryDark dark:text-primaryDarkText" {...suppressMissingAttributes}>
                        <Link to={PathConstants.PROFILE} className="block px-4 py-2 text-sm data-[focus]:bg-gray-100">
                            Your Profile
                        </Link>
                    </MenuItem>
                    <MenuItem className="dark:hover:bg-secondaryDark dark:text-primaryDarkText" {...suppressMissingAttributes}>
                        <Link to={PathConstants.SETTINGS} className="block px-4 py-2 text-sm data-[focus]:bg-gray-100">
                            Settings
                        </Link>
                    </MenuItem>
                    <MenuItem className="dark:hover:bg-secondaryDark dark:text-primaryDarkText" {...suppressMissingAttributes}>
                        <a href="#" className="block px-4 py-2 text-sm data-[focus]:bg-gray-100">
                            Sign out
                        </a>
                    </MenuItem>
                </MenuItems>
            </Menu>
            <hr className=" mt-2 border-blue-gray-50 dark:border-darkBorder" />


            <List className="pt-10 dark:text-primaryDarkText" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                {
                    navigation.map((item, index) => {
                        const { name, route, icon } = item;

                        return (
                            <Link to={route} key={index}>
                                <ListItem
                                    key={index}
                                    className={clsx(
                                        "hover:text-blue-500 dark:hover:bg-secondaryDark",
                                        route == currentPath ? "bg-neutral-100 text-blue-500 dark:bg-secondaryDark dark:text-primaryDarkAccent" : "dark:text-primaryDarkText"
                                    )}
                                    placeholder=""
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

            <List className="mt-auto dark:text-primaryDarkText" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                <hr className="mt-2 border-blue-gray-50 dark:border-darkBorder" />
                {
                    userNavigation.map((item, index) => {
                        const { name, route, icon, onClick } = item;

                        return (
                            <Link
                                to={route}
                                key={index}
                                onClick={(event) => {
                                    if (onClick) {
                                        event.preventDefault(); // Prevent navigation if onClick is defined
                                        onClick(); // Call the click handler
                                    }
                                }}
                            >
                                <ListItem
                                    key={index}
                                    className={clsx(
                                        "hover:text-blue-500 dark:hover:bg-secondaryDark",
                                        route === currentPath ? "bg-neutral-100 text-blue-500 dark:bg-secondaryDark dark:text-primaryDarkAccent" : "dark:text-primaryDarkText"
                                    )}
                                    placeholder=""
                                    onPointerEnterCapture={() => { }}
                                    onPointerLeaveCapture={() => { }}
                                >
                                    <ListItemPrefix
                                        placeholder=""
                                        onPointerEnterCapture={() => { }}
                                        onPointerLeaveCapture={() => { }}
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