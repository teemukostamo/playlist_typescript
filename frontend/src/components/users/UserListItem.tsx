import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, Icon, Confirm } from 'semantic-ui-react';

import { updateUser, deleteUser } from '../../store/user/actions';
import { setNotification } from '../../store/notification/actions';

import EditUserModal from './EditUserModal';

import { EditUserFormValues } from '../../store/user/types';
import { User } from '../../store/user/types';

interface Props {
  user: User;
}

const UserListItem: React.FC<Props> = ({ user }) => {
  const dispatch = useDispatch();
  const [openDeleteUser, setDeleteUserOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const cancelDelete = () => {
    setDeleteUserOpen(false);
  };
  const confirmDelete = () => {
    setDeleteUserOpen(false);
    dispatch(deleteUser(user.id));
    // setNotificationConnect(`Käyttäjä ${user.username} poistettu!`, 'success')
  };

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitUpdatedUser = (values: EditUserFormValues) => {
    try {
      const userToUpdate = {
        ...values,
        id: user.id,
      };
      dispatch(updateUser(userToUpdate));
      dispatch(
        setNotification(
          `${userToUpdate.first_name} ${userToUpdate.last_name} updated!`,
          'success'
        )
      );
      console.log('updating user', userToUpdate);
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  let userLevelOutPrint;
  if (user.level === 1) {
    userLevelOutPrint = 'DJ';
  } else if (user.level === 2) {
    userLevelOutPrint = 'Staff';
  } else {
    userLevelOutPrint = 'Admin';
  }

  let className;
  let userStatusOutPrint;
  if (user.status === null || user.status === 0) {
    userStatusOutPrint = 'Inactive';
    className = 'inactive-user';
  } else if (user.status === 1) {
    userStatusOutPrint = 'Active';
    className = 'active-user';
  }

  return (
    <Table.Row>
      <Table.Cell>
        <EditUserModal
          user={user}
          modalOpen={modalOpen}
          onSubmit={submitUpdatedUser}
          error={error}
          onClose={closeModal}
        />
        <button
          style={{ border: 'none', cursor: 'pointer', color: 'blue' }}
          onClick={openModal}
        >
          {user.username}
        </button>
      </Table.Cell>
      <Table.Cell>
        {user.first_name} {user.last_name}
      </Table.Cell>
      {/* <Table.Cell>
        <Moment format='MMMM Do YYYY, h:mm:ss a'>{user.last_seen}</Moment>
      </Table.Cell> */}
      <Table.Cell>{user.last_seen}</Table.Cell>
      <Table.Cell className={className}>{userStatusOutPrint}</Table.Cell>
      <Table.Cell>{userLevelOutPrint}</Table.Cell>
      <Table.Cell>
        <Icon
          color='red'
          onClick={() => setDeleteUserOpen(true)}
          name='delete'
        />
        <Confirm
          content={`Are you sure you wish to delete user ${user.username}?`}
          open={openDeleteUser}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
          cancelButton='Cancel delete'
          confirmButton='Confirm delete'
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default UserListItem;
