import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import {
  TextField,
  PasswordField,
  SelectField,
} from '../../layout/forms/FormFields';

import {
  EditUserFormValues,
  User,
  UserLevelOptions,
  UserLevel,
} from '../../../store/user/types';

interface Props {
  onSubmit: (values: EditUserFormValues) => void;
  onCancel: () => void;
  user: User;
}

const levelOptions: UserLevelOptions[] = [
  { value: UserLevel.DJ, label: 'DJ' },
  { value: UserLevel.Staff, label: 'Staff' },
  { value: UserLevel.Admin, label: 'Admin' },
];

const statusOptions = [
  { value: 1, label: 'Active' },
  { value: 0, label: 'Inactive' },
];

const AddUserForm: React.FC<Props> = ({ onSubmit, onCancel, user }) => {
  return (
    <Formik
      initialValues={{
        password: '',
        confirm_password: '',
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        level: user.level,
        status: user.status,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        console.log(values.level);
        console.log(values.status);
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
            <SelectField label='Level' name='level' options={levelOptions} />
            <SelectField label='Status' name='status' options={statusOptions} />
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

export default AddUserForm;
