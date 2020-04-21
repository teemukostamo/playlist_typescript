/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Table, Loader, Dimmer } from 'semantic-ui-react';
import SearchResultItem from './SearchResultItem';
import SortResults from './SortResults';

import { SearchState } from '../../store/search/types';

interface Props {
  search: SearchState;
}

const SearchResults: React.FC<Props> = ({ search }) => {
  if (search.advancedResults.length === 0) {
    return <div>no results. please enter a query</div>;
  }
  if (search.loading === true) {
    return (
      <Dimmer active>
        <Loader>Loading results...</Loader>
      </Dimmer>
    );
  }
  let resultsToShow = search.advancedResults;

  resultsToShow =
    search.sortAdvancedResults === 2
      ? resultsToShow
      : resultsToShow.sort((a, b) =>
          a.track_title > b.track_title
            ? 1
            : b.track_title > a.track_title
            ? -1
            : 0
        );

  resultsToShow =
    search.sortAdvancedResults === 1
      ? resultsToShow
      : resultsToShow.sort((a, b) =>
          a.artist_name > b.artist_name
            ? 1
            : b.artist_name > a.artist_name
            ? -1
            : 0
        );

  return (
    <div style={{ marginTop: '2rem' }}>
      <SortResults />
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell>Artist</Table.Cell>
            <Table.Cell>Album</Table.Cell>
            <Table.Cell>Track</Table.Cell>
            <Table.Cell>Latest play on</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {resultsToShow.map((result) => (
            <SearchResultItem key={result.track_id} result={result} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default SearchResults;
