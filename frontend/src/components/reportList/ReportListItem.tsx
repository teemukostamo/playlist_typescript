import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Icon, Confirm, Responsive } from 'semantic-ui-react';
import moment from 'moment';
import { deleteReport } from '../../store/reportList/actions';
import { setNotification } from '../../store/notification/actions';
import { Report } from '../../store/reportList/types';

interface Props {
  loginLevel: number | undefined;
  report: Report;
}

const ReportListItem: React.FC<Props> = ({ loginLevel, report }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const cancelDelete = () => {
    setOpen(false);
  };
  const confirmDelete = () => {
    setOpen(false);
    dispatch(deleteReport(report.id));
    dispatch(
      setNotification(
        `${report.name} ${report.program_date} poistettu!`,
        'success'
      )
    );
  };
  let reportStatusOutPrint;
  let className;

  if (report.status === 1) {
    reportStatusOutPrint = 'Ready';
  } else if (report.status === 0) {
    reportStatusOutPrint = 'In progress';
  } else if (report.status === 9) {
    reportStatusOutPrint = 'Deleted';
    return null;
  }
  if (report.rerun === 1) {
    className = 'rerun';
  }

  if (loginLevel === 1 && report.rerun === 1) {
    return null;
  }

  return (
    <React.Fragment>
      <Table.Row className={className}>
        <Responsive as={Table.Cell} minWidth={768}>
          {report.program_no}
        </Responsive>
        <Table.Cell>
          <Link className={className} to={`reports/${report.id}`}>
            {report.name}
          </Link>
        </Table.Cell>
        <Table.Cell>
          {moment(report.program_date).format('DD.MM.YYYY')}
        </Table.Cell>
        <Table.Cell>
          {report.program_start_time.slice(0, -3)} -{' '}
          {report.program_end_time.slice(0, -3)}
        </Table.Cell>
        <Table.Cell>{reportStatusOutPrint}</Table.Cell>
        <Table.Cell>
          <Icon
            style={{ color: 'red' }}
            name='delete'
            onClick={() => setOpen(true)}
          />
          <Confirm
            content={`Haluatko varmasti poistaa raportin ${report.name} ${report.program_date}`}
            open={open}
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
          />
        </Table.Cell>
      </Table.Row>
    </React.Fragment>
  );
};

export default ReportListItem;
