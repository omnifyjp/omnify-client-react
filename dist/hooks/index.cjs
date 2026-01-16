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

// src/hooks/index.ts
var hooks_exports = {};
__export(hooks_exports, {
  getFirstValidationError: () => getFirstValidationError,
  getFormErrors: () => getFormErrors,
  getValidationMessage: () => getValidationMessage,
  useFormMutation: () => useFormMutation
});
module.exports = __toCommonJS(hooks_exports);

// src/hooks/use-form-mutation.ts
var import_react_query = require("@tanstack/react-query");
var import_antd = require("antd");
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
  const { message } = import_antd.App.useApp();
  return (0, import_react_query.useMutation)({
    mutationFn,
    onSuccess: (data) => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [...key] });
      });
      if (successMessage) {
        const msg = translateFn ? translateFn(successMessage) : successMessage;
        message.success(msg);
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
        message.error(validationMessage);
      }
      onError?.(error);
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFirstValidationError,
  getFormErrors,
  getValidationMessage,
  useFormMutation
});
//# sourceMappingURL=index.cjs.map