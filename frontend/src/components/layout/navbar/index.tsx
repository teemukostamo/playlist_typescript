import React from 'react';
import { useSelector } from 'react-redux';

import AdminNavbar from './AdminNavbar';
import StaffNavbar from './StaffNavbar';
import BasicNavbar from './BasicNavbar';

import { ApplicationState } from '../../../store/types';

const Navbar: React.FC = () => {
  const login = useSelector((state: ApplicationState) => state.login);
  const report = useSelector((state: ApplicationState) => state.report);

  switch (login.currentUser?.level) {
    case 1:
      return (
        <BasicNavbar
          reportDetails={report.reportDetails}
          currentUser={login.currentUser}
        />
      );
    case 2:
      return (
        <StaffNavbar
          reportDetails={report.reportDetails}
          currentUser={login.currentUser}
        />
      );
    case 3:
      return (
        <AdminNavbar
          reportDetails={report.reportDetails}
          currentUser={login.currentUser}
        />
      );
    default:
      return null;
  }
};

export default Navbar;
