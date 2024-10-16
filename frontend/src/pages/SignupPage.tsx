import clsx from 'clsx';

import { useDarkMode } from '../hooks/useDarkMode';

import DarkModeImage from '../assets/darkMode.png';
import LightModeImage from '../assets/lightMode.png';
import { Form, Link } from 'react-router-dom';
import PathConstants from '../pathConstants';

const NewSignupPage = () => {
	return (
		<div className="h-screen grid md:grid-cols-[33%_auto] gap-x-4 dark:bg-[#171717]">
			<div className="hidden pl-10 h-full md:flex justify-around items-center shadow-lg dark:bg-secondaryDark">
				<LeftPanel />
			</div>
			<div className="h-full flex justify-around items-center">
				<RegisterForm />
			</div>
		</div>
	)
}

export default NewSignupPage

const RegisterForm = () => {
	return (
		<div className="max-w-md flex-grow">
			<div className="p-4 sm:p-7">
				<div className="text-center">
					<h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign up</h1>
					<p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
						Already have an account?
						<Link className="ml-1 text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500" to={PathConstants.LOGIN}>
							Sign in here
						</Link>
					</p>
				</div>

				<div className="mt-5">
					<button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-secondaryDark dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
						<svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
							<path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
							<path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
							<path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
							<path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
						</svg>
						Sign up with Google
					</button>

					<div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">Or</div>

					<Form method="post">
						<div className="grid gap-y-4">
							<div className="flex flex-row gap-5">
								<div>
									<label htmlFor="first-name" className="block text-sm mb-2 dark:text-white">First Name</label>
									<input type="text" id="first-name" name="first-name" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="email-error" />
								</div>
								<div>
									<label htmlFor="last-name" className="block text-sm mb-2 dark:text-white">Last Name</label>
									<input type="text" id="last-name" name="last-name" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="email-error" />
								</div>
							</div>

							<div>
								<label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email address</label>
								<div className="relative">
									<input type="email" id="email" name="email" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="email-error" />
									<div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
										<svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
										</svg>
									</div>
								</div>
								<p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
							</div>

							<div>
								<label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
								<div className="relative">
									<input type="password" id="password" name="password" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error" />
									<div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
										<svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
										</svg>
									</div>
								</div>
								<p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
							</div>

							<div>
								<label htmlFor="confirm-password" className="block text-sm mb-2 dark:text-white">Confirm Password</label>
								<div className="relative">
									<input type="password" id="confirm-password" name="confirm-password" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="confirm-password-error" />
									<div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
										<svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
										</svg>
									</div>
								</div>
								<p className="hidden text-xs text-red-600 mt-2" id="confirm-password-error">Password does not match the password</p>
							</div>

							<div className="flex items-center">
								<div className="flex">
									<input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-transparent dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
								</div>
								<div className="ms-3">
									<label htmlFor="remember-me" className="text-sm dark:text-white">I accept the <a className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500" href="#">Terms and Conditions</a></label>
								</div>
							</div>

							<button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Sign up</button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	)
};

const LeftPanel = () => {

	const [isDarkMode,] = useDarkMode();

	return (
		<div className="relative w-full h-auto flex flex-col gap-10 overflow-hidden">

			<p className=" max-w-md text-2xl font-bold text-gray-800 dark:text-primaryDarkText">A simplistic solution for managing your job applications</p>

			<div className="pl-2 shadow-xl">
				<figure className="ms-auto me-20 relative z-[1] min-h-full w-[50rem] h-full shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)] rounded-b-lg">
					<div className={clsx(
						"relative flex items-center h-6 max-w-[50rem] rounded-t-lg px-32 ",
						!isDarkMode ? 'bg-neutral-200' : 'bg-secondaryDark/95'
					)}>
						<div className="flex gap-x-1 absolute top-2/4 start-4 -translate-y-1">
							<span className="size-2 bg-[#FF605C] rounded-full"></span>
							<span className="size-2 bg-[#FFBD44] rounded-full"></span>
							<span className="size-2 bg-[#00CA4E] rounded-full"></span>
						</div>
						<div className={clsx(
							"flex justify-center items-center w-full h-3 my-4 text-[.25rem] text-gray-400 rounded-sm sm:text-[.5rem] dark:text-neutral-400",
							!isDarkMode ? 'bg-neutral-300' : 'bg-primaryDark'
						)}>
							<span>www.tailorwrite.com</span>
						</div>
					</div>

					<div className="bg-gray-800 rounded-b-lg">
						<img className="max-w-full h-auto rounded-b-lg" src={isDarkMode ? DarkModeImage : LightModeImage} alt="Browser Placeholder" />
					</div>
				</figure>
			</div>
		</div>
	)
}