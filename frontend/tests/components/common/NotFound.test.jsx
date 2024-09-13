import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import NotFound from '../../../src/components/common/NotFound';

describe('Renders NotFound component correctly', async () => {
    it('Should render the component correctly', async () => {
        // Setup
        render(<NotFound />);
        const h1 = await screen.queryByText('page not found', { exact: false });

        // Expectations
        expect(h1).not.toBeNull();
    });
});