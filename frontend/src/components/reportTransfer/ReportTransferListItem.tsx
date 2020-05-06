import React from 'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment';
import { downloadReport } from '../../store/reportList/services';
import { ReportTransfer } from '../../store/reportList/types';

interface Props {
  item: ReportTransfer;
}

const RepotTransferListItem: React.FC<Props> = ({ item }) => {
  console.log(item);
  const downloadTransfer = (filename: string) => {
    downloadReport(filename);
  };

  return (
    <Table.Row>
      <Table.Cell>{item.created_at}</Table.Cell>
      <Table.Cell>
        {item.first_name} {item.last_name}
      </Table.Cell>
      <Table.Cell>{moment(item.period).format('MM/YYYY')}</Table.Cell>
      <Table.Cell>
        <button
          type='button'
          className='link-btn'
          onClick={() => downloadTransfer(item.filename)}
        >
          {item.filename}
        </button>
      </Table.Cell>
    </Table.Row>
  );
};

export default RepotTransferListItem;
