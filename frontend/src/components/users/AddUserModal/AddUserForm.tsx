import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import {
  TextField,
  PasswordField,
  SelectField,
  UserLevelOptions,
  UserLevel,
} from './FormField';

import { AddUserFormValues } from '../../../store/user/types';

interface Props {
  onSubmit: (values: AddUserFormValues) => void;
  onCancel: () => void;
}

const levelOptions: UserLevelOptions[] = [
  { value: UserLevel.DJ, label: 'DJ' },
  { value: UserLevel.Staff, label: 'Staff' },
  { value: UserLevel.Admin, label: 'Admin' },
];

const AddUserForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: '',
        email: '',
        level: UserLevel.DJ,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.username) {
          errors.username = requiredError;
        }
        if (!values.password) {
          errors.password = requiredError;
        }
        if (!values.confirm_password) {
          errors.confirm_password = requiredError;
        }
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
      {({ isValid, dirty }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Username'
              placeholder='Username'
              name='username'
              component={TextField}
            />
            <Field
              label='Password'
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
            <SelectField label='Level' name='level' options={levelOptions} />
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
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddUserForm;
