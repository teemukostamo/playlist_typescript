import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'semantic-ui-react';

import EditProgramModal from './EditProgramModal';
import MergePrograms from './MergePrograms';

import { Program, EditProgramFormValues } from '../../store/program/types';
import { ApplicationState } from '../../store/types';

import { updateProgram } from '../../store/program/actions';
import { setNotification } from '../../store/notification/actions';

interface Props {
  program: Program;
}

const ProgramListItem: React.FC<Props> = ({ program }) => {
  const login = useSelector((state: ApplicationState) => state.login);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  let className;
  if (program.display === 1) {
    className = 'active-program';
  }

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitUpdatedProgram = (values: EditProgramFormValues) => {
    try {
      dispatch(updateProgram(values));
      dispatch(setNotification(`${values.name} updated!`, 'success'));
      closeModal();
    } catch (e) {
      setError(e.response.data.error);
    }
  };

  return (
    <Table.Row className={className}>
      <Table.Cell>
        <MergePrograms program_id={program.id} program_name={program.name} />
      </Table.Cell>
      <Table.Cell>
        <EditProgramModal
          program={program}
          login={login}
          modalOpen={modalOpen}
          onSubmit={submitUpdatedProgram}
          error={error}
          onClose={closeModal}
        />
        <button
          style={{ border: 'none', cursor: 'pointer', color: 'teal' }}
          onClick={openModal}
        >
          {program.name}
        </button>
      </Table.Cell>
      <Table.Cell>{program.identifier}</Table.Cell>
    </Table.Row>
  );
};

export default ProgramListItem;
