import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { SelectField } from '../layout/forms/FormFields';
import { Grid } from 'semantic-ui-react';
import { sortAdvancedResults } from '../../store/search/actions';

interface SortByType {
  sortBy: number;
}

const SortResults = () => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState(1);

  useEffect(() => {
    dispatch(sortAdvancedResults(sortBy));
    // eslint-disable-next-line
  }, [sortBy]);

  const onChange = (values: SortByType) => {
    setSortBy(values.sortBy);
  };

  const sortOptions = [
    {
      key: 1,
      label: 'Track title',
      value: 1,
    },
    {
      key: 2,
      label: 'Artist name',
      value: 2,
    },
  ];

  return (
    <Grid columns={4}>
      <Grid.Column>
        <Formik
          initialValues={{
            sortBy: 1,
          }}
          onSubmit={onChange}
          validate={(values) => {
            setSortBy(Number(values.sortBy));
          }}
        >
          {() => {
            return (
              <Form className='form ui'>
                <SelectField
                  label='Sort by'
                  name='sortBy'
                  options={sortOptions}
                />
              </Form>
            );
          }}
        </Formik>
      </Grid.Column>
    </Grid>
  );
};

export default SortResults;
