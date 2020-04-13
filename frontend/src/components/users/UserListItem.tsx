import React from 'react';
import { Table, Icon, Confirm } from 'semantic-ui-react';
import { LoginState } from '../../store/login/types';
import { User } from '../../store/user/types';

interface Props {
  user: User;
}

const UserListItem: React.FC<Props> = ({ user }) => {
  let userLevelOutPrint;
  if (user.level === 1) {
    userLevelOutPrint = 'DJ';
  } else if (user.level === 2) {
    userLevelOutPrint = 'Toimitus';
  } else {
    userLevelOutPrint = 'Admin';
  }

  let className;
  let userStatusOutPrint;
  if (user.status === null) {
    userStatusOutPrint = 'Hyllyllä';
    className = 'inactive-user';
  } else if (user.status === 1) {
    userStatusOutPrint = 'Käytössä';
    className = 'active-user';
  }

  return (
    <Table.Row>
      <Table.Cell>
        {/* <EditUserModal user={user} /> */}
        {user.username}
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
        <Icon color='red' name='delete' />

        {/* <Icon color='red' onClick={() => setOpen(true)} name='delete' />
        <Confirm
          content={`Haluatko varmasti poistaa käyttäjän ${user.username}?`}
          open={open}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
          cancelButton='En sittenkään'
          confirmButton='Joo kyl'
        /> */}
      </Table.Cell>
    </Table.Row>
  );
};

export default UserListItem;
