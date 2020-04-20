import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { TextField, PasswordField } from '../../layout/forms/FormFields';

import { CurrentUserFormValues, User } from '../../../store/user/types';

interface Props {
  onSubmit: (values: CurrentUserFormValues) => void;
  onCancel: () => void;
  user: User;
}

const CurrentUserForm: React.FC<Props> = ({ onSubmit, onCancel, user }) => {
  return (
    <Formik
      initialValues={{
        password: '',
        confirm_password: '',
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (values.password !== values.confirm_password) {
          errors.password = 'Passwords do not match';
          errors.confirm_password = 'Passwords do not match';
        }
        if (!values.email) {
          errors.email = requiredError;
        }
        if (!values.first_name) {
          errors.first_name = requiredError;
        }
        if (!values.last_name) {
          errors.last_name = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Password - fill out field only if you wish to change the password'
              placeholder='Password'
              name='password'
              type='password'
              component={PasswordField}
            />
            <Field
              label='Confirm password'
              placeholder='Confirm password'
              name='confirm_password'
              type='password'
              component={PasswordField}
            />
            <Field
              label='First name'
              placeholder='First name'
              name='first_name'
              component={TextField}
              required
            />
            <Field
              label='Last name'
              placeholder='Last name'
              name='last_name'
              component={TextField}
            />
            <Field
              label='Email'
              placeholder='Email'
              name='email'
              component={TextField}
            />
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!isValid}
                >
                  Update
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CurrentUserForm;
