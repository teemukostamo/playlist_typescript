import React from 'react';
import { Container, Table, Dimmer, Loader } from 'semantic-ui-react';
import ReportTransferListItem from './ReportTransferListItem';

import { ReportTransfer } from '../../store/reportList/types';
import { CurrentUser } from '../../store/login/types';

interface Props {
  reportTransferList: Array<ReportTransfer>;
  currentUser: CurrentUser;
}

const ReportTransferList: React.FC<Props> = ({
  reportTransferList,
  currentUser,
}) => {
  if (reportTransferList === null) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size='medium'>Loading...</Loader>
        </Dimmer>
      </Container>
    );
  }
  if (currentUser.level === 3 || currentUser.level === 2) {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Cell>Date created</Table.Cell>
            <Table.Cell>Created by</Table.Cell>
            <Table.Cell>Transfer file period</Table.Cell>
            <Table.Cell>Transfer file</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {reportTransferList.map((item) => (
            <ReportTransferListItem key={item.id} item={item} />
          ))}
        </Table.Body>
      </Table>
    );
  }
  return null;
};

export default ReportTransferList;
