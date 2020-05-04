import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { SelectField, TextField } from '../layout/forms/FormFields';
import { Button, Grid } from 'semantic-ui-react';
import { advancedSearch } from '../../store/search/actions';
import { AdvancedSearchParamsType } from '../../store/search/types';

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
              <Grid.Column width={6}>
                <Field
                  label='Search query'
                  placeholder='Artist, album, track...'
                  name='query'
                  component={TextField}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <SelectField
                  label='Search for'
                  name='kind'
                  options={searchTargetOptions}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <Button color='green' type='submit'>
                  Search
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SearchForm;
