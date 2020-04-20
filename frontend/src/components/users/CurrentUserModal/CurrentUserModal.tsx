import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Header } from 'semantic-ui-react';
import CurrentUserForm from './CurrentUserForm';
import { CurrentUser } from '../../../store/login/types';
import { CurrentUserFormValues } from '../../../store/user/types';

import { updateUser } from '../../../store/user/actions';
import { updateCurrentUser } from '../../../store/login/actions';
import { setNotification } from '../../../store/notification/actions';

interface Props {
  currentUser: CurrentUser;
}

const CurrentUserModal: React.FC<Props> = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const submitUpdatedUser = (values: CurrentUserFormValues) => {
    try {
      const userToUpdate = {
        ...values,
        id: currentUser.id,
        status: currentUser.status,
        level: currentUser.level,
      };
      const currentUserToUpdate = {
        ...values,
        token: currentUser.token,
        username: currentUser.username,
        id: currentUser.id,
        level: currentUser.level,
        status: currentUser.status,
      };
      dispatch(updateUser(userToUpdate));
      dispatch(updateCurrentUser(currentUserToUpdate));
      dispatch(
        setNotification(
          `${userToUpdate.first_name} ${userToUpdate.last_name} updated!`,
          'success'
        )
      );
      console.log('updating user', userToUpdate);
      handleClose();
    } catch (e) {
      console.error(e.response.data);
      // setError(e.response.data.error);
    }
  };
  return (
    <Modal
      trigger={
        <span role='menuitem' tabIndex={-8} onClick={handleOpen}>
          Edit user info
        </span>
      }
      closeIcon
      open={modalOpen}
      onClose={handleClose}
    >
      <Header content='Edit current user info' />
      <Modal.Content>
        <CurrentUserForm
          user={currentUser}
          onCancel={handleClose}
          onSubmit={submitUpdatedUser}
        />
        {/* <Form onSubmit={updateUserClick}>
          <Form.Field
            control={Input}
            focus
            type='password'
            placeholder='Salasana...'
            onChange={e => setPassword(e.target.value)}
            label={
              <React.Fragment>
                <span>Salasana - syötä vaihtaaksesi</span>
                {'  '}
                <ModalNotification />
              </React.Fragment>
            }
          />
          <Form.Field
            control={Input}
            focus
            type='password'
            placeholder='Vahvista salasana...'
            onChange={e => setConfirmPassword(e.target.value)}
            label={
              <React.Fragment>
                <span>Salasana uudelleen</span>
                {'  '}
                <ModalNotification />
              </React.Fragment>
            }
          />
          <Form.Field
            control={Input}
            focus
            defaultValue={firstName}
            type='text'
            placeholder='Etunimi...'
            onChange={e => setFirstName(e.target.value)}
            label='Etunimi'
          />
          <Form.Field
            control={Input}
            focus
            defaultValue={lastName}
            type='text'
            placeholder='Sukunimi...'
            onChange={e => setLastName(e.target.value)}
            label='Sukunimi'
          />
          <Form.Field
            control={Input}
            focus
            defaultValue={email}
            type='email'
            placeholder='Email...'
            onChange={e => setEmail(e.target.value)}
            label='Email'
          />
          <Button
            color='green'
            type='submit'
            disabled={!email || !firstName || !lastName}
          >
            Tallenna
          </Button>
          <ModalNotification />
        </Form> */}
      </Modal.Content>
    </Modal>
  );
};

export default CurrentUserModal;
