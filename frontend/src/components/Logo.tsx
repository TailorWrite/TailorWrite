import { BriefcaseIcon, CubeTransparentIcon, FingerPrintIcon } from "@heroicons/react/24/solid";

interface LogoProps {
    className?: string;
}



export default function Logo({ className }: LogoProps) {
    return (

        <BriefcaseIcon className={`${className} text-sky-400`} />

        // <img
        //     alt="TailorWrite logo"
        //     src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        //     // className={`h-8 w-auto ${className}`}
        //     className={className}
        // />
    );
}