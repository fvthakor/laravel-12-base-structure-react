import { ReactNode } from 'react';
import { FormikHelpers, FormikProps } from 'formik';
import type { Schema } from 'yup';

export interface BaseModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    onSuccess?: () => void;
    isLoading?: boolean;
}

export interface CreateEditModalProps<T extends Record<string, unknown> = Record<string, unknown>> extends BaseModalProps {
    item?: T;
    initialValues: T;
    validationSchema: Schema;
    onSubmit: (values: T, formikHelpers: FormikHelpers<T>, isEdit: boolean) => void | Promise<void>;
    children: (props: { 
        isEdit: boolean; 
        isLoading: boolean; 
        formik: FormikProps<T>;
    }) => ReactNode;
}

export interface CreateEditFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading?: boolean;
    submitLabel?: string;
    children: ReactNode;
}

export interface FormFieldProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    maxLength?: number;
    required?: boolean;
    formik: FormikProps<Record<string, unknown>>;
    showCharCount?: boolean;
}
