import * as yup from 'yup';

export const productFormValidationSchema = yup.object({
    title: yup.string().trim('The Title is required').required('The Title is required'),
    price: yup.number().integer().typeError('The price should be a number').required('The Price is required'),
    img: yup.string().trim('The Title is required').url('Invalid img link').required('The Image URL is required')
})