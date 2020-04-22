import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Container, Grid, Popup, Icon } from 'semantic-ui-react';
import { getOneReport, getReportDetails } from '../../store/report/actions';

import ReportTrackList from './ReportWithTracks/ReportTrackList';
import AddTracksToReport from './AddTracksToReport';
import ReportDetailsIndex from './ReportDetails';

import { ApplicationState } from '../../store/types';

interface Props {
  id: number;
}

const ReportTrackIndex: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneReport(id));
    dispatch(getReportDetails(id));
    // eslint-disable-next-line
  }, []);
  console.log(id);
  const report = useSelector((state: ApplicationState) => state.report);
  const login = useSelector((state: ApplicationState) => state.login);
  console.log(report);
  if (
    login.currentUser?.level === 1 &&
    login.currentUser.id !== report.reportDetails?.user_id
  ) {
    return null;
  }
  if (report.report.length === 0) {
    return (
      <Container>
        <Header>Report</Header>
        <div>No tracks added. Please add tracks from below</div>
        <AddTracksToReport />
        <ReportDetailsIndex />
      </Container>
    );
  }
  return (
    <Container>
      <Header>Report</Header>
      <ReportTrackList report={report.report} />
      <AddTracksToReport />
      <ReportDetailsIndex />
    </Container>
  );
};

export default ReportTrackIndex;
