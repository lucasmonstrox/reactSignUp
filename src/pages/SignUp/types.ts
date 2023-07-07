export enum FormStatus {
  Initial,
  EmailAlreadyTaken,
  Success,
  Error,
}

export type SignUpInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
