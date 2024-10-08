export default function ApplicationDetails() {

    return (
        <div className="relative h-full ">

            <div className=" h-4 mx-5 px-0 bg-transparent flex gap-x-3 ">
                <div className="skeleton rounded w-24"></div>
                <div className="skeleton rounded w-24"></div>
                <div className="skeleton rounded w-24"></div>
            </div>


            {/* Heading */}
            <div className="m-5 ">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex flex-row items-center gap-5 min-w-0 flex-1">
                        <div className="skeleton h-10 w-10 rounded-full"></div>
                        <div className="skeleton h-8 rounded w-3/4"></div>
                    </div>

                    <div className="mt-5 flex lg:ml-4 lg:mt-0">
                        <div className="skeleton h-9 w-24 rounded-md"></div>
                        <div className="skeleton sm:ml-3 h-9 w-24 rounded-md"></div>
                        <div className="skeleton relative ml-3 sm:hidden h-9 w-24 rounded-md"></div>
                    </div>
                </div>
            </div>

            <div className="skeleton h-6 mx-5 px-0 bg-transparent flex gap-x-6 ">
                <div className="h-full rounded-md w-28"></div>
                <div className="h-full rounded-md w-52"></div>
                <div className="h-full rounded-md w-52"></div>
                <div className="h-full rounded-md w-52"></div>
            </div>

            <hr className="skeleton my-5 border-lightBorder dark:border-darkBorder" />


            {/* Body */}
            <div className="py-4 px-2 grid grid-cols-[auto_38%] gap-y-10  md:gap-x-5 ">
                <div className="flex flex-col gap-y-6">
                    {/* Job description & Timeline */}

                    <div className="flex flex-col gap-y-4">
                        <div className="skeleton h-3 w-40 rounded-full"></div>
                        <div className="skeleton h-24 rounded-md"></div>

                        <div className="ml-3 -mt-5">
                            <span className="w-[28px] grid justify-center">
                                <span className=" h-4 border-l-2 border-gray-200 dark:border-darkBorder"></span>
                            </span>

                            <div className="flex flex-row items-center gap-x-4 ">
                                <div className="skeleton rounded-full size-4 p-[.85rem]"></div>
                                <div className="skeleton h-2 w-60 rounded-full"></div>
                            </div>
                            
                            <span className="w-[28px] grid justify-center">
                                <span className=" h-4 border-l-2 border-gray-200 dark:border-darkBorder"></span>
                            </span>
                            <div className="flex flex-row items-center gap-x-4 ">
                                <div className="skeleton rounded-full size-4 p-[.85rem]"></div>
                                <div className="skeleton h-2 w-60 rounded-full"></div>
                            </div>
                            
                            <span className="w-[28px] grid justify-center">
                                <span className=" h-4 border-l-2 border-gray-200 dark:border-darkBorder"></span>
                            </span>

                        </div>
                    </div>
                    
                    {/* Additional Notes */}
                    <div className="flex flex-col gap-y-4">
                        <div className="skeleton h-3 w-40 rounded-full"></div>
                        <div className="skeleton h-32 rounded-md"></div>
                    </div>

                    {/* Documents */}
                    <div className="flex flex-col gap-y-3">
                        <div className="flex flex-row justify-between">
                            <div className="skeleton h-3 w-40 rounded-full"></div>
                            <div className="skeleton h-5 w-40 rounded-md"></div>
                        </div>
                        <div className="skeleton h-32 rounded-md"></div>
                    </div>

                </div>

                <div className="flex flex-col gap-y-6">
                    
                    {/* Cover Letter */}
                    <div className="flex flex-col gap-y-3">
                        <div className="flex flex-row justify-between items-center">
                            <div className="skeleton h-3 w-40 rounded-full"></div>
                            <div className="skeleton h-5 w-40 rounded-md"></div>
                        </div>
                        <div className="skeleton h-96 rounded-md"></div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-y-3">
                        <div className="skeleton h-3 w-40 rounded-full"></div>
                        <hr className="animate-pulse border-gray-200/80 dark:border-neutral-800" />
                        
                        <div className=" flex flex-col gap-y-4">
                            <div className="skeleton h-3 w-52 rounded-full"></div>
                            <div className="skeleton h-3 w-52 rounded-full"></div>
                            <div className="skeleton h-3 w-52 rounded-full"></div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    );
}