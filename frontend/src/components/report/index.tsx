import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactDragListView from 'react-drag-listview';
import {
  Header,
  Container,
  Button,
  Grid,
  Popup,
  Icon,
} from 'semantic-ui-react';
import {
  getOneReport,
  getReportDetails,
  deleteChecked,
  updateSortableRank,
} from '../../store/report/actions';

import ReportTrackList from './ReportWithTracks/ReportTrackList';
import AddTracksToReport from './AddTracksToReport';
import ReportDetailsIndex from './ReportDetails';

import { ApplicationState } from '../../store/types';
import { ReportItem } from '../../store/report/types';

interface Props {
  id: number;
}

const ReportTrackIndex: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const report = useSelector((state: ApplicationState) => state.report);
  const login = useSelector((state: ApplicationState) => state.login);
  const [dragState, setDragState] = useState<Array<ReportItem>>(report.report);

  useEffect(() => {
    dispatch(getReportDetails(id));
    dispatch(getOneReport(id));
    // eslint-disable-next-line
  }, [report.playlog]);

  // fetch tracks after sorting changes
  useEffect(() => {
    dispatch(updateSortableRank(dragState));
    // eslint-disable-next-line
  }, [dragState]);

  const clickDeleteChecked = () => {
    const remainingTracks = report.report.filter((item) => {
      return !report.checkedForDelete.includes(item.report_track_id);
    });
    dispatch(deleteChecked(report.checkedForDelete, id, remainingTracks));
  };

  const deleteCheckedButton = (
    <Button
      color='red'
      onClick={clickDeleteChecked}
      style={{
        marginLeft: '1rem',
        marginBottom: '1rem',
        marginTop: '1rem',
      }}
    >
      Poista valitut
    </Button>
  );
  const array = report.report;
  const dragProps = {
    onDragEnd(fromIndex: number, toIndex: number) {
      const item = array.splice(fromIndex, 1)[0];
      array.splice(toIndex, 0, item);
      setDragState(array);
    },
    nodeSelector: 'tr',
    handleSelector: 'i.arrows',
  };

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
      <ReactDragListView {...dragProps}>
        <ReportTrackList report={report} />
      </ReactDragListView>
      {deleteCheckedButton}
      <AddTracksToReport />
      <ReportDetailsIndex />
    </Container>
  );
};

export default ReportTrackIndex;
