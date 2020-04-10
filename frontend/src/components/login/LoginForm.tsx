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
      <h1>RADIO HELSINKI - TEOSTORAPORTOINTI</h1>
      <h3>Kirjaudu sisään</h3>
      <Form onSubmit={handleLogin}>
        <Form.Field
          label='Käyttäjätunnus'
          control={Input}
          type='text'
          placeholder='Käyttäjätunnus...'
          onChange={(e: { target: { value: string } }) =>
            setUsername(e.target.value.trim())
          }
        />
        <Form.Field
          label='Salasana'
          control={Input}
          type='password'
          placeholder='Salasana...'
          onChange={(e: { target: { value: string } }) =>
            setPassword(e.target.value.trim())
          }
        />
        <Button color='green' type='submit'>
          Kirjaudu
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
