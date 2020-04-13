import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Container, Button } from 'semantic-ui-react';
import './App.css';
import Navbar from './components/layout/navbar';
import Users from './components/users';

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
  if (login.currentUser?.status === null) {
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
      <Switch>
        {/* <Route exact path='/' component={Home} />
        <Route exact path='/reports' component={ReportList} />
        <Route exact path='/transfer' component={ReportTransferList} />
        <Route
          path='/reports/:id'
          render={({ match }) => {
            return <ReportWithTracks id={match.params.id} />;
          }}
        />
        <Route
          path='/artist/:id'
          render={({ match }) => {
            return <ArtistDetails id={match.params.id} />;
          }}
        />
        <Route
          path='/album/:id'
          render={({ match }) => {
            return <AlbumDetails id={match.params.id} />;
          }}
        />
        <Route
          path='/track/:id'
          render={({ match }) => {
            return <TrackDetails id={match.params.id} />;
          }}
        />
        <Route exact path='/programs' component={ProgramList} />
        <Route exact path='/search' component={Search} />
        <Route exact path='/top100' component={Top100List} /> */}
        <Route exact path='/users' component={Users} />
      </Switch>
    </Router>
  );
};

export default App;
