import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, Icon, Confirm } from 'semantic-ui-react';

import { Program } from '../../store/program/types';

interface Props {
  program: Program;
}

const ProgramListItem: React.FC<Props> = ({ program }) => {
  let className;
  if (program.display === 1) {
    className = 'active-program';
  }

  return (
    <Table.Row className={className}>
      <Table.Cell>
        {/* <MergePrograms program_id={program.id} program_name={program.name} /> */}
        {program.id}
      </Table.Cell>
      <Table.Cell>{program.name}</Table.Cell>
      <Table.Cell>{program.identifier}</Table.Cell>
    </Table.Row>
  );
};

export default ProgramListItem;
