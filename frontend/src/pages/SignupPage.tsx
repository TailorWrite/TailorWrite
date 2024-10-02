import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import axios from "axios";

import PathConstants, { APIConstants } from "../pathConstants";
import { Logo } from "../components/icons";

interface RegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
    account_info: {
        first_name: string;
        last_name: string;
        bio: string;
        phone: string;
    };
}

const registerUser = async (data: RegisterFormData) => {
	const response = await axios.post(APIConstants.REGISTER, data);
	return response.data;
};

export default function SignupPage() {
	const [formData, setFormData] = useState<RegisterFormData>({
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
        account_info: {
            first_name: "",
            last_name: "",
            bio: "",
            phone: "",
        },
    });

	

	const mutation = useMutation(registerUser, {
		onSuccess: () => {
			// Handle successful registration
			alert("Registration successful!");
		},
		onError: (error: Error) => {
			// Handle registration error
			alert("Registration failed: " + error.message);
		},
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
	
		if (name in formData) {
			// Handle top-level fields
			setFormData(prevState => ({
				...prevState,
				[name]: type === "checkbox" ? checked : value
			}));
		} else if (name in formData.account_info) {
			// Handle nested fields
			setFormData(prevState => ({
				...prevState,
				account_info: {
					...prevState.account_info,
					[name]: value
				}
			}));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			alert("Passwords do not match!");
			return;
		}
		if (!formData.terms) {
			alert("You must accept the terms and conditions!");
			return;
		}
		mutation.mutate(formData);
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<Link
					to={PathConstants.HOME}
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<Logo className="size-8 mr-2" /> 
					TailorWrite
				</Link>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Create an account
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

							<div className="flex flex-row gap-4">
								<div>
									<label
										htmlFor="first_name"
										className="mb-4 text-sm font-medium text-gray-900 dark:text-white"
									>
										First Name
									</label>
									<input
										type="first_name"
										name="first_name"
										id="first_name"
										value={formData.account_info.first_name}
										onChange={handleChange}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@company.com"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="last_name"
										className="mb-4 text-sm font-medium text-gray-900 dark:text-white"
									>
										Last name
									</label>
									<input
										type="last_name"
										name="last_name"
										id="last_name"
										value={formData.account_info.last_name}
										onChange={handleChange}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@company.com"
										required
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Your email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									value={formData.email}
									onChange={handleChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@company.com"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									value={formData.password}
									onChange={handleChange}
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="confirmPassword"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Confirm password
								</label>
								<input
									type="password"
									name="confirmPassword"
									id="confirmPassword"
									value={formData.confirmPassword}
									onChange={handleChange}
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
							</div>
							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input
										id="terms"
										aria-describedby="terms"
										type="checkbox"
										name="terms"
										checked={formData.terms}
										onChange={handleChange}
										className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
										required
									/>
								</div>
								<div className="ml-3 text-sm">
									<label
										htmlFor="terms"
										className="font-light text-gray-500 dark:text-gray-300"
									>
										I accept the{" "}
										<a
											className="font-medium text-primary-600 hover:underline dark:text-primary-500"
											href="#"
										>
											Terms and Conditions
										</a>
									</label>
								</div>
							</div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Create an account
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Already have an account?{" "}
								<a
									href="#"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Login here
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
