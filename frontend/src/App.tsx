import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import { Container, Button } from 'semantic-ui-react';
import LoginForm from './components/login/LoginForm';
import { initializeUser, logout } from './actions/loginActions';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const login = useSelector((state: any) => state.login);

  useEffect(() => {
    dispatch(initializeUser());
    axios.get<void>('/ping');
  }, []);

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  if (login.currentUser === null) {
    return (
      <Container>
        <LoginForm />
      </Container>
    );
  }
  return (
    <div className='App'>
      <h1>you logged in as {login.currentUser.username}</h1>
      <Button onClick={handleLogoutClick}>logout</Button>
    </div>
  );
};

export default App;
