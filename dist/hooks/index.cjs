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
  return Object.entries(errors).map(([name, messages]) => ({
    name,
    errors: Array.isArray(messages) ? messages : [String(messages)]
  }));
}
function getValidationMessage(error) {
  const data = error?.response?.data;
  return data?.message || null;
}
function useFormMutation({
  form,
  mutationFn,
  invalidateKeys = [],
  successMessage,
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
        message.success(successMessage);
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
  useFormMutation
});
//# sourceMappingURL=index.cjs.map