// src/hooks/use-form-mutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
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
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  return useMutation({
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
export {
  useFormMutation
};
//# sourceMappingURL=index.js.map