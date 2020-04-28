import React from 'react';
import { Table } from 'semantic-ui-react';
import ReportTrackListItem from './ReportTrackListItem';
import { ReportState } from '../../../store/report/types';

interface Props {
  report: ReportState;
}

const ReportTrackList: React.FC<Props> = ({ report }) => {
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.Cell></Table.Cell>
          <Table.Cell>#</Table.Cell>
          <Table.Cell>Artist</Table.Cell>
          <Table.Cell>Track Title</Table.Cell>
          <Table.Cell>Length</Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {report.report.map((track) => (
          <ReportTrackListItem
            key={track.report_track_id}
            track={track}
            report={report}
          />
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row></Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default ReportTrackList;
