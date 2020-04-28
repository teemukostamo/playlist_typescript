import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import AutocompleteSearch from '../AutocompleteSearch';
import GetPlaylogTracks from '../GetPlaylogTracks';

const AddTracksToReport: React.FC = () => {
  return (
    <React.Fragment>
      <Header>Add a track to the report:</Header>
      <Segment.Group horizontal>
        <Segment>
          <AutocompleteSearch />
        </Segment>
        <Segment>
          <GetPlaylogTracks />
        </Segment>
      </Segment.Group>
    </React.Fragment>
  );
};

export default AddTracksToReport;
