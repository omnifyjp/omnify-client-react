import * as _tanstack_react_query from '@tanstack/react-query';
import { FormInstance } from 'antd';

/** Router interface - compatible with Next.js useRouter */
interface FormMutationRouter {
    push: (path: string) => void;
}
/** Translation function - compatible with next-intl useTranslations */
type TranslateFn = (key: string) => string;
interface UseFormMutationOptions<TData, TResult> {
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
/** Form field error for Ant Design */
interface FormFieldError {
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
declare function getFormErrors(error: unknown): FormFieldError[];
/**
 * Get general validation message from Laravel 422 response
 * @example "The name_lastname field is required. (and 3 more errors)"
 */
declare function getValidationMessage(error: unknown): string | null;
/**
 * Get first error message from validation errors
 * Useful when field names don't match form fields
 */
declare function getFirstValidationError(error: unknown): string | null;
declare function useFormMutation<TData, TResult = unknown>({ form, mutationFn, invalidateKeys, successMessage, redirectTo, router, translateFn, onSuccess, onError, }: UseFormMutationOptions<TData, TResult>): _tanstack_react_query.UseMutationResult<TResult, Error, TData, unknown>;

export { type FormFieldError, type FormMutationRouter, type TranslateFn, type UseFormMutationOptions, getFirstValidationError, getFormErrors, getValidationMessage, useFormMutation };
