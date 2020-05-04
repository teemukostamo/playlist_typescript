import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Grid } from 'semantic-ui-react';
import { SelectField, TextField } from '../../layout/forms/FormFields';
import {
  filterByUserId,
  filterByStatus,
  filterByText,
} from '../../../store/reportList/actions';

import { UserState } from '../../../store/user/types';
import { LoginState } from '../../../store/login/types';

interface Props {
  user: UserState;
  login: LoginState;
}

interface FilterUser {
  userId: number | null | undefined;
}

interface FilterText {
  filterText: string;
}

const FilterReportList: React.FC<Props> = ({ user, login }) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<number | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    dispatch(filterByUserId(userId));
    dispatch(filterByStatus(status));
    dispatch(filterByText(filterText));
    // eslint-disable-next-line
  }, [userId, status, filterText]);

  const userOptions = user.users.map((user) => ({
    key: user.id,
    label: `${user.first_name} ${user.last_name}`,
    value: user.id,
  }));

  const addAllToUserOptions = [
    {
      key: 0,
      label: 'All users',
      value: 0,
    },
    ...userOptions,
  ];

  const statusOptions = [
    {
      key: '2',
      label: 'All',
      value: null,
    },
    {
      key: '0',
      label: 'In Progress',
      value: 0,
    },
    {
      key: '1',
      label: 'Finished',
      value: 1,
    },
  ];

  const onUserChange = (values: FilterUser) => {
    console.log(values.userId);
    setUserId(Number(values.userId));
  };

  const onTextChange = (values: FilterText) => {
    console.log(values.filterText);
    setFilterText(values.filterText);
  };

  return (
    <Grid>
      <Grid.Column width={4}>
        <Formik
          initialValues={{
            userId: undefined,
          }}
          onSubmit={onUserChange}
          validate={(values) => {
            console.log(values);
            setUserId(Number(values.userId));
          }}
        >
          {() => {
            return (
              <Form className='form ui'>
                <SelectField
                  label='Filter by user'
                  name='userId'
                  options={addAllToUserOptions}
                />
              </Form>
            );
          }}
        </Formik>
      </Grid.Column>
      <Grid.Column width={4}>
        <Formik
          initialValues={{
            filterText: '',
          }}
          onSubmit={onTextChange}
          validate={(values) => {
            setFilterText(values.filterText);
          }}
        >
          {() => {
            return (
              <Form className='form ui'>
                <Field
                  label='Filter text'
                  placeholder='Program name...'
                  name='filterText'
                  component={TextField}
                />
              </Form>
            );
          }}
        </Formik>
      </Grid.Column>
    </Grid>
  );
};

export default FilterReportList;
