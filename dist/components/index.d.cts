import * as react_jsx_runtime from 'react/jsx-runtime';
import { FormInstance } from 'antd';

interface I18nConfig$2 {
    fields: Record<string, {
        label?: Record<string, string>;
        placeholder?: Record<string, string>;
    }>;
}
interface JapaneseNameFieldProps {
    /** Form instance (optional) */
    form?: FormInstance;
    /** Zod schemas for validation */
    schemas: Record<string, unknown>;
    /** i18n configuration for labels and placeholders */
    i18n: I18nConfig$2;
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
declare function JapaneseNameField({ schemas, i18n, prefix, required, showKana, label, kanaLabel, }: JapaneseNameFieldProps): react_jsx_runtime.JSX.Element;

interface I18nConfig$1 {
    fields: Record<string, {
        label?: Record<string, string>;
        placeholder?: Record<string, string>;
    }>;
}
interface SelectOption$1 {
    value: string | number;
    label: string;
}
interface PostalLookupResult {
    prefecture?: string;
    prefectureCode?: string;
    prefectureName?: string;
    address1?: string;
    address2?: string;
}
interface JapaneseAddressFieldProps {
    /** Ant Design form instance */
    form: FormInstance;
    /** Zod schemas for validation */
    schemas: Record<string, unknown>;
    /** i18n configuration for labels and placeholders */
    i18n: I18nConfig$1;
    /** Field name prefix (default: 'address') */
    prefix?: string;
    /** Use prefecture ID instead of code (default: false) */
    usePrefectureId?: boolean;
    /** Prefecture options for select. If not provided, a simple input is shown */
    prefectureOptions?: SelectOption$1[];
    /** Enable postal code lookup (default: true) */
    enablePostalLookup?: boolean;
    /** Show search button (default: true) */
    showSearchButton?: boolean;
    /** Auto search when postal code is complete (default: true) */
    autoSearch?: boolean;
    /** Custom postal lookup function */
    onPostalLookup?: (postalCode: string) => Promise<PostalLookupResult | null>;
}
declare function JapaneseAddressField({ form, schemas, i18n, prefix, usePrefectureId, prefectureOptions, enablePostalLookup, showSearchButton, autoSearch, onPostalLookup, }: JapaneseAddressFieldProps): react_jsx_runtime.JSX.Element;

interface I18nConfig {
    fields: Record<string, {
        label?: Record<string, string>;
        placeholder?: Record<string, string>;
    }>;
}
interface SelectOption {
    value: string | number;
    label: string;
}
interface JapaneseBankFieldProps {
    /** Form instance (optional) */
    form?: FormInstance;
    /** Zod schemas for validation */
    schemas: Record<string, unknown>;
    /** i18n configuration for labels and placeholders */
    i18n: I18nConfig;
    /** Field name prefix (default: 'bank') */
    prefix?: string;
    /** Account type options. If not provided, a simple input is shown */
    accountTypeOptions?: SelectOption[];
}
declare function JapaneseBankField({ schemas, i18n, prefix, accountTypeOptions, }: JapaneseBankFieldProps): react_jsx_runtime.JSX.Element;

export { type SelectOption as BankSelectOption, type I18nConfig$2 as I18nConfig, JapaneseAddressField, type JapaneseAddressFieldProps, JapaneseBankField, type JapaneseBankFieldProps, JapaneseNameField, type JapaneseNameFieldProps, type PostalLookupResult, type SelectOption$1 as SelectOption };
