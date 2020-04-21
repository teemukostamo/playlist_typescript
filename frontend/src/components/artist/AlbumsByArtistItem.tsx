import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
// import MergeAlbumsModal from './MergeAlbumsModal';

import { AlbumListItem } from '../../store/artist/types';

interface Props {
  album: AlbumListItem;
}

const AlbumsByArtistItem: React.FC<Props> = ({ album }) => {
  return (
    <Table.Row>
      <Table.Cell>
        {/* <MergeAlbumsModal album_name={album.name} album_id={album.album_id} /> */}
        merge albums modal here
      </Table.Cell>
      <Table.Cell>
        <Link to={`/album/${album.album_id}`}>{album.name}</Link>
      </Table.Cell>
      <Table.Cell>{album.identifier}</Table.Cell>
      <Table.Cell>{album.track_count}</Table.Cell>
      <Table.Cell>{album.report_occurrence}</Table.Cell>
    </Table.Row>
  );
};

export default AlbumsByArtistItem;
