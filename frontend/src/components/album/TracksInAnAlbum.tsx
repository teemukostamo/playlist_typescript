import React from 'react';
import { Table } from 'semantic-ui-react';
import TracksInAnAlbumItem from './TracksInAnAlbumItem';

import { TracklistItem } from '../../store/album/types';

interface Props {
  tracklist: Array<TracklistItem>;
}

const TracksInAnAlbum: React.FC<Props> = ({ tracklist }) => {
  if (tracklist === null) {
    return <span>loading</span>;
  }
  return (
    <React.Fragment>
      <h4>Tracks</h4>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell>Track ID#</Table.Cell>
            <Table.Cell>ARTIST - Track</Table.Cell>
            <Table.Cell>Track# / Disc#</Table.Cell>
            <Table.Cell>ISRC</Table.Cell>
            <Table.Cell>Report occurrence</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tracklist.map((track) => (
            <TracksInAnAlbumItem key={track.track_id} track={track} />
          ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

export default TracksInAnAlbum;
