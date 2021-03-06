import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Segment, Button, Icon } from 'semantic-ui-react';
import AddTrackForm from './AddTrackForm';
import { setNotification } from '../../../store/notification/actions';
import { addTrackToDb } from '../../../store/track/actions';
import { AddNewTrackFormValuesType } from '../../../store/track/types';

const AddTrackModal: React.FC = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const submitNewTrack = (values: AddNewTrackFormValuesType) => {
    const length = Number(values.minutes) * 60 + Number(values.seconds);
    const trackToSave = {
      ...values,
      length,
    };
    dispatch(addTrackToDb(trackToSave));
    dispatch(
      setNotification(
        `${trackToSave.track_title} by ${trackToSave.artist_name} has been added to database!`,
        'success'
      )
    );
    setModalOpen(false);
  };
  return (
    <React.Fragment>
      <Button
        floated='right'
        color='green'
        style={{ marginBottom: '0.5rem' }}
        onClick={() => openModal()}
      >
        <Icon name='add' />
        Add a new track
      </Button>
      <Modal open={modalOpen} onClose={closeModal} centered={false} closeIcon>
        <Modal.Header>Add a new track</Modal.Header>
        <Modal.Content>
          {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
          <AddTrackForm onSubmit={submitNewTrack} onCancel={closeModal} />
        </Modal.Content>
      </Modal>
    </React.Fragment>
  );
};

export default AddTrackModal;
