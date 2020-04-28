import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import {
  RequiredTextField,
  SelectField,
  TextField,
  NumberField,
  TextAreaField,
} from '../../layout/forms/FormFields';
import { countryOptions, recordCountryOptions } from '../../../constants';

import { AddNewTrackFormValuesType } from '../../../store/track/types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: AddNewTrackFormValuesType) => void;
  error?: string;
}

const AddTrackForm: React.FC<Props> = ({ onSubmit, onCancel, error }) => {
  return (
    <Formik
      initialValues={{
        track_title: '',
        artist_name: '',
        album_name: '',
        label: '',
        cat_id: '',
        year: '',
        disc_no: 1,
        track_no: 1,
        minutes: 0,
        seconds: 0,
        country: 0,
        record_country: '',
        people: '',
        comment: '',
        isrc: '',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        console.log(values);
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.track_title || values.track_title === '') {
          errors.track_title = requiredError;
        }
        if (!values.album_name || values.album_name === '') {
          errors.album_name = requiredError;
        }
        if (!values.artist_name || values.artist_name === '') {
          errors.artist_name = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Artist'
              placeholder='Artist'
              name='artist_name'
              component={RequiredTextField}
            />
            <Field
              label='Album'
              placeholder='Album'
              name='album_name'
              component={RequiredTextField}
            />

            <Field
              label='Track title'
              placeholder='Track title...'
              name='track_title'
              component={RequiredTextField}
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
              label='Year'
              name='year'
              component={NumberField}
              min={1900}
              max={2900}
            />
            <Field
              label='Spotify id'
              placeholder='Spotify id'
              name='spotify_id'
              component={TextField}
            />
            <Field
              label='Comment'
              placeholder='Any additional information'
              name='comment'
              component={TextField}
            />
            <Button
              type='submit'
              floated='left'
              color='green'
              disabled={!isValid || !dirty}
            >
              Add
            </Button>
            <Button
              floated='right'
              style={{ marginBottom: '1rem' }}
              type='button'
              onClick={onCancel}
              color='red'
            >
              Cancel
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddTrackForm;
