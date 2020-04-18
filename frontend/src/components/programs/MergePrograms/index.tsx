import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Header } from 'semantic-ui-react';
import { mergePrograms } from '../../../store/program/actions';
import { setNotification } from '../../../store/notification/actions';
import { ApplicationState } from '../../../store/types';

import MergeProgramForm from './MergeProgramForm';

interface Props {
  program_id: number;
  program_name: string;
}

const MergePrograms: React.FC<Props> = ({ program_id, program_name }) => {
  const dispatch = useDispatch();
  const programs = useSelector((state: ApplicationState) => state.program);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  if (!modalOpen) {
    return (
      <button type='button' className='link-btn' onClick={handleOpen}>
        {program_id}
      </button>
    );
  }

  interface MergeValues {
    programToMerge: number;
  }
  const submitMergePrograms = (values: MergeValues) => {
    console.log(Number(values.programToMerge));
    const mergeParams = {
      type: 'program',
      merge: Number(values.programToMerge),
      mergeTo: program_id,
    };
    console.log(mergeParams);
    dispatch(mergePrograms(mergeParams));
    dispatch(
      setNotification(`Ohjelma #${mergeParams.merge} yhdistetty!`, 'success')
    );
    handleClose();
  };
  const mergeOptions = programs.allPrograms.map((program) => ({
    key: program.id,
    label: `${program.id} - ${program.name}`,
    value: program.id,
  }));
  // const getProgramToMerge = (
  //   e: React.SyntheticEvent<HTMLElement>,
  //   value: DropdownProps
  // ) => {
  //   console.log(value);
  //   e.preventDefault();
  //   // setProgramToMerge(value);
  // };
  return (
    <Modal
      open={modalOpen}
      closeIcon
      onClose={handleClose}
      trigger={
        <button type='button' className='link-btn' onClick={handleOpen}>
          {program_id}
        </button>
      }
    >
      <Header>
        Merge {program_id} - {program_name} with:
      </Header>
      <Modal.Content>
        {/* <Form onSubmit={onSubmit}>
          <Form.Field>
            <Dropdown
              onChange={getProgramToMerge}
              selection
              search
              options={mergeOptions}
            />
          </Form.Field>
          <Form.Field>
            <Button type='submit'>Yhdistä</Button>
          </Form.Field>
        </Form>{' '} */}
        <MergeProgramForm
          onSubmit={submitMergePrograms}
          onCancel={handleClose}
          selectOptions={mergeOptions}
        />
      </Modal.Content>
    </Modal>
  );
};

export default MergePrograms;
