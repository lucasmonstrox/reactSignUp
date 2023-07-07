import { SignUpInput } from '../types';

export const signUpRepository = async (input: SignUpInput) =>
  fetch('/signUp', { method: 'POST', body: JSON.stringify(input) });
