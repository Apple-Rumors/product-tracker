import * as yup from 'yup';
import generationSchema from './generation';

export const productSchema = yup.object().shape({
  model: yup.string().required(),
  generations: yup.array().of(generationSchema).required(),
});

export default productSchema;
