import { describe, it, expect } from 'vitest'
import { loginFormSchemaValidation } from './config'

// Unit tests for the login form's Yup validation schema.
// These test behavior (what input is valid) without rendering anything.
describe('loginFormSchemaValidation', () => {
  it('accepts a valid email and password', async () => {
    const result = await loginFormSchemaValidation.isValid({
      email: 'amer@example.com',
      password: 'mypassword',
    })
    expect(result).toBe(true)
  })

  it('rejects an invalid email', async () => {
    const result = await loginFormSchemaValidation.isValid({
      email: 'not-an-email',
      password: 'mypassword',
    })
    expect(result).toBe(false)
  })

  it('rejects a missing password', async () => {
    const result = await loginFormSchemaValidation.isValid({
      email: 'amer@example.com',
    })
    expect(result).toBe(false)
  })

  it('rejects a password longer than 20 characters', async () => {
    const result = await loginFormSchemaValidation.isValid({
      email: 'amer@example.com',
      password: 'x'.repeat(21),
    })
    expect(result).toBe(false)
  })
})
