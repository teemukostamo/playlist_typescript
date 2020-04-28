import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import {
  getOneTrack,
  getOneTrackHistory,
  updateTrack,
} from '../../store/track/actions';
import { setNotification } from '../../store/notification/actions';

import TrackDetailsForm from './TrackDetailsForm';
import PlayHistory from './PlayHistory';

import { ApplicationState } from '../../store/types';
import {
  UpdateTrackType,
  UpdateTrackFormValuesType,
} from '../../store/track/types';

interface Props {
  id: number;
}

const Track: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const track = useSelector((state: ApplicationState) => state.track);
  const login = useSelector((state: ApplicationState) => state.login);
  const report = useSelector((state: ApplicationState) => state.report);
  useEffect(() => {
    dispatch(getOneTrack(id));
    dispatch(getOneTrackHistory(id));
    // eslint-disable-next-line
  }, []);

  if (track.currentTrack === null || track.playHistory.length === 0) {
    return (
      <Container>
        <Dimmer>
          <Loader>Ladataan...</Loader>
        </Dimmer>
      </Container>
    );
  }

  const submitUpdateTrack = (values: UpdateTrackFormValuesType) => {
    let regexPeople;
    if (values.people) {
      regexPeople = `| ${values.people.replace(/\n/g, ' | ')} |`;
    } else {
      regexPeople = null;
    }
    const trackToUpdate = {
      artist_name: values.artist,
      album_name: values.album,
      track_title: values.track_title,
      track_id: values.track_id,
      length: values.minutes * 60 + values.seconds,
      country: values.country,
      record_country: values.record_country,
      people: regexPeople,
      disc_no: values.disc_no,
      track_no: values.track_no,
      year: values.year?.toString(),
      label: values.label,
      cat_id: values.cat_id,
      isrc: values.isrc,
      comment: values.comment,
      user_id: login.currentUser?.id,
      artist_id: values.artist_id,
      album_id: values.album_id,
      sortable_rank: null,
      report_track_id: null,
    };

    console.log('track to update', trackToUpdate);
    dispatch(updateTrack(trackToUpdate));
    dispatch(
      setNotification(`Track ${values.track_title} updated!`, 'success')
    );
  };

  return (
    <Container>
      <TrackDetailsForm
        onSubmit={submitUpdateTrack}
        currentTrack={track.currentTrack}
      />
      <PlayHistory playHistory={track.playHistory} />
    </Container>
  );
};

export default Track;
