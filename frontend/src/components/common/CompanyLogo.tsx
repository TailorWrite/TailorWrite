import React, { useState } from 'react';
import clsx from 'clsx';

interface CompanyLogoProps {
    className?: string;
    url: string | null;
    alt?: string;
    errorComponent?: React.ReactNode;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ className, url, alt, errorComponent }) => {
    const [imageError, setImageError] = useState(false);

    // Returning custom error component if provided
    if ( (!url || imageError) && errorComponent) return (
        <>{errorComponent}</>
    )

    // Returning default error component 
    if (!url || imageError) return (
        <div
            className={clsx(
                "skeleton size-9 rounded-full bg-gray-200",
                className
            )}
        />
    );

    // Returning image component
    return (
        <img
            className={clsx(
                "size-9 rounded-full inline-block",
                className
            )}
            src={url}
            alt={alt ?? ''}
            onError={() => setImageError(true)}
        />
    );
}

export default CompanyLogo;
