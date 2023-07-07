import * as yup from 'yup';

export const validationSchema = yup.object({
  firstName: yup.string().required('O campo é obrigatório'),
  lastName: yup.string().required('O campo é obrigatório'),
  email: yup
    .string()
    .email('Endereço de email inválido')
    .required('O campo é obrigatório'),
  password: yup
    .string()
    .min(9, 'A senha deve conter pelo menos 9 caracteres')
    .required('O campo é obrigatório'),
});
