/**
 * JapaneseNameField - Japanese name input component
 * Handles lastname + firstname with optional kana fields
 *
 * @example
 * ```tsx
 * import { JapaneseNameField } from '@famgia/omnify-react/components';
 *
 * <JapaneseNameField
 *   schemas={customerSchemas}
 *   i18n={customerI18n}
 *   prefix="name"
 *   showKana={true}
 * />
 * ```
 */
import { Form, Input, Row, Col } from 'antd';
import type { FormInstance } from 'antd';
import type { RuleObject } from 'antd/es/form';
import { zodRule, isZodRequired } from '../lib/form-validation';
import { getZodLocale } from '../lib/zod-i18n';

export interface I18nConfig {
  fields: Record<string, { label?: Record<string, string>; placeholder?: Record<string, string> }>;
}

export interface JapaneseNameFieldProps {
  /** Form instance (optional) */
  form?: FormInstance;
  /** Zod schemas for validation */
  schemas: Record<string, unknown>;
  /** i18n configuration for labels and placeholders */
  i18n: I18nConfig;
  /** Field name prefix (default: 'name') */
  prefix?: string;
  /** Override required status */
  required?: boolean;
  /** Show kana fields (default: true) */
  showKana?: boolean;
  /** Custom label for name fields */
  label?: string;
  /** Custom label for kana fields */
  kanaLabel?: string;
}

function getLabel(i18n: I18nConfig, field: string, locale: string): string {
  return i18n.fields[field]?.label?.[locale] ?? i18n.fields[field]?.label?.['en'] ?? field;
}

function getCompoundLabel(i18n: I18nConfig, prefix: string, locale: string): string | undefined {
  // Try to get compound-level label (e.g., 'name' -> '氏名')
  return i18n.fields[prefix]?.label?.[locale] ?? i18n.fields[prefix]?.label?.['en'];
}

function getPlaceholder(i18n: I18nConfig, field: string, locale: string): string {
  return i18n.fields[field]?.placeholder?.[locale] ?? i18n.fields[field]?.placeholder?.['en'] ?? '';
}

export function JapaneseNameField({
  schemas,
  i18n,
  prefix = 'name',
  required = false,
  showKana = true,
  label,
  kanaLabel,
}: JapaneseNameFieldProps) {
  const locale = getZodLocale();

  const lastnameField = `${prefix}_lastname`;
  const firstnameField = `${prefix}_firstname`;
  const kanaLastnameField = `${prefix}_kana_lastname`;
  const kanaFirstnameField = `${prefix}_kana_firstname`;

  const getRule = (field: string): RuleObject[] => {
    const schema = schemas[field];
    if (!schema) return [];
    return [zodRule(schema as any, getLabel(i18n, field, locale))];
  };

  // Check if a field is required by examining its Zod schema
  const isFieldRequired = (field: string): boolean => {
    const schema = schemas[field];
    if (!schema) return false;
    return isZodRequired(schema as any);
  };

  const nameRequired = isFieldRequired(lastnameField) || isFieldRequired(firstnameField) || required;
  const kanaRequired = isFieldRequired(kanaLastnameField) || isFieldRequired(kanaFirstnameField);

  // Try compound label first, then fallback to first field's label
  const nameLabel = label ?? getCompoundLabel(i18n, prefix, locale) ?? getLabel(i18n, lastnameField, locale);
  const nameKanaLabel =
    kanaLabel ??
    `${getCompoundLabel(i18n, prefix, locale) ?? getLabel(i18n, kanaLastnameField, locale)}（カナ）`;

  // Get short field labels (姓, 名, etc.)
  const lastnameShortLabel = locale === 'ja' ? '姓' : 'Last';
  const firstnameShortLabel = locale === 'ja' ? '名' : 'First';

  const prefixStyle: React.CSSProperties = {
    color: 'rgba(0, 0, 0, 0.88)',
    fontWeight: 500,
    borderRight: '1px solid #d9d9d9',
    paddingRight: 8,
    marginRight: 4,
  };

  return (
    <>
      <Form.Item label={nameLabel} required={nameRequired} style={{ marginBottom: 0 }}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item name={lastnameField} rules={getRule(lastnameField)} style={{ marginBottom: 16 }}>
              <Input
                prefix={<span style={prefixStyle}>{lastnameShortLabel}</span>}
                placeholder={getPlaceholder(i18n, lastnameField, locale)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={firstnameField} rules={getRule(firstnameField)} style={{ marginBottom: 16 }}>
              <Input
                prefix={<span style={prefixStyle}>{firstnameShortLabel}</span>}
                placeholder={getPlaceholder(i18n, firstnameField, locale)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      {showKana && (
        <Form.Item label={nameKanaLabel} required={kanaRequired} style={{ marginBottom: 0 }}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name={kanaLastnameField}
                rules={getRule(kanaLastnameField)}
                style={{ marginBottom: 16 }}
              >
                <Input
                  prefix={<span style={prefixStyle}>{lastnameShortLabel}</span>}
                  placeholder={getPlaceholder(i18n, kanaLastnameField, locale)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={kanaFirstnameField}
                rules={getRule(kanaFirstnameField)}
                style={{ marginBottom: 16 }}
              >
                <Input
                  prefix={<span style={prefixStyle}>{firstnameShortLabel}</span>}
                  placeholder={getPlaceholder(i18n, kanaFirstnameField, locale)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      )}
    </>
  );
}
