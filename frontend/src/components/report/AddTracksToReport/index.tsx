import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

const AddTracksToReport: React.FC = () => {
  return (
    <React.Fragment>
      <Header>Add a track to the report:</Header>
      <Segment.Group horizontal>
        <Segment>
          {/* <SearchTrack /> */}
          get quick search tracks
        </Segment>
        <Segment>
          {/* <GetDjOnlineTracks /> */}
          get djonline tracks
        </Segment>
      </Segment.Group>
    </React.Fragment>
  );
};

export default AddTracksToReport;
