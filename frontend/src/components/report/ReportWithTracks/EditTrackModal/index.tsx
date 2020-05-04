import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Segment, Icon } from 'semantic-ui-react';
import EditTrackModalForm from './EditTrackModalForm';
import { setNotification } from '../../../../store/notification/actions';
import { updateTrack } from '../../../../store/track/actions';

import { ReportItem } from '../../../../store/report/types';
import { UpdateReportTrackFormValuesType } from '../../../../store/track/types';

interface Props {
  track: ReportItem;
}

const EditTrackModal: React.FC<Props> = ({ track }) => {
  console.log(track);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const submitUpdatedTrack = (values: UpdateReportTrackFormValuesType) => {
    const length = Number(values.minutes) * 60 + Number(values.seconds);
    let regexPeople;
    if (values.people) {
      regexPeople = `| ${values.people.replace(/\n/g, ' | ')} |`;
    } else {
      regexPeople = null;
    }
    console.log(values);
    const trackToUpdate = {
      artist_name: values.artist,
      album_name: values.album,
      track_title: values.track_title,
      track_id: Number(values.track_id),
      length,
      country: Number(values.country),
      record_country: values.record_country,
      people: regexPeople,
      disc_no: Number(values.disc_no),
      track_no: Number(values.track_no),
      year: values.year?.toString(),
      label: values.label,
      cat_id: values.cat_id,
      isrc: values.isrc,
      comment: null,
      user_id: null,
      artist_id: Number(values.artist_id),
      album_id: Number(values.album_id),
      sortable_rank: Number(values.sortable_rank),
      report_track_id: Number(values.report_track_id),
    };
    dispatch(updateTrack(trackToUpdate));
    dispatch(
      setNotification(
        `${trackToUpdate.track_title} by ${trackToUpdate.artist_name} has been updated!`,
        'success'
      )
    );
    setModalOpen(false);
  };
  return (
    <React.Fragment>
      <Icon
        style={{ cursor: 'pointer' }}
        color='blue'
        onClick={() => openModal()}
        name='edit'
      />
      <Modal open={modalOpen} onClose={closeModal} centered={false} closeIcon>
        <Modal.Header>Edit track info</Modal.Header>
        <Modal.Content>
          {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
          <EditTrackModalForm
            onSubmit={submitUpdatedTrack}
            onCancel={closeModal}
            track={track}
          />
        </Modal.Content>
      </Modal>
    </React.Fragment>
  );
};

export default EditTrackModal;
