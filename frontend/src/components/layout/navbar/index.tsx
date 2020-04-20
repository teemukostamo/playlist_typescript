import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/types';
import AdminNavbar from './AdminNavbar';
import StaffNavbar from './StaffNavbar';
import BasicNavbar from './BasicNavbar';

const Navbar: React.FC = () => {
  const login = useSelector((state: ApplicationState) => state.login);

  switch (login.currentUser?.level) {
    case 1:
      return <BasicNavbar currentUser={login.currentUser} />;
    case 2:
      return <StaffNavbar currentUser={login.currentUser} />;
    case 3:
      return <AdminNavbar currentUser={login.currentUser} />;
    default:
      return null;
  }
};

export default Navbar;
