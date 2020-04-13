import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/index';
import AdminNavbar from './AdminNavbar';

const Navbar: React.FC = () => {
  const login = useSelector((state: ApplicationState) => state.login);
  switch (login.currentUser?.level) {
    case 1:
      return <AdminNavbar currentUser={login.currentUser} />;
    case 2:
      return <AdminNavbar currentUser={login.currentUser} />;
    case 3:
      return <AdminNavbar currentUser={login.currentUser} />;
    default:
      return null;
  }
};

export default Navbar;
