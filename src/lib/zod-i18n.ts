/**
 * Zod i18n - Localization for Zod validation messages
 *
 * This module provides locale-aware validation messages for Zod schemas.
 * It works independently of generated schemas and can be configured at runtime.
 *
 * @example
 * ```typescript
 * import { setZodLocale, getZodMessage } from '@famgia/omnify-react/lib';
 *
 * // Set locale once at app level
 * setZodLocale('ja');
 *
 * // Get translated message
 * const msg = getZodMessage('required', { displayName: 'Email' });
 * ```
 */

// Default validation messages for all supported locales
const DEFAULT_MESSAGES: Record<string, Record<string, string>> = {
  required: {
    en: '${displayName} is required',
    ja: '${displayName}は必須です',
    vi: '${displayName} là bắt buộc',
    ko: '${displayName}은(는) 필수입니다',
    'zh-CN': '${displayName}是必填项',
    'zh-TW': '${displayName}為必填欄位',
    th: '${displayName} จำเป็นต้องกรอก',
    es: '${displayName} es obligatorio',
  },
  minLength: {
    en: '${displayName} must be at least ${min} characters',
    ja: '${displayName}は${min}文字以上で入力してください',
    vi: '${displayName} phải có ít nhất ${min} ký tự',
    ko: '${displayName}은(는) ${min}자 이상이어야 합니다',
    'zh-CN': '${displayName}至少需要${min}个字符',
    'zh-TW': '${displayName}至少需要${min}個字元',
    th: '${displayName} ต้องมีอย่างน้อย ${min} ตัวอักษร',
    es: '${displayName} debe tener al menos ${min} caracteres',
  },
  maxLength: {
    en: '${displayName} must be at most ${max} characters',
    ja: '${displayName}は${max}文字以内で入力してください',
    vi: '${displayName} không được quá ${max} ký tự',
    ko: '${displayName}은(는) ${max}자 이하여야 합니다',
    'zh-CN': '${displayName}最多${max}个字符',
    'zh-TW': '${displayName}最多${max}個字元',
    th: '${displayName} ต้องไม่เกิน ${max} ตัวอักษร',
    es: '${displayName} debe tener como máximo ${max} caracteres',
  },
  min: {
    en: '${displayName} must be at least ${min}',
    ja: '${displayName}は${min}以上で入力してください',
    vi: '${displayName} phải lớn hơn hoặc bằng ${min}',
    ko: '${displayName}은(는) ${min} 이상이어야 합니다',
    'zh-CN': '${displayName}必须大于等于${min}',
    'zh-TW': '${displayName}必須大於等於${min}',
    th: '${displayName} ต้องมากกว่าหรือเท่ากับ ${min}',
    es: '${displayName} debe ser al menos ${min}',
  },
  max: {
    en: '${displayName} must be at most ${max}',
    ja: '${displayName}は${max}以下で入力してください',
    vi: '${displayName} phải nhỏ hơn hoặc bằng ${max}',
    ko: '${displayName}은(는) ${max} 이하여야 합니다',
    'zh-CN': '${displayName}必须小于等于${max}',
    'zh-TW': '${displayName}必須小於等於${max}',
    th: '${displayName} ต้องน้อยกว่าหรือเท่ากับ ${max}',
    es: '${displayName} debe ser como máximo ${max}',
  },
  email: {
    en: 'Please enter a valid email address',
    ja: '有効なメールアドレスを入力してください',
    vi: 'Vui lòng nhập địa chỉ email hợp lệ',
    ko: '유효한 이메일 주소를 입력하세요',
    'zh-CN': '请输入有效的电子邮件地址',
    'zh-TW': '請輸入有效的電子郵件地址',
    th: 'กรุณากรอกอีเมลที่ถูกต้อง',
    es: 'Por favor, introduce una dirección de correo electrónico válida',
  },
  url: {
    en: 'Please enter a valid URL',
    ja: '有効なURLを入力してください',
    vi: 'Vui lòng nhập URL hợp lệ',
    ko: '유효한 URL을 입력하세요',
    'zh-CN': '请输入有效的URL',
    'zh-TW': '請輸入有效的網址',
    th: 'กรุณากรอก URL ที่ถูกต้อง',
    es: 'Por favor, introduce una URL válida',
  },
  pattern: {
    en: '${displayName} format is invalid',
    ja: '${displayName}の形式が正しくありません',
    vi: '${displayName} không đúng định dạng',
    ko: '${displayName} 형식이 올바르지 않습니다',
    'zh-CN': '${displayName}格式不正确',
    'zh-TW': '${displayName}格式不正確',
    th: 'รูปแบบ${displayName}ไม่ถูกต้อง',
    es: 'El formato de ${displayName} no es válido',
  },
};

// State
let currentLocale = 'ja';
let fallbackLocale = 'en';
let customMessages: Record<string, Record<string, string>> = {};

/**
 * Reset all settings to defaults (for testing)
 * @internal
 */
export function resetZodI18n(): void {
  currentLocale = 'ja';
  fallbackLocale = 'en';
  customMessages = {};
}

/**
 * Set current locale for Zod validation messages
 */
export function setZodLocale(locale: string): void {
  currentLocale = locale;
}

/**
 * Get current locale
 */
export function getZodLocale(): string {
  return currentLocale;
}

/**
 * Set fallback locale (used when message not found in current locale)
 */
export function setZodFallbackLocale(locale: string): void {
  fallbackLocale = locale;
}

/**
 * Get fallback locale
 */
export function getZodFallbackLocale(): string {
  return fallbackLocale;
}

/**
 * Add custom validation messages
 * @param messages - Object with message keys and locale values
 */
export function addZodMessages(messages: Record<string, Record<string, string>>): void {
  for (const [key, locales] of Object.entries(messages)) {
    customMessages[key] = { ...customMessages[key], ...locales };
  }
}

/**
 * Get translated validation message
 *
 * @param key - Message key (e.g., 'required', 'minLength')
 * @param params - Template parameters to replace
 * @returns Formatted message string
 *
 * @example
 * getZodMessage('required', { displayName: '氏名' })
 * // => '氏名は必須です'
 */
export function getZodMessage(
  key: string,
  params: Record<string, string | number> = {}
): string {
  // Try custom messages first, then defaults
  const messages = customMessages[key] ?? DEFAULT_MESSAGES[key];
  if (!messages) return key;

  let message =
    messages[currentLocale] ??
    messages[fallbackLocale] ??
    messages['en'] ??
    key;

  // Replace template placeholders
  for (const [param, value] of Object.entries(params)) {
    message = message.replace(new RegExp(`\\$\\{${param}\\}`, 'g'), String(value));
  }

  return message;
}

/**
 * Get all messages for a specific locale
 */
export function getZodMessages(locale?: string): Record<string, string> {
  const targetLocale = locale ?? currentLocale;
  const result: Record<string, string> = {};

  // Start with defaults
  for (const [key, locales] of Object.entries(DEFAULT_MESSAGES)) {
    result[key] = locales[targetLocale] ?? locales[fallbackLocale] ?? locales['en'] ?? key;
  }

  // Override with custom
  for (const [key, locales] of Object.entries(customMessages)) {
    if (locales[targetLocale]) {
      result[key] = locales[targetLocale];
    }
  }

  return result;
}
