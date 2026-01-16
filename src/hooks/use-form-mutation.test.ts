/**
 * Tests for useFormMutation helper functions
 */

import { describe, it, expect } from 'vitest';
import { getFormErrors, getValidationMessage, getFirstValidationError } from './use-form-mutation';

describe('getFormErrors', () => {
  it('should return empty array for non-validation error', () => {
    const error = new Error('Network error');
    expect(getFormErrors(error)).toEqual([]);
  });

  it('should return empty array for null/undefined', () => {
    expect(getFormErrors(null)).toEqual([]);
    expect(getFormErrors(undefined)).toEqual([]);
  });

  it('should parse simple field errors', () => {
    const error = {
      response: {
        status: 422,
        data: {
          message: 'Validation failed',
          errors: {
            email: ['The email field is required.'],
            password: ['The password must be at least 8 characters.'],
          },
        },
      },
    };

    const result = getFormErrors(error);
    expect(result).toEqual([
      { name: 'email', errors: ['The email field is required.'] },
      { name: 'password', errors: ['The password must be at least 8 characters.'] },
    ]);
  });

  it('should parse nested field errors with dot notation', () => {
    const error = {
      response: {
        status: 422,
        data: {
          errors: {
            'user.name': ['The user name is required.'],
            'user.email': ['Invalid email format.'],
          },
        },
      },
    };

    const result = getFormErrors(error);
    expect(result).toEqual([
      { name: ['user', 'name'], errors: ['The user name is required.'] },
      { name: ['user', 'email'], errors: ['Invalid email format.'] },
    ]);
  });

  it('should parse array field errors with numeric index', () => {
    const error = {
      response: {
        status: 422,
        data: {
          errors: {
            'items.0.name': ['Item name is required.'],
            'items.1.price': ['Price must be a number.'],
          },
        },
      },
    };

    const result = getFormErrors(error);
    expect(result).toEqual([
      { name: ['items', 0, 'name'], errors: ['Item name is required.'] },
      { name: ['items', 1, 'price'], errors: ['Price must be a number.'] },
    ]);
  });

  it('should handle mixed nested and array paths', () => {
    const error = {
      response: {
        data: {
          errors: {
            'address.lines.0.street': ['Street is required.'],
          },
        },
      },
    };

    const result = getFormErrors(error);
    expect(result).toEqual([
      { name: ['address', 'lines', 0, 'street'], errors: ['Street is required.'] },
    ]);
  });
});

describe('getValidationMessage', () => {
  it('should return null for non-422 errors', () => {
    const error = {
      response: {
        status: 500,
        data: { message: 'Server error' },
      },
    };
    expect(getValidationMessage(error)).toBeNull();
  });

  it('should return null for errors without response', () => {
    const error = new Error('Network error');
    expect(getValidationMessage(error)).toBeNull();
  });

  it('should return message for 422 validation error', () => {
    const error = {
      response: {
        status: 422,
        data: {
          message: 'The name field is required. (and 2 more errors)',
        },
      },
    };
    expect(getValidationMessage(error)).toBe('The name field is required. (and 2 more errors)');
  });

  it('should return null if no message in 422 response', () => {
    const error = {
      response: {
        status: 422,
        data: {
          errors: { name: ['Required'] },
        },
      },
    };
    expect(getValidationMessage(error)).toBeNull();
  });
});

describe('getFirstValidationError', () => {
  it('should return null for non-validation error', () => {
    const error = new Error('Network error');
    expect(getFirstValidationError(error)).toBeNull();
  });

  it('should return first error message', () => {
    const error = {
      response: {
        data: {
          errors: {
            email: ['The email is invalid.', 'Already taken.'],
            name: ['Required.'],
          },
        },
      },
    };
    expect(getFirstValidationError(error)).toBe('The email is invalid.');
  });

  it('should return null if no errors', () => {
    const error = {
      response: {
        data: {
          message: 'Validation failed',
        },
      },
    };
    expect(getFirstValidationError(error)).toBeNull();
  });
});
