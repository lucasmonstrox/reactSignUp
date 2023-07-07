import { SignUpInput } from '../types';

export const signUpRepository = async (input: SignUpInput) =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ id: 1, ...input }), 3000)
  );
