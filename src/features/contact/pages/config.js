import * as yup from 'yup';

export const contactFormSchemaValidation = yup.object({
  name: yup.string().trim().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  phone: yup
    .string()
    .trim()
    .matches(/^[0-9+\-()\s]{7,}$/u, 'Enter a valid phone')
    .required('Phone is required'),
  message: yup.string().trim().min(10, 'Message must be at least 10 characters').required('Message is required'),
});


