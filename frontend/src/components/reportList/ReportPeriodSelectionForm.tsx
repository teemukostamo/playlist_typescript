import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { SelectField } from '../layout/forms/FormFields';
import { ReportListSelectionDate } from '../../store/reportList/types';
import { reportMonthOptions, reportYearOptions } from '../../constants';

interface Props {
  onSubmit: (values: ReportListSelectionDate) => void;
}

const ReportPeriodSelectionForm: React.FC<Props> = ({ onSubmit }) => {
  console.log(reportYearOptions);
  return (
    <Formik
      initialValues={{
        reportYear: '2020',
        reportMonth: '01',
      }}
      onSubmit={onSubmit}
    >
      {() => {
        return (
          <Form className='form ui'>
            <Grid>
              <Grid.Column width={4}>
                <SelectField
                  label='Select month'
                  name='reportMonth'
                  options={reportMonthOptions}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <SelectField
                  label='Select month'
                  name='reportYear'
                  options={reportYearOptions}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Button type='submit' floated='right' color='green'>
                  Get reports
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ReportPeriodSelectionForm;
