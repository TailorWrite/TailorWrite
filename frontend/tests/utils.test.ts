import { describe, it, expect } from 'vitest';
import { formatDate, parseDateString, extractBaseUrl, getCompanyLogoUrl, appendHttpsToLink } from '../src/utils';

describe('Date and URL Utility Functions', () => {
    
    describe('formatDate', () => {
        it('should format a date string correctly', () => {
            expect(formatDate('2024-09-07')).toBe('7th September 2024');
            expect(formatDate(new Date('2024-09-07'))).toBe('7th September 2024');
        });

        it('should handle leap years', () => {
            expect(formatDate('2024-02-29')).toBe('29th February 2024');
        });
    });

    describe('parseDateString', () => {
        it('should parse a valid date string into a Date object', () => {
            expect(parseDateString('7th September 2024')).toEqual(new Date(2024, 8, 7)); // Months are 0-based
        });

        it('should throw an error for an invalid date string', () => {
            expect(() => parseDateString('invalid date')).toThrow('Invalid date format. Expected format: \'7th September 2024\'');
        });
    });

    describe('extractBaseUrl', () => {
        it('should extract base URL from a valid URL', () => {
            expect(extractBaseUrl('https://www.example.com/path')).toBe('example.com');
            expect(extractBaseUrl('http://example.com')).toBe('example.com');
        });

        it('should return null for an invalid URL', () => {
            expect(extractBaseUrl('invalid-url')).toBeNull();
        });
    });

    describe('getCompanyLogoUrl', () => {
        it('should return the correct logo URL for a company', () => {
            expect(getCompanyLogoUrl('Example Company')).toBe('https://logo.clearbit.com/examplecompany.com');
        });

        it('should return null for an empty company name', () => {
            expect(getCompanyLogoUrl('')).toBeNull();
        });
    });

    describe('appendHttpsToLink', () => {
        it('should prepend https:// to a link that does not start with http or https', () => {
            expect(appendHttpsToLink('example.com')).toBe('https://example.com');
        });

        it('should not prepend https:// if the link already starts with http or https', () => {
            expect(appendHttpsToLink('https://example.com')).toBe('https://example.com');
            expect(appendHttpsToLink('http://example.com')).toBe('http://example.com');
        });

        it('should return an empty string for a falsy input', () => {
            expect(appendHttpsToLink('')).toBe('');
        });
    });
});
