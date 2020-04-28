import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, Icon, Checkbox } from 'semantic-ui-react';
import {
  deleteTrackFromReport,
  checkForDelete,
  unCheckForDelete,
} from '../../../store/report/actions';
import { ReportItem, ReportState } from '../../../store/report/types';

interface Props {
  track: ReportItem;
  report: ReportState;
}

const ReportTrackListItem: React.FC<Props> = ({ track, report }) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  let minutes: any;
  let seconds: number | string;
  minutes = Math.floor(track.length / 60);
  minutes = minutes.toString();
  seconds = track.length - minutes * 60;

  if (seconds.toString().length === 1) {
    seconds = `0${seconds.toString()}`;
  }
  seconds = seconds.toString();

  const onDeleteClick = () => {
    const remainingTracks = report.report.filter(
      (t) => t.report_track_id !== track.report_track_id
    );
    const params = {
      report_track_id: track.report_track_id,
      report_id: report.reportDetails?.id || 0,
      remainingTracks,
    };
    dispatch(deleteTrackFromReport(params));
  };

  const checkedClick = () => {
    setChecked(!checked);
    if (checked === true) {
      dispatch(unCheckForDelete(track.report_track_id));
    } else {
      dispatch(checkForDelete(track.report_track_id));
    }
  };

  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox onChange={checkedClick} checked={checked} />
        <Icon
          style={{ marginLeft: '1.5rem', cursor: 'pointer' }}
          name='arrows alternate'
        />
      </Table.Cell>
      <Table.Cell>{track.sortable_rank}</Table.Cell>
      <Table.Cell>{track.artist_name}</Table.Cell>
      <Table.Cell>{track.track_title}</Table.Cell>
      <Table.Cell>
        {minutes}:{seconds}
      </Table.Cell>
      <Table.Cell>
        <Icon
          style={{ cursor: 'pointer' }}
          color='red'
          onClick={onDeleteClick}
          name='delete'
        />
      </Table.Cell>
      <Table.Cell>
        {/* <EditTrackModal
          id={track.track_id}
          sortable_rank={track.sortable_rank}
          report_track_id={track.report_track_id}
          track={track}
        /> */}
      </Table.Cell>
    </Table.Row>
  );
};

export default ReportTrackListItem;
