"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  HIRAGANA: () => HIRAGANA,
  HIRAGANA_PATTERN: () => HIRAGANA_PATTERN,
  JapaneseAddressField: () => JapaneseAddressField,
  JapaneseBankField: () => JapaneseBankField,
  JapaneseNameField: () => JapaneseNameField,
  KANA_ANY: () => KANA_ANY,
  KANA_ANY_PATTERN: () => KANA_ANY_PATTERN,
  KATAKANA_FULL_WIDTH: () => KATAKANA_FULL_WIDTH,
  KATAKANA_HALF_PATTERN: () => KATAKANA_HALF_PATTERN,
  KATAKANA_HALF_WIDTH: () => KATAKANA_HALF_WIDTH,
  KATAKANA_PATTERN: () => KATAKANA_PATTERN,
  KATAKANA_WITH_NUMBERS: () => KATAKANA_WITH_NUMBERS,
  OmnifyForm: () => OmnifyForm,
  addZodMessages: () => addZodMessages,
  createKanaRegex: () => createKanaRegex,
  getFirstValidationError: () => getFirstValidationError,
  getFormErrors: () => getFormErrors,
  getKanaErrorMessage: () => getKanaErrorMessage,
  getKanaPattern: () => getKanaPattern,
  getValidationMessage: () => getValidationMessage,
  getZodFallbackLocale: () => getZodFallbackLocale,
  getZodLocale: () => getZodLocale,
  getZodMessage: () => getZodMessage,
  getZodMessages: () => getZodMessages,
  isZodRequired: () => isZodRequired,
  kanaPattern: () => getKanaPattern,
  kanaRegex: () => createKanaRegex,
  kanaRules: () => kanaRules,
  kanaString: () => kanaString,
  requiredRule: () => requiredRule,
  setZodFallbackLocale: () => setZodFallbackLocale,
  setZodLocale: () => setZodLocale,
  useFormMutation: () => useFormMutation,
  validateKana: () => validateKana,
  withKana: () => withKana,
  zodRule: () => zodRule
});
module.exports = __toCommonJS(src_exports);

// src/components/JapaneseNameField.tsx
var import_antd = require("antd");

// src/lib/zod-i18n.ts
var DEFAULT_MESSAGES = {
  required: {
    en: "${displayName} is required",
    ja: "${displayName}\u306F\u5FC5\u9808\u3067\u3059",
    vi: "${displayName} l\xE0 b\u1EAFt bu\u1ED9c",
    ko: "${displayName}\uC740(\uB294) \uD544\uC218\uC785\uB2C8\uB2E4",
    "zh-CN": "${displayName}\u662F\u5FC5\u586B\u9879",
    "zh-TW": "${displayName}\u70BA\u5FC5\u586B\u6B04\u4F4D",
    th: "${displayName} \u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E23\u0E2D\u0E01",
    es: "${displayName} es obligatorio"
  },
  minLength: {
    en: "${displayName} must be at least ${min} characters",
    ja: "${displayName}\u306F${min}\u6587\u5B57\u4EE5\u4E0A\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
    vi: "${displayName} ph\u1EA3i c\xF3 \xEDt nh\u1EA5t ${min} k\xFD t\u1EF1",
    ko: "${displayName}\uC740(\uB294) ${min}\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4",
    "zh-CN": "${displayName}\u81F3\u5C11\u9700\u8981${min}\u4E2A\u5B57\u7B26",
    "zh-TW": "${displayName}\u81F3\u5C11\u9700\u8981${min}\u500B\u5B57\u5143",
    th: "${displayName} \u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 ${min} \u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23",
    es: "${displayName} debe tener al menos ${min} caracteres"
  },
  maxLength: {
    en: "${displayName} must be at most ${max} characters",
    ja: "${displayName}\u306F${max}\u6587\u5B57\u4EE5\u5185\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
    vi: "${displayName} kh\xF4ng \u0111\u01B0\u1EE3c qu\xE1 ${max} k\xFD t\u1EF1",
    ko: "${displayName}\uC740(\uB294) ${max}\uC790 \uC774\uD558\uC5EC\uC57C \uD569\uB2C8\uB2E4",
    "zh-CN": "${displayName}\u6700\u591A${max}\u4E2A\u5B57\u7B26",
    "zh-TW": "${displayName}\u6700\u591A${max}\u500B\u5B57\u5143",
    th: "${displayName} \u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19 ${max} \u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23",
    es: "${displayName} debe tener como m\xE1ximo ${max} caracteres"
  },
  min: {
    en: "${displayName} must be at least ${min}",
    ja: "${displayName}\u306F${min}\u4EE5\u4E0A\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
    vi: "${displayName} ph\u1EA3i l\u1EDBn h\u01A1n ho\u1EB7c b\u1EB1ng ${min}",
    ko: "${displayName}\uC740(\uB294) ${min} \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4",
    "zh-CN": "${displayName}\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8E${min}",
    "zh-TW": "${displayName}\u5FC5\u9808\u5927\u65BC\u7B49\u65BC${min}",
    th: "${displayName} \u0E15\u0E49\u0E2D\u0E07\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E17\u0E48\u0E32\u0E01\u0E31\u0E1A ${min}",
    es: "${displayName} debe ser al menos ${min}"
  },
  max: {
    en: "${displayName} must be at most ${max}",
    ja: "${displayName}\u306F${max}\u4EE5\u4E0B\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
    vi: "${displayName} ph\u1EA3i nh\u1ECF h\u01A1n ho\u1EB7c b\u1EB1ng ${max}",
    ko: "${displayName}\uC740(\uB294) ${max} \uC774\uD558\uC5EC\uC57C \uD569\uB2C8\uB2E4",
    "zh-CN": "${displayName}\u5FC5\u987B\u5C0F\u4E8E\u7B49\u4E8E${max}",
    "zh-TW": "${displayName}\u5FC5\u9808\u5C0F\u65BC\u7B49\u65BC${max}",
    th: "${displayName} \u0E15\u0E49\u0E2D\u0E07\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E17\u0E48\u0E32\u0E01\u0E31\u0E1A ${max}",
    es: "${displayName} debe ser como m\xE1ximo ${max}"
  },
  email: {
    en: "Please enter a valid email address",
    ja: "\u6709\u52B9\u306A\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
    vi: "Vui l\xF2ng nh\u1EADp \u0111\u1ECBa ch\u1EC9 email h\u1EE3p l\u1EC7",
    ko: "\uC720\uD6A8\uD55C \uC774\uBA54\uC77C \uC8FC\uC18C\uB97C \uC785\uB825\uD558\uC138\uC694",
    "zh-CN": "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u7535\u5B50\u90AE\u4EF6\u5730\u5740",
    "zh-TW": "\u8ACB\u8F38\u5165\u6709\u6548\u7684\u96FB\u5B50\u90F5\u4EF6\u5730\u5740",
    th: "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E2D\u0E35\u0E40\u0E21\u0E25\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07",
    es: "Por favor, introduce una direcci\xF3n de correo electr\xF3nico v\xE1lida"
  },
  url: {
    en: "Please enter a valid URL",
    ja: "\u6709\u52B9\u306AURL\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
    vi: "Vui l\xF2ng nh\u1EADp URL h\u1EE3p l\u1EC7",
    ko: "\uC720\uD6A8\uD55C URL\uC744 \uC785\uB825\uD558\uC138\uC694",
    "zh-CN": "\u8BF7\u8F93\u5165\u6709\u6548\u7684URL",
    "zh-TW": "\u8ACB\u8F38\u5165\u6709\u6548\u7684\u7DB2\u5740",
    th: "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01 URL \u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07",
    es: "Por favor, introduce una URL v\xE1lida"
  },
  pattern: {
    en: "${displayName} format is invalid",
    ja: "${displayName}\u306E\u5F62\u5F0F\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093",
    vi: "${displayName} kh\xF4ng \u0111\xFAng \u0111\u1ECBnh d\u1EA1ng",
    ko: "${displayName} \uD615\uC2DD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",
    "zh-CN": "${displayName}\u683C\u5F0F\u4E0D\u6B63\u786E",
    "zh-TW": "${displayName}\u683C\u5F0F\u4E0D\u6B63\u78BA",
    th: "\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A${displayName}\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07",
    es: "El formato de ${displayName} no es v\xE1lido"
  }
};
var currentLocale = "ja";
var fallbackLocale = "en";
var customMessages = {};
function setZodLocale(locale) {
  currentLocale = locale;
}
function getZodLocale() {
  return currentLocale;
}
function setZodFallbackLocale(locale) {
  fallbackLocale = locale;
}
function getZodFallbackLocale() {
  return fallbackLocale;
}
function addZodMessages(messages) {
  for (const [key, locales] of Object.entries(messages)) {
    customMessages[key] = { ...customMessages[key], ...locales };
  }
}
function getZodMessage(key, params = {}) {
  const messages = customMessages[key] ?? DEFAULT_MESSAGES[key];
  if (!messages) return key;
  let message2 = messages[currentLocale] ?? messages[fallbackLocale] ?? messages["en"] ?? key;
  for (const [param, value] of Object.entries(params)) {
    message2 = message2.replace(new RegExp(`\\$\\{${param}\\}`, "g"), String(value));
  }
  return message2;
}
function getZodMessages(locale) {
  const targetLocale = locale ?? currentLocale;
  const result = {};
  for (const [key, locales] of Object.entries(DEFAULT_MESSAGES)) {
    result[key] = locales[targetLocale] ?? locales[fallbackLocale] ?? locales["en"] ?? key;
  }
  for (const [key, locales] of Object.entries(customMessages)) {
    if (locales[targetLocale]) {
      result[key] = locales[targetLocale];
    }
  }
  return result;
}

// src/lib/form-validation.ts
function zodRule(schema, displayName) {
  const field = displayName ?? "\u3053\u306E\u9805\u76EE";
  return {
    validator: async (_, value) => {
      if (value === void 0 || value === null || value === "") {
        if (schema.safeParse(void 0).success) return;
        throw new Error(getZodMessage("required", { displayName: field }));
      }
      const result = schema.safeParse(value);
      if (result.success) return;
      const issue = result.error.issues[0];
      if (!issue) {
        throw new Error(getZodMessage("required", { displayName: field }));
      }
      const issueAny = issue;
      switch (issue.code) {
        case "too_small": {
          const origin = issueAny.origin;
          const minimum = issueAny.minimum;
          if (origin === "string" && minimum === 1) {
            throw new Error(getZodMessage("required", { displayName: field }));
          }
          if (origin === "string") {
            throw new Error(getZodMessage("minLength", { displayName: field, min: minimum }));
          }
          throw new Error(getZodMessage("min", { displayName: field, min: minimum }));
        }
        case "too_big": {
          const origin = issueAny.origin;
          const maximum = issueAny.maximum;
          if (origin === "string") {
            throw new Error(getZodMessage("maxLength", { displayName: field, max: maximum }));
          }
          throw new Error(getZodMessage("max", { displayName: field, max: maximum }));
        }
        // Zod v4: 'invalid_string' → 'invalid_format'
        case "invalid_format": {
          const format = issueAny.format;
          if (format === "email") {
            throw new Error(getZodMessage("email", { displayName: field }));
          }
          if (format === "url") {
            throw new Error(getZodMessage("url", { displayName: field }));
          }
          if (format === "regex") {
            throw new Error(getZodMessage("pattern", { displayName: field }));
          }
          break;
        }
        // Zod v3: 'invalid_string' (handled via default case for forward compatibility)
        default: {
          if (issue.code === "invalid_string") {
            const validation = issueAny.validation;
            if (validation === "email") {
              throw new Error(getZodMessage("email", { displayName: field }));
            }
            if (validation === "url") {
              throw new Error(getZodMessage("url", { displayName: field }));
            }
            if (validation === "regex") {
              throw new Error(getZodMessage("pattern", { displayName: field }));
            }
          }
          break;
        }
        case "invalid_type": {
          const expected = issueAny.expected;
          if (expected && value === void 0) {
            throw new Error(getZodMessage("required", { displayName: field }));
          }
          break;
        }
      }
      throw new Error(issue.message);
    }
  };
}
function requiredRule(displayName) {
  return {
    required: true,
    message: getZodMessage("required", { displayName })
  };
}
function isZodRequired(schema) {
  const schemaDesc = schema?._def?.typeName;
  const inner = schema?._def?.innerType;
  if (schemaDesc === "ZodOptional" || schemaDesc === "ZodNullable") return false;
  if (inner?._def?.typeName === "ZodOptional" || inner?._def?.typeName === "ZodNullable") return false;
  return true;
}

// src/components/JapaneseNameField.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function getLabel(i18n, field, locale) {
  return i18n.fields[field]?.label?.[locale] ?? i18n.fields[field]?.label?.["en"] ?? field;
}
function getCompoundLabel(i18n, prefix, locale) {
  return i18n.fields[prefix]?.label?.[locale] ?? i18n.fields[prefix]?.label?.["en"];
}
function getPlaceholder(i18n, field, locale) {
  return i18n.fields[field]?.placeholder?.[locale] ?? i18n.fields[field]?.placeholder?.["en"] ?? "";
}
function JapaneseNameField({
  schemas,
  i18n,
  prefix = "name",
  required = false,
  showKana = true,
  label,
  kanaLabel
}) {
  const locale = getZodLocale();
  const lastnameField = `${prefix}_lastname`;
  const firstnameField = `${prefix}_firstname`;
  const kanaLastnameField = `${prefix}_kana_lastname`;
  const kanaFirstnameField = `${prefix}_kana_firstname`;
  const getRule = (field) => {
    const schema = schemas[field];
    if (!schema) return [];
    return [zodRule(schema, getLabel(i18n, field, locale))];
  };
  const isFieldRequired = (field) => {
    const schema = schemas[field];
    if (!schema) return false;
    return isZodRequired(schema);
  };
  const nameRequired = isFieldRequired(lastnameField) || isFieldRequired(firstnameField) || required;
  const kanaRequired = isFieldRequired(kanaLastnameField) || isFieldRequired(kanaFirstnameField);
  const nameLabel = label ?? getCompoundLabel(i18n, prefix, locale) ?? getLabel(i18n, lastnameField, locale);
  const nameKanaLabel = kanaLabel ?? `${getCompoundLabel(i18n, prefix, locale) ?? getLabel(i18n, kanaLastnameField, locale)}\uFF08\u30AB\u30CA\uFF09`;
  const lastnameShortLabel = locale === "ja" ? "\u59D3" : "Last";
  const firstnameShortLabel = locale === "ja" ? "\u540D" : "First";
  const prefixStyle = {
    color: "rgba(0, 0, 0, 0.88)",
    fontWeight: 500,
    borderRight: "1px solid #d9d9d9",
    paddingRight: 8,
    marginRight: 4
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_antd.Form.Item, { label: nameLabel, required: nameRequired, style: { marginBottom: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_antd.Row, { gutter: 8, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_antd.Col, { span: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_antd.Form.Item, { name: lastnameField, rules: getRule(lastnameField), style: { marginBottom: 16 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_antd.Input,
        {
          prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: prefixStyle, children: lastnameShortLabel }),
          placeholder: getPlaceholder(i18n, lastnameField, locale)
        }
      ) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_antd.Col, { span: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_antd.Form.Item, { name: firstnameField, rules: getRule(firstnameField), style: { marginBottom: 16 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_antd.Input,
        {
          prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: prefixStyle, children: firstnameShortLabel }),
          placeholder: getPlaceholder(i18n, firstnameField, locale)
        }
      ) }) })
    ] }) }),
    showKana && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_antd.Form.Item, { label: nameKanaLabel, required: kanaRequired, style: { marginBottom: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_antd.Row, { gutter: 8, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_antd.Col, { span: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_antd.Form.Item,
        {
          name: kanaLastnameField,
          rules: getRule(kanaLastnameField),
          style: { marginBottom: 16 },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_antd.Input,
            {
              prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: prefixStyle, children: lastnameShortLabel }),
              placeholder: getPlaceholder(i18n, kanaLastnameField, locale)
            }
          )
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_antd.Col, { span: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_antd.Form.Item,
        {
          name: kanaFirstnameField,
          rules: getRule(kanaFirstnameField),
          style: { marginBottom: 16 },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_antd.Input,
            {
              prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: prefixStyle, children: firstnameShortLabel }),
              placeholder: getPlaceholder(i18n, kanaFirstnameField, locale)
            }
          )
        }
      ) })
    ] }) })
  ] });
}

// src/components/JapaneseAddressField.tsx
var import_react = require("react");
var import_antd2 = require("antd");
var import_icons = require("@ant-design/icons");
var import_jsx_runtime2 = require("react/jsx-runtime");
function getLabel2(i18n, field, locale) {
  return i18n.fields[field]?.label?.[locale] ?? i18n.fields[field]?.label?.["en"] ?? field;
}
function getPlaceholder2(i18n, field, locale) {
  return i18n.fields[field]?.placeholder?.[locale] ?? i18n.fields[field]?.placeholder?.["en"] ?? "";
}
async function lookupPostalCode(postalCode) {
  try {
    const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        prefectureCode: result.prefcode,
        prefectureName: result.address1,
        address1: result.address2,
        address2: result.address3
      };
    }
    return null;
  } catch (error) {
    console.error("Postal code lookup failed:", error);
    return null;
  }
}
var MESSAGES = {
  ja: {
    searchAddress: "\u4F4F\u6240\u691C\u7D22",
    searching: "\u691C\u7D22\u4E2D...",
    notFound: "\u90F5\u4FBF\u756A\u53F7\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F",
    error: "\u4F4F\u6240\u691C\u7D22\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
    invalidFormat: "\u90F5\u4FBF\u756A\u53F7\u306E\u5F62\u5F0F\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093\uFF08\u4F8B\uFF1A123-4567\uFF09"
  },
  en: {
    searchAddress: "Search Address",
    searching: "Searching...",
    notFound: "Postal code not found",
    error: "Address lookup failed",
    invalidFormat: "Invalid postal code format (e.g., 123-4567)"
  },
  vi: {
    searchAddress: "T\xECm \u0111\u1ECBa ch\u1EC9",
    searching: "\u0110ang t\xECm...",
    notFound: "Kh\xF4ng t\xECm th\u1EA5y m\xE3 b\u01B0u \u0111i\u1EC7n",
    error: "T\xECm \u0111\u1ECBa ch\u1EC9 th\u1EA5t b\u1EA1i",
    invalidFormat: "\u0110\u1ECBnh d\u1EA1ng m\xE3 b\u01B0u \u0111i\u1EC7n kh\xF4ng h\u1EE3p l\u1EC7 (VD: 123-4567)"
  }
};
function getMessage(key, locale) {
  return MESSAGES[locale]?.[key] ?? MESSAGES.ja[key];
}
function JapaneseAddressField({
  form,
  schemas,
  i18n,
  prefix = "address",
  usePrefectureId = false,
  prefectureOptions,
  enablePostalLookup = true,
  showSearchButton = true,
  autoSearch = true,
  onPostalLookup
}) {
  const locale = getZodLocale();
  const [isSearching, setIsSearching] = (0, import_react.useState)(false);
  const postalCodeField = `${prefix}_postal_code`;
  const prefectureField = usePrefectureId ? `${prefix}_prefecture_id` : `${prefix}_prefecture`;
  const address1Field = `${prefix}_address1`;
  const address2Field = `${prefix}_address2`;
  const address3Field = `${prefix}_address3`;
  const getRule = (field) => {
    const schema = schemas[field];
    if (!schema) return [];
    return [zodRule(schema, getLabel2(i18n, field, locale))];
  };
  const isRequired = (field) => {
    const schema = schemas[field];
    if (!schema) return false;
    return isZodRequired(schema);
  };
  const doLookup = (0, import_react.useCallback)(
    async (postalCode) => {
      const digits = postalCode.replace(/[^0-9]/g, "");
      if (digits.length !== 7) {
        import_antd2.message.warning(getMessage("invalidFormat", locale));
        return;
      }
      setIsSearching(true);
      try {
        const lookupFn = onPostalLookup ?? lookupPostalCode;
        const result = await lookupFn(postalCode);
        if (result) {
          const prefectureValue = usePrefectureId ? result.prefectureCode : result.prefecture;
          form.setFieldsValue({
            [prefectureField]: prefectureValue,
            [address1Field]: result.address1,
            [address2Field]: result.address2
          });
        } else {
          import_antd2.message.info(getMessage("notFound", locale));
        }
      } catch (error) {
        import_antd2.message.error(getMessage("error", locale));
        console.error("Postal code lookup failed:", error);
      } finally {
        setIsSearching(false);
      }
    },
    [form, locale, onPostalLookup, prefectureField, address1Field, address2Field, usePrefectureId]
  );
  const handlePostalCodeChange = async (e) => {
    const postalCode = e.target.value.replace(/[^0-9]/g, "");
    if (autoSearch && enablePostalLookup && postalCode.length === 7) {
      await doLookup(postalCode);
    }
  };
  const handleSearchClick = async () => {
    const postalCode = form.getFieldValue(postalCodeField);
    if (postalCode) {
      await doLookup(postalCode);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_antd2.Form.Item,
      {
        name: postalCodeField,
        label: getLabel2(i18n, postalCodeField, locale),
        rules: getRule(postalCodeField),
        required: isRequired(postalCodeField),
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_antd2.Input,
          {
            placeholder: getPlaceholder2(i18n, postalCodeField, locale),
            style: { width: enablePostalLookup && showSearchButton ? "calc(100% - 110px)" : 150 },
            onChange: handlePostalCodeChange,
            addonAfter: enablePostalLookup && showSearchButton && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              import_antd2.Button,
              {
                type: "text",
                size: "small",
                icon: isSearching ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons.LoadingOutlined, {}) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons.SearchOutlined, {}),
                onClick: handleSearchClick,
                disabled: isSearching,
                children: getMessage("searchAddress", locale)
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_antd2.Form.Item,
      {
        name: prefectureField,
        label: getLabel2(i18n, prefectureField, locale),
        rules: getRule(prefectureField),
        required: isRequired(prefectureField),
        children: prefectureOptions ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_antd2.Select,
          {
            placeholder: getPlaceholder2(i18n, prefectureField, locale),
            options: prefectureOptions,
            style: { width: 200 },
            showSearch: true,
            optionFilterProp: "label"
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_antd2.Input,
          {
            placeholder: getPlaceholder2(i18n, prefectureField, locale),
            style: { width: 200 }
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_antd2.Form.Item,
      {
        name: address1Field,
        label: getLabel2(i18n, address1Field, locale),
        rules: getRule(address1Field),
        required: isRequired(address1Field),
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_antd2.Input, { placeholder: getPlaceholder2(i18n, address1Field, locale) })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_antd2.Form.Item,
      {
        name: address2Field,
        label: getLabel2(i18n, address2Field, locale),
        rules: getRule(address2Field),
        required: isRequired(address2Field),
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_antd2.Input, { placeholder: getPlaceholder2(i18n, address2Field, locale) })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_antd2.Form.Item,
      {
        name: address3Field,
        label: getLabel2(i18n, address3Field, locale),
        rules: getRule(address3Field),
        required: isRequired(address3Field),
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_antd2.Input, { placeholder: getPlaceholder2(i18n, address3Field, locale) })
      }
    )
  ] });
}

// src/components/JapaneseBankField.tsx
var import_antd3 = require("antd");
var import_jsx_runtime3 = require("react/jsx-runtime");
function getLabel3(i18n, field, locale) {
  return i18n.fields[field]?.label?.[locale] ?? i18n.fields[field]?.label?.["en"] ?? field;
}
function getPlaceholder3(i18n, field, locale) {
  return i18n.fields[field]?.placeholder?.[locale] ?? i18n.fields[field]?.placeholder?.["en"] ?? "";
}
function JapaneseBankField({
  schemas,
  i18n,
  prefix = "bank",
  accountTypeOptions
}) {
  const locale = getZodLocale();
  const bankCodeField = `${prefix}_bank_code`;
  const bankNameField = `${prefix}_bank_name`;
  const branchCodeField = `${prefix}_branch_code`;
  const branchNameField = `${prefix}_branch_name`;
  const accountTypeField = `${prefix}_account_type`;
  const accountNumberField = `${prefix}_account_number`;
  const accountHolderField = `${prefix}_account_holder`;
  const getRule = (field) => {
    const schema = schemas[field];
    if (!schema) return [];
    return [zodRule(schema, getLabel3(i18n, field, locale))];
  };
  const isRequired = (field) => {
    const schema = schemas[field];
    if (!schema) return false;
    return isZodRequired(schema);
  };
  const bankRequired = isRequired(bankCodeField) || isRequired(bankNameField);
  const branchRequired = isRequired(branchCodeField) || isRequired(branchNameField);
  const codeShortLabel = locale === "ja" ? "\u30B3\u30FC\u30C9" : "Code";
  const nameShortLabel = locale === "ja" ? "\u540D\u79F0" : "Name";
  const bankLabel = locale === "ja" ? "\u9280\u884C" : "Bank";
  const branchLabel = locale === "ja" ? "\u652F\u5E97" : "Branch";
  const prefixStyle = {
    color: "rgba(0, 0, 0, 0.88)",
    fontWeight: 500,
    borderRight: "1px solid #d9d9d9",
    paddingRight: 8,
    marginRight: 4
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_antd3.Form.Item, { label: bankLabel, required: bankRequired, style: { marginBottom: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_antd3.Row, { gutter: 8, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_antd3.Col, { span: 8, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_antd3.Form.Item, { name: bankCodeField, rules: getRule(bankCodeField), style: { marginBottom: 16 }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_antd3.Input,
        {
          prefix: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { style: prefixStyle, children: codeShortLabel }),
          placeholder: getPlaceholder3(i18n, bankCodeField, locale),
          maxLength: 4
        }
      ) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_antd3.Col, { span: 16, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_antd3.Form.Item, { name: bankNameField, rules: getRule(bankNameField), style: { marginBottom: 16 }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_antd3.Input,
        {
          prefix: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { style: prefixStyle, children: nameShortLabel }),
          placeholder: getPlaceholder3(i18n, bankNameField, locale)
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_antd3.Form.Item, { label: branchLabel, required: branchRequired, style: { marginBottom: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_antd3.Row, { gutter: 8, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_antd3.Col, { span: 8, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_antd3.Form.Item,
        {
          name: branchCodeField,
          rules: getRule(branchCodeField),
          style: { marginBottom: 16 },
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            import_antd3.Input,
            {
              prefix: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { style: prefixStyle, children: codeShortLabel }),
              placeholder: getPlaceholder3(i18n, branchCodeField, locale),
              maxLength: 3
            }
          )
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_antd3.Col, { span: 16, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_antd3.Form.Item,
        {
          name: branchNameField,
          rules: getRule(branchNameField),
          style: { marginBottom: 16 },
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            import_antd3.Input,
            {
              prefix: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { style: prefixStyle, children: nameShortLabel }),
              placeholder: getPlaceholder3(i18n, branchNameField, locale)
            }
          )
        }
      ) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_antd3.Form.Item,
      {
        name: accountTypeField,
        label: getLabel3(i18n, accountTypeField, locale),
        rules: getRule(accountTypeField),
        required: isRequired(accountTypeField),
        children: accountTypeOptions ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_antd3.Select,
          {
            placeholder: getPlaceholder3(i18n, accountTypeField, locale),
            options: accountTypeOptions,
            style: { width: 150 }
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_antd3.Input,
          {
            placeholder: getPlaceholder3(i18n, accountTypeField, locale),
            style: { width: 150 }
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_antd3.Form.Item,
      {
        name: accountNumberField,
        label: getLabel3(i18n, accountNumberField, locale),
        rules: getRule(accountNumberField),
        required: isRequired(accountNumberField),
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_antd3.Input,
          {
            placeholder: getPlaceholder3(i18n, accountNumberField, locale),
            maxLength: 7,
            style: { width: 150 }
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_antd3.Form.Item,
      {
        name: accountHolderField,
        label: getLabel3(i18n, accountHolderField, locale),
        rules: getRule(accountHolderField),
        required: isRequired(accountHolderField),
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_antd3.Input, { placeholder: getPlaceholder3(i18n, accountHolderField, locale) })
      }
    )
  ] });
}

// src/hooks/use-form-mutation.ts
var import_react_query = require("@tanstack/react-query");
var import_antd4 = require("antd");
function getFormErrors(error) {
  const data = error?.response?.data;
  const errors = data?.errors;
  if (!errors || typeof errors !== "object") return [];
  return Object.entries(errors).map(([fieldName, messages]) => ({
    // Convert "user.name" or "items.0.name" to array path for Ant Design
    name: fieldName.includes(".") ? fieldName.split(".").map((part) => /^\d+$/.test(part) ? parseInt(part, 10) : part) : fieldName,
    errors: Array.isArray(messages) ? messages : [String(messages)]
  }));
}
function getValidationMessage(error) {
  const axiosError = error;
  if (axiosError?.response?.status !== 422) return null;
  return axiosError?.response?.data?.message ?? null;
}
function getFirstValidationError(error) {
  const errors = error?.response?.data?.errors;
  if (!errors || typeof errors !== "object") return null;
  const firstField = Object.keys(errors)[0];
  return firstField ? errors[firstField][0] : null;
}
function useFormMutation({
  form,
  mutationFn,
  invalidateKeys = [],
  successMessage,
  redirectTo,
  router,
  translateFn,
  onSuccess,
  onError
}) {
  const queryClient = (0, import_react_query.useQueryClient)();
  const { message: message2 } = import_antd4.App.useApp();
  return (0, import_react_query.useMutation)({
    mutationFn,
    onSuccess: (data) => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [...key] });
      });
      if (successMessage) {
        const msg = translateFn ? translateFn(successMessage) : successMessage;
        message2.success(msg);
      }
      if (redirectTo && router) {
        router.push(redirectTo);
      }
      onSuccess?.(data);
    },
    onError: (error) => {
      const formErrors = getFormErrors(error);
      if (formErrors.length > 0) {
        form.setFields(formErrors);
      }
      const validationMessage = getValidationMessage(error);
      if (validationMessage) {
        message2.error(validationMessage);
      }
      onError?.(error);
    }
  });
}

// src/lib/rules/kana.ts
var import_zod = require("zod");
var CHAR_RANGES = {
  // Full-width Katakana: ァ-ヶ (U+30A1-U+30F6) + ー (U+30FC)
  fullWidthKatakana: "\u30A1-\u30F6\u30FC",
  // Half-width Katakana: ｦ-ﾟ (U+FF66-U+FF9F)
  halfWidthKatakana: "\uFF66-\uFF9F",
  // Hiragana: ぁ-ゖ (U+3041-U+3096)
  hiragana: "\u3041-\u3096",
  // Full-width numbers: ０-９
  fullWidthNumbers: "\uFF10-\uFF19",
  // Half-width numbers: 0-9
  halfWidthNumbers: "0-9",
  // Full-width space: 　(U+3000)
  fullWidthSpace: "\u3000",
  // Half-width space
  halfWidthSpace: " ",
  // Common special chars for names
  defaultSpecialChars: ["\u30FC", "\u30FB"]
};
var DEFAULT_OPTIONS = {
  fullWidthKatakana: true,
  halfWidthKatakana: false,
  hiragana: false,
  allowNumbers: false,
  fullWidthNumbers: false,
  halfWidthNumbers: false,
  allowSpaces: true,
  allowSpecialChars: ["\u30FC", "\u30FB"],
  message: ""
};
function buildKanaPattern(options = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const parts = [];
  if (opts.fullWidthKatakana) {
    parts.push(CHAR_RANGES.fullWidthKatakana);
  }
  if (opts.halfWidthKatakana) {
    parts.push(CHAR_RANGES.halfWidthKatakana);
  }
  if (opts.hiragana) {
    parts.push(CHAR_RANGES.hiragana);
  }
  if (opts.allowNumbers || opts.fullWidthNumbers) {
    parts.push(CHAR_RANGES.fullWidthNumbers);
  }
  if (opts.allowNumbers || opts.halfWidthNumbers) {
    parts.push(CHAR_RANGES.halfWidthNumbers);
  }
  if (opts.allowSpaces) {
    parts.push(CHAR_RANGES.fullWidthSpace);
    parts.push(CHAR_RANGES.halfWidthSpace);
  }
  if (opts.allowSpecialChars && opts.allowSpecialChars.length > 0) {
    const escaped = opts.allowSpecialChars.map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("");
    parts.push(escaped);
  }
  return `^[${parts.join("")}]*$`;
}
function getDefaultMessage(options = {}, locale = "ja") {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const messages = {
    ja: {
      fullWidthKatakana: "\u5168\u89D2\u30AB\u30BF\u30AB\u30CA",
      halfWidthKatakana: "\u534A\u89D2\u30AB\u30BF\u30AB\u30CA",
      hiragana: "\u3072\u3089\u304C\u306A",
      mixed: "\u30AB\u30CA\u6587\u5B57"
    },
    en: {
      fullWidthKatakana: "full-width katakana",
      halfWidthKatakana: "half-width katakana",
      hiragana: "hiragana",
      mixed: "kana characters"
    }
  };
  const msg = messages[locale] ?? messages["ja"];
  let type = msg.mixed;
  if (opts.fullWidthKatakana && !opts.halfWidthKatakana && !opts.hiragana) {
    type = msg.fullWidthKatakana;
  } else if (opts.halfWidthKatakana && !opts.fullWidthKatakana && !opts.hiragana) {
    type = msg.halfWidthKatakana;
  } else if (opts.hiragana && !opts.fullWidthKatakana && !opts.halfWidthKatakana) {
    type = msg.hiragana;
  }
  if (locale === "ja") {
    return `${type}\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044`;
  }
  return `Please enter in ${type}`;
}
function createKanaRegex(options = {}) {
  return new RegExp(buildKanaPattern(options));
}
function validateKana(value, options = {}) {
  if (!value) return true;
  const regex = createKanaRegex(options);
  return regex.test(value);
}
function getKanaPattern(options = {}) {
  return buildKanaPattern(options);
}
function getKanaErrorMessage(options = {}, locale = "ja") {
  return options.message ?? getDefaultMessage(options, locale);
}
var KATAKANA_FULL_WIDTH = {
  fullWidthKatakana: true,
  halfWidthKatakana: false,
  hiragana: false,
  allowSpaces: true,
  allowSpecialChars: ["\u30FC", "\u30FB"]
};
var KATAKANA_HALF_WIDTH = {
  fullWidthKatakana: false,
  halfWidthKatakana: true,
  hiragana: false,
  allowSpaces: true,
  allowSpecialChars: ["\uFF70"]
  // Half-width prolonged sound mark
};
var HIRAGANA = {
  fullWidthKatakana: false,
  halfWidthKatakana: false,
  hiragana: true,
  allowSpaces: true,
  allowSpecialChars: ["\u30FC"]
};
var KANA_ANY = {
  fullWidthKatakana: true,
  halfWidthKatakana: true,
  hiragana: true,
  allowSpaces: true,
  allowSpecialChars: ["\u30FC", "\u30FB", "\uFF70"]
};
var KATAKANA_WITH_NUMBERS = {
  fullWidthKatakana: true,
  halfWidthKatakana: false,
  hiragana: false,
  allowNumbers: true,
  allowSpaces: true,
  allowSpecialChars: ["\u30FC", "\u30FB"]
};
var KATAKANA_PATTERN = /^[ァ-ヶー・　 ]*$/;
var KATAKANA_HALF_PATTERN = /^[ｦ-ﾟｰ ]*$/;
var HIRAGANA_PATTERN = /^[ぁ-ゖー　 ]*$/;
var KANA_ANY_PATTERN = /^[ァ-ヶぁ-ゖｦ-ﾟー・ｰ　 ]*$/;
function kanaString(options = {}) {
  const opts = { ...KATAKANA_FULL_WIDTH, ...options };
  const regex = createKanaRegex(opts);
  const message2 = getKanaErrorMessage(opts);
  return import_zod.z.string().regex(regex, { message: message2 });
}
function withKana(options = {}) {
  return kanaString(options);
}
var kanaRules = {
  createRegex: createKanaRegex,
  validate: validateKana,
  getPattern: getKanaPattern,
  getMessage: getKanaErrorMessage,
  // Zod helpers
  string: kanaString,
  // Presets
  presets: {
    fullWidthKatakana: KATAKANA_FULL_WIDTH,
    halfWidthKatakana: KATAKANA_HALF_WIDTH,
    hiragana: HIRAGANA,
    any: KANA_ANY,
    withNumbers: KATAKANA_WITH_NUMBERS
  },
  // Pattern constants for direct use
  patterns: {
    katakana: KATAKANA_PATTERN,
    katakanaHalf: KATAKANA_HALF_PATTERN,
    hiragana: HIRAGANA_PATTERN,
    any: KANA_ANY_PATTERN
  }
};

// src/index.ts
var OmnifyForm = {
  JapaneseName: JapaneseNameField,
  JapaneseAddress: JapaneseAddressField,
  JapaneseBank: JapaneseBankField
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HIRAGANA,
  HIRAGANA_PATTERN,
  JapaneseAddressField,
  JapaneseBankField,
  JapaneseNameField,
  KANA_ANY,
  KANA_ANY_PATTERN,
  KATAKANA_FULL_WIDTH,
  KATAKANA_HALF_PATTERN,
  KATAKANA_HALF_WIDTH,
  KATAKANA_PATTERN,
  KATAKANA_WITH_NUMBERS,
  OmnifyForm,
  addZodMessages,
  createKanaRegex,
  getFirstValidationError,
  getFormErrors,
  getKanaErrorMessage,
  getKanaPattern,
  getValidationMessage,
  getZodFallbackLocale,
  getZodLocale,
  getZodMessage,
  getZodMessages,
  isZodRequired,
  kanaPattern,
  kanaRegex,
  kanaRules,
  kanaString,
  requiredRule,
  setZodFallbackLocale,
  setZodLocale,
  useFormMutation,
  validateKana,
  withKana,
  zodRule
});
//# sourceMappingURL=index.cjs.map