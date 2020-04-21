import React from 'react';
import { Table } from 'semantic-ui-react';
import AlbumsByArtistItem from './AlbumsByArtistItem';
import { AlbumListItem } from '../../store/artist/types';

interface Props {
  albumList: Array<AlbumListItem>;
}

const AlbumsByArtist: React.FC<Props> = ({ albumList }) => {
  if (albumList === null) {
    return <span>loading</span>;
  }
  return (
    <React.Fragment>
      <h4>Albums</h4>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell>ID#</Table.Cell>
            <Table.Cell>Album name</Table.Cell>
            <Table.Cell>Catalog ID</Table.Cell>
            <Table.Cell>Tracks</Table.Cell>
            <Table.Cell>Report occurrence</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {albumList.map((album) => (
            <AlbumsByArtistItem key={album.album_id} album={album} />
          ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

export default AlbumsByArtist;
