import { useEffect, useRef, useState } from 'react';
import { codeToHtml } from 'shiki';
import { toast } from 'react-toastify';

import DataDisplay, { DataDisplayRow } from '../../components/common/DataDisplay';
import CopyToClipboard from '../../components/common/CopyToClipboard';

function isDarkMode() {
  return document.documentElement.classList.contains('dark');
}

const DataSettings = () => {

    const userData = {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890",
        "address": {
            "street": "1234 Elm St",
            "city": "Springfield",
            "state": "IL",
            "zip": "62701"
        },
        "profile": {
            "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "avatar": "https://randomuser.me/api/port"
        },
        "settings": {
            "theme": "dark",
            "notifications": {
                "email": true,
                "push": true
            }
        },
        "applications": [
            {
                "name": "My Application",
                "description": "A short description of my application",
                "url": "https://example.com",
                "status": "active"
            },
            {
                "name": "Another Application",
                "description": "Another short description",
                "url": "https://example.com",
                "status": "inactive"
            }
        ]
    };

    const DataOptions: DataDisplayRow[] = [
        {
            title: "Import Data from CSV",
            description: "Import your data from a .tailorwrite.csv file",
            component: <ImportData />
        },
        {
            title: "User Data",
            description: "View your user data",
            component: <ViewUserData data={userData} />
        },
        {
            title: "Export Data as CSV",
            description: "Export your data as a CSV file",
            component: <ExportData userData={userData}/>
        },
        {
            title: "Download all Files",
            description: "Download all your files. This includes uploaded files, images, documents and generated cover letters.",
            component: <DownloadFiles />
        },
        {
            title: <p className="mb-1 text-red-500 text-lg">Danger Zone</p>,
            description: "Ensure you have exported your data before deleting it. This is an irreversible action.",
            isHeading: true
        },
        {
            title: "Delete Data",
            description: "Delete all your data permanently",
            component: <DeleteData />
        },
    ]

    return (
        <DataDisplay data={DataOptions} />
    )
}

export default DataSettings


const ImportData = () => {

    // const submit = useSubmit();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }

        // Submit the form
        const newForm = new FormData();
        newForm.append('file', file as File);
        newForm.append('action', 'import');

        const toastId = toast.loading('Importing data...', { autoClose: false });

        setTimeout(() => {
            toast.update(toastId, {
                render: 'Data imported successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            });
        }, 2000);
        // submit(newForm, { method: "post"  });

    };

    return (
        <div>
            <template>
                <div className="flex items-center w-full">
                    <span className="grow-0 overflow-hidden truncate" data-hs-file-upload-file-name="">
                        {selectedFile ? selectedFile.name.split('.').slice(0, -1).join('.') : ''}
                    </span>
                    <span className="grow-0">.</span>
                    <span className="grow-0" data-hs-file-upload-file-ext="">
                        {selectedFile ? selectedFile.name.split('.').pop() : ''}
                    </span>
                </div>
            </template>

            <input
                type="file"
                className="hidden"
                id="file-upload"
                accept='.csv'
                onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="relative flex w-full border overflow-hidden border-gray-200 shadow-sm rounded-lg text-sm focus:outline-none focus:z-10 focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:border-neutral-600 cursor-pointer">
                <span className="h-full py-3 px-4 bg-gray-100 text-nowrap dark:bg-neutral-800">Choose File</span>
                <span className="group grow flex overflow-hidden h-full py-3 px-4">
                    <span className="group-has-[div]:hidden">
                        {selectedFile ? selectedFile.name : 'No Chosen File'}
                    </span>
                </span>
                <span className="absolute top-0 left-0 w-full h-full" data-hs-file-upload-trigger=""></span>
            </label>
        </div>
    );
};


interface ExportDataProps {
    userData: object;
}

const ExportData = ({ userData }: ExportDataProps) => {

    const downloadLinkRef = useRef<HTMLAnchorElement>(null);

    const handleExport = () => {

        // Create a JSON file with the user data
        const JSONData = JSON.stringify(userData);
        const blob = new Blob([JSONData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Download the file
        const link = downloadLinkRef.current;
        if (link) {
            link.href = url;
            link.download = 'user-data.json';
            link.click();
        } else {
            console.error('Download link not found');
        }


        const toastId = toast.loading('Exporting data...', { autoClose: false });
        setTimeout(() => {
            toast.update(toastId, {
                render: 'Data exported successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            });
        }, 2000);
    }

    return (
        <div className="w-full flex justify-end">
            <button
                type="button"
                className="inline-flex w-full mr-5 justify-center rounded-md  px-3 py-2 text-sm text-gray-700 border border-gray-200 hover:bg-blue-500 hover:text-gray-50 sm:w-auto dark:border-darkBorder dark:text-primaryDarkText dark:hover:bg-blue-600 shadow"
                onClick={handleExport}
            >
                Export data
            </button>
            <a ref={downloadLinkRef} href="" className="hidden">Export Data</a>
        </div>

    )
}

const DownloadFiles = () => {
    const handleDownload = () => {
        const toastId = toast.loading('Downloading files...', { autoClose: false });
        setTimeout(() => {
            toast.update(toastId, {
                render: 'Files downloaded successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            });
        }, 2000);
    }

    return (
        <div className="w-full flex justify-end">
            <button
                type="button"
                className="inline-flex w-full mr-5 justify-center rounded-md  px-3 py-2 text-sm text-gray-700 border border-gray-200 hover:bg-blue-500 hover:text-gray-50 sm:w-auto dark:border-darkBorder dark:text-primaryDarkText dark:hover:bg-blue-600 shadow"
                onClick={handleDownload}
            >
                Export data
            </button>
        </div>
    )
}

interface ViewUserDataProps {
    data: object;
}

const ViewUserData: React.FC<ViewUserDataProps> = ({ data }) => {
    const [html, setHtml] = useState<string>('');
    const [darkMode, setDarkMode] = useState<boolean>(isDarkMode());

    useEffect(() => {
        const fetchHtml = async () => {
            const dataStringified = JSON.stringify(data, null, 2);
            const result = await codeToHtml(dataStringified, { 
                lang: 'json',
                themes: {
                    light: 'one-light',
                    dark: 'one-dark-pro'
                }
            });
            setHtml(result);
        };

        setDarkMode(isDarkMode());
        fetchHtml();
    }, [data, darkMode]);

    return (
        <div id="view-user-data" className="overflow-hidden rounded-2xl">
            <div className="max-h-72 rounded-2xl overflow-scroll shadow-sm bg-[#fafafa] dark:bg-[#282c34]">
                <CopyToClipboard 
                    className="absolute right-10 !bg-transparent border-transparent shadow-transparent"
                    text={JSON.stringify(data)} 
                />
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );
};

const DeleteData = () => {
    return (
        <div className="w-full flex justify-end">
            <button
                type="button"
                className="inline-flex w-full mr-5 justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-red-500 sm:w-auto"
            >
                Delete Data
            </button>

        </div>
    )
}