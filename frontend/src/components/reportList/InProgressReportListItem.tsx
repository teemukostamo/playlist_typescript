import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Table, Icon, Confirm } from 'semantic-ui-react';
import { deleteInProgressReport } from '../../store/reportList/actions';
import { setNotification } from '../../store/notification/actions';

import { Report } from '../../store/reportList/types';
import { ApplicationState } from '../../store/types';

interface Props {
  report: Report;
}

const InProgressReportListItem: React.FC<Props> = ({ report }) => {
  const dispatch = useDispatch();
  const login = useSelector((state: ApplicationState) => state.login);
  const [open, setOpen] = useState(false);

  const cancelDelete = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    setOpen(false);
    const params = {
      report_id: report.id,
      user_id: login.currentUser?.id,
    };
    dispatch(deleteInProgressReport(params));
    dispatch(
      setNotification(
        `${report.name} ${report.program_date} poistettu!`,
        'success'
      )
    );
  };

  return (
    <React.Fragment>
      <Table.Row>
        <Table.Cell>
          <Link to={`reports/${report.id}`}>{report.name}</Link>
        </Table.Cell>
        <Table.Cell>
          {moment(report.program_date).format('DD.MM.YYYY')}
        </Table.Cell>
        <Table.Cell>{report.program_no}</Table.Cell>
        <Table.Cell>
          {' '}
          <Icon color='red' onClick={() => setOpen(true)} name='delete' />
          <Confirm
            content={`Are you sure you wish to delete ${report.name} ${report.program_date}`}
            open={open}
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
            cancelButton='Nope'
            confirmButton='Sure'
          />
        </Table.Cell>
      </Table.Row>
    </React.Fragment>
  );
};

export default InProgressReportListItem;
