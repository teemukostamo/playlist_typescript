import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Input } from 'semantic-ui-react';
import { newLogin } from '../../store/login/actions';

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const user = {
      username,
      password,
    };
    dispatch(newLogin(user));
  };

  return (
    <div>
      <h1>RADIO TRACKLIST REPORTING</h1>
      <h3>Log in</h3>
      <Form onSubmit={handleLogin}>
        <Form.Field
          id='login-username'
          label='username'
          control={Input}
          type='text'
          placeholder='Username...'
          onChange={(e: { target: { value: string } }) =>
            setUsername(e.target.value.trim())
          }
        />
        <Form.Field
          id='login-password'
          label='password'
          control={Input}
          type='password'
          placeholder='Password...'
          onChange={(e: { target: { value: string } }) =>
            setPassword(e.target.value.trim())
          }
        />
        <Button id='login-button' color='green' type='submit'>
          Log in
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
