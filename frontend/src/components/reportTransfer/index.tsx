import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';

import ReportTransferList from './ReportTransferList';
import ReportTransferFileGenerator from './ReportTransferGenerator';

import { getAllTransfers } from '../../store/reportList/actions';
import { ApplicationState } from '../../store/types';

const ReportTransfer: React.FC = () => {
  const dispatch = useDispatch();
  const reportList = useSelector((state: ApplicationState) => state.reportList);
  const login = useSelector((state: ApplicationState) => state.login);

  useEffect(() => {
    dispatch(getAllTransfers());
    // eslint-disable-next-line
  }, [reportList.lastTransfer]);
  if (login.currentUser?.level === 3 || login.currentUser?.level === 2) {
    return (
      <Container>
        <Header>Transfer files</Header>
        <ReportTransferFileGenerator
          reportList={reportList}
          currentUser={login.currentUser}
        />
        <ReportTransferList
          reportTransferList={reportList.reportTransferList}
          currentUser={login.currentUser}
        />
      </Container>
    );
  }
  return null;
};

export default ReportTransfer;
