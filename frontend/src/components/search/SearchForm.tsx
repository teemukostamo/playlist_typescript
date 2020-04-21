import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { SelectField, TextField } from '../layout/forms/FormFields';
import { Button, Grid } from 'semantic-ui-react';
// import AddTrackBtn from './AddTrackBtn';
import { advancedSearch } from '../../store/search/actions';
import { AdvancedSearchParamsType } from '../../store/search/types';

interface Props {
  onSubmit: (values: AdvancedSearchParamsType) => void;
}

const SearchForm = () => {
  const dispatch = useDispatch();

  const searchTargetOptions = [
    {
      key: 1,
      label: 'Tracks',
      value: 'tr',
    },
    {
      key: 2,
      label: 'Artists',
      value: 'ar',
    },
    {
      key: 3,
      label: 'Albums',
      value: 'al',
    },
  ];

  const handleSearch = (values: AdvancedSearchParamsType) => {
    dispatch(advancedSearch(values));
  };
  return (
    <Grid columns={2}>
      <Grid.Column>
        <Formik
          initialValues={{
            query: '',
            kind: 'ar',
          }}
          onSubmit={handleSearch}
        >
          {() => {
            return (
              <Form className='form ui'>
                <Grid>
                  <Grid.Column width={8}>
                    <Field
                      label='Search query'
                      placeholder='Artist, album, track...'
                      name='query'
                      component={TextField}
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <SelectField
                      label='Search for'
                      name='kind'
                      options={searchTargetOptions}
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Button type='submit'>Search</Button>
                  </Grid.Column>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid.Column>
      <Grid.Column>
        <span style={{ float: 'right' }}>
          {/* <AddTrackBtn /> */}
          <Button>Add a track</Button>
        </span>
      </Grid.Column>
    </Grid>
  );
};

export default SearchForm;
