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

// src/schemas/index.ts
var schemas_exports = {};
__export(schemas_exports, {
  defaultLocale: () => defaultLocale,
  fallbackLocale: () => fallbackLocale,
  getMessage: () => getMessage,
  getMessages: () => getMessages,
  getPermissionFieldLabel: () => getPermissionFieldLabel,
  getPermissionFieldPlaceholder: () => getPermissionFieldPlaceholder,
  getPermissionLabel: () => getPermissionLabel,
  getRoleFieldLabel: () => getRoleFieldLabel,
  getRoleFieldPlaceholder: () => getRoleFieldPlaceholder,
  getRoleLabel: () => getRoleLabel,
  getRolePermissionFieldLabel: () => getRolePermissionFieldLabel,
  getRolePermissionFieldPlaceholder: () => getRolePermissionFieldPlaceholder,
  getRolePermissionLabel: () => getRolePermissionLabel,
  getTeamFieldLabel: () => getTeamFieldLabel,
  getTeamFieldPlaceholder: () => getTeamFieldPlaceholder,
  getTeamLabel: () => getTeamLabel,
  getTeamPermissionFieldLabel: () => getTeamPermissionFieldLabel,
  getTeamPermissionFieldPlaceholder: () => getTeamPermissionFieldPlaceholder,
  getTeamPermissionLabel: () => getTeamPermissionLabel,
  getUserFieldLabel: () => getUserFieldLabel,
  getUserFieldPlaceholder: () => getUserFieldPlaceholder,
  getUserLabel: () => getUserLabel,
  permissionCreateSchema: () => permissionCreateSchema,
  permissionI18n: () => permissionI18n,
  permissionSchemas: () => permissionSchemas,
  permissionUpdateSchema: () => permissionUpdateSchema,
  roleCreateSchema: () => roleCreateSchema,
  roleI18n: () => roleI18n,
  rolePermissionCreateSchema: () => rolePermissionCreateSchema,
  rolePermissionI18n: () => rolePermissionI18n,
  rolePermissionSchemas: () => rolePermissionSchemas,
  rolePermissionUpdateSchema: () => rolePermissionUpdateSchema,
  roleSchemas: () => roleSchemas,
  roleUpdateSchema: () => roleUpdateSchema,
  supportedLocales: () => supportedLocales,
  teamCreateSchema: () => teamCreateSchema,
  teamI18n: () => teamI18n,
  teamPermissionCreateSchema: () => teamPermissionCreateSchema,
  teamPermissionI18n: () => teamPermissionI18n,
  teamPermissionSchemas: () => teamPermissionSchemas,
  teamPermissionUpdateSchema: () => teamPermissionUpdateSchema,
  teamSchemas: () => teamSchemas,
  teamUpdateSchema: () => teamUpdateSchema,
  userCreateSchema: () => userCreateSchema,
  userI18n: () => userI18n,
  userSchemas: () => userSchemas,
  userUpdateSchema: () => userUpdateSchema,
  validationMessages: () => validationMessages
});
module.exports = __toCommonJS(schemas_exports);

// src/schemas/i18n.ts
var defaultLocale = "ja";
var fallbackLocale = "en";
var supportedLocales = ["ja", "en"];
var validationMessages = {
  "required": {
    "ja": "${displayName}\u306F\u5FC5\u9808\u3067\u3059",
    "en": "${displayName} is required"
  },
  "minLength": {
    "ja": "${displayName}\u306F${min}\u6587\u5B57\u4EE5\u4E0A\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
    "en": "${displayName} must be at least ${min} characters"
  },
  "maxLength": {
    "ja": "${displayName}\u306F${max}\u6587\u5B57\u4EE5\u5185\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
    "en": "${displayName} must be at most ${max} characters"
  },
  "min": {
    "ja": "${displayName}\u306F${min}\u4EE5\u4E0A\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
    "en": "${displayName} must be at least ${min}"
  },
  "max": {
    "ja": "${displayName}\u306F${max}\u4EE5\u4E0B\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
    "en": "${displayName} must be at most ${max}"
  },
  "email": {
    "ja": "\u6709\u52B9\u306A\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
    "en": "Please enter a valid email address"
  },
  "url": {
    "ja": "\u6709\u52B9\u306AURL\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
    "en": "Please enter a valid URL"
  },
  "pattern": {
    "ja": "${displayName}\u306E\u5F62\u5F0F\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093",
    "en": "${displayName} format is invalid"
  }
};
function getMessage(key, locale, params = {}) {
  const messages = validationMessages[key];
  if (!messages) return key;
  let message = messages[locale] ?? messages[fallbackLocale] ?? messages[defaultLocale] ?? key;
  for (const [param, value] of Object.entries(params)) {
    message = message.replace(new RegExp(`\\\${${param}}`, "g"), String(value));
  }
  return message;
}
function getMessages(locale) {
  const result = {};
  for (const [key, messages] of Object.entries(validationMessages)) {
    result[key] = messages[locale] ?? messages[fallbackLocale] ?? messages[defaultLocale] ?? key;
  }
  return result;
}

// src/schemas/base/User.ts
var import_zod = require("zod");
var userI18n = {
  /** Model display name */
  label: { "en": "User" },
  /** Field labels and placeholders */
  fields: {
    name: {
      label: { "en": "Name" }
    },
    email: {
      label: { "en": "Email" }
    },
    email_verified_at: {
      label: { "en": "Email Verified At" }
    },
    password: {
      label: { "en": "Password" }
    },
    remember_token: {
      label: { "en": "Remember Token" }
    },
    console_user_id: {
      label: { "en": "Console User ID" }
    },
    console_access_token: {
      label: { "en": "Console Access Token" }
    },
    console_refresh_token: {
      label: { "en": "Console Refresh Token" }
    },
    console_token_expires_at: {
      label: { "en": "Console Token Expiry" }
    },
    role: {
      label: { "en": "Role" }
    }
  }
};
var baseUserSchemas = {
  name: import_zod.z.string().min(1),
  email: import_zod.z.string().min(1),
  email_verified_at: import_zod.z.string().datetime({ offset: true }).optional().nullable(),
  password: import_zod.z.string().min(1),
  remember_token: import_zod.z.string().max(100).optional().nullable(),
  console_user_id: import_zod.z.number().int().optional().nullable(),
  console_access_token: import_zod.z.string().optional().nullable(),
  console_refresh_token: import_zod.z.string().optional().nullable(),
  console_token_expires_at: import_zod.z.string().datetime({ offset: true }).optional().nullable()
};
var baseUserCreateSchema = import_zod.z.object({
  name: baseUserSchemas.name,
  email: baseUserSchemas.email,
  password: baseUserSchemas.password,
  remember_token: baseUserSchemas.remember_token,
  console_user_id: baseUserSchemas.console_user_id,
  console_access_token: baseUserSchemas.console_access_token,
  console_refresh_token: baseUserSchemas.console_refresh_token,
  console_token_expires_at: baseUserSchemas.console_token_expires_at
});
var baseUserUpdateSchema = baseUserCreateSchema.partial();
function getUserLabel(locale) {
  return userI18n.label[locale] ?? userI18n.label["en"] ?? "User";
}
function getUserFieldLabel(field, locale) {
  const fieldI18n = userI18n.fields[field];
  if (!fieldI18n) return field;
  return fieldI18n.label[locale] ?? fieldI18n.label["en"] ?? field;
}
function getUserFieldPlaceholder(field, locale) {
  const fieldI18n = userI18n.fields[field];
  if (!fieldI18n || !("placeholder" in fieldI18n)) return "";
  const placeholder = fieldI18n.placeholder;
  return placeholder[locale] ?? placeholder["en"] ?? "";
}

// src/schemas/User.ts
var userSchemas = { ...baseUserSchemas };
var userCreateSchema = baseUserCreateSchema;
var userUpdateSchema = baseUserUpdateSchema;

// src/schemas/base/Permission.ts
var import_zod2 = require("zod");
var permissionI18n = {
  /** Model display name */
  label: { "en": "Permission" },
  /** Field labels and placeholders */
  fields: {
    name: {
      label: { "en": "Permission Name" }
    },
    slug: {
      label: { "en": "Slug" }
    },
    group: {
      label: { "en": "Group" }
    },
    roles: {
      label: { "en": "Roles" }
    }
  }
};
var basePermissionSchemas = {
  name: import_zod2.z.string().min(1).max(100),
  slug: import_zod2.z.string().min(1).max(100),
  group: import_zod2.z.string().max(50).optional().nullable()
};
var basePermissionCreateSchema = import_zod2.z.object({
  name: basePermissionSchemas.name,
  slug: basePermissionSchemas.slug,
  group: basePermissionSchemas.group
});
var basePermissionUpdateSchema = basePermissionCreateSchema.partial();
function getPermissionLabel(locale) {
  return permissionI18n.label[locale] ?? permissionI18n.label["en"] ?? "Permission";
}
function getPermissionFieldLabel(field, locale) {
  const fieldI18n = permissionI18n.fields[field];
  if (!fieldI18n) return field;
  return fieldI18n.label[locale] ?? fieldI18n.label["en"] ?? field;
}
function getPermissionFieldPlaceholder(field, locale) {
  const fieldI18n = permissionI18n.fields[field];
  if (!fieldI18n || !("placeholder" in fieldI18n)) return "";
  const placeholder = fieldI18n.placeholder;
  return placeholder[locale] ?? placeholder["en"] ?? "";
}

// src/schemas/Permission.ts
var permissionSchemas = { ...basePermissionSchemas };
var permissionCreateSchema = basePermissionCreateSchema;
var permissionUpdateSchema = basePermissionUpdateSchema;

// src/schemas/base/Role.ts
var import_zod3 = require("zod");
var roleI18n = {
  /** Model display name */
  label: { "en": "Role" },
  /** Field labels and placeholders */
  fields: {
    name: {
      label: { "en": "Role Name" }
    },
    slug: {
      label: { "en": "Slug" }
    },
    description: {
      label: { "en": "Description" }
    },
    level: {
      label: { "en": "Level" }
    },
    permissions: {
      label: { "en": "Permissions" }
    }
  }
};
var baseRoleSchemas = {
  name: import_zod3.z.string().min(1).max(100),
  slug: import_zod3.z.string().min(1).max(100),
  description: import_zod3.z.string().optional().nullable(),
  level: import_zod3.z.number().int()
};
var baseRoleCreateSchema = import_zod3.z.object({
  name: baseRoleSchemas.name,
  slug: baseRoleSchemas.slug,
  description: baseRoleSchemas.description,
  level: baseRoleSchemas.level
});
var baseRoleUpdateSchema = baseRoleCreateSchema.partial();
function getRoleLabel(locale) {
  return roleI18n.label[locale] ?? roleI18n.label["en"] ?? "Role";
}
function getRoleFieldLabel(field, locale) {
  const fieldI18n = roleI18n.fields[field];
  if (!fieldI18n) return field;
  return fieldI18n.label[locale] ?? fieldI18n.label["en"] ?? field;
}
function getRoleFieldPlaceholder(field, locale) {
  const fieldI18n = roleI18n.fields[field];
  if (!fieldI18n || !("placeholder" in fieldI18n)) return "";
  const placeholder = fieldI18n.placeholder;
  return placeholder[locale] ?? placeholder["en"] ?? "";
}

// src/schemas/Role.ts
var roleSchemas = { ...baseRoleSchemas };
var roleCreateSchema = baseRoleCreateSchema;
var roleUpdateSchema = baseRoleUpdateSchema;

// src/schemas/base/RolePermission.ts
var import_zod4 = require("zod");
var rolePermissionI18n = {
  /** Model display name */
  label: { "en": "Role Permission" },
  /** Field labels and placeholders */
  fields: {
    role: {
      label: { "en": "Role" }
    },
    permission: {
      label: { "en": "Permission" }
    }
  }
};
var baseRolePermissionSchemas = {};
var baseRolePermissionCreateSchema = import_zod4.z.object({});
var baseRolePermissionUpdateSchema = baseRolePermissionCreateSchema.partial();
function getRolePermissionLabel(locale) {
  return rolePermissionI18n.label[locale] ?? rolePermissionI18n.label["en"] ?? "RolePermission";
}
function getRolePermissionFieldLabel(field, locale) {
  const fieldI18n = rolePermissionI18n.fields[field];
  if (!fieldI18n) return field;
  return fieldI18n.label[locale] ?? fieldI18n.label["en"] ?? field;
}
function getRolePermissionFieldPlaceholder(field, locale) {
  const fieldI18n = rolePermissionI18n.fields[field];
  if (!fieldI18n || !("placeholder" in fieldI18n)) return "";
  const placeholder = fieldI18n.placeholder;
  return placeholder[locale] ?? placeholder["en"] ?? "";
}

// src/schemas/RolePermission.ts
var rolePermissionSchemas = { ...baseRolePermissionSchemas };
var rolePermissionCreateSchema = baseRolePermissionCreateSchema;
var rolePermissionUpdateSchema = baseRolePermissionUpdateSchema;

// src/schemas/base/Team.ts
var import_zod5 = require("zod");
var teamI18n = {
  /** Model display name */
  label: { "en": "Team" },
  /** Field labels and placeholders */
  fields: {
    console_team_id: {
      label: { "en": "Console Team ID" }
    },
    console_org_id: {
      label: { "en": "Console Organization ID" }
    },
    name: {
      label: { "en": "Team Name" }
    }
  }
};
var baseTeamSchemas = {
  console_team_id: import_zod5.z.number().int(),
  console_org_id: import_zod5.z.number().int(),
  name: import_zod5.z.string().min(1).max(100)
};
var baseTeamCreateSchema = import_zod5.z.object({
  console_team_id: baseTeamSchemas.console_team_id,
  console_org_id: baseTeamSchemas.console_org_id,
  name: baseTeamSchemas.name
});
var baseTeamUpdateSchema = baseTeamCreateSchema.partial();
function getTeamLabel(locale) {
  return teamI18n.label[locale] ?? teamI18n.label["en"] ?? "Team";
}
function getTeamFieldLabel(field, locale) {
  const fieldI18n = teamI18n.fields[field];
  if (!fieldI18n) return field;
  return fieldI18n.label[locale] ?? fieldI18n.label["en"] ?? field;
}
function getTeamFieldPlaceholder(field, locale) {
  const fieldI18n = teamI18n.fields[field];
  if (!fieldI18n || !("placeholder" in fieldI18n)) return "";
  const placeholder = fieldI18n.placeholder;
  return placeholder[locale] ?? placeholder["en"] ?? "";
}

// src/schemas/Team.ts
var teamSchemas = { ...baseTeamSchemas };
var teamCreateSchema = baseTeamCreateSchema;
var teamUpdateSchema = baseTeamUpdateSchema;

// src/schemas/base/TeamPermission.ts
var import_zod6 = require("zod");
var teamPermissionI18n = {
  /** Model display name */
  label: { "en": "Team Permission" },
  /** Field labels and placeholders */
  fields: {
    console_org_id: {
      label: { "en": "Console Organization ID" }
    },
    console_team_id: {
      label: { "en": "Console Team ID" }
    },
    permission: {
      label: { "en": "Permission" }
    }
  }
};
var baseTeamPermissionSchemas = {
  console_org_id: import_zod6.z.number().int(),
  console_team_id: import_zod6.z.number().int()
};
var baseTeamPermissionCreateSchema = import_zod6.z.object({
  console_org_id: baseTeamPermissionSchemas.console_org_id,
  console_team_id: baseTeamPermissionSchemas.console_team_id
});
var baseTeamPermissionUpdateSchema = baseTeamPermissionCreateSchema.partial();
function getTeamPermissionLabel(locale) {
  return teamPermissionI18n.label[locale] ?? teamPermissionI18n.label["en"] ?? "TeamPermission";
}
function getTeamPermissionFieldLabel(field, locale) {
  const fieldI18n = teamPermissionI18n.fields[field];
  if (!fieldI18n) return field;
  return fieldI18n.label[locale] ?? fieldI18n.label["en"] ?? field;
}
function getTeamPermissionFieldPlaceholder(field, locale) {
  const fieldI18n = teamPermissionI18n.fields[field];
  if (!fieldI18n || !("placeholder" in fieldI18n)) return "";
  const placeholder = fieldI18n.placeholder;
  return placeholder[locale] ?? placeholder["en"] ?? "";
}

// src/schemas/TeamPermission.ts
var teamPermissionSchemas = { ...baseTeamPermissionSchemas };
var teamPermissionCreateSchema = baseTeamPermissionCreateSchema;
var teamPermissionUpdateSchema = baseTeamPermissionUpdateSchema;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defaultLocale,
  fallbackLocale,
  getMessage,
  getMessages,
  getPermissionFieldLabel,
  getPermissionFieldPlaceholder,
  getPermissionLabel,
  getRoleFieldLabel,
  getRoleFieldPlaceholder,
  getRoleLabel,
  getRolePermissionFieldLabel,
  getRolePermissionFieldPlaceholder,
  getRolePermissionLabel,
  getTeamFieldLabel,
  getTeamFieldPlaceholder,
  getTeamLabel,
  getTeamPermissionFieldLabel,
  getTeamPermissionFieldPlaceholder,
  getTeamPermissionLabel,
  getUserFieldLabel,
  getUserFieldPlaceholder,
  getUserLabel,
  permissionCreateSchema,
  permissionI18n,
  permissionSchemas,
  permissionUpdateSchema,
  roleCreateSchema,
  roleI18n,
  rolePermissionCreateSchema,
  rolePermissionI18n,
  rolePermissionSchemas,
  rolePermissionUpdateSchema,
  roleSchemas,
  roleUpdateSchema,
  supportedLocales,
  teamCreateSchema,
  teamI18n,
  teamPermissionCreateSchema,
  teamPermissionI18n,
  teamPermissionSchemas,
  teamPermissionUpdateSchema,
  teamSchemas,
  teamUpdateSchema,
  userCreateSchema,
  userI18n,
  userSchemas,
  userUpdateSchema,
  validationMessages
});
//# sourceMappingURL=index.cjs.map