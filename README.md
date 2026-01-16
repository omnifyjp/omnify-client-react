# @famgia/omnify-react

React runtime components, hooks, and utilities for [Omnify](https://github.com/ecsol/omnify-ts) schemas.

## Installation

```bash
npm install @famgia/omnify-react
# or
pnpm add @famgia/omnify-react
```

## Features

- **Components**: Pre-built Japanese form field components (name, address, bank account)
- **Hooks**: Form mutation with Laravel error handling
- **Utilities**: Zod i18n, form validation, kana validation rules

## Usage

### Components

```tsx
import {
  JapaneseNameField,
  JapaneseAddressField,
  JapaneseBankField,
} from '@famgia/omnify-react';
import { customerSchemas, customerI18n } from './.omnify/schemas';

function CustomerForm() {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <JapaneseNameField
        schemas={customerSchemas}
        i18n={customerI18n}
        prefix="name"
        showKana
      />

      <JapaneseAddressField
        form={form}
        schemas={customerSchemas}
        i18n={customerI18n}
        prefix="address"
        prefectureOptions={prefectureOptions}
      />

      <JapaneseBankField
        schemas={customerSchemas}
        i18n={customerI18n}
        prefix="bank"
        accountTypeOptions={accountTypeOptions}
      />
    </Form>
  );
}
```

### Hooks

```tsx
import { useFormMutation } from '@famgia/omnify-react';

function CustomerForm() {
  const [form] = Form.useForm();

  const mutation = useFormMutation({
    form,
    mutationFn: (data) => axios.post('/api/customers', data),
    invalidateKeys: [['customers']],
    successMessage: '保存しました',
  });

  return (
    <Form form={form} onFinish={mutation.mutate}>
      {/* fields */}
      <Button loading={mutation.isPending}>保存</Button>
    </Form>
  );
}
```

### Form Validation

```tsx
import { setZodLocale, zodRule, requiredRule } from '@famgia/omnify-react';
import { customerSchemas } from './.omnify/schemas';

// Set locale once at app level
setZodLocale('ja');

function CustomerForm() {
  return (
    <Form>
      <Form.Item
        name="email"
        rules={[zodRule(customerSchemas.email, 'メールアドレス')]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="name"
        rules={[requiredRule('名前')]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}
```

### Kana Validation

```tsx
import { kanaString, KATAKANA_PATTERN } from '@famgia/omnify-react';
import { z } from 'zod';

// Method 1: Use kanaString helper
const schema = z.object({
  name_kana: kanaString(), // 全角カタカナ (default)
});

// Method 2: Use pattern directly
const schema2 = z.object({
  name_kana: z.string().regex(KATAKANA_PATTERN, '全角カタカナで入力してください'),
});
```

## API Reference

### Components

| Component              | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `JapaneseNameField`    | Japanese name input (lastname + firstname + kana) |
| `JapaneseAddressField` | Japanese address input with postal code lookup    |
| `JapaneseBankField`    | Japanese bank account input                       |

### Hooks

| Hook              | Description                               |
| ----------------- | ----------------------------------------- |
| `useFormMutation` | Form mutation with Laravel error handling |

### Utilities

| Function                       | Description                                   |
| ------------------------------ | --------------------------------------------- |
| `setZodLocale(locale)`         | Set current locale for validation messages    |
| `getZodLocale()`               | Get current locale                            |
| `zodRule(schema, displayName)` | Convert Zod schema to Ant Design rule         |
| `requiredRule(displayName)`    | Create required rule with i18n                |
| `kanaString(options)`          | Create Zod string schema with kana validation |

### Kana Presets

| Preset                  | Description            |
| ----------------------- | ---------------------- |
| `KATAKANA_FULL_WIDTH`   | 全角カタカナ (default) |
| `KATAKANA_HALF_WIDTH`   | 半角カタカナ           |
| `HIRAGANA`              | ひらがな               |
| `KANA_ANY`              | All kana types         |
| `KATAKANA_WITH_NUMBERS` | カタカナ + numbers     |

## Peer Dependencies

- `react` >= 18.0.0
- `react-dom` >= 18.0.0
- `antd` >= 6.0.0
- `zod` >= 3.25.0

## License

MIT
