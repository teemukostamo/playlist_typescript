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
        program_start_time: '00:00',
        program_end_time: '01:00',
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
        const requiredError = 'Field is required';
        const invalidTimeError = 'Check start and end times!';
        const errors: { [field: string]: string } = {};
        if (!values.program_dj) {
          errors.program_dj = requiredError;
        }
        if (values.program_start_time === '') {
          errors.program_start_time = requiredError;
        }
        if (values.program_end_time === '') {
          errors.program_end_time = requiredError;
        }
        if (Number(values.program_id) === 0) {
          errors.program_dj = 'Please select a program';
        }

        if (
          parseInt(values.program_end_time) <=
            parseInt(values.program_start_time) &&
          values.program_end_time !== '23:59'
        ) {
          errors.program_end_time = invalidTimeError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className='form ui'>
            <label style={{ fontWeight: 'bold' }}>
              Program{' '}
              <Popup
                trigger={
                  <Icon style={{ display: 'inline' }} name='question circle' />
                }
                content='Select your program from the list. Contact staff if your program is not on the list'
                style={labelStyle}
                inverted
              />
            </label>
            <SelectField
              placeholder='Select program...'
              label=''
              name='program_id'
              options={programOptions}
            />
            <label style={{ fontWeight: 'bold' }}>
              Program number{' '}
              <Popup
                trigger={
                  <Icon style={{ display: 'inline' }} name='question circle' />
                }
                content='Three digit number can be found on the weekly programming schedule. Insert zero if you do not know the number  '
                style={labelStyle}
                inverted
              />
            </label>
            <Field
              label=''
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
              <Grid.Column width={5} style={{ marginTop: '0.3rem' }}>
                <label style={{ fontWeight: 'bold' }}>Program date</label>
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

const labelStyle = {
  borderRadius: 0,
  display: 'block',
  opacity: 0.9,
  padding: '2em',
};

export default CreateNewReportForm;
