import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { ApplicationData } from "../types";

const NewApplicationDetails = () => {

    const data = useLoaderData() as { application: ApplicationData };

    return (
        <Suspense fallback={<Loading />}>
            <Await
                resolve={data.application}
                errorElement={<div>Error fetching application data</div>}
            >
                {(applicationData) => {
                    console.log(applicationData);
                    return (
                        <div className="absolute size-full bg-blue-500 top-0">
                            <h1>This is the application data</h1>
                            <h1>{applicationData.company_name}</h1>
                            <p>{applicationData.job_title}</p>
                            <p>{applicationData.description}</p>
                        </div>
                    )
                }}

            </Await>
        </Suspense>

    )
}

const Loading = () => {
    console.log("Loading...");
    return (
        <div className="absolute size-full bg-blue-500">
            Loading...
        </div>
    )
}

export default NewApplicationDetails;