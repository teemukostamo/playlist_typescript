import React, { useState } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const user = {
      username,
      password,
    };
    console.log(user);
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
