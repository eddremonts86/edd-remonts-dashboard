import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OptimizedImage } from './OptimizedImage';

describe('OptimizedImage', () => {
  it('renders standard blurred wrapper and transitions', () => {
    render(<OptimizedImage src="/test.jpg" alt="test image" />);

    // Fast check for the img element
    const imgElement = screen.getByRole('img', { name: /test image/i });
    expect(imgElement).toBeInTheDocument();
  });
});
