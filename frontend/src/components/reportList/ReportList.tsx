/* eslint-disable indent */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Table,
  Dimmer,
  Loader,
  Responsive,
} from 'semantic-ui-react';
import moment from 'moment';
import { ApplicationState } from '../../store/types';
import ReportPeriodSelectionForm from './ReportPeriodSelectionForm';
import ReportListItem from './ReportListItem';
import { ReportListSelectionDate } from '../../store/reportList/types';
import {
  getAllReportsByDate,
  getAllReportsByDateByUser,
} from '../../store/reportList/actions';

const ReportList = () => {
  const login = useSelector((state: ApplicationState) => state.login);
  const reportList = useSelector((state: ApplicationState) => state.reportList);
  console.log(reportList);

  const dispatch = useDispatch();
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
        <Loader content='Ladataan...' />
      </Dimmer>
    );
  }

  if (reportList.reportList.length === 0) {
    return (
      <Container>
        <h2>No reports in the selected time period</h2>
        <ReportPeriodSelectionForm onSubmit={onSubmit} />
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
      {/* <ReportFilterForm /> */}
      <h3>Reports {reportListTimeDate}</h3>
      <ReportPeriodSelectionForm onSubmit={onSubmit} />
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
