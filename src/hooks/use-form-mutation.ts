/**
 * useFormMutation - Form mutation with auto Laravel error handling
 *
 * Features:
 * - Auto parse Laravel validation errors to Ant Design form format
 * - Support nested field paths (e.g., "items.0.name" → ["items", 0, "name"])
 * - Auto invalidate queries on success
 * - Optional redirect after success
 * - Optional i18n translation for messages
 *
 * @example
 * ```typescript
 * import { useFormMutation } from '@famgia/omnify-react';
 * import { useRouter } from 'next/navigation';
 * import { useTranslations } from 'next-intl';
 *
 * function MyForm() {
 *   const [form] = Form.useForm();
 *   const router = useRouter();
 *   const t = useTranslations();
 *
 *   const mutation = useFormMutation({
 *     form,
 *     mutationFn: (data) => api.post('/api/customers', data),
 *     invalidateKeys: [['customers']],
 *     successMessage: 'messages.saved',
 *     redirectTo: '/customers',
 *     router,           // Optional: for redirect
 *     translateFn: t,   // Optional: for i18n
 *   });
 *
 *   return (
 *     <Form form={form} onFinish={mutation.mutate}>
 *       ...
 *       <Button loading={mutation.isPending}>保存</Button>
 *     </Form>
 *   );
 * }
 * ```
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import type { FormInstance } from 'antd';

// =============================================================================
// Types
// =============================================================================

/** Router interface - compatible with Next.js useRouter */
export interface FormMutationRouter {
  push: (path: string) => void;
}

/** Translation function - compatible with next-intl useTranslations */
export type TranslateFn = (key: string) => string;

export interface UseFormMutationOptions<TData, TResult> {
  /** Ant Design form instance */
  form: FormInstance;
  /** API call function */
  mutationFn: (data: TData) => Promise<TResult>;
  /** Query keys to invalidate on success */
  invalidateKeys?: readonly (readonly unknown[])[];
  /** Success message to show (will be translated if translateFn provided) */
  successMessage?: string;
  /** Redirect path after success (requires router) */
  redirectTo?: string;
  /** Router instance for redirect (e.g., useRouter from next/navigation) */
  router?: FormMutationRouter;
  /** Translation function for messages (e.g., useTranslations from next-intl) */
  translateFn?: TranslateFn;
  /** Callback on success */
  onSuccess?: (data: TResult) => void;
  /** Callback on error */
  onError?: (error: unknown) => void;
}

// =============================================================================
// Laravel Error Helpers (exported for reuse)
// =============================================================================

/** Form field error for Ant Design */
export interface FormFieldError {
  name: string | (string | number)[];
  errors: string[];
}

/**
 * Parse Laravel validation errors to Ant Design form format
 *
 * Supports:
 * - Simple fields: "email" → name: "email"
 * - Dot notation: "user.name" → name: ["user", "name"]
 * - Array notation: "items.0.name" → name: ["items", 0, "name"]
 *
 * @example
 * form.setFields(getFormErrors(error))
 */
export function getFormErrors(error: unknown): FormFieldError[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (error as any)?.response?.data;
  const errors = data?.errors;

  if (!errors || typeof errors !== 'object') return [];

  return Object.entries(errors).map(([fieldName, messages]) => ({
    // Convert "user.name" or "items.0.name" to array path for Ant Design
    name: fieldName.includes('.')
      ? fieldName.split('.').map((part) => (/^\d+$/.test(part) ? parseInt(part, 10) : part))
      : fieldName,
    errors: Array.isArray(messages) ? (messages as string[]) : [String(messages)],
  }));
}

/**
 * Get general validation message from Laravel 422 response
 * @example "The name_lastname field is required. (and 3 more errors)"
 */
export function getValidationMessage(error: unknown): string | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const axiosError = error as any;

  // Only for 422 validation errors
  if (axiosError?.response?.status !== 422) return null;

  return axiosError?.response?.data?.message ?? null;
}

/**
 * Get first error message from validation errors
 * Useful when field names don't match form fields
 */
export function getFirstValidationError(error: unknown): string | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors = (error as any)?.response?.data?.errors;

  if (!errors || typeof errors !== 'object') return null;

  const firstField = Object.keys(errors)[0];
  return firstField ? errors[firstField][0] : null;
}

// =============================================================================
// Hook
// =============================================================================

export function useFormMutation<TData, TResult = unknown>({
  form,
  mutationFn,
  invalidateKeys = [],
  successMessage,
  redirectTo,
  router,
  translateFn,
  onSuccess,
  onError,
}: UseFormMutationOptions<TData, TResult>) {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      // Invalidate queries
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [...key] });
      });

      // Show success message (translate if translateFn provided)
      if (successMessage) {
        const msg = translateFn ? translateFn(successMessage) : successMessage;
        message.success(msg);
      }

      // Redirect if router and redirectTo provided
      if (redirectTo && router) {
        router.push(redirectTo);
      }

      // Custom callback
      onSuccess?.(data);
    },
    onError: (error) => {
      // Set form field errors from Laravel validation
      const formErrors = getFormErrors(error);
      if (formErrors.length > 0) {
        form.setFields(formErrors);
      }

      // Show general validation message (from Laravel)
      const validationMessage = getValidationMessage(error);
      if (validationMessage) {
        message.error(validationMessage);
      }

      // Custom callback
      onError?.(error);
    },
  });
}
