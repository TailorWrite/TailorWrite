import {
  Button
} from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";

import { Form } from 'react-router-dom'

import { Datepicker as FlowbiteDatepicker } from "flowbite-react"; // Renamed


// Import the useLoaderData hook from react-router
import { useLoaderData } from 'react-router-dom';
import { ProfileData } from '../types';

export function DatePicker(props) {
  return <FlowbiteDatepicker {...props} />;
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

function ExperienceForm({ index, initialData = {} }) {
  const [formData, setFormData] = useState({
    job_title: initialData.job_title || '',
    company_name: initialData.company_name || '',
    is_current_job: initialData.is_current_job || false,
    start_date: formatDate(initialData.start_date) || null,
    end_date: formatDate(initialData.end_date) || null,
    description: initialData.description || '',
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateChange = (date, fieldName) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: formatDate(date)
    }));
  };

  return (
    <Form method="post">
      <div className="border-b border-gray-900/10 pb-12">
        <h3 className="text-base font-semibold leading-7 text-gray-900 mt-5">Experience {index + 1}</h3>
        <p className="mt-1 text-sm leading-6 text-gray-600">Please add your previous experience</p>

        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor={`job_title-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
              Job Title
            </label>
            <div className="mt-2">
              <input
                id={`job_title-${index}`}
                name="job_title"
                type="text"
                value={formData.job_title}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
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
                name="company_name"
                type="text"
                value={formData.company_name}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="flex items-center mb-2 col-span-full">
            <input
              id={`is_current_job-${index}`}
              name="is_current_job"
              type="checkbox"
              checked={formData.is_current_job}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={`is_current_job-${index}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              I currently work here
            </label>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label htmlFor={`start_date-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
              Start Date
            </label>
            <DatePicker
              id={`start_date-${index}`}
              name="start_date"
              onSelectedDateChanged={(date) => handleDateChange(date, 'start_date')}
              value={formData.start_date}
              placeholderText="Start Date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
          </div>

          {!formData.is_current_job && (
            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor={`end_date-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                End Date
              </label>
              <DatePicker
                id={`end_date-${index}`}
                name="end_date"
                onSelectedDateChanged={(date) => handleDateChange(date, 'end_date')}
                value={formData.end_date}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 ${formData.is_current_job ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                placeholderText="End Date"
                disabled={formData.is_current_job}
                required={!formData.is_current_job}
              />
            </div>
          )}

          <div className="col-span-full mt-2">
            <label htmlFor={`description-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea
              id={`description-${index}`}
              name="description"
              maxLength={2000}
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </Form>
  );
}

export function SkillForm({ index, initialData = {} }) {
  const [formData, setFormData] = useState({
    skill_name: initialData.skill_name || '',
    proficiency_level: initialData.proficiency_level || ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="border-b border-gray-900/10 pb-12 mb-4">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Skill {index + 1}
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Please provide skills you have
      </p>

      <div className="sm:col-span-3">
        <label
          htmlFor={`skill_name-${index}`}
          className="block text-sm font-medium leading-6 text-gray-900 mt-2"
        >
          Skill Name
        </label>
        <div className="mt-2">
          <input
            id={`skill_name-${index}`}
            name="skill_name"
            type="text"
            value={formData.skill_name}
            onChange={handleInputChange}
            autoComplete="skill"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label
          htmlFor={`proficiency_level-${index}`}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Proficiency Level
        </label>
        <div className="mt-2">
          <input
            id={`proficiency_level-${index}`}
            name="proficiency_level"
            type="text"
            value={formData.proficiency_level}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
      </div>
    </div>
  );
}


function EducationForm({ index, initialData = {} }) {
  const [formData, setFormData] = useState({
    institution_name: initialData.institution_name || '',
    degree: initialData.degree || '',
    field_of_study: initialData.field_of_study || '',
    start_date: formatDate(initialData.start_date) || null,
    end_date: formatDate(initialData.end_date) || null,
    description: initialData.description || ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (date, fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: formatDate(date)
    }));
  };

  return (
    <Form method="post">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Previous Education {index + 1}
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Please add your previous education
        </p>

        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor={`institution_name-${index}`}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Institution Name
            </label>
            <div className="mt-2">
              <input
                id={`institution_name-${index}`}
                name="institution_name"
                type="text"
                value={formData.institution_name}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor={`degree-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
              Degree
            </label>
            <div className="mt-2">
              <input
                id={`degree-${index}`}
                name="degree"
                type="text"
                value={formData.degree}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor={`field_of_study-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
              Field of Study
            </label>
            <div className="mt-2">
              <input
                id={`field_of_study-${index}`}
                name="field_of_study"
                type="text"
                value={formData.field_of_study}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor={`start_date-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
              Start Date
            </label>
            <div className="mt-2">
              <DatePicker
                id={`start_date-${index}`}
                name="start_date"
                value={formData.start_date}
                onSelectedDateChanged={(date) => handleDateChange(date, 'start_date')}
                placeholderText="Start Date"
                className="block w-full rounded-md py-1.5 text-gray-900"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor={`end_date-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
              End Date
            </label>
            <div className="mt-2">
              <DatePicker
                id={`end_date-${index}`}
                name="end_date"
                value={formData.end_date}
                onSelectedDateChanged={(date) => handleDateChange(date, 'end_date')}
                placeholderText="End Date"
                className="block w-full rounded-md py-1.5 text-gray-900"
                required
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor={`education-description-${index}`}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id={`education-description-${index}`}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                maxLength={2000}
                rows={4}
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}


// Main ProfilePage Component
export default function ProfilePage() {

  const loaderData: ProfileData = useLoaderData() as ProfileData;

  // Load the data into a useState hook to access it in the component
  const [data, setData] = useState<ProfileData>(loaderData);

  const [experienceForms, setExperienceForms] = useState([]);
  const [skillForms, setSkillForms] = useState([]);
  const [educationForms, setEducationForms] = useState([]);


  console.log(data);

  useEffect(() => {
    // Initialize experience forms with existing data
    if (data.get('experience') && data.get('experience').length > 0) {
      setExperienceForms(data.get('experience'));
    }
    if (data.get('skills') && data.get('skills').length > 0) {
      setSkillForms(data.get('skills'));
    }
    if (data.get('education') && data.get('education').length > 0) {
      setEducationForms(data.get('education'));
    }
  }, [data]);

  const addExperienceForm = () => {
    if (experienceForms.length < 8) {
      setExperienceForms([...experienceForms, {}]);
    } else {
      alert("You can only add up to 8 experience fields.");
    }
  };

  const addSkillForm = () => {
    if (skillForms.length < 8) {
      setSkillForms([...skillForms, {}]);
    } else {
      alert("You can only add up to 8 skills fields.");
    }
  };

  const addEducationForm = () => {
    if (educationForms.length < 3) {
      setEducationForms([...educationForms, {}]);
    } else {
      alert("You can only add up to  previous education experiences.");
    }
  };

  return (
    <Form method="post">
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
                  defaultValue={data.get('user').first_name}
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
                  defaultValue={data.get('user').last_name}
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
                  defaultValue={data.get('user').email}
                />
              </div>
            </div>
          </div>


        </div>


        {/* Show the experience form when button is clicked */}
        {experienceForms.map((experience, index) => (
          <ExperienceForm key={index} index={index} initialData={experience} />
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

        {skillForms.map((skill, index) => (
          <SkillForm key={index} index={index} initialData={skill} />
        ))}

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row mt-4">
          <Button
            className="flex items-center gap-3 dark:bg-white dark:text-black"
            size="sm"
            onClick={addSkillForm}
          >
            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Skill
          </Button>
        </div>

        {educationForms.map((education, index) => (
          <EducationForm key={index} index={index} initialData={education} />
        ))}

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row mt-4">
          <Button
            className="flex items-center gap-3 dark:bg-white dark:text-black"
            size="sm"
            onClick={addEducationForm}
          >
            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Education
          </Button>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 pb-2">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>

    </Form>
  );


}


