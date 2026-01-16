/**
 * @famgia/omnify-react
 *
 * React runtime components, hooks, and utilities for Omnify schemas.
 *
 * @example
 * ```typescript
 * import {
 *   // Components
 *   JapaneseNameField,
 *   JapaneseAddressField,
 *   JapaneseBankField,
 *
 *   // Hooks
 *   useFormMutation,
 *
 *   // Utilities
 *   setZodLocale,
 *   zodRule,
 *   kanaString,
 * } from '@famgia/omnify-react';
 * ```
 */

// =============================================================================
// Components
// =============================================================================

export {
  JapaneseNameField,
  type JapaneseNameFieldProps,
  type I18nConfig as JapaneseNameI18nConfig,
} from './components/JapaneseNameField';

export {
  JapaneseAddressField,
  type JapaneseAddressFieldProps,
  type PostalLookupResult,
  type SelectOption as AddressSelectOption,
} from './components/JapaneseAddressField';

export {
  JapaneseBankField,
  type JapaneseBankFieldProps,
  type SelectOption as BankSelectOption,
} from './components/JapaneseBankField';

// OmnifyForm namespace for convenient component access
import { JapaneseNameField } from './components/JapaneseNameField';
import { JapaneseAddressField } from './components/JapaneseAddressField';
import { JapaneseBankField } from './components/JapaneseBankField';

/**
 * OmnifyForm - Namespace for Omnify form components
 * 
 * @example
 * ```tsx
 * <OmnifyForm.JapaneseName schemas={customerSchemas} i18n={customerI18n} prefix="name" />
 * <OmnifyForm.JapaneseAddress form={form} schemas={customerSchemas} i18n={customerI18n} prefix="address" />
 * <OmnifyForm.JapaneseBank schemas={customerSchemas} i18n={customerI18n} prefix="bank" />
 * ```
 */
export const OmnifyForm = {
  JapaneseName: JapaneseNameField,
  JapaneseAddress: JapaneseAddressField,
  JapaneseBank: JapaneseBankField,
} as const;

// =============================================================================
// Hooks
// =============================================================================

export {
  useFormMutation,
  type UseFormMutationOptions,
  type FormMutationRouter,
  type TranslateFn,
  type FormFieldError,
  // Helper functions for Laravel validation errors
  getFormErrors,
  getValidationMessage,
  getFirstValidationError,
} from './hooks/use-form-mutation';

// =============================================================================
// Lib - Utilities
// =============================================================================

// Zod i18n
export {
  setZodLocale,
  getZodLocale,
  setZodFallbackLocale,
  getZodFallbackLocale,
  addZodMessages,
  getZodMessage,
  getZodMessages,
} from './lib/zod-i18n';

// Form validation
export { zodRule, requiredRule, isZodRequired } from './lib/form-validation';

// Japanese validation rules
export {
  // Kana validation
  kanaRules,
  createKanaRegex,
  validateKana,
  getKanaPattern,
  getKanaErrorMessage,
  // Zod helpers
  kanaString,
  withKana,
  // Pattern constants
  KATAKANA_PATTERN,
  KATAKANA_HALF_PATTERN,
  HIRAGANA_PATTERN,
  KANA_ANY_PATTERN,
  // Presets
  KATAKANA_FULL_WIDTH,
  KATAKANA_HALF_WIDTH,
  HIRAGANA,
  KANA_ANY,
  KATAKANA_WITH_NUMBERS,
  // Types
  type KanaRuleOptions,
  // Aliases
  kanaPattern,
  kanaRegex,
} from './lib/rules';
