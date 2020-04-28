import React, { useState } from 'react';
import { Modal, Segment, Button, Icon } from 'semantic-ui-react';
import AddTrackForm from './AddTrackForm';
import { AddNewTrackFormValuesType } from '../../../store/track/types';

const AddTrackModal: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const submitNewTrack = (values: AddNewTrackFormValuesType) => {
    console.log(values);
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
        <Modal.Header>Add a new program</Modal.Header>
        <Modal.Content>
          {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
          <AddTrackForm onSubmit={submitNewTrack} onCancel={closeModal} />
        </Modal.Content>
      </Modal>
    </React.Fragment>
  );
};

export default AddTrackModal;
