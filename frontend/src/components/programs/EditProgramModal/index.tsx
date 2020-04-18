import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import EditProgramForm from './EditProgramForm';
import { EditProgramFormValues, Program } from '../../../store/program/types';
import { LoginState } from '../../../store/login/types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EditProgramFormValues) => void;
  error?: string;
  program: Program;
  login: LoginState;
}

const EditUserModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  program,
  login,
}: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Edit info of program {program.name}</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
      <EditProgramForm
        program={program}
        login={login}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal.Content>
  </Modal>
);

export default EditUserModal;
