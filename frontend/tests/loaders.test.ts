import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import { applicationLoader, allApplicationLoader } from '../src/loaders';
import { APIConstants } from '../src/pathConstants';
import { LoaderFunctionArgs } from 'react-router-dom';
import { ApplicationData } from '../src/types';

vi.mock('axios');

describe('Loader Functions', () => {

	beforeEach(() => {
		vi.resetAllMocks();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('applicationLoader', () => {
		it('should fetch application data successfully', async () => {
			// Defining the mock data
			const mockId = '1';
			const mockApplication: ApplicationData = {
				id: '1',
				job_title: 'Software Engineer',
				company_name: 'Facebook',
				status: 'Applied',
				application_date: new Date().toISOString(),
				application_url: 'https://www.facebook.com',
				img: null,
			};

			// Mocking the axios.get method to return the mockApplication data
			vi.mocked(axios.get).mockResolvedValueOnce({ data: mockApplication });

			// Processing the Response object returned from the loader function
			const res: Response = await applicationLoader({ params: { uuid: mockId } } as unknown as LoaderFunctionArgs);
			const application: ApplicationData = await res.json();

			// Asserting that the axios.get method was called with the correct arguments and returned the correct data
			expect(axios.get).toHaveBeenCalledWith(APIConstants.APPLICATION(mockId), { headers: expect.any(Object) });
			expect(application).toEqual(mockApplication);
		});

		it('should return an empty array if uuid is not provided', async () => {

			const res: Response = await applicationLoader({ params: {} } as LoaderFunctionArgs);
			const application: ApplicationData = await res.json();

			expect(axios.get).not.toHaveBeenCalled();
			expect(application).toEqual([]);
		});

		it('should handle error when fetching application data', async () => {
			const mockId = '123';
			const mockError = { response: { data: { error: 'Test error' } } };

			vi.mocked(axios.get).mockRejectedValueOnce(mockError);

			const res: Response = await applicationLoader({ params: { uuid: mockId } } as unknown as LoaderFunctionArgs);
			const application = await res.json();

			expect(axios.get).toHaveBeenCalledWith(APIConstants.APPLICATION(mockId), { headers: expect.any(Object) });
			expect(application).toEqual([]);
		});
	});

	describe('allApplicationLoader', () => {

		// Initialising the sessionStorage spy to mock the getItem method
		const sessionStorageSpy = vi.spyOn(Storage.prototype, 'getItem');

		afterEach(() => {
			sessionStorage.clear()
			sessionStorageSpy.mockClear();
		}); 

		it('should fetch all applications successfully', async () => {
			// Defining the mock data
			const mockUserUuid = '5df976ae-72e5-495e-ab7f-dcd679bc0fc4';
			const mockApplications: ApplicationData[] = [
				{ id: '1', job_title: 'Software Engineer', company_name: 'Facebook', status: 'Applied', application_date: new Date().toISOString(), application_url: 'https://www.facebook.com', img: null },
				{ id: '2', job_title: 'Product Manager', company_name: 'Google', status: 'Interview', application_date: new Date().toISOString(), application_url: 'https://www.google.com', img: null },
				{ id: '3', job_title: 'Data Scientist', company_name: 'Amazon', status: 'Offer', application_date: new Date().toISOString(), application_url: 'https://www.amazon.com', img: null },
			];

			// Mocking the sessionStorage.getItem and axios.get methods to return the mock data
			sessionStorageSpy.mockReturnValueOnce(mockUserUuid);
			vi.mocked(axios.get).mockResolvedValueOnce({ data: mockApplications });

			// Processing the Response object returned from the loader function
			const res: Response = await allApplicationLoader();
			const applications: ApplicationData[] = await res.json();

			// Asserting that the sessionStorage.getItem and axios.get methods were called correctly and returned the correct data
			expect(sessionStorage.getItem).toHaveBeenCalledWith('user_id');
			expect(axios.get).toHaveBeenCalledWith(APIConstants.ALL_APPLICATIONS(mockUserUuid), { headers: expect.any(Object) });
			expect(applications).toEqual(mockApplications);
		});

		it('should use "no-id" when user_id is not in sessionStorage', async () => {
			// Defining the mock data
			const mockApplications: ApplicationData[] = [];

			// Mocking the sessionStorage.getItem and axios.get methods to return the mock data
			sessionStorageSpy.mockReturnValueOnce(null);
			vi.mocked(axios.get).mockResolvedValueOnce({ data: mockApplications });

			// Processing the Response object returned from the loader
			const res: Response = await allApplicationLoader();
			const applications: ApplicationData[] = await res.json();

			// Asserting that the sessionStorage.getItem and axios.get methods were called correctly and returned the correct data
			expect(sessionStorage.getItem).toHaveBeenCalledWith('user_id');
			expect(axios.get).toHaveBeenCalledWith(APIConstants.ALL_APPLICATIONS('no-id'), { headers: expect.any(Object) });
			expect(applications).toEqual(mockApplications);
		});

		it('should handle error when fetching all applications', async () => {
			// Defining the mock data
			const mockUserUuid = '5df976ae-72e5-495e-ab7f-dcd679bc0fc4';
			const mockError = { response: { data: { error: 'Test error' } } };

			// Mocking the sessionStorage.getItem and axios.get methods to return the mock data
			sessionStorageSpy.mockReturnValueOnce(mockUserUuid);
			vi.mocked(axios.get).mockRejectedValueOnce(mockError);

			// Processing the Response object returned from the loader function
			const res: Response = await allApplicationLoader();
			const applications: ApplicationData[] = await res.json();

			// Asserting that the sessionStorage.getItem and axios.get methods were called correctly and returned the correct data
			expect(axios.get).toHaveBeenCalled();
			expect(applications).toEqual([]);
		});
	});
});