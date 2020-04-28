import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';
import {
  TextField,
  NumberField,
  SelectField,
  TextAreaField,
} from '../../layout/forms/FormFields';
import { countryOptions, recordCountryOptions } from '../../../constants';

import { AddNewTrackToAlbumFormValuesType } from '../../../store/track/types';
import { Album } from '../../../store/album/types';
import { ReportDetails } from '../../../store/report/types';

interface Props {
  onSubmit: (values: AddNewTrackToAlbumFormValuesType) => void;
  addToAlbumAndReport: (values: AddNewTrackToAlbumFormValuesType) => void;
  onClose: () => void;
  currentAlbum: Album;
  reportDetails: ReportDetails | null;
}

const AddTrackToAlbumForm: React.FC<Props> = ({
  reportDetails,
  currentAlbum,
  addToAlbumAndReport,
  onSubmit,
  onClose,
}) => {
  return (
    <Formik
      initialValues={{
        track_title: '',
        disc_no: 1,
        track_no: 1,
        minutes: 0,
        seconds: 0,
        country: 1,
        record_country: '',
        people: '',
        comment: '',
        isrc: '',
      }}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty }) => {
        let saveButton;
        if (reportDetails !== null) {
          saveButton = (
            <React.Fragment>
              <Grid.Column width={6}>
                <Button
                  disabled={!isValid || !dirty}
                  color='green'
                  onClick={() => addToAlbumAndReport}
                >
                  {`Add track to album and report ${reportDetails.program_name} ${reportDetails.program_date}`}
                </Button>
              </Grid.Column>
              <Grid.Column width={6}>
                <Button
                  disabled={!isValid || !dirty}
                  type='submit'
                  color='blue'
                >
                  Add track to album
                </Button>
              </Grid.Column>
            </React.Fragment>
          );
        } else {
          saveButton = (
            <Grid.Column width={6}>
              <Button disabled={!isValid || !dirty} color='blue' type='submit'>
                Add track to album
              </Button>
            </Grid.Column>
          );
        }
        return (
          <Form className='form ui'>
            <Field
              label='Track title'
              placeholder='Track title...'
              name='track_title'
              component={TextField}
            />
            <Grid>
              <Grid.Column width={8}>
                <Field
                  label='Length - minutes'
                  name='minutes'
                  component={NumberField}
                  min={0}
                  max={999}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Field
                  label='Length - seconds'
                  name='seconds'
                  component={NumberField}
                  min={0}
                  max={59}
                />
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={8}>
                <Field
                  label='Track #'
                  name='track_no'
                  component={NumberField}
                  min={0}
                  max={999}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Field
                  label='Disc #'
                  name='disc_no'
                  component={NumberField}
                  min={0}
                  max={99}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <SelectField
                  label='Country'
                  name='country'
                  options={countryOptions}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <SelectField
                  label='Recorded in'
                  name='record_country'
                  options={recordCountryOptions}
                />
              </Grid.Column>
            </Grid>
            <Field
              label='Composers - one per line'
              placeholder='LAST NAME FIRST NAME'
              name='people'
              component={TextAreaField}
            />
            <Field
              label='Comment'
              placeholder='Any additional information'
              name='comment'
              component={TextField}
            />
            <Grid>
              {saveButton}
              <Grid.Column floated='right' width={6}>
                <Button type='button' onClick={onClose} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddTrackToAlbumForm;
