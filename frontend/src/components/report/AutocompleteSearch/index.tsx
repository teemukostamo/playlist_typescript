import React, { useState, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addTrackToReport } from '../../../store/report/actions';
import { setNotification } from '../../../store/notification/actions';
import { Form, Search, Button, Header } from 'semantic-ui-react';

import AddAndReportNewTrack from './AddAndReportNewTrack';
import { useSearchTracksHook } from '../../../hooks/searchTracksHook';

import { ApplicationState } from '../../../store/types';
import { AutocompleteResultType } from '../../../store/report/types';

interface NewTrackToReportType {
  track_id: number;
  report_id?: number;
  length: number;
  sortable_rank: number;
}

interface ResultDisplay {
  track_id: number;
  track_title: string;
  artist: string;
  album: string;
  length: number;
}

const AutocompleteSearch: React.FC = () => {
  const [trackToSave, setTrackToSave] = useState<NewTrackToReportType | null>(
    null
  );
  const [redirect, setRedirect] = useState(false);
  const { setInputText, search } = useSearchTracksHook();

  const report = useSelector((state: ApplicationState) => state.report);
  const dispatch = useDispatch();

  const handleResultSelect = (
    _e: MouseEvent,
    { result }: AutocompleteResultType
  ) => {
    const newTrackToReport = {
      track_id: result.value,
      report_id: report.reportDetails?.id,
      length: result.length,
      sortable_rank: report.report.length + 1,
    };
    setTrackToSave(newTrackToReport);
  };

  const saveClick = () => {
    if (!trackToSave) {
      dispatch(setNotification('Please select a track to add!', 'fail'));
    } else {
      dispatch(addTrackToReport(trackToSave));
      setTrackToSave(null);
    }
  };

  let results;
  if (search.result === undefined) {
    results = [];
  } else {
    results = search.result.map((result: ResultDisplay) => ({
      key: result.track_id,
      title: result.track_title,
      description: `${result.artist}:
                    ${result.album}`,
      length: result.length,
      value: result.track_id,
    }));
  }

  const goToAdvancedSearch = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to='/search' />;
  }
  return (
    <div style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
      <Form>
        <Header>Search</Header>
        <Form.Group>
          <Form.Field width={8}>
            <Search
              loading={search.loading}
              onResultSelect={handleResultSelect}
              onSearchChange={(e) =>
                setInputText((e.target as HTMLInputElement).value)
              }
              onSelectionChange={handleResultSelect}
              results={results}
              style={{ cursor: 'pointer' }}
            />
          </Form.Field>
          <Form.Field width={8}>
            <Button color='green' onClick={saveClick}>
              Add to report
            </Button>
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field width={8}>
            {' '}
            <Button onClick={goToAdvancedSearch} color='blue'>
              Advanced search
            </Button>
          </Form.Field>
          <Form.Field width={6}>
            {' '}
            <AddAndReportNewTrack
              report_id={report.reportDetails?.id}
              sortable_rank={report.report.length + 1}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AutocompleteSearch;
