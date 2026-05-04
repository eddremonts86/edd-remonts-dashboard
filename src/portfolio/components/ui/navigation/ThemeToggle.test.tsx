import { ThemeProvider } from '@/portfolio/contexts/ThemeContext';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  it('renders correctly and responds to clicks', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>,
    );

    const button = screen.getByRole('button', { name: /theme:/i });
    expect(button).toBeInTheDocument();

    // Fire click to toggle theme
    fireEvent.click(button);
  });
});
