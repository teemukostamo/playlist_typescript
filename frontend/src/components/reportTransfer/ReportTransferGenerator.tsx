import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { Datepicker } from 'react-formik-ui';
import { Button, Header, Container, Dimmer, Loader } from 'semantic-ui-react';
import moment from 'moment';
import {
  getAllReportsByDate,
  generateReportTransfer,
} from '../../store/reportList/actions';

import { ReportListState } from '../../store/reportList/types';
import { CurrentUser } from '../../store/login/types';

interface Props {
  reportList: ReportListState;
  currentUser: CurrentUser;
}

const ReportTransferGenerator: React.FC<Props> = ({
  reportList,
  currentUser,
}) => {
  const dispatch = useDispatch();
  const [pickerDate, setPickerDate] = useState('');

  // useEffect(() => {
  //   dispatch(getAllReportsByDate(moment(pickerDate).format('YYYY-MM')));
  //   // eslint-disable-next-line
  // }, [pickerDate]);

  const getTransferFile = () => {
    const params = {
      user_id: currentUser.id,
      status: 1,
      period: moment(pickerDate).format('YYYY-MM'),
      filename: `${moment(new Date()).format('YYYYMMDDhhmmss')}.txt`,
    };
    dispatch(generateReportTransfer(params));
  };

  if (reportList.reportList === null) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size='medium'>Loading...</Loader>
        </Dimmer>
      </Container>
    );
  }

  if (reportList.loading === true) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size='medium'>Loading...</Loader>
        </Dimmer>
      </Container>
    );
  }
  return (
    <Formik
      initialValues={{
        pickerDate,
      }}
      onSubmit={getTransferFile}
      validate={(values) => {
        setPickerDate(moment(values.pickerDate).format('YYYY-MM'));
      }}
    >
      {() => {
        return (
          <Form className='form ui'>
            <label>starting</label>
            <Datepicker
              name='pickerDate'
              dateFormat='dd.MM.yyyy'
              placeholder='dd.mm.yyyy'
            />

            <Button type='submit' color='green'>
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ReportTransferGenerator;
