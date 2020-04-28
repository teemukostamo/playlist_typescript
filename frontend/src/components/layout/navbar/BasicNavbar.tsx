import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Dropdown, Icon } from 'semantic-ui-react';
import logo from '../../../img/logo.png';
import { logout } from '../../../store/login/actions';
import { useDispatch } from 'react-redux';

import CurrentUserModal from '../../users/CurrentUserModal/CurrentUserModal';
import CurrentReport from './CurrentReport';

import { CurrentUser } from '../../../store/login/types';
import { ReportDetails } from '../../../store/report/types';

interface Props {
  currentUser: CurrentUser;
  reportDetails: ReportDetails | null;
}

const BasicNavbar: React.FC<Props> = ({ currentUser, reportDetails }) => {
  const dispatch = useDispatch();
  const getLoggedInUserInfo = () => {
    return <CurrentUserModal currentUser={currentUser} />;
  };
  const handleLogoutClick = () => {
    dispatch(logout());
  };
  const trigger = (
    <span>
      <Icon color='pink' name='user' size='large' /> {currentUser.first_name}{' '}
      {currentUser.last_name}
    </span>
  );

  const options = [
    {
      key: 'user',
      text: <CurrentUserModal currentUser={currentUser} />,
      icon: 'user',
      onClick: getLoggedInUserInfo,
    },
    {
      key: 'sign-out',
      text: 'Log out',
      icon: 'sign out',
      onClick: handleLogoutClick,
    },
  ];
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <Menu pointing stackable inverted>
        <Menu.Item link>
          <Link to='/'>
            <Image alt='logo' src={logo} size='mini' />
          </Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to='/reports'>
            <h4>REPORTS</h4>
          </Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to='/top100'>
            <h4>TOP 100</h4>
          </Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to='/search'>
            <h4>SEARCH</h4>
          </Link>
        </Menu.Item>
        <Menu.Item position='right'>
          <Dropdown
            trigger={trigger}
            options={options}
            pointing='top left'
            icon={null}
          />
        </Menu.Item>
        <Menu.Item>
          <CurrentReport reportDetails={reportDetails} />
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default BasicNavbar;
