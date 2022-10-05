import { expect, describe, test } from 'vitest'
import { testValidator } from '.'
import { ZodError, zodError } from 'zod'

describe('testing name optional', () => {
  test('test sample', () => {
    expect(true).toBe(true)
  })

  test('test validator : false with no url', () => {
    const testData = {
      name: 'testing false',
    }
    const {
      success
    } = testValidator.safeParse(testData)
    expect(success).toBe(false)
  })

  test('test validator : true with url', () => {
    const testData = {
      name: 'https://www.google.com',
    }
    const {
      success
    } = testValidator.safeParse(testData)
    expect(success).toBe(true)
  })

  test('test validator : true with empty string', () => {
    const testData = {
      name: ''
    }
    const {
      success,
    } = testValidator.safeParse(testData)

    expect(success).toBe(true)
  })

  test('test validator : false with no https string', () => {
    const testData = {
      name: 'www.google.com',
    }
    const {
      success
    } = testValidator.safeParse(testData)
    expect(success).toBe(false)
  })

  test('test try catch message show', () => {
    const testData = {
      name: 'sample',
    }
    try {
      const result = testValidator.parse(testData);
      console.log(result);
    } catch(error: unknown) {
      const zodError = error instanceof ZodError
      expect(zodError).toBe(true)
      if (!zodError) return;
      const errorArray = JSON.parse(error.message)
      expect(errorArray[0].message).toBe('need url')
      console.log(errorArray[0].message)
    }
  })
})




