import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Form } from 'formik';

import { SelectField } from '../../layout/forms/FormFields';

interface MergeValues {
  programToMerge: number;
}

interface SelectFieldType {
  key: number;
  value: number;
  label: string;
}

interface Props {
  onSubmit: (values: MergeValues) => void;
  onCancel: () => void;
  selectOptions: Array<SelectFieldType>;
}

const MergeProgramForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  selectOptions,
}) => {
  return (
    <Formik
      initialValues={{
        programToMerge: selectOptions[0].value,
      }}
      onSubmit={onSubmit}
    >
      {({ dirty }) => {
        return (
          <Form className='form ui'>
            <span style={{ color: 'red' }}>
              <SelectField
                label=''
                name='programToMerge'
                options={selectOptions}
              />
            </span>
            <Grid>
              <Grid.Column
                style={{ marginTop: '1rem' }}
                floated='left'
                width={5}
              >
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!dirty}
                >
                  Merge
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MergeProgramForm;
