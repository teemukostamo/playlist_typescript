import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { ReportDetails } from '../../../store/report/types';

interface Props {
  reportDetails: ReportDetails | null;
}

const CurrentReport: React.FC<Props> = ({ reportDetails }) => {
  if (!reportDetails) {
    return null;
  }
  return (
    <div
      style={{
        display: 'inline',
        color: 'white',
        float: 'right',
        marginTop: 'auto',
        marginRight: '0.6rem',
        marginBottom: '0.7rem',
      }}
    >
      <Link to={`/reports/${reportDetails.id}`}>
        {reportDetails.program_name} <br />
        {moment(reportDetails.program_date).format('DD.MM.YYYY')}{' '}
        {reportDetails.program_start_time.slice(0, -3)} -{' '}
        {reportDetails.program_end_time.slice(0, -3)}
      </Link>
    </div>
  );
};

export default CurrentReport;
