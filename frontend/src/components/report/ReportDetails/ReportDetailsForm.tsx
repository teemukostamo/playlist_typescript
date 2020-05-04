import React from 'react';
import moment from 'moment';
import { Formik, Field } from 'formik';
import { Datepicker, Checkbox, Form } from 'react-formik-ui';
import { Button, Grid, Header } from 'semantic-ui-react';
import {
  SelectField,
  TextField,
  NumberField,
  SelectFieldOptions,
} from '../../layout/forms/FormFields';
import {
  startTimeOptions,
  endTimeOptions,
  reportStatusOptions,
} from '../../../constants';
import { ReportDetails } from '../../../store/report/types';
import { CurrentUser } from '../../../store/login/types';

interface Props {
  onSubmit: (values: ReportDetails) => void;
  programOptions: Array<SelectFieldOptions>;
  userOptions: Array<SelectFieldOptions>;
  reportDetails: ReportDetails;
  onRerunChange: () => void;
  rerun: number | null | undefined;
  duplicateReportClick: (values: ReportDetails) => void;
  currentUser: CurrentUser | null;
}

const ReportDetailsForm: React.FC<Props> = ({
  onSubmit,
  duplicateReportClick,
  onRerunChange,
  programOptions,
  userOptions,
  reportDetails,
  rerun,
  currentUser,
}) => {
  let userField: JSX.Element | null;
  if (currentUser?.level === 1) {
    userField = null;
  } else {
    userField = (
      <SelectField label='User' name='user_id' options={userOptions} />
    );
  }
  return (
    <Grid divided='vertically'>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Header>Report details:</Header>
          <Formik
            initialValues={{
              id: reportDetails.id,
              program_name: reportDetails.program_name,
              program_no: reportDetails.program_no,
              program_dj: reportDetails.program_dj,
              program_date: moment(reportDetails.program_date).format(
                'YYYY-MM-DD'
              ),
              program_start_time: reportDetails.program_start_time,
              program_end_time: reportDetails.program_end_time,
              program_id: reportDetails.program_id,
              rerun: reportDetails.rerun,
              status: reportDetails.status,
              user_id: reportDetails.user_id,
              username: reportDetails.username,
              first_name: reportDetails.first_name,
              last_name: reportDetails.last_name,
            }}
            onSubmit={onSubmit}
            validate={(values) => {
              console.log(values);
              const requiredError = 'Field is required';
              const invalidTimeError = 'Check start and end times!';
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
            {({ isValid, values }) => {
              return (
                <React.Fragment>
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
                    <Grid style={{ marginBottom: '0.5rem' }}>
                      <Grid.Column width={5} style={{ marginTop: '0.3rem' }}>
                        <label style={{ fontWeight: 'bold' }}>
                          Program date
                        </label>
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
                    <SelectField
                      label='Report status'
                      name='status'
                      options={reportStatusOptions}
                    />
                    {userField}
                    <label style={{ fontWeight: 'bold' }}>Rerun</label>
                    <Checkbox
                      name='rerun'
                      label=''
                      onChange={onRerunChange}
                      checked={!!rerun}
                      style={{ marginTop: '0.2rem' }}
                    />
                    <Button
                      style={{ marginTop: '1rem' }}
                      type='submit'
                      floated='left'
                      color='green'
                      disabled={!isValid}
                    >
                      Save changes
                    </Button>
                  </Form>
                  <Button
                    style={{ marginTop: '1rem' }}
                    onClick={() => duplicateReportClick(values)}
                  >
                    Duplicate report
                  </Button>
                </React.Fragment>
              );
            }}
          </Formik>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ReportDetailsForm;
