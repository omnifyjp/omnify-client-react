/**
 * Tests for zod-i18n utilities
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  setZodLocale,
  getZodLocale,
  setZodFallbackLocale,
  getZodFallbackLocale,
  addZodMessages,
  getZodMessage,
  getZodMessages,
  resetZodI18n,
} from './zod-i18n';

describe('zod-i18n', () => {
  beforeEach(() => {
    // Reset to defaults (including custom messages)
    resetZodI18n();
  });

  describe('setZodLocale / getZodLocale', () => {
    it('should set and get locale', () => {
      setZodLocale('en');
      expect(getZodLocale()).toBe('en');

      setZodLocale('vi');
      expect(getZodLocale()).toBe('vi');
    });
  });

  describe('setZodFallbackLocale / getZodFallbackLocale', () => {
    it('should set and get fallback locale', () => {
      setZodFallbackLocale('ja');
      expect(getZodFallbackLocale()).toBe('ja');
    });
  });

  describe('getZodMessage', () => {
    it('should return Japanese message when locale is ja', () => {
      setZodLocale('ja');
      const msg = getZodMessage('required', { displayName: 'メール' });
      expect(msg).toBe('メールは必須です');
    });

    it('should return English message when locale is en', () => {
      setZodLocale('en');
      const msg = getZodMessage('required', { displayName: 'Email' });
      expect(msg).toBe('Email is required');
    });

    it('should handle minLength message', () => {
      setZodLocale('ja');
      const msg = getZodMessage('minLength', { displayName: '名前', min: 3 });
      expect(msg).toBe('名前は3文字以上で入力してください');
    });

    it('should handle maxLength message', () => {
      setZodLocale('en');
      const msg = getZodMessage('maxLength', { displayName: 'Name', max: 100 });
      expect(msg).toBe('Name must be at most 100 characters');
    });

    it('should fallback to fallback locale when current locale not found', () => {
      setZodLocale('unknown');
      setZodFallbackLocale('en');
      const msg = getZodMessage('email');
      expect(msg).toBe('Please enter a valid email address');
    });

    it('should return key when message not found', () => {
      const msg = getZodMessage('unknownKey');
      expect(msg).toBe('unknownKey');
    });
  });

  describe('addZodMessages', () => {
    it('should add custom messages', () => {
      addZodMessages({
        custom: {
          ja: 'カスタムメッセージ',
          en: 'Custom message',
        },
      });

      setZodLocale('ja');
      expect(getZodMessage('custom')).toBe('カスタムメッセージ');

      setZodLocale('en');
      expect(getZodMessage('custom')).toBe('Custom message');
    });

    it('should override default messages', () => {
      addZodMessages({
        required: {
          ja: '${displayName}を入力してください',
        },
      });

      setZodLocale('ja');
      const msg = getZodMessage('required', { displayName: 'メール' });
      expect(msg).toBe('メールを入力してください');
    });
  });

  describe('getZodMessages', () => {
    it('should return all messages for locale', () => {
      setZodLocale('ja');
      const messages = getZodMessages();

      expect(messages.required).toBe('${displayName}は必須です');
      expect(messages.email).toBe('有効なメールアドレスを入力してください');
    });

    it('should accept locale parameter', () => {
      const messages = getZodMessages('en');
      expect(messages.required).toBe('${displayName} is required');
    });
  });
});
