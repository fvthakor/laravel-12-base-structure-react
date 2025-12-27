import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { CreateEditForm, FormField } from '@/components/create-edit-modal';
import { cityValidationSchema } from '@/utils/validation-schemas';
import type { CityFormValues, CityModalProps } from '@/types';

export const CityModal = ({ open, onOpenChange, city, onSuccess }: CityModalProps) => {
    const isEditMode = !!city;
    const [isLoading, setIsLoading] = useState(false);

    const initialValues: CityFormValues = {
        name: city?.name || '',
    };

    const handleSubmit = (
        values: CityFormValues,
        formikHelpers: FormikHelpers<CityFormValues>
    ) => {
        setIsLoading(true);

        if (isEditMode && city) {
            router.patch(`/cities/${city.id}`, values, {
                onSuccess: () => {
                    onOpenChange(false);
                    onSuccess?.();
                },
                onError: (errors) => {
                    console.error('Submit error:', errors);
                    if (errors.name) {
                        formikHelpers.setFieldError('name', errors.name);
                    }
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            });
        } else {
            router.post('/cities', values, {
                onSuccess: () => {
                    onOpenChange(false);
                    onSuccess?.();
                },
                onError: (errors) => {
                    console.error('Submit error:', errors);
                    if (errors.name) {
                        formikHelpers.setFieldError('name', errors.name);
                    }
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? 'Edit City' : 'Add New City'}</DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? 'Update the city information below.'
                            : 'Enter the details of the new city below.'}
                    </DialogDescription>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={cityValidationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {(formik) => (
                        <CreateEditForm
                            onSubmit={formik.handleSubmit}
                            isLoading={isLoading}
                            submitLabel={isEditMode ? 'Update City' : 'Add City'}
                        >
                            <FormField
                                name="name"
                                label="City Name"
                                placeholder="Enter city name"
                                maxLength={100}
                                required
                                formik={formik}
                                showCharCount
                                disabled={isLoading}
                            />
                        </CreateEditForm>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};
