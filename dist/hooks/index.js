// src/hooks/use-form-mutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
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
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  return useMutation({
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
export {
  getFirstValidationError,
  getFormErrors,
  getValidationMessage,
  useFormMutation
};
//# sourceMappingURL=index.js.map