import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { FormStatus, SignUpInput } from './types';
import { validationSchema } from './consts/validationSchema';
import { signUpRepository } from './repositories/signUp';

export const SignUpPage = () => {
  const [formStatus, setFormStatus] = useState(FormStatus.Initial);
  // @ts-ignore
  const mutation = useMutation(signUpRepository, {
    onError: () => {
      setFormStatus(FormStatus.Error);
    },
    onSuccess: (data) => {
      const hasFormErrors = data.status === StatusCodes.BAD_REQUEST;
      if (hasFormErrors) {
        setFormStatus(FormStatus.EmailAlreadyTaken);
        return;
      }
      const hasServerError = data.status !== StatusCodes.NO_CONTENT;
      if (hasServerError) {
        setFormStatus(FormStatus.Error);
        return;
      }
      setFormStatus(FormStatus.Success);
    },
  });
  const formik = useFormik<SignUpInput>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // @ts-ignore
      mutation.mutate(values);
    },
  });
  const renderAlertMessage = () => {
    if (formStatus === FormStatus.Initial) {
      return <></>;
    }
    const severity =
      formStatus === FormStatus.EmailAlreadyTaken ||
      formStatus === FormStatus.Error
        ? 'error'
        : 'success';
    const message = {
      [FormStatus.EmailAlreadyTaken]: 'O email já está em uso',
      [FormStatus.Error]: 'Ocorreu um erro inesperado',
      [FormStatus.Success]: 'A sua conta foi criada com sucesso',
    };
    // @ts-ignore
    return (
      <Alert severity={severity} data-testid='alertMessage'>
        {message[formStatus]}
      </Alert>
    );
  };
  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <Typography variant='h2'>Sign up</Typography>
          <Stack direction='row' spacing={2}>
            <TextField
              name='firstName'
              label='First Name*'
              error={!!formik.errors?.firstName}
              fullWidth
              helperText={formik.errors?.firstName}
              inputProps={{ maxlength: 9 }}
              value={formik.values.firstName}
              data-testid='firstName'
              onChange={formik.handleChange}
            />
            <TextField
              name='lastName'
              label='Last Name*'
              error={!!formik.errors?.lastName}
              fullWidth
              helperText={formik.errors?.lastName}
              inputProps={{ maxlength: 9 }}
              value={formik.values.lastName}
              data-testid='lastName'
              onChange={formik.handleChange}
            />
          </Stack>
          <TextField
            name='email'
            label='Email Address*'
            error={!!formik.errors?.email}
            helperText={formik.errors?.email}
            value={formik.values.email}
            data-testid='email'
            onChange={formik.handleChange}
          />
          <TextField
            name='password'
            type='password'
            label='Password*'
            error={!!formik.errors?.password}
            helperText={formik.errors?.password}
            value={formik.values.password}
            data-testid='password'
            onChange={formik.handleChange}
          />
          <Button
            type='submit'
            disabled={mutation.isLoading}
            data-testid='signUp'
          >
            Sign Up
          </Button>
        </Stack>
      </form>
      {renderAlertMessage()}
    </Container>
  );
};
