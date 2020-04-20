import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Container, Button } from 'semantic-ui-react';
import './App.css';

import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Home from './components/layout/home';
import Programs from './components/programs';
import ReportList from './components/reportList/ReportList';
import Top100 from './components/top100';
import Users from './components/users';
import LoginForm from './components/login/LoginForm';
import Notification from './components/layout/notification/Notification';

import { initializeUser, logout } from './store/login/actions';
import { initializeUsers } from './store/user/actions';
import { initializePrograms, getAllPrograms } from './store/program/actions';

import { ApplicationState } from './store/types';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const login = useSelector((state: ApplicationState) => state.login);
  const notification = useSelector(
    (state: ApplicationState) => state.notification
  );

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeUsers());
    dispatch(initializePrograms());
    dispatch(getAllPrograms());
    axios.get<void>('/ping');
    // eslint-disable-next-line
  }, [login.currentUser?.token]);

  console.log(login);

  if (login.currentUser === null) {
    return (
      <Container>
        <LoginForm />
        <Footer />
      </Container>
    );
  }
  if (login.currentUser?.status === null || login.currentUser?.status === 0) {
    return (
      <Container>
        <LoginForm />
        <div>Credentials deactivated. Please contact the administrator.</div>

        <Footer />
      </Container>
    );
  }
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Notification notification={notification} />
      </div>
      <Switch>
        {/* 
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
        
        <Route exact path='/search' component={Search} /> */}
        <Route exact path='/' component={Home} />
        <Route exact path='/reports' component={ReportList} />
        <Route exact path='/top100' component={Top100} />
        <Route exact path='/programs' component={Programs} />
        <Route exact path='/users' component={Users} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
