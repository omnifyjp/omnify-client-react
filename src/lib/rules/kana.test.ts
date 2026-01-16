/**
 * Tests for kana validation rules
 */
import { describe, it, expect } from 'vitest';
import {
  validateKana,
  createKanaRegex,
  getKanaPattern,
  getKanaErrorMessage,
  kanaString,
  KATAKANA_PATTERN,
  KATAKANA_HALF_PATTERN,
  HIRAGANA_PATTERN,
  KANA_ANY_PATTERN,
  KATAKANA_FULL_WIDTH,
  KATAKANA_HALF_WIDTH,
  HIRAGANA,
  KANA_ANY,
} from './kana';

describe('kana validation', () => {
  describe('validateKana', () => {
    describe('full-width katakana (default)', () => {
      it('should accept valid katakana', () => {
        expect(validateKana('タナカ')).toBe(true);
        expect(validateKana('ヤマダ タロウ')).toBe(true);
        expect(validateKana('スズキ　イチロー')).toBe(true); // Full-width space
      });

      it('should accept special characters', () => {
        expect(validateKana('タナカー')).toBe(true); // 長音
        expect(validateKana('タナカ・タロウ')).toBe(true); // 中点
      });

      it('should reject hiragana', () => {
        expect(validateKana('たなか')).toBe(false);
      });

      it('should reject half-width katakana', () => {
        expect(validateKana('ﾀﾅｶ')).toBe(false);
      });

      it('should accept empty string', () => {
        expect(validateKana('')).toBe(true);
      });
    });

    describe('hiragana mode', () => {
      const options = HIRAGANA;

      it('should accept hiragana', () => {
        expect(validateKana('たなか', options)).toBe(true);
        expect(validateKana('やまだ たろう', options)).toBe(true);
      });

      it('should reject katakana', () => {
        expect(validateKana('タナカ', options)).toBe(false);
      });
    });

    describe('half-width katakana mode', () => {
      const options = KATAKANA_HALF_WIDTH;

      it('should accept half-width katakana', () => {
        expect(validateKana('ﾀﾅｶ', options)).toBe(true);
      });

      it('should reject full-width katakana', () => {
        expect(validateKana('タナカ', options)).toBe(false);
      });
    });

    describe('any kana mode', () => {
      const options = KANA_ANY;

      it('should accept all kana types', () => {
        expect(validateKana('タナカ', options)).toBe(true);
        expect(validateKana('たなか', options)).toBe(true);
        expect(validateKana('ﾀﾅｶ', options)).toBe(true);
        expect(validateKana('タナカたなかﾀﾅｶ', options)).toBe(true);
      });
    });

    describe('with numbers', () => {
      const options = { ...KATAKANA_FULL_WIDTH, allowNumbers: true };

      it('should accept numbers with katakana', () => {
        expect(validateKana('タナカ123', options)).toBe(true);
        expect(validateKana('タナカ１２３', options)).toBe(true);
      });
    });
  });

  describe('createKanaRegex', () => {
    it('should create regex for full-width katakana', () => {
      const regex = createKanaRegex(KATAKANA_FULL_WIDTH);
      expect(regex.test('タナカ')).toBe(true);
      expect(regex.test('たなか')).toBe(false);
    });
  });

  describe('getKanaPattern', () => {
    it('should return pattern string', () => {
      const pattern = getKanaPattern(KATAKANA_FULL_WIDTH);
      expect(pattern).toMatch(/^\^/); // Starts with ^
      expect(pattern).toMatch(/\*\$$/); // Ends with *$
    });
  });

  describe('getKanaErrorMessage', () => {
    it('should return Japanese message by default', () => {
      const msg = getKanaErrorMessage(KATAKANA_FULL_WIDTH, 'ja');
      expect(msg).toBe('全角カタカナで入力してください');
    });

    it('should return English message', () => {
      const msg = getKanaErrorMessage(KATAKANA_FULL_WIDTH, 'en');
      expect(msg).toBe('Please enter in full-width katakana');
    });

    it('should use custom message if provided', () => {
      const msg = getKanaErrorMessage({ message: 'カスタム' }, 'ja');
      expect(msg).toBe('カスタム');
    });
  });

  describe('pattern constants', () => {
    it('KATAKANA_PATTERN should match full-width katakana', () => {
      expect(KATAKANA_PATTERN.test('タナカ')).toBe(true);
      expect(KATAKANA_PATTERN.test('たなか')).toBe(false);
    });

    it('HIRAGANA_PATTERN should match hiragana', () => {
      expect(HIRAGANA_PATTERN.test('たなか')).toBe(true);
      expect(HIRAGANA_PATTERN.test('タナカ')).toBe(false);
    });

    it('KATAKANA_HALF_PATTERN should match half-width katakana', () => {
      expect(KATAKANA_HALF_PATTERN.test('ﾀﾅｶ')).toBe(true);
      expect(KATAKANA_HALF_PATTERN.test('タナカ')).toBe(false);
    });

    it('KANA_ANY_PATTERN should match any kana', () => {
      expect(KANA_ANY_PATTERN.test('タナカ')).toBe(true);
      expect(KANA_ANY_PATTERN.test('たなか')).toBe(true);
      expect(KANA_ANY_PATTERN.test('ﾀﾅｶ')).toBe(true);
    });
  });

  describe('kanaString (Zod helper)', () => {
    it('should create valid Zod schema', () => {
      const schema = kanaString();

      expect(schema.safeParse('タナカ').success).toBe(true);
      expect(schema.safeParse('たなか').success).toBe(false);
    });

    it('should accept options', () => {
      const schema = kanaString({ hiragana: true, fullWidthKatakana: false });

      expect(schema.safeParse('たなか').success).toBe(true);
      expect(schema.safeParse('タナカ').success).toBe(false);
    });
  });
});
