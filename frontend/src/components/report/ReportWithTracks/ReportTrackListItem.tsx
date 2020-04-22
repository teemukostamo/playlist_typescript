import React from 'react';
import { Table, Icon, Checkbox } from 'semantic-ui-react';
import { ReportItem } from '../../../store/report/types';

interface Props {
  track: ReportItem;
}

const ReportTrackListItem: React.FC<Props> = ({ track }) => {
  let minutes: any;
  let seconds: number | string;
  minutes = Math.floor(track.length / 60);
  minutes = minutes.toString();
  seconds = track.length - minutes * 60;
  if (seconds.toString().length === 1) {
    seconds = `0${seconds.toString()}`;
  }
  seconds = seconds.toString();
  return (
    <Table.Row>
      <Table.Cell>
        {/* <Checkbox onChange={checkedClick} checked={checked} /> */}
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
          // onClick={onDelete}
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
