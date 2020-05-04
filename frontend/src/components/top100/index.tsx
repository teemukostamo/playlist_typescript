import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import { ApplicationState } from '../../store/types';
import { Top100QueryType } from '../../store/search/types';
import { getTop100 } from '../../store/search/actions';
import moment from 'moment';

import Top100SearchForm from './Top100SearchForm';
import Top100ArtistList from './Top100ArtistList';
import Top100AlbumList from './Top100AlbumList';
import Top100TrackList from './Top100TrackList';

const Top100: React.FC = () => {
  const dispatch = useDispatch();
  const search = useSelector((state: ApplicationState) => state.search);

  const getTop100Results = (values: Top100QueryType) => {
    const top100Values = {
      ...values,
      end_date: moment(new Date()).format('YYYY-MM-DD'),
    };
    dispatch(getTop100(top100Values));
  };
  if (search.top100Query === null) {
    return (
      <Container>
        <Header style={{ display: 'inline' }}>Top 100</Header>
        <p>
          Get the top 100 most played tracks, albums or artists within a time
          period.
        </p>
        <Top100SearchForm onSubmit={getTop100Results} />
      </Container>
    );
  }
  if (search.loading) {
    return (
      <Container>
        <Header>Top 100</Header>
        <Top100SearchForm onSubmit={getTop100Results} />
        <div>Loading...</div>
      </Container>
    );
  }
  if (search.top100Query.list === 'artist_id') {
    return (
      <Container>
        <Header style={{ display: 'inline' }}>Top 100</Header>
        <p>
          Get the top 100 most played tracks, albums or artists within a time
          period.
        </p>
        <Top100SearchForm onSubmit={getTop100Results} />
        <Top100ArtistList top100={search.top100} />
      </Container>
    );
  }
  if (search.top100Query.list === 'album_id') {
    return (
      <Container>
        <h3 style={{ display: 'inline' }}>Top 100</h3>
        <p>
          Get the top 100 most played tracks, albums or artists within a time
          period.
        </p>
        <Top100SearchForm onSubmit={getTop100Results} />
        <Top100AlbumList top100={search.top100} />
      </Container>
    );
  }
  if (search.top100Query.list === 'track_id') {
    return (
      <Container>
        <Header style={{ display: 'inline' }}>Top 100</Header>
        <p>
          Get the top 100 most played tracks, albums or artists within a time
          period.
        </p>
        <Top100SearchForm onSubmit={getTop100Results} />
        <Top100TrackList top100={search.top100} />
      </Container>
    );
  }
  return null;
};

export default Top100;
