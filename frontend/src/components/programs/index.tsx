import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../../store/types';
import { AddProgramFormValues } from '../../store/program/types';
import { Button, Icon, Container } from 'semantic-ui-react';
import { getAllPrograms, createNewProgram } from '../../store/program/actions';
import ProgramList from './ProgramList';
import AddProgramModal from './AddProgramModal';

const Programs: React.FC = () => {
  const programs = useSelector((state: ApplicationState) => state.program);
  const login = useSelector((state: ApplicationState) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPrograms());
    // eslint-disable-next-line
  }, []);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  console.log(modalOpen);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewProgram = (values: AddProgramFormValues) => {
    try {
      const programToAdd = {
        ...values,
        display: Number(values.display),
        site: Number(values.site),
      };
      console.log(programToAdd);
      dispatch(createNewProgram(programToAdd));
      // dispatch(setNotification(`User ${values.username} created!`, 'success'));
      console.log('adding program', programToAdd);
      closeModal();
    } catch (e) {
      // dispatch(setNotification('Failed to create user!', 'fail'));
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <Container>
      <Button
        floated='right'
        color='green'
        style={{ marginBottom: '0.5rem' }}
        onClick={() => openModal()}
      >
        <Icon name='add' />
        Create a new program
      </Button>
      <AddProgramModal
        modalOpen={modalOpen}
        onSubmit={submitNewProgram}
        error={error}
        onClose={closeModal}
        login={login}
      />
      <ProgramList program={programs} login={login} />
    </Container>
  );
};

export default Programs;
