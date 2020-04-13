import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Dropdown, Icon } from 'semantic-ui-react';
import logo from '../../../img/logo.png';
import { CurrentUser } from '../../../store/login/types';

interface Props {
  currentUser: CurrentUser;
}

const AdminNavbar: React.FC<Props> = ({ currentUser }) => {
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
        <Menu.Item link>
          <Link to='/transfer'>
            <h4>TRANSFER FILES</h4>
          </Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to='/programs'>
            <h4>PROGRAMS</h4>
          </Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to='/users'>
            <h4>USERS</h4>
          </Link>
        </Menu.Item>
        <Menu.Item position='right'>
          {/* <Dropdown
            trigger={trigger}
            options={options}
            pointing='top left'
            icon={null}
          /> */}
        </Menu.Item>
        <Menu.Item>{/* <CurrentReport /> */}</Menu.Item>
      </Menu>
    </div>
  );
};

export default AdminNavbar;
