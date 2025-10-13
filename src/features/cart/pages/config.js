import * as yup from 'yup';

export const billingFormSchemaValidation = yup.object({
  firstName: yup.string().trim().min(2, 'First name is too short').required('First name is required'),
  company: yup.string().trim().optional(),
  street: yup.string().trim().min(5, 'Enter a valid street').required('Street is required'),
  apartment: yup.string().trim().optional(),
  city: yup.string().trim().min(2, 'Enter a valid city').required('City is required'),
  phone: yup.string().trim().matches(/^[0-9+\-()\s]{7,}$/u, 'Enter a valid phone').required('Phone is required'),
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
});


