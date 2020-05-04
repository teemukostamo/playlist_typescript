/* eslint-disable indent */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Table,
  Dimmer,
  Header,
  Loader,
  Responsive,
} from 'semantic-ui-react';
import moment from 'moment';

import ReportPeriodSelectionForm from './ReportPeriodSelectionForm';
import ReportListItem from './ReportListItem';
import FilterReportList from './FilterReportList';

import {
  getAllReportsByDate,
  getAllReportsByDateByUser,
} from '../../store/reportList/actions';

import { ApplicationState } from '../../store/types';
import { ReportListSelectionDate } from '../../store/reportList/types';

const ReportList = () => {
  const dispatch = useDispatch();
  const login = useSelector((state: ApplicationState) => state.login);
  const user = useSelector((state: ApplicationState) => state.user);
  const reportList = useSelector((state: ApplicationState) => state.reportList);

  // initial reports list
  useEffect(() => {
    if (login.currentUser?.level === 1) {
      if (reportList.reportListDate === null) {
        dispatch(
          getAllReportsByDateByUser(
            moment().format('YYYY-MM'),
            login.currentUser.id
          )
        );
      } else {
        dispatch(
          getAllReportsByDateByUser(
            reportList.reportListDate,
            login.currentUser.id
          )
        );
      }
    } else if (reportList.reportListDate === null) {
      dispatch(getAllReportsByDate(moment().format('YYYY-MM')));
    } else {
      dispatch(getAllReportsByDate(reportList.reportListDate));
    }
    // eslint-disable-next-line
  }, []);

  const onSubmit = (values: ReportListSelectionDate) => {
    console.log(values);
    const date = `${values.reportYear}-${values.reportMonth}`;

    if (login.currentUser?.level === 1) {
      dispatch(getAllReportsByDateByUser(date, login.currentUser.id));
    } else {
      dispatch(getAllReportsByDate(date));
    }
  };

  if (reportList.reportList === null || reportList.loading) {
    return (
      <Dimmer active>
        <Loader content='Loading...' />
      </Dimmer>
    );
  }

  if (reportList.reportList.length === 0) {
    return (
      <Container>
        <ReportPeriodSelectionForm onSubmit={onSubmit} />
        <Header>No reports in the selected time period.</Header>
      </Container>
    );
  }

  let reportListTimeDate;
  if (reportList.reportListDate === null) {
    reportListTimeDate = moment().format('MMMM YYYY');
  } else {
    reportListTimeDate = moment(reportList.reportListDate).format('MMMM YYYY');
  }

  let reportsToShow = reportList.reportList;

  reportsToShow =
    Number(reportList.filterByText) === 0
      ? reportsToShow
      : (reportsToShow = reportsToShow.filter((report) =>
          report.name
            .toLowerCase()
            .includes(reportList.filterByText.toLowerCase())
        ));
  reportsToShow =
    reportList.filterUserValue === null
      ? reportsToShow
      : (reportsToShow = reportsToShow.filter(
          (report) => report.user_id === reportList.filterUserValue
        ));
  reportsToShow =
    reportList.filterStatusValue === null
      ? reportsToShow
      : (reportsToShow = reportsToShow.filter(
          (report) => report.status === reportList.filterStatusValue
        ));

  return (
    <Container>
      <Header>Get reports by month</Header>
      <ReportPeriodSelectionForm onSubmit={onSubmit} />
      <h4>Reports from {reportListTimeDate}</h4>
      <FilterReportList user={user} login={login} />
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Responsive as={Table.Cell} minWidth={768}>
              Program number
            </Responsive>
            <Table.Cell>Program name</Table.Cell>
            <Table.Cell>Date</Table.Cell>
            <Table.Cell>Time</Table.Cell>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {reportsToShow.map((r) => (
            <ReportListItem
              key={r.id}
              report={r}
              loginLevel={login.currentUser?.level}
            />
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default ReportList;
