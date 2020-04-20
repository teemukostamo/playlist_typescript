import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Dimmer, Loader } from 'semantic-ui-react';
import CreateNewReportForm from '../../report/CreateNewReportForm';
import InProgressReportsList from '../../reportList/InProgressReportList';
import { getAllInProgress } from '../../../store/reportList/actions';

import { ApplicationState } from '../../../store/types';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const reportList = useSelector((state: ApplicationState) => state.reportList);
  const program = useSelector((state: ApplicationState) => state.program);
  const login = useSelector((state: ApplicationState) => state.login);
  console.log(reportList);
  useEffect(() => {
    dispatch(getAllInProgress(login.currentUser?.id));
    // eslint-disable-next-line
  }, []);
  if (program.activePrograms === null) {
    return (
      <Container>
        <h2>Playlist reporting</h2>
        <Dimmer active>
          <Loader>Loading active programs...</Loader>
        </Dimmer>{' '}
      </Container>
    );
  }
  return (
    <Container>
      <h2>Playlist reporting</h2>
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <CreateNewReportForm />
          <InProgressReportsList inProgress={reportList.inProgress} />
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Home;
