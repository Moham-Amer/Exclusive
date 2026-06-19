import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppLogo } from './index'

// Component test: render the real AppLogo and assert it shows the logo image.
// AppLogo uses useNavigate, so it must be wrapped in a router — MemoryRouter
// is the in-memory router used for tests.
describe('AppLogo', () => {
  it('renders the logo image', () => {
    render(
      <MemoryRouter>
        <AppLogo />
      </MemoryRouter>
    )
    expect(screen.getByAltText('logo')).toBeInTheDocument()
  })
})
