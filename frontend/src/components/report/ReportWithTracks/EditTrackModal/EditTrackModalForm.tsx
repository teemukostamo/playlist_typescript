import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import {
  RequiredTextField,
  SelectField,
  TextField,
  NumberField,
  TextAreaField,
} from '../../../layout/forms/FormFields';
import { countryOptions, recordCountryOptions } from '../../../../constants';

import { ReportItem, ReportState } from '../../../../store/report/types';
import { UpdateReportTrackFormValuesType } from '../../../../store/track/types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: UpdateReportTrackFormValuesType) => void;
  track: ReportItem;
  error?: string;
}

const EditTrackModalForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  track,
  error,
}) => {
  console.log('track at form', track);
  let initialPeople = '';
  if (track.people) {
    initialPeople = track.people
      .replace(/\| /, '')
      .replace(/\| /g, '\n')
      .replace(/ \|/, '');
  }
  return (
    <Formik
      initialValues={{
        track_title: track.track_title,
        artist: track.artist_name,
        album: track.album_name,
        track_id: track.track_id,
        album_id: track.album_id,
        artist_id: track.artist_id,
        label: track.label,
        cat_id: track.cat_id,
        length: track.length,
        minutes: Math.floor(track.length / 60),
        seconds: track.length % 60,
        disc_no: track.disc_no || 1,
        track_no: track.track_no || 1,
        people: initialPeople || '',
        isrc: track.isrc || '',
        year: Number(track.year?.substring(0, 4)) || '',
        record_country: track.record_country || '',
        country: track.country || 0,
        sortable_rank: track.sortable_rank,
        report_track_id: track.report_track_id,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.track_title || values.track_title === '') {
          errors.track_title = requiredError;
        }
        if (!values.album || values.album === '') {
          errors.album_name = requiredError;
        }
        if (!values.artist || values.artist === '') {
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
              name='artist'
              component={RequiredTextField}
            />
            <Field
              label='Album'
              placeholder='Album'
              name='album'
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
            <Button
              type='submit'
              floated='left'
              color='green'
              disabled={!isValid || !dirty}
            >
              Update track info
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

export default EditTrackModalForm;
