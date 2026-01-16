import * as _tanstack_react_query from '@tanstack/react-query';
import { FormInstance } from 'antd';

interface UseFormMutationOptions<TData, TResult> {
    /** Ant Design form instance */
    form: FormInstance;
    /** API call function */
    mutationFn: (data: TData) => Promise<TResult>;
    /** Query keys to invalidate on success */
    invalidateKeys?: readonly (readonly unknown[])[];
    /** Success message to show */
    successMessage?: string;
    /** Callback on success */
    onSuccess?: (data: TResult) => void;
    /** Callback on error */
    onError?: (error: unknown) => void;
}
declare function useFormMutation<TData, TResult = unknown>({ form, mutationFn, invalidateKeys, successMessage, onSuccess, onError, }: UseFormMutationOptions<TData, TResult>): _tanstack_react_query.UseMutationResult<TResult, Error, TData, unknown>;

export { type UseFormMutationOptions, useFormMutation };
