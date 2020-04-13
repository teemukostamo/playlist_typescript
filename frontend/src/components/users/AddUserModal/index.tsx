import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddUserForm from './AddUserForm';
import { AddUserFormValues } from '../../../store/user/types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AddUserFormValues) => void;
  error?: string;
}

const AddUserModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new user</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
      <AddUserForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddUserModal;
