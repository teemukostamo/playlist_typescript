import React from 'react';
import {
  Container,
  Table,
  Dimmer,
  Loader,
  Button,
  Header,
} from 'semantic-ui-react';
import ReportTrackListItem from './ReportTrackListItem';
import { ReportItem } from '../../../store/report/types';

interface Props {
  report: Array<ReportItem>;
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
        {report.map((track) => (
          <ReportTrackListItem key={track.report_track_id} track={track} />
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row></Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default ReportTrackList;
