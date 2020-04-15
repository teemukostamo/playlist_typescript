import React from 'react';
import { Container, Dimmer, Loader, Table } from 'semantic-ui-react';
import { LoginState } from '../../store/login/types';
import { Users, User } from '../../store/user/types';

import UserListItem from './UserListItem';

interface Props {
  login: LoginState;
  users: Users;
}

const UserList: React.FC<Props> = ({ login, users }) => {
  if (login.currentUser?.level === 3) {
    return (
      <Container>
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <h3 style={{ display: 'inline' }}>Users</h3>
        </div>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Username</Table.Cell>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>Latest login</Table.Cell>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>Level</Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user: User) => (
              <UserListItem user={user} key={user.id} />
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
  return null;
};

export default UserList;
