import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import './App.css';

import Album from './components/album';
import Artist from './components/artist';
import Footer from './components/layout/footer';
import Home from './components/layout/home';
import LoginForm from './components/login/LoginForm';
import Navbar from './components/layout/navbar';
import Notification from './components/layout/notification/Notification';
import Programs from './components/programs';
import ReportList from './components/reportList/ReportList';
import ReportTrackIndex from './components/report';
import ReportTransfer from './components/reportTransfer';
import Search from './components/search';
import Top100 from './components/top100';
import Track from './components/track';
import Users from './components/users';

import { initializeUser } from './store/login/actions';
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

  if (login.currentUser === null) {
    return (
      <Container>
        <Notification notification={notification} />
        <LoginForm />
        <Footer />
      </Container>
    );
  }
  if (login.currentUser?.status === null || login.currentUser?.status === 0) {
    return (
      <Container>
        <Notification notification={notification} />
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
        <Route exact path='/' component={Home} />
        <Route
          path='/album/:id'
          render={({ match }) => {
            return <Album id={match.params.id} />;
          }}
        />
        <Route
          path='/artist/:id'
          render={({ match }) => {
            return <Artist id={match.params.id} />;
          }}
        />
        <Route
          path='/track/:id'
          render={({ match }) => {
            return <Track id={match.params.id} />;
          }}
        />
        <Route
          path='/reports/:id'
          render={({ match }) => {
            return <ReportTrackIndex id={match.params.id} />;
          }}
        />
        <Route exact path='/reports' component={ReportList} />
        <Route exact path='/transfer' component={ReportTransfer} />
        <Route exact path='/top100' component={Top100} />
        <Route exact path='/search' component={Search} />
        <Route exact path='/programs' component={Programs} />
        <Route exact path='/users' component={Users} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
