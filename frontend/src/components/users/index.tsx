import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../../store/types';
import { Button, Icon, Container } from 'semantic-ui-react';
import UserList from './UserList';
import AddUserModal from './AddUserModal';
import { AddUserFormValues } from '../../store/user/types';
import { createUser } from '../../store/user/actions';
import { setNotification } from '../../store/notification/actions';

const Users: React.FC = () => {
  const users = useSelector((state: ApplicationState) => state.user);
  const login = useSelector((state: ApplicationState) => state.login);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewUser = (values: AddUserFormValues) => {
    try {
      dispatch(createUser(values));
      dispatch(setNotification(`User ${values.username} created!`, 'success'));
      closeModal();
    } catch (e) {
      dispatch(setNotification('Failed to create user!', 'fail'));
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
