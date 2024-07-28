import * as yup from 'yup';

export const generationSchema = yup.object().shape({
  generation: yup.string().required(),
  announced: yup.date().nullable(),
  releaseDate: yup.date().nullable(),
  discontinued: yup.date().nullable(),
  finalSupportedOS: yup.string().nullable(),
  supportStatus: yup.boolean().required(),
  releasedWith: yup.string().nullable(),
});

export default generationSchema;
