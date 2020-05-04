import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import ReportDetailsForm from './ReportDetailsForm';
import { updateReport, copyReport } from '../../../store/report/actions';
import { setNotification } from '../../../store/notification/actions';
import { ReportDetails } from '../../../store/report/types';
import { ApplicationState } from '../../../store/types';

const ReportDetailsIndex: React.FC = () => {
  const dispatch = useDispatch();
  const report = useSelector((state: ApplicationState) => state.report);
  const user = useSelector((state: ApplicationState) => state.user);
  const program = useSelector((state: ApplicationState) => state.program);
  const login = useSelector((state: ApplicationState) => state.login);
  const [rerun, setRerun] = useState<number | null | undefined>(
    report.reportDetails?.rerun
  );
  const [redirect, setRedirect] = useState<boolean>(false);

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
    dispatch(updateReport(reportToUpdate));
    dispatch(setNotification('Report details updated', 'success'));
  };

  const duplicateReportClick = (values: ReportDetails) => {
    const reportToDuplicate = {
      program_name: values.program_name,
      program_no: values.program_no,
      program_dj: values.program_dj,
      program_date: values.program_date,
      program_start_time: values.program_start_time,
      program_end_time: values.program_end_time,
      program_id: values.program_id,
      rerun,
      status: values.status,
      user_id: values.user_id,
      username: values.username,
      first_name: values.first_name,
      last_name: values.last_name,
    };
    dispatch(copyReport(reportToDuplicate, report.report));
    dispatch(setNotification('Report duplicated!', 'success'));
    setRedirect(true);
    setTimeout(() => {
      setRedirect(false);
    }, 300);
  };

  if (redirect && report.newReport !== null) {
    return <Redirect to={`../reports/${report.newReport.id}`} />;
  }

  return (
    <div>
      <ReportDetailsForm
        reportDetails={report.reportDetails}
        onSubmit={saveChanges}
        programOptions={programOptions}
        userOptions={userOptions}
        onRerunChange={getRerun}
        rerun={rerun}
        duplicateReportClick={duplicateReportClick}
        currentUser={login.currentUser}
      />
    </div>
  );
};

export default ReportDetailsIndex;
