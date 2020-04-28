import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Container, Grid, Popup, Icon } from 'semantic-ui-react';
import CreateNewReportForm from './CreateNewReportForm';
import { createReport } from '../../../store/report/actions';
import { setNotification } from '../../../store/notification/actions';
import { ApplicationState } from '../../../store/types';
import { CreateNewReportFormTypes } from '../../../store/report/types';

const CreateNewReport: React.FC = () => {
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();

  const program = useSelector((state: ApplicationState) => state.program);
  const login = useSelector((state: ApplicationState) => state.login);

  const programOptions = program.activePrograms.map((program) => ({
    key: program.id,
    label: program.name,
    value: program.id,
  }));

  const submitNewReport = (values: CreateNewReportFormTypes) => {
    console.log('submit new report values', values);
    const reportToCreate = {
      ...values,
      program_id: Number(values.program_id),
      program_name: program.activePrograms.find(
        (pgm) => pgm.id === Number(values.program_id)
      )?.name,
    };
    console.log('report to create values', reportToCreate);
    dispatch(
      setNotification(
        `Created new report for the program ${reportToCreate.program_name} `,
        'success'
      )
    );
    dispatch(createReport(reportToCreate));
  };

  return (
    <Grid.Column>
      <Container>
        <Header>Create a new report</Header>
        <CreateNewReportForm
          onSubmit={submitNewReport}
          currentUser={login.currentUser}
          programOptions={programOptions}
        />
      </Container>
    </Grid.Column>
  );
};

export default CreateNewReport;
