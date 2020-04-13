import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Container, Button } from 'semantic-ui-react';
import Navbar from './components/layout/navbar';
import LoginForm from './components/login/LoginForm';
import { initializeUser, logout } from './store/login/actions';
import { initializeUsers } from './store/user/actions';
import { ApplicationState } from './store/index';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const login = useSelector((state: ApplicationState) => state.login);
  console.log('login state', login);

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeUsers());
    axios.get<void>('/ping');
  }, [login.currentUser?.token]);

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
  if (login.currentUser.status === null) {
    return (
      <Container>
        <div>Credentials deactivated. Please contact the administrator.</div>
        <LoginForm />
      </Container>
    );
  }
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <h1>you logged in as {login.currentUser.username}</h1>
        <Button onClick={handleLogoutClick}>logout</Button>
      </div>
    </Router>
  );
};

export default App;
