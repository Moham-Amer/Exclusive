import * as yup from 'yup';

export const loginFormSchemaValidation = yup.object({
    email: yup.string().email().trim().required(),
    password: yup.string().max(20).required()
        // .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be at least 8 characters long and contain at least one letter and one number'),
})