import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
// import MergeAlbumTracksModal from './MergeAlbumTracksModal';
// import AddToCurrentReport from '../track/AddToCurrentReport';
import AddTrackToCurrentReport from '../track/AddTrackToCurrentReport';

import { TracklistItem } from '../../store/album/types';

interface Props {
  track: TracklistItem;
}

const TracksInAnAlbumItem: React.FC<Props> = ({ track }) => {
  return (
    <Table.Row>
      <Table.Cell>
        {/* <MergeAlbumTracksModal
          track_id={track.track_id}
          track_title={track.track_title}
        /> */}
        merge album tracks modal here
      </Table.Cell>
      <Table.Cell>
        <Link to={`/track/${track.track_id}`}>
          {track.artist_name} - {track.track_title}{' '}
        </Link>
      </Table.Cell>
      <Table.Cell>
        {track.track_no} / {track.disc_no}
      </Table.Cell>
      <Table.Cell>{track.isrc}</Table.Cell>
      <Table.Cell>{track.report_occurrence}</Table.Cell>
      <Table.Cell>
        <AddTrackToCurrentReport
          track_title={track.track_title}
          track_id={track.track_id}
          length={track.length}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default TracksInAnAlbumItem;
