import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import {
  RequiredTextField,
  SelectField,
  TextField,
} from '../../layout/forms/FormFields';

import { AddProgramFormValues } from '../../../store/program/types';
import { LoginState } from '../../../store/login/types';

interface Props {
  onSubmit: (values: AddProgramFormValues) => void;
  onCancel: () => void;
  login: LoginState;
}

const displayOptions = [
  { value: 1, label: 'Visible' },
  { value: 0, label: 'Invisible' },
];

const siteOptions = [
  { value: 1, label: 'Visible' },
  { value: 0, label: 'Invisible' },
];

const AddProgramForm: React.FC<Props> = ({ onSubmit, onCancel, login }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        identifier: '',
        display: 1,
        site: 1,
        user_id: login.currentUser?.id,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.name) {
          errors.name = requiredError;
        }
        console.log(values.display);
        console.log(values.site);

        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Name'
              placeholder='Name'
              name='name'
              component={RequiredTextField}
            />
            <Field
              label='Identifier'
              placeholder='Identifier'
              name='identifier'
              type='password'
              component={TextField}
            />
            <SelectField
              label='Display'
              name='display'
              options={displayOptions}
            />
            <SelectField
              label='Display on site'
              name='site'
              options={siteOptions}
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

export default AddProgramForm;
