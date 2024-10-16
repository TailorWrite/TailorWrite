export interface DataDisplayRow {
    title: string | JSX.Element;
    description: string | JSX.Element;
    component?: JSX.Element;
    isHeading?: boolean;
}

export interface DataDisplayProps {
    data: DataDisplayRow[];
}

export default function DataDisplay({ data }: DataDisplayProps) {

    return (
        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
            {
                data.map((option) => (
                    <div key={option.title as string} className="px-4 py-6 col-span-3 border-b border-gray-200 dark:border-neutral-700 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">

                        { option.isHeading ? (
                            <dt className="text-sm font-bold leading-6 col-span-full text-gray-900 dark:text-primaryDarkText ">
                                <p className="text-lg mb-1 font-bold leading-6 text-gray-900 dark:text-secondaryDarkText">
                                    {option.title}
                                </p>
                                
                                <p className="text-sm font-normal text-gray-400 ">{option.description}</p>
                            </dt>
                        ) : (
                            <dt className="">
                                <p className="text-sm font-bold leading-6 text-gray-900 dark:text-primaryDarkText"> {option.title} </p>
                                <p className="text-sm font-normal text-gray-400 dark:text-secondaryDarkText"> {option.description} </p>
                            </dt>
                        )}

                        { option.component && (
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {option.component}
                            </dd>
                        )}

                        
                    </div>
                ))
            }
        </div>
    )
}