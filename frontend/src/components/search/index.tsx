import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import AddTrackModal from './AddTrackModal';

import { ApplicationState } from '../../store/types';

const Search: React.FC = () => {
  const search = useSelector((state: ApplicationState) => state.search);

  return (
    <Container>
      <Header>Search</Header>
      <AddTrackModal />
      <SearchForm />
      <SearchResults search={search} />
    </Container>
  );
};

export default Search;
