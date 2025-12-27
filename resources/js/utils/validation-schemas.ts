import * as Yup from 'yup';

/**
 * Validation schema for City entity
 */
export const cityValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('City name is required')
        .min(2, 'City name must be at least 2 characters')
        .max(100, 'City name must not exceed 100 characters')
        .matches(
            /^[a-zA-Z\s\-'.,]+$/,
            'City name can only contain letters, spaces, and common punctuation'
        ),
});

/**
 * Common validation schemas for reuse
 */
export const validationSchemas = {
    city: cityValidationSchema,
};

export type CityValidationSchema = Yup.InferType<typeof cityValidationSchema>;
