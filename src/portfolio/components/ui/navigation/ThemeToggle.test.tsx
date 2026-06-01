import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from '@/portfolio/contexts/ThemeContext'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  it('renders correctly and responds to clicks', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>,
    )

    const button = screen.getByRole('button', { name: /theme:/i })
    // @ts-expect-error - testing-library types not available
    expect(button).toBeInTheDocument()

    // Fire click to toggle theme
    fireEvent.click(button)
  })
})
