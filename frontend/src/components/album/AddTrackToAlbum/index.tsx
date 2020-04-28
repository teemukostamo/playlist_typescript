import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Header, Button, Icon } from 'semantic-ui-react';
import {
  addTrackToAlbum,
  addTrackToAlbumAndReport,
} from '../../../store/track/actions';
import { setNotification } from '../../../store/notification/actions';
import {
  AddTrackToDbAndReportType,
  AddTrackToDbType,
  AddNewTrackToAlbumFormValuesType,
} from '../../../store/track/types';
import { Album } from '../../../store/album/types';
import { ReportState } from '../../../store/report/types';

import AddTrackToAlbumForm from './AddTrackToAlbumForm';

interface Props {
  currentAlbum: Album;
  report: ReportState;
}

const AddTrackToAlbum: React.FC<Props> = ({ currentAlbum, report }) => {
  const dispatch = useDispatch();
  console.log('album at album details', currentAlbum);
  console.log('report at album details', report);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const handleAddToAlbumClick = (values: AddNewTrackToAlbumFormValuesType) => {
    console.log(values);
    handleClose();
  };

  const handleAddToAlbumAndReportClick = (
    values: AddNewTrackToAlbumFormValuesType
  ) => {
    console.log(values);
    handleClose();
  };
  return (
    <Modal
      trigger={
        <Button
          style={{ marginBottom: '0.5rem' }}
          onClick={handleOpen}
          floated='right'
          color='green'
        >
          <Icon name='add' />
          Add a track to the album
        </Button>
      }
      closeIcon
      open={modalOpen}
      onClose={handleClose}
    >
      <Modal.Content>
        <Header content={`Add a track to album ${currentAlbum.album_name}`} />
        <AddTrackToAlbumForm
          onClose={handleClose}
          onSubmit={handleAddToAlbumClick}
          reportDetails={report.reportDetails}
          currentAlbum={currentAlbum}
          addToAlbumAndReport={handleAddToAlbumAndReportClick}
        />
      </Modal.Content>
    </Modal>
  );
};

export default AddTrackToAlbum;
