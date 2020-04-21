import React from 'react';
import { Container, Dimmer, Loader, Table } from 'semantic-ui-react';
import { LoginState } from '../../store/login/types';
import { ProgramState, Program } from '../../store/program/types';

import ProgramListItem from './ProgramListItem';

interface Props {
  login: LoginState;
  program: ProgramState;
}

const ProgramList: React.FC<Props> = ({ login, program }) => {
  if (program.allPrograms === null || program.loading === true) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size='medium'>Loading programs...</Loader>
        </Dimmer>
      </Container>
    );
  }
  if (login.currentUser?.level === 2 || login.currentUser?.level === 3) {
    return (
      <Container>
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <h3 style={{ display: 'inline' }}>Programs</h3>
        </div>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.Cell>ID</Table.Cell>
              <Table.Cell>Program name</Table.Cell>
              <Table.Cell>Additional info</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {program.allPrograms.map((program: Program) => (
              <ProgramListItem program={program} key={program.id} />
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
  return null;
};

export default ProgramList;
