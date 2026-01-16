import { JapaneseNameField, JapaneseAddressField, JapaneseBankField } from './components/index.js';
export { SelectOption as AddressSelectOption, BankSelectOption, JapaneseAddressFieldProps, JapaneseBankFieldProps, JapaneseNameFieldProps, I18nConfig as JapaneseNameI18nConfig, PostalLookupResult } from './components/index.js';
export { FormFieldError, FormMutationRouter, TranslateFn, UseFormMutationOptions, getFirstValidationError, getFormErrors, getValidationMessage, useFormMutation } from './hooks/index.js';
export { HIRAGANA, HIRAGANA_PATTERN, KANA_ANY, KANA_ANY_PATTERN, KATAKANA_FULL_WIDTH, KATAKANA_HALF_PATTERN, KATAKANA_HALF_WIDTH, KATAKANA_PATTERN, KATAKANA_WITH_NUMBERS, KanaRuleOptions, addZodMessages, createKanaRegex, getKanaErrorMessage, getKanaPattern, getZodFallbackLocale, getZodLocale, getZodMessage, getZodMessages, isZodRequired, getKanaPattern as kanaPattern, createKanaRegex as kanaRegex, kanaRules, kanaString, requiredRule, setZodFallbackLocale, setZodLocale, validateKana, withKana, zodRule } from './lib/index.js';
import 'react/jsx-runtime';
import 'antd';
import '@tanstack/react-query';
import 'antd/es/form';
import 'zod';

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
declare const OmnifyForm: {
    readonly JapaneseName: typeof JapaneseNameField;
    readonly JapaneseAddress: typeof JapaneseAddressField;
    readonly JapaneseBank: typeof JapaneseBankField;
};

export { JapaneseAddressField, JapaneseBankField, JapaneseNameField, OmnifyForm };
