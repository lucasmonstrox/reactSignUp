import * as yup from 'yup';

const requiredFieldMessage = 'O campo é obrigatório';

export const validationSchema = yup.object({
  firstName: yup.string().required(requiredFieldMessage),
  lastName: yup.string().required(requiredFieldMessage),
  email: yup
    .string()
    .email('Endereço de email inválido')
    .required(requiredFieldMessage),
  password: yup
    .string()
    .min(9, 'A senha deve conter pelo menos 9 caracteres')
    .required(requiredFieldMessage),
});
