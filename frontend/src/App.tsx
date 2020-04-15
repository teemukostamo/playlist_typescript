import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Container, Button } from 'semantic-ui-react';
import './App.css';

import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Programs from './components/programs';
import Users from './components/users';
import LoginForm from './components/login/LoginForm';
import Notification from './components/layout/notification/Notification';

import { initializeUser, logout } from './store/login/actions';
import { initializeUsers } from './store/user/actions';
import { ApplicationState } from './store/types';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const login = useSelector((state: ApplicationState) => state.login);
  const notification = useSelector(
    (state: ApplicationState) => state.notification
  );
  console.log('login state', login);

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeUsers());
    axios.get<void>('/ping');
    // eslint-disable-next-line
  }, [login.currentUser?.token]);

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  if (login.currentUser === null) {
    return (
      <Container>
        <LoginForm />
        <Footer />
      </Container>
    );
  }
  if (login.currentUser?.status === null) {
    return (
      <Container>
        <div>Credentials deactivated. Please contact the administrator.</div>
        <LoginForm />
        <Footer />
      </Container>
    );
  }
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Notification notification={notification} />
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
        
        <Route exact path='/search' component={Search} />
        <Route exact path='/top100' component={Top100List} /> */}
        <Route exact path='/programs' component={Programs} />
        <Route exact path='/users' component={Users} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
