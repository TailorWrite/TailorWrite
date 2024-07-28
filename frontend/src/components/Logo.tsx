interface LogoProps {
    className?: string;
}

export default function Logo({ className }: LogoProps) {
    return (
        <img
            alt="TailorWrite logo"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            // className={`h-8 w-auto ${className}`}
            className={className}
        />
    );
}