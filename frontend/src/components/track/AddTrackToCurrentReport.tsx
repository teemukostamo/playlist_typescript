import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Popup } from 'semantic-ui-react';

import { setNotification } from '../../store/notification/actions';
import { addTrackToReport } from '../../store/report/actions';

import { ApplicationState } from '../../store/types';

interface Props {
  track_id: number;
  track_title: string;
  length: number;
}

const style = {
  borderRadius: 0,
  display: 'block',
  opacity: 0.9,
  padding: '2em',
};

const AddTrackToCurrentReport: React.FC<Props> = ({
  track_id,
  track_title,
  length,
}) => {
  const dispatch = useDispatch();
  const report = useSelector((state: ApplicationState) => state.report);

  if (!report.reportDetails) {
    return null;
  }
  const onAdd = () => {
    const trackToSave = {
      track_id,
      report_id: report.reportDetails?.id,
      length,
      sortable_rank: report.report.length + 1,
    };
    dispatch(addTrackToReport(trackToSave));
    dispatch(
      setNotification(
        `${track_title} added to ${report.reportDetails?.program_name}!`,
        'success'
      )
    );
  };
  return (
    <React.Fragment>
      <Popup
        trigger={
          <Icon
            style={{ cursor: 'pointer' }}
            color='green'
            onClick={onAdd}
            name='add'
          />
        }
        style={style}
        inverted
        basic
        content={`Add ${track_title} to ${report.reportDetails.program_name}`}
      />
    </React.Fragment>
  );
};

export default AddTrackToCurrentReport;
