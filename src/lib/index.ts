/**
 * @famgia/omnify-react/lib
 *
 * Form validation utilities and i18n support
 */

// Zod i18n
export {
  setZodLocale,
  getZodLocale,
  setZodFallbackLocale,
  getZodFallbackLocale,
  addZodMessages,
  getZodMessage,
  getZodMessages,
} from './zod-i18n';

// Form validation
export { zodRule, requiredRule, isZodRequired } from './form-validation';

// Japanese validation rules
export * from './rules';
