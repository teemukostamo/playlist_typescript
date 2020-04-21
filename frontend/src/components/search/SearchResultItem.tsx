import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import MergeArtists from './MergeArtists';
// import MergeAlbums from './MergeAlbums';
// import MergeTracks from './MergeTracks';
// import AddToCurrentReport from '../track/AddToCurrentReport';

import { AdvancedResultsType } from '../../store/search/types';

interface Props {
  result: AdvancedResultsType;
}

const SearchResultItem: React.FC<Props> = ({ result }) => {
  if (result === null) {
    return null;
  }
  return (
    <Table.Row>
      <Table.Cell>
        <Link to={`../artist/${result.artist_id}`}>{result.artist_name}</Link>
        {/* <MergeArtists
          artist_id={result.artist_id}
          artist_name={result.artist_name}
        /> */}
      </Table.Cell>
      <Table.Cell>
        <Link to={`../album/${result.album_id}`}>{result.album_name}</Link>
        {/* <MergeAlbums
          album_id={result.album_id}
          album_name={result.album_name}
        /> */}
      </Table.Cell>
      <Table.Cell>
        <Link to={`../track/${result.track_id}`}>{result.track_title}</Link>
        {/* <MergeTracks
          track_id={result.track_id}
          track_title={result.track_title}
        /> */}
      </Table.Cell>
      <Table.Cell>
        <Link to={`../reports/${result.report_id}`}>{result.program_date}</Link>
      </Table.Cell>
      <Table.Cell>
        {/* <AddToCurrentReport
          track_title={result.track_title}
          track_id={result.track_id}
          length={result.length}
        /> */}
      </Table.Cell>
    </Table.Row>
  );
};

export default SearchResultItem;
