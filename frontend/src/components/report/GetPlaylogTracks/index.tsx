import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Header } from 'semantic-ui-react';
import { getPlaylogTracks, getOneReport } from '../../../store/report/actions';
import { ApplicationState } from '../../../store/types';
import { PlaylogParams } from '../../../store/report/types';

import GetPlaylogForm from './GetPlaylogForm';

const GetPlaylogTracks: React.FC = () => {
  const dispatch = useDispatch();
  const report = useSelector((state: ApplicationState) => state.report);

  const submitGetplaylogTracks = (values: PlaylogParams) => {
    const searchParams = {
      studioId: values.studioId,
      date: moment(values.date).format('YYYY-MM-DD'),
      startTime: values.startTime,
      endTime: values.endTime,
      report_id: report.reportDetails?.id || 0,
      sortable_rank_start: report.report.length,
    };
    console.log('get playlog params', searchParams);
    dispatch(getPlaylogTracks(searchParams));
  };

  return (
    <React.Fragment>
      <Header>Get tracks from playlog</Header>
      <div style={{ color: 'red', marginBottom: '2rem' }}>
        In the demo app playlog data is only available on dates between
        2020-03-01 - 2020-03-31
      </div>
      <GetPlaylogForm
        onSubmit={submitGetplaylogTracks}
        reportDetails={report.reportDetails}
        sortable_rank_start={report.report.length}
      />
    </React.Fragment>
  );
};

export default GetPlaylogTracks;
