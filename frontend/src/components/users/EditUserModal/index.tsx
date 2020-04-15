import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import EditUserForm from './EditUserForm';
import { EditUserFormValues } from '../../../store/user/types';
import { User } from '../../../store/user/types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EditUserFormValues) => void;
  error?: string;
  user: User;
}

const EditUserModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  user,
}: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Edit info of user {user.username}</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
      <EditUserForm user={user} onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default EditUserModal;
