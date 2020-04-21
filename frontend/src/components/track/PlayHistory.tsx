import React from 'react';
import { Table, Dimmer, Loader } from 'semantic-ui-react';
import PlayHistoryItem from './PlayHistoryItem';
import { PlayHistoryEntry } from '../../store/track/types';

interface Props {
  playHistory: Array<PlayHistoryEntry>;
}

const PlayHistory: React.FC<Props> = ({ playHistory }) => {
  if (playHistory.length === 0) {
    return (
      <Dimmer>
        <Loader>Ladataan...</Loader>
      </Dimmer>
    );
  }
  if (playHistory[0].result === 'No plays yet') {
    return (
      <React.Fragment>
        <h4>Soittohistoria</h4>
        <p>Ei soittoja</p>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <h4>Play history</h4>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell>Date</Table.Cell>
            <Table.Cell>Program</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {playHistory.map((pgm) => (
            <PlayHistoryItem key={pgm.report_id} pgm={pgm} />
          ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

export default PlayHistory;
