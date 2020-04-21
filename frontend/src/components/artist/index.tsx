import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { getOneArtist } from '../../store/artist/actions';
import { updateArtist } from '../../store/artist/actions';
import { setNotification } from '../../store/notification/actions';
import AlbumsByArtist from './AlbumsByArtist';
import ArtistDetailsForm from './ArtistDetailsForm';

import { ApplicationState } from '../../store/types';
import { UpdateArtistParams } from '../../store/artist/types';

interface Props {
  id: number;
}

const Artist: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const artist = useSelector((state: ApplicationState) => state.artist);

  useEffect(() => {
    dispatch(getOneArtist(id));
    // eslint-disable-next-line
  }, [id]);

  const updateArtistDetails = (values: UpdateArtistParams) => {
    dispatch(updateArtist(values));
    dispatch(setNotification(`Artist ${values.name} updated!`, 'success'));
  };

  if (artist.currentArtist === null) {
    return (
      <Container>
        <Dimmer>
          <Loader>Ladataan...</Loader>
        </Dimmer>
      </Container>
    );
  }

  return (
    <Container>
      <ArtistDetailsForm
        currentArtist={artist.currentArtist}
        onSubmit={updateArtistDetails}
      />
      <AlbumsByArtist albumList={artist.albumList} />
    </Container>
  );
};

export default Artist;
