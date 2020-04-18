import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddProgramForm from './AddProgramForm';
import { AddProgramFormValues } from '../../../store/program/types';
import { LoginState } from '../../../store/login/types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AddProgramFormValues) => void;
  error?: string;
  login: LoginState;
}
const AddProgramModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  login,
}: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new program</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
      <AddProgramForm onSubmit={onSubmit} onCancel={onClose} login={login} />
    </Modal.Content>
  </Modal>
);

export default AddProgramModal;
