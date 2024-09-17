import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import { toast } from 'react-toastify';
import { handleAddApplication, handleUpdateApplication } from '../src/actions';
import { APIConstants } from '../src/pathConstants';

// Mock dependencies
vi.mock('axios');
vi.mock('react-toastify');
vi.mock('../src/utils', () => ({
    parseDateString: vi.fn((date) => date),
}));

const mockUserUuid = '5df976ae-72e5-495e-ab7f-dcd679bc0fc4'; 

/**
 * 
 */
class MockFormData {
    private data: Record<string, string> = {};

    // Constructor that takes in an object of key-value pairs
    constructor(data?: Record<string, string>) {
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                this.append(key, value);
            });
        }
    }

    append(key: string, value: string) {
        this.data[key] = value;
    }

    get(key: string) {
        return this.data[key];
    }
}

/**
 * Returns a mock Request object with the given FormData object
 * @param mockFormData MockFormData object to be returned by the request
 * @returns Request object containing the mocked form data 
 */
const createMockRequest = (mockFormData: MockFormData): Request => ({
    formData: () => Promise.resolve(mockFormData),
} as unknown as Request);


describe('Application Actions', () => {

    beforeEach(() => {
        vi.resetAllMocks();
        vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(mockUserUuid);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('handleAddApplication', () => {
        it('should add an application successfully', async () => {
            // Create a MockFormData object with all required fields
            const mockFormData = new MockFormData({
                job: 'Software Engineer',
                company: 'Tech Corp',
            });
            const mockRequest = createMockRequest(mockFormData);

            // Mock the axios.post method to return a successful response
            vi.mocked(axios.post).mockResolvedValue({ data: { success: true } });

            // Running the method with the mock request
            const result = await handleAddApplication({ request: mockRequest as unknown as Request });

            // Verify the result and the axios.post method was called with the correct arguments
            expect(axios.post).toHaveBeenCalledWith(
                APIConstants.APPLICATIONS,    // API URL
                expect.objectContaining({
                    user_id: mockUserUuid,
                    job_title: 'Software Engineer',
                    company_name: 'Tech Corp',
                }),
                expect.any(Object)
            );
            expect(result).toEqual({ success: 'Application added successfully!' });
            expect(toast.success).toHaveBeenCalled();
        });

        it('should handle missing required fields', async () => {
            const mockFormData = {
                get: vi.fn((key) => {
                    const data = { company: 'Tech Corp' };
                    return data[key];
                }),
            };

            const mockRequest = {
                formData: () => Promise.resolve(mockFormData),
            };

            const result = await handleAddApplication({ request: mockRequest as any });

            expect(result).toEqual({ error: 'All fields are required.' });
            expect(toast.info).toHaveBeenCalled();
        });

        it('should handle API errors', async () => {
            const mockFormData = new MockFormData({
                job: 'Software Engineer',
                company: 'Tech Corp',
            });
            const mockRequest = createMockRequest(mockFormData);

            // Mock the axios.post method to return an error response
            vi.mocked(axios.post).mockRejectedValue({ response: { data: { error: 'API Error' } } });
            vi.spyOn(console, 'error');

            // Running the method with the mock request
            const result = await handleAddApplication({ request: mockRequest });

            // Verify the result and that the axios.post method was called with the correct arguments
            expect(result).toEqual({ error: 'API Error' });
            expect(axios.post).toHaveBeenCalled();
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('handleUpdateApplication', () => {
        it('should update an application successfully', async () => {
            // Create a MockFormData and MockRequest object with all required fields
            const mockFormData = new MockFormData({
                id: '123',
                job: 'Senior Developer',
                company: 'Tech Inc',
                status: 'Applied',
                date: '2023-09-12',
                url: 'https://example.com',
                description: 'Job description',
                notes: 'Some notes',
            });
            const mockRequest = createMockRequest(mockFormData);

            // Mock the axios.put method to return a successful response
            vi.mocked(axios.put).mockResolvedValue({ data: { success: true } });

            // Running the method with the mock request
            const result = await handleUpdateApplication({ request: mockRequest });

            // Verify the result and the axios.put method was called with the correct arguments
            expect(result).toEqual({ success: 'Application updated successfully!' });
            
            const applicationId = mockFormData.get('id');
            expect(axios.put).toHaveBeenCalledWith(
                APIConstants.APPLICATION(applicationId),    // API URL
                expect.objectContaining({                   // Payload
                    job_title: 'Senior Developer',
                    company_name: 'Tech Inc',
                }),                         
                expect.any(Object)                          // Headers
            );
            expect(toast.update).toHaveBeenCalled();
        });

        it('should handle missing required fields', async () => {
            // Create a MockFormData object with missing required fields
            const mockFormData = new MockFormData({
                id: '123',
                job: 'Senior Developer',
            });
            const mockRequest = createMockRequest(mockFormData);

            // Mock the toast.info method
            vi.spyOn(toast, 'info');

            // Running the method with the mock request
            const result = await handleUpdateApplication({ request: mockRequest });

            // Verify the result and that the toast.info method was called
            expect(result).toEqual({ error: 'All fields are required.' });
            expect(toast.info).toHaveBeenCalled();
        });

        it('should handle API errors', async () => {
            // Create a mock FormData object with all required fields
            const mockFormData = new MockFormData({
                id: '123',
                job: 'Senior Developer',
                company: 'Tech Inc',
                status: 'Applied',
                date: '2023-09-12',
                url: 'https://example.com',
                description: 'Job description',
                notes: 'Some notes',
            });
            const mockRequest = createMockRequest(mockFormData);

            // Mock the axios.put method to return an error response
            vi.mocked(axios.put).mockRejectedValue({ response: { data: { error: 'Update API Error' } } });
            vi.spyOn(toast, 'update');


            // Running the method with the mock request
            const result = await handleUpdateApplication({ request: mockRequest });

            // Verify the result and that the toast.update method was called with the correct arguments
            expect(result).toEqual({ error: 'Update API Error' });
            expect(toast.update).toHaveBeenCalled();
            
        });
    });
});