import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { Button, Icon, Container } from 'semantic-ui-react';
import UserList from './UserList';
import AddUserModal from './AddUserModal';
import { AddUserFormValues } from '../../store/user/types';

const Users: React.FC = () => {
  const users = useSelector((state: ApplicationState) => state.user);
  const login = useSelector((state: ApplicationState) => state.login);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewUser = async (values: AddUserFormValues) => {
    try {
      // const { data: newPatient } = await axios.post<Patient>(
      //   `${apiBaseUrl}/patients`,
      //   values
      // );
      // dispatch(addPatient(newPatient));
      console.log('adding user', values);
      closeModal();
    } catch (e) {
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
        Add a new user
      </Button>
      <AddUserModal
        modalOpen={modalOpen}
        onSubmit={submitNewUser}
        error={error}
        onClose={closeModal}
      />
      <UserList users={users.users} login={login} />
    </Container>
  );
};

export default Users;
