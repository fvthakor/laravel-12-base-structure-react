import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import InputError from '@/components/input-error';
import { useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import type { 
    CreateEditModalProps, 
    FormFieldProps 
} from '@/types';

/**
 * Reusable modal for create/edit operations with Formik validation
 * 
 * @example
 * ```tsx
 * import { Formik } from 'formik';
 * import { cityValidationSchema } from '@/utils/validation-schemas';
 * 
 * <CreateEditModal
 *   open={open}
 *   onOpenChange={setOpen}
 *   item={editingCity}
 *   initialValues={{ name: editingCity?.name || '' }}
 *   validationSchema={cityValidationSchema}
 *   title={editingCity ? 'Edit City' : 'Add City'}
 *   onSubmit={async (values, helpers, isEdit) => {
 *     // Handle submit
 *   }}
 * >
 *   {({ isEdit, isLoading, formik }) => (
 *     // Your form JSX here
 *   )}
 * </CreateEditModal>
 * ```
 */
export const CreateEditModal = <T,>({
    open,
    onOpenChange,
    title,
    description,
    item,
    initialValues,
    validationSchema,
    onSubmit,
    onSuccess,
    isLoading = false,
    children,
}: CreateEditModalProps<T>) => {
    const isEditMode = !!item;
    const [internalLoading, setInternalLoading] = useState(false);

    const loading = isLoading || internalLoading;

    const handleClose = () => {
        if (!loading) {
            onOpenChange(false);
        }
    };

    const handleFormikSubmit = async (
        values: T,
        formikHelpers: FormikHelpers<T>
    ) => {
        setInternalLoading(true);
        try {
            await onSubmit(values, formikHelpers, isEditMode);
            onSuccess?.();
            handleClose();
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setInternalLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleFormikSubmit}
                    enableReinitialize
                >
                    {(formik) => children({ isEdit: isEditMode, isLoading: loading, formik })}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

/**
 * Reusable form wrapper for create/edit modals with Formik integration
 * Handles form submission and loading states
 * 
 * @example
 * ```tsx
 * <CreateEditForm onSubmit={formik.handleSubmit} isLoading={loading} submitLabel="Save">
 *   <FormField
 *     name="name"
 *     label="Name"
 *     formik={formik}
 *     type="text"
 *   />
 * </CreateEditForm>
 * ```
 */
export const CreateEditForm = ({
    onSubmit,
    isLoading = false,
    submitLabel = 'Save',
    children,
}: CreateEditFormProps) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {children}

            <div className="flex gap-2 justify-end pt-4">
                <Button type="button" variant="outline" disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : submitLabel}
                </Button>
            </div>
        </form>
    );
};

/**
 * Reusable form field component for use with Formik
 * Handles text input with validation
 */
export const FormField = ({
    name,
    label,
    type = 'text',
    placeholder,
    disabled = false,
    maxLength,
    required = false,
    formik,
    showCharCount = false,
}: FormFieldProps) => {
    const value = formik.values[name] || '';
    const error = formik.touched[name] && formik.errors[name];

    return (
        <div className="space-y-2">
            <Label htmlFor={name}>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={placeholder}
                disabled={disabled}
                maxLength={maxLength}
                className={`w-full ${error ? 'border-destructive' : ''}`}
            />
            {error && <InputError message={String(error)} />}
            {showCharCount && maxLength && (
                <p className="text-xs text-muted-foreground">
                    {value.length}/{maxLength} characters
                </p>
            )}
        </div>
    );
};
