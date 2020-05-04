import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Segment, Button } from 'semantic-ui-react';
import AddAndReportNewTrackForm from './AddAndReportNewTrackForm';
import { setNotification } from '../../../../store/notification/actions';
import { addNewTrack } from '../../../../store/track/actions';
import { AddNewTrackFormValuesType } from '../../../../store/track/types';

interface Props {
  report_id: number | undefined;
  sortable_rank: number;
}

const AddAndReportNewTrack: React.FC<Props> = ({
  report_id,
  sortable_rank,
}) => {
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
      report_id,
      sortable_rank,
    };
    dispatch(addNewTrack(trackToSave));
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
        color='blue'
        style={{ marginBottom: '0.5rem' }}
        onClick={() => openModal()}
      >
        Add new track
      </Button>
      <Modal open={modalOpen} onClose={closeModal} centered={false} closeIcon>
        <Modal.Header>Add a new track</Modal.Header>
        <Modal.Content>
          {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
          <AddAndReportNewTrackForm
            onSubmit={submitNewTrack}
            onCancel={closeModal}
          />
        </Modal.Content>
      </Modal>
    </React.Fragment>
  );
};

export default AddAndReportNewTrack;
