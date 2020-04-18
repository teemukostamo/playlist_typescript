import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { Top100Type } from '../../store/search/types';

interface Props {
  top100: Array<Top100Type>;
}

const Top100ArtistList: React.FC<Props> = ({ top100 }) => {
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.Cell>Artisti</Table.Cell>
          <Table.Cell>Albumi</Table.Cell>
          <Table.Cell>Soittokerrat</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {top100.map((t) => (
          <Table.Row key={t.track_id}>
            <Table.Cell>
              <Link to={`/artist/${t.artist_id}`}>{t.artist}</Link>
            </Table.Cell>
            <Table.Cell>
              <Link to={`/album/${t.album_id}`}>{t.album}</Link>
            </Table.Cell>
            <Table.Cell>{t.count}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default Top100ArtistList;
