import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { updateReport } from '../../../store/report/actions';
import { setNotification } from '../../../store/notification/actions';
import ReportDetailsForm from './ReportDetailsForm';

import { ReportDetails } from '../../../store/report/types';
import { ApplicationState } from '../../../store/types';

const ReportDetailsIndex: React.FC = () => {
  const dispatch = useDispatch();
  const report = useSelector((state: ApplicationState) => state.report);
  const user = useSelector((state: ApplicationState) => state.user);
  const program = useSelector((state: ApplicationState) => state.program);
  const [rerun, setRerun] = useState<number | null | undefined>(
    report.reportDetails?.rerun
  );
  console.log(rerun);

  const getRerun = () => {
    if (!rerun) {
      setRerun(1);
    } else {
      setRerun(null);
    }
  };

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
    const reportToUpdate = {
      ...values,
      rerun,
    };
    console.log('report to update', reportToUpdate);
    dispatch(updateReport(reportToUpdate));
    dispatch(setNotification('Report details updated', 'success'));
  };

  return (
    <div>
      <ReportDetailsForm
        reportDetails={report.reportDetails}
        onSubmit={saveChanges}
        programOptions={programOptions}
        userOptions={userOptions}
        onRerunChange={getRerun}
        rerun={rerun}
      />
    </div>
  );
};

export default ReportDetailsIndex;
