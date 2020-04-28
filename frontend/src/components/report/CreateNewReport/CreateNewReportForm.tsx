import React from 'react';
import moment from 'moment';
import { Formik, Form, Field } from 'formik';
import { Datepicker } from 'react-formik-ui';
import { Button, Grid, Popup, Icon } from 'semantic-ui-react';
import {
  SelectField,
  TextField,
  NumberField,
  SelectFieldOptions,
} from '../../layout/forms/FormFields';
import { startTimeOptions, endTimeOptions } from '../../../constants';
import { CreateNewReportFormTypes } from '../../../store/report/types';
import { CurrentUser } from '../../../store/login/types';

interface Props {
  onSubmit: (values: CreateNewReportFormTypes) => void;
  currentUser: CurrentUser | null;
  programOptions: Array<SelectFieldOptions>;
}

const CreateNewReportForm: React.FC<Props> = ({
  onSubmit,
  currentUser,
  programOptions,
}) => {
  return (
    <Formik
      initialValues={{
        program_name: '',
        program_no: 0,
        program_dj: `${currentUser?.first_name} ${currentUser?.last_name}`,
        program_date: moment(new Date()).format('YYYY-MM-DD'),
        program_start_time: undefined,
        program_end_time: undefined,
        program_id: 0,
        rerun: null,
        status: 0,
        user_id: currentUser?.id || 0,
        username: currentUser?.username || '',
        first_name: currentUser?.first_name || '',
        last_name: currentUser?.last_name || '',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        console.log(values);
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.program_dj) {
          errors.name = requiredError;
        }
        if (values.program_start_time === undefined) {
          errors.name = requiredError;
        }
        if (values.program_end_time === undefined) {
          errors.name = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className='form ui'>
            <SelectField
              label='Program'
              name='program_id'
              options={programOptions}
            />
            <Field
              label='Program number'
              name='program_no'
              component={NumberField}
              min={0}
              max={999}
            />
            <Field
              label='DJ'
              placeholder='DJ'
              name='program_dj'
              component={TextField}
            />
            <Grid>
              <Grid.Column width={5}>
                <label>Program date</label>
                <Datepicker
                  name='program_date'
                  dateFormat='dd.MM.yyyy'
                  placeholder='dd.mm.yyyy'
                />{' '}
              </Grid.Column>
              <Grid.Column width={5}>
                <SelectField
                  label='Start time'
                  name='program_start_time'
                  options={startTimeOptions}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <SelectField
                  label='End time'
                  name='program_end_time'
                  options={endTimeOptions}
                />
              </Grid.Column>
            </Grid>
            <Button
              style={{ marginTop: '1rem' }}
              type='submit'
              floated='left'
              color='green'
              disabled={!isValid || !dirty}
            >
              Create report
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateNewReportForm;
