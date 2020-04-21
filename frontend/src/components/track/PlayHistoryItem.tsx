import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

import { PlayHistoryEntry } from '../../store/track/types';

interface Props {
  pgm: PlayHistoryEntry;
}

const PlayHistoryItem: React.FC<Props> = ({ pgm }) => {
  return (
    <Table.Row>
      <Table.Cell>{pgm.program_date}</Table.Cell>
      <Table.Cell>
        <Link to={`/reports/${pgm.report_id}`}>{pgm.program_name}</Link>
      </Table.Cell>
    </Table.Row>
  );
};

export default PlayHistoryItem;
