import React from 'react';
import { Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import { Datepicker, Form, Select } from 'react-formik-ui';
import moment from 'moment';
import { Top100QueryType } from '../../store/search/types';

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
          <Form mode='structured'>
            {/* <SelectField label='Get' name='list' options={listOptions} />{' '} */}
            <Select name='list' label='Get Top 100' options={listOptions} />
            <Datepicker
              name='start_date'
              label='Starting'
              dateFormat='dd.MM.yyyy'
              placeholder='dd.mm.yyyy'
            />{' '}
            <Datepicker
              name='end_date'
              label='Ending'
              dateFormat='dd.MM.yyyy'
              placeholder='dd.mm.yyyy'
            />{' '}
            <Button
              type='submit'
              style={{ display: 'inline-block' }}
              color='green'
            >
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Top100SearchForm;
