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
import { z } from "zod";
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
  name: z.string().min(1),
  email: z.string().min(1),
  email_verified_at: z.string().datetime({ offset: true }).optional().nullable(),
  password: z.string().min(1),
  remember_token: z.string().max(100).optional().nullable(),
  console_user_id: z.number().int().optional().nullable(),
  console_access_token: z.string().optional().nullable(),
  console_refresh_token: z.string().optional().nullable(),
  console_token_expires_at: z.string().datetime({ offset: true }).optional().nullable()
};
var baseUserCreateSchema = z.object({
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
import { z as z2 } from "zod";
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
  name: z2.string().min(1).max(100),
  slug: z2.string().min(1).max(100),
  group: z2.string().max(50).optional().nullable()
};
var basePermissionCreateSchema = z2.object({
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
import { z as z3 } from "zod";
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
  name: z3.string().min(1).max(100),
  slug: z3.string().min(1).max(100),
  description: z3.string().optional().nullable(),
  level: z3.number().int()
};
var baseRoleCreateSchema = z3.object({
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
import { z as z4 } from "zod";
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
var baseRolePermissionCreateSchema = z4.object({});
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
import { z as z5 } from "zod";
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
  console_team_id: z5.number().int(),
  console_org_id: z5.number().int(),
  name: z5.string().min(1).max(100)
};
var baseTeamCreateSchema = z5.object({
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
import { z as z6 } from "zod";
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
  console_org_id: z6.number().int(),
  console_team_id: z6.number().int()
};
var baseTeamPermissionCreateSchema = z6.object({
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
export {
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
};
//# sourceMappingURL=index.js.map