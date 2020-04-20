import React from 'react';
import { Table, Grid, Container, Header } from 'semantic-ui-react';
import InProgressReportListItem from './InProgressReportListItem';
import { Report } from '../../store/reportList/types';

interface Props {
  inProgress: Array<Report>;
}

const InProgressReportList: React.FC<Props> = ({ inProgress }) => {
  console.log(inProgress);
  if (inProgress === null) {
    return null;
  }
  if (inProgress.length === 0) {
    return (
      <Grid.Column>
        <Container>
          <h3>Reports in progress</h3>
          no reports in progress
        </Container>
      </Grid.Column>
    );
  }
  return (
    <React.Fragment>
      <Grid.Column>
        <Container>
          <Header>Reports in progress</Header>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.Cell>Program name</Table.Cell>
                <Table.Cell>Date</Table.Cell>
                <Table.Cell>Number</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {inProgress.map((r) => (
                <InProgressReportListItem key={r.id} report={r} />
              ))}
            </Table.Body>
          </Table>
        </Container>
      </Grid.Column>
    </React.Fragment>
  );
};

export default InProgressReportList;
