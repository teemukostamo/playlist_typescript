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
    const length = Number(values.minutes) * 60 + Number(values.seconds);
    let regexPeople;
    if (values.people) {
      regexPeople = `| ${values.people.replace(/\n/g, ' | ')} |`;
    } else {
      regexPeople = null;
    }
    console.log(values);
    const trackToAdd = {
      track_title: values.track_title,
      artist_name: currentAlbum.artist_name,
      album_name: currentAlbum.album_name,
      album_id: currentAlbum.album_id,
      artist_id: currentAlbum.artist_id,
      length,
      country: values.country,
      cat_id: currentAlbum.cat_id,
      label: currentAlbum.label,
      year: currentAlbum.year,
      record_country: values.record_country,
      people: regexPeople,
      disc_no: Number(values.disc_no),
      track_no: Number(values.track_no),
      isrc: values.isrc,
      comment: values.comment,
    };
    console.log(trackToAdd);
    dispatch(addTrackToAlbum(trackToAdd));
    dispatch(
      setNotification(
        `${values.track_title} added to ${currentAlbum.album_name}`,
        'success'
      )
    );
    handleClose();
  };

  const handleAddToAlbumAndReportClick = (
    values: AddNewTrackToAlbumFormValuesType
  ) => {
    const length = Number(values.minutes) * 60 + Number(values.seconds);
    let regexPeople;
    if (values.people) {
      regexPeople = `| ${values.people.replace(/\n/g, ' | ')} |`;
    } else {
      regexPeople = null;
    }
    console.log(values);
    const trackToAdd = {
      track_title: values.track_title,
      artist_name: currentAlbum.artist_name,
      album_name: currentAlbum.album_name,
      album_id: currentAlbum.album_id,
      artist_id: currentAlbum.artist_id,
      length,
      country: values.country,
      cat_id: currentAlbum.cat_id,
      label: currentAlbum.label,
      year: currentAlbum.year,
      record_country: values.record_country,
      people: regexPeople,
      disc_no: Number(values.disc_no),
      track_no: Number(values.track_no),
      isrc: values.isrc,
      comment: values.comment,
      report_id: report.reportDetails?.id,
      sortable_rank: report.report.length + 1,
    };
    console.log('add to album and', trackToAdd);
    dispatch(addTrackToAlbumAndReport(trackToAdd));
    dispatch(
      setNotification(
        `${values.track_title} added to ${currentAlbum.album_name} and to ${report.reportDetails?.program_name} ${report.reportDetails?.program_date}`,
        'success'
      )
    );
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
