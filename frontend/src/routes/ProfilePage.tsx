import {
  Button
} from "@material-tailwind/react";

import React, { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";

// ExperienceForm Component
function ExperienceForm({index})  {
  const [isCurrentJob, setIsCurrentJob] = useState(false);

  // Handler for checkbox change
  const handleCheckboxChange = (event) => {
    setIsCurrentJob(event.target.checked);
  };

  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h3 className="text-base font-semibold leading-7 text-gray-900 mt-5">Experience {index + 1}</h3>

      <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor={`job-title-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
            Job Title
          </label>
          <div className="mt-2">
            <input
              id={`job_title-${index}`}
              name={`job_title-name-${index}`}
              type="text"
              autoComplete="job_title"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor={`company_name-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
            Company Name
          </label>
          <div className="mt-2">
            <input
              id={`company_name-${index}`}
              name={`company_name-${index}`}
              type="text"
              autoComplete="company-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="flex items-center mb-2 col-span-full">
          <input
            id={`is_current_job-${index}`}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            checked={isCurrentJob}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`is_current_job-${index}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            I currently work here
          </label>
        </div>

        <div className="relative max-w-sm col-span-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
            </svg>
          </div>
          <input
            datepicker
            id={`start_date-${index}`}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Start Date"
          />
        </div>

        <div className="relative max-w-sm col-span-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
            </svg>
          </div>
          <input
            id={`end_date-${index}`}
            type="text"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 ${isCurrentJob ? 'bg-gray-200 cursor-not-allowed' : ''}`}
            placeholder="End Date"
            disabled={isCurrentJob} // Disable if checkbox is checked
          />
        </div>

        <div className="col-span-full mt-2">
          <label htmlFor={`description-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <textarea
            id={`description-${index}`}
            maxLength={2000}
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

// Main ProfilePage Component
export default function ProfilePage() {

  const [experienceForms, setExperienceForms] = useState([]);

  const addExperienceForm = () => {
    setExperienceForms([...experienceForms, {}]);
  };

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
          
          {/* Add other personal information fields here */}


         <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
           <div className="sm:col-span-3">
             <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
               First name
             </label>
             <div className="mt-2">
               <input
                 id="first-name"
                 name="first-name"
                 type="text"
                 autoComplete="given-name"
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>


           <div className="sm:col-span-3">
             <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
               Last name
             </label>
             <div className="mt-2">
               <input
                 id="last-name"
                 name="last-name"
                 type="text"
                 autoComplete="family-name"
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>


           <div className="sm:col-span-4">
             <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
               Email address
             </label>
             <div className="mt-2">
               <input
                 id="email"
                 name="email"
                 type="email"
                 autoComplete="email"
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>


           <div className="sm:col-span-3">
             <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
               Country
             </label>
             <div className="mt-2">
               <select
                 id="country"
                 name="country"
                 autoComplete="country-name"
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
               >
                 <option>New Zealand</option>
                 <option>Canada</option>
                 <option>Mexico</option>
               </select>
             </div>
           </div>


           <div className="col-span-full">
             <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
               Street address
             </label>
             <div className="mt-2">
               <input
                 id="street-address"
                 name="street-address"
                 type="text"
                 autoComplete="street-address"
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>


           <div className="sm:col-span-2 sm:col-start-1">
             <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
               City
             </label>
             <div className="mt-2">
               <input
                 id="city"
                 name="city"
                 type="text"
                 autoComplete="address-level2"
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>


           <div className="sm:col-span-2">
             <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
               State / Province
             </label>
             <div className="mt-2">
               <input
                 id="region"
                 name="region"
                 type="text"
                 autoComplete="address-level1"
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>


           <div className="sm:col-span-2">
             <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
               ZIP / Postal code
             </label>
             <div className="mt-2">
               <input
                 id="postal-code"
                 name="postal-code"
                 type="text"
                 autoComplete="postal-code"
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>
         </div>
     

        </div>

        {/* Show the experience form when button is clicked */}
        {experienceForms.map((_, index) => (
          <ExperienceForm key={index} index={index} />
        ))}

      <div className="flex shrink-0 flex-col gap-2 sm:flex-row mt-4">
          <Button
            className="flex items-center gap-3 dark:bg-white dark:text-black"
            size="sm"
            onClick={addExperienceForm}
          >
            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Experience
          </Button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 pb-2">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}

