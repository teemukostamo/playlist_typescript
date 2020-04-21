import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { getOneAlbum, updateAlbum } from '../../store/album/actions';
import { setNotification } from '../../store/notification/actions';
import AlbumDetailsForm from './AlbumDetailsForm';
import TracksInAnAlbum from './TracksInAnAlbum';
// import AddTrackToAlbum from './AddTrackToAlbum';

import { ApplicationState } from '../../store/types';
import { UpdateAlbumParams } from '../../store/album/types';

interface Props {
  id: number;
}

const Album: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const album = useSelector((state: ApplicationState) => state.album);
  console.log(album);
  const report = useSelector((state: ApplicationState) => state.report);
  console.log(report);
  useEffect(() => {
    dispatch(getOneAlbum(id));
    // eslint-disable-next-line
  }, [id]);

  if (album.currentAlbum === null) {
    return (
      <Container>
        <Dimmer>
          <Loader>Ladataan...</Loader>
        </Dimmer>
      </Container>
    );
  }

  const updateAlbumDetails = (values: UpdateAlbumParams) => {
    const albumToUpdate = {
      ...values,
      year: values.year.toString(),
    };
    dispatch(updateAlbum(albumToUpdate));
    dispatch(setNotification(`Artist ${values.name} updated!`, 'success'));
  };

  return (
    <Container>
      {/* <AddTrackToAlbum album={album.currentAlbum} report={report} /> */}
      {/*
       */}
      <AlbumDetailsForm
        onSubmit={updateAlbumDetails}
        currentAlbum={album.currentAlbum}
      />
      <TracksInAnAlbum tracklist={album.tracklist} />
    </Container>
  );
};

export default Album;
