import React, { useEffect } from 'react';
import axios from 'axios';
import LoginForm from './components/login/LoginForm';

const App: React.FC = () => {
  useEffect(() => {
    axios.get<void>('/ping');
  }, []);
  return (
    <div className='App'>
      <LoginForm />
    </div>
  );
};

export default App;
