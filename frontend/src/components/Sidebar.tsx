import React from "react";

import { Card, Typography, List, ListItem, ListItemPrefix, /* Alert */ } from "@material-tailwind/react";
// import { CubeTransparentIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

interface NavigationItem {
    name: string;
    route: string;
    current: boolean;
    icon: React.ReactNode;
}

export default function DefaultSidebar({ title, navigation, userNavigation }: { title: string, navigation: NavigationItem[], userNavigation: NavigationItem[]}) {
    
    return (
        <Card
            className="fixed top-0 left-0 h-screen w-full max-w-[20rem] p-4 pt-20  dark:bg-gray-800"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
        >
            <div className="mb-2 p-4">
                <Typography className="dark:text-white" variant="h5" color="blue-gray" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                    Dashboard {title}
                </Typography>
            </div>
            <List placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                {
                    navigation.map((item, index) => {
                        const { name, route, icon } = item;

                        return (
                            <Link to={route} key={index}>
                                <ListItem
                                    key={index} className="dark:text-white" placeholder=""
                                    onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}
                                >
                                    <ListItemPrefix
                                        placeholder=""
                                        onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}
                                    >
                                        {icon}
                                    </ListItemPrefix>
                                    {name}
                                </ListItem>
                            </Link>
                        );
                    })
                }

                <hr className="my-2 border-blue-gray-50" />

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

            {/* <Alert open={openAlert} className="mt-auto" onClose={() => setOpenAlert(false)}>
                <CubeTransparentIcon className="mb-4 h-12 w-12" />
                <Typography variant="h6" className="mb-1">
                    Upgrade to PRO
                </Typography>
                <Typography variant="small" className="font-normal opacity-80">
                    Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features
                    and premium.
                </Typography>
                <div className="mt-4 flex gap-3">
                    <Typography
                        as="a"
                        href="#"
                        variant="small"
                        className="font-medium opacity-80"
                        onClick={() => setOpenAlert(false)}
                    >
                        Dismiss
                    </Typography>
                    <Typography as="a" href="#" variant="small" className="font-medium">
                        Upgrade Now
                    </Typography>
                </div>
            </Alert> */}
        </Card>
    );
}