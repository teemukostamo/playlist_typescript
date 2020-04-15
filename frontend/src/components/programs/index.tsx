import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../../store/types';
import { Button, Icon, Container } from 'semantic-ui-react';
import { getAllPrograms } from '../../store/program/actions';
import ProgramList from './ProgramList';

const Programs: React.FC = () => {
  const programs = useSelector((state: ApplicationState) => state.program);
  const login = useSelector((state: ApplicationState) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPrograms());
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Button
        floated='right'
        color='green'
        style={{ marginBottom: '0.5rem' }}
        // onClick={() => openModal()}
      >
        <Icon name='add' />
        Create a new program
      </Button>
      {/* <AddUserModal
        modalOpen={modalOpen}
        onSubmit={submitNewUser}
        error={error}
        onClose={closeModal}
      />
      <UserList users={users.users} login={login} /> */}
      <ProgramList program={programs} login={login} />
    </Container>
  );
};

export default Programs;
