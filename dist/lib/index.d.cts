import { RuleObject } from 'antd/es/form';
import { z } from 'zod';

/**
 * Set current locale for Zod validation messages
 */
declare function setZodLocale(locale: string): void;
/**
 * Get current locale
 */
declare function getZodLocale(): string;
/**
 * Set fallback locale (used when message not found in current locale)
 */
declare function setZodFallbackLocale(locale: string): void;
/**
 * Get fallback locale
 */
declare function getZodFallbackLocale(): string;
/**
 * Add custom validation messages
 * @param messages - Object with message keys and locale values
 */
declare function addZodMessages(messages: Record<string, Record<string, string>>): void;
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
declare function getZodMessage(key: string, params?: Record<string, string | number>): string;
/**
 * Get all messages for a specific locale
 */
declare function getZodMessages(locale?: string): Record<string, string>;

/**
 * Form validation utilities for Ant Design + Zod
 *
 * Compatible with Zod v3.x and v4.x
 *
 * @example
 * ```typescript
 * import { zodRule, requiredRule } from '@famgia/omnify-react/lib';
 *
 * <Form.Item
 *   name="email"
 *   rules={[zodRule(customerSchemas.email, 'メールアドレス')]}
 * >
 *   <Input />
 * </Form.Item>
 * ```
 */

/**
 * Convert Zod schema to Ant Design Form rule with i18n support
 *
 * @example
 * // Set locale once at component level
 * setZodLocale('ja');
 *
 * // Use without passing locale
 * <Form.Item
 *   name="email"
 *   rules={[zodRule(customerSchemas.email, 'メールアドレス')]}
 * >
 *   <Input />
 * </Form.Item>
 */
declare function zodRule<T extends z.ZodTypeAny>(schema: T, displayName?: string): RuleObject;
/**
 * Create required rule with i18n message
 *
 * @example
 * <Form.Item
 *   name="name"
 *   rules={[requiredRule('名前')]}
 * >
 *   <Input />
 * </Form.Item>
 */
declare function requiredRule(displayName: string): RuleObject;
/**
 * Check if a Zod schema represents a required field
 */
declare function isZodRequired(schema: z.ZodTypeAny): boolean;

/**
 * Japanese Kana Validation Rules
 *
 * Provides configurable validation for Japanese character input:
 * - 全角カタカナ (Full-width Katakana) - default
 * - 半角カタカナ (Half-width Katakana)
 * - ひらがな (Hiragana)
 * - Mixed modes
 *
 * @example
 * ```typescript
 * import { kanaString, KATAKANA_PATTERN } from '@famgia/omnify-react/lib';
 * import { z } from 'zod';
 *
 * // Method 1: Use kanaString helper
 * const schema = z.object({
 *   name_kana: kanaString(),  // 全角カタカナ (default)
 * });
 *
 * // Method 2: Use pattern directly
 * const schema2 = z.object({
 *   name_kana: z.string().regex(KATAKANA_PATTERN, '全角カタカナで入力してください'),
 * });
 * ```
 */

interface KanaRuleOptions {
    /** Allow full-width katakana (ア-ン) - default: true */
    fullWidthKatakana?: boolean;
    /** Allow half-width katakana (ｱ-ﾝ) - default: false */
    halfWidthKatakana?: boolean;
    /** Allow hiragana (あ-ん) - default: false */
    hiragana?: boolean;
    /** Allow numbers (0-9, ０-９) - default: false */
    allowNumbers?: boolean;
    /** Allow full-width numbers (０-９) - default: false */
    fullWidthNumbers?: boolean;
    /** Allow half-width numbers (0-9) - default: false */
    halfWidthNumbers?: boolean;
    /** Allow spaces (full-width and half-width) - default: true */
    allowSpaces?: boolean;
    /** Allow specific special characters - default: ['ー', '・'] */
    allowSpecialChars?: string[];
    /** Custom error message */
    message?: string;
}
/**
 * Create a kana validation regex
 */
declare function createKanaRegex(options?: KanaRuleOptions): RegExp;
/**
 * Validate a string against kana rules
 */
declare function validateKana(value: string, options?: KanaRuleOptions): boolean;
/**
 * Get kana validation pattern string (for Zod .regex())
 */
declare function getKanaPattern(options?: KanaRuleOptions): string;
/**
 * Get error message for kana validation
 */
declare function getKanaErrorMessage(options?: KanaRuleOptions, locale?: string): string;
/** 全角カタカナ (Full-width Katakana) - Default for Japanese names */
declare const KATAKANA_FULL_WIDTH: KanaRuleOptions;
/** 半角カタカナ (Half-width Katakana) - Legacy systems */
declare const KATAKANA_HALF_WIDTH: KanaRuleOptions;
/** ひらがな (Hiragana) */
declare const HIRAGANA: KanaRuleOptions;
/** カタカナ + ひらがな (Any kana) */
declare const KANA_ANY: KanaRuleOptions;
/** 全角カタカナ + 数字 (Full-width katakana with numbers) */
declare const KATAKANA_WITH_NUMBERS: KanaRuleOptions;
/** Pattern: 全角カタカナ + スペース + ー・ (for z.string().regex()) */
declare const KATAKANA_PATTERN: RegExp;
/** Pattern: 半角カタカナ (for z.string().regex()) */
declare const KATAKANA_HALF_PATTERN: RegExp;
/** Pattern: ひらがな (for z.string().regex()) */
declare const HIRAGANA_PATTERN: RegExp;
/** Pattern: すべてのかな (for z.string().regex()) */
declare const KANA_ANY_PATTERN: RegExp;
/**
 * Create Zod string schema with kana validation
 * @example
 * const schema = z.object({
 *   name_kana: kanaString(), // 全角カタカナ (default)
 *   name_kana2: kanaString({ hiragana: true }), // カタカナ + ひらがな
 * });
 */
declare function kanaString(options?: KanaRuleOptions): z.ZodString;
/**
 * Add kana validation to existing Zod string schema
 * @example
 * const schema = z.string().min(1).pipe(withKana());
 */
declare function withKana(options?: KanaRuleOptions): z.ZodString;
declare const kanaRules: {
    createRegex: typeof createKanaRegex;
    validate: typeof validateKana;
    getPattern: typeof getKanaPattern;
    getMessage: typeof getKanaErrorMessage;
    string: typeof kanaString;
    presets: {
        fullWidthKatakana: KanaRuleOptions;
        halfWidthKatakana: KanaRuleOptions;
        hiragana: KanaRuleOptions;
        any: KanaRuleOptions;
        withNumbers: KanaRuleOptions;
    };
    patterns: {
        katakana: RegExp;
        katakanaHalf: RegExp;
        hiragana: RegExp;
        any: RegExp;
    };
};

export { HIRAGANA, HIRAGANA_PATTERN, KANA_ANY, KANA_ANY_PATTERN, KATAKANA_FULL_WIDTH, KATAKANA_HALF_PATTERN, KATAKANA_HALF_WIDTH, KATAKANA_PATTERN, KATAKANA_WITH_NUMBERS, type KanaRuleOptions, addZodMessages, createKanaRegex, getKanaErrorMessage, getKanaPattern, getZodFallbackLocale, getZodLocale, getZodMessage, getZodMessages, isZodRequired, getKanaPattern as kanaPattern, createKanaRegex as kanaRegex, kanaRules, kanaString, requiredRule, setZodFallbackLocale, setZodLocale, validateKana, withKana, zodRule };
