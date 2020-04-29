import React from 'react';
import moment from 'moment';
import { Formik, Form } from 'formik';
import { Datepicker } from 'react-formik-ui';
import { Button, Grid } from 'semantic-ui-react';
import { SelectField } from '../../layout/forms/FormFields';
import { startTimeOptions, endTimeOptions } from '../../../constants';

import { ReportDetails } from '../../../store/report/types';
import { PlaylogParams } from '../../../store/report/types';

interface Props {
  reportDetails: ReportDetails | null;
  onSubmit: (values: PlaylogParams) => void;
  sortable_rank_start: number;
}

const GetPlaylogForm: React.FC<Props> = ({
  reportDetails,
  onSubmit,
  sortable_rank_start,
}) => {
  const studioOptions = [
    {
      key: '928',
      label: 'Studio 1',
      value: '928',
    },
    {
      key: '1047',
      label: 'Studio 2',
      value: '1047',
    },
  ];

  return (
    <Formik
      initialValues={{
        studioId: '928',
        date: moment(reportDetails?.program_date).format('YYYY-MM-DD'),
        startTime: reportDetails?.program_start_time.slice(0, 2) || '',
        endTime: reportDetails?.program_end_time.slice(0, 2) || '',
        report_id: reportDetails?.id || 0,
        sortable_rank_start: sortable_rank_start,
      }}
      onSubmit={onSubmit}
    >
      {() => {
        return (
          <Form className='form ui'>
            <Grid>
              <Grid.Column width={8}>
                <label>Select date</label>
                <Datepicker
                  name='date'
                  dateFormat='dd.MM.yyyy'
                  placeholder='dd.mm.yyyy'
                />{' '}
              </Grid.Column>
              <Grid.Column width={8}>
                <SelectField
                  label='Studio'
                  name='studioId'
                  options={studioOptions}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <SelectField
                  label='Starting'
                  name='startTime'
                  options={startTimeOptions}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <SelectField
                  label='Ending'
                  name='endTime'
                  options={endTimeOptions}
                />
              </Grid.Column>
            </Grid>

            <Button style={{ marginTop: '1rem' }} type='submit' color='green'>
              Get Tracks
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default GetPlaylogForm;
