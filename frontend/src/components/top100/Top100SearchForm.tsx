import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import { Datepicker } from 'react-formik-ui';
import { SelectField } from '../layout/forms/FormFields';
import { Top100QueryType } from '../../store/search/types';
import moment from 'moment';

const listOptions = [
  {
    key: 1,
    value: 'artist_id',
    label: 'Artists',
  },
  {
    key: 2,
    value: 'track_id',
    label: 'Tracks',
  },
  {
    key: 3,
    value: 'album_id',
    label: 'Albums',
  },
];

interface Props {
  onSubmit: (values: Top100QueryType) => void;
}

const Top100SearchForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        list: 'artist_id',
        start_date: moment(Date.now() - 7 * 24 * 3600 * 1000).format(
          'YYYY-MM-DD'
        ),
        end_date: moment(new Date()).format('YYYY-MM-DD'),
      }}
      onSubmit={onSubmit}
    >
      {() => {
        return (
          <Form className='form ui'>
            <Grid>
              <Grid.Column width={4}>
                <SelectField
                  label='Get Top100'
                  name='list'
                  options={listOptions}
                />
              </Grid.Column>
              <Grid.Column width={4} style={{ marginTop: '0.2rem' }}>
                <label style={{ fontWeight: 'bold' }}>Starting</label>
                <Datepicker
                  name='start_date'
                  dateFormat='dd.MM.yyyy'
                  placeholder='dd.mm.yyyy'
                />
              </Grid.Column>
              <Grid.Column width={4} style={{ marginTop: '0.2rem' }}>
                <label style={{ fontWeight: 'bold' }}>Ending</label>
                <Datepicker
                  name='end_date'
                  dateFormat='dd.MM.yyyy'
                  placeholder='dd.mm.yyyy'
                />{' '}
              </Grid.Column>
            </Grid>
            <Button style={{ marginTop: '1rem' }} type='submit' color='green'>
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Top100SearchForm;
