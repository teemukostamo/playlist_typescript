import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import moment from 'moment';
import { updateReport } from '../../../store/report/actions';
import { setNotification } from '../../../store/notification/actions';
import ReportDetailsForm from './ReportDetailsForm';

import { ReportDetails } from '../../../store/report/types';
import { ApplicationState } from '../../../store/types';

// interface Props {
//   reportDetails: ReportDetails | null;
// }

const ReportDetailsIndex: React.FC = () => {
  const dispatch = useDispatch();
  const report = useSelector((state: ApplicationState) => state.report);
  const user = useSelector((state: ApplicationState) => state.user);
  const program = useSelector((state: ApplicationState) => state.program);
  const login = useSelector((state: ApplicationState) => state.login);

  if (
    report.reportDetails === null ||
    user.users === null ||
    program.allPrograms === null
  ) {
    return (
      <Segment>
        <div>loading...</div>
      </Segment>
    );
  }

  const programOptions = program.allPrograms.map((program) => ({
    key: program.id,
    label: program.name,
    value: program.id,
  }));
  const userOptions = user.users.map((user) => ({
    key: user.id,
    label: `${user.first_name} ${user.last_name}`,
    value: user.id,
  }));

  const saveChanges = (values: ReportDetails) => {
    console.log(values);
    dispatch(updateReport(values));
    dispatch(setNotification('Report details updated', 'success'));
  };

  // console.log(reportDetails);
  return (
    <div>
      <ReportDetailsForm
        reportDetails={report.reportDetails}
        onSubmit={saveChanges}
        programOptions={programOptions}
        userOptions={userOptions}
      />
    </div>
  );
};

export default ReportDetailsIndex;
