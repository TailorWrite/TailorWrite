import React, { useEffect, useRef, useState } from 'react';
import Clipboard from 'clipboard';
import clsx from 'clsx';

interface CopyButtonProps {
    className?: string;
    text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ className, text }) => {
    const [copyStatus, setCopyStatus] = useState<string>('');
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (buttonRef.current) {
            const clipboard = new Clipboard(buttonRef.current);

            clipboard.on('success', () => {
                setCopyStatus('Copied!');
                setTimeout(() => setCopyStatus(''), 2000);
            });

            clipboard.on('error', () => {
                setCopyStatus('Failed to copy');
                setTimeout(() => setCopyStatus(''), 2000);
            });

            return () => {
                clipboard.destroy();
            };
        }
    }, []);

    return (
        <>
                <button 
                    ref={buttonRef} 
                    data-clipboard-text={text}
                    type="button" 
                    className={clsx(
                        className,
                        "js-clipboard-example p-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg",
                        "border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none", 
                        "focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-transparent", 
                        "dark:text-primaryDarkText dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    )}
                >

                    { copyStatus === 'Copied!' ? <GreenTickIcon /> : <ClipboardIcon /> }    
                </button>
        </>
    );
};

const GreenTickIcon = () => {
    return (
        <svg className="js-clipboard-success size-4 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    );
}

const ClipboardIcon = () => {
    return (
        <svg className="js-clipboard-default size-4 group-hover:rotate-6 transition" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        </svg>
    );
}

export default CopyButton;