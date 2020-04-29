import React from 'react';
import { Button, Grid, Dimmer, Loader, Header } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';
import {
  TextField,
  DisabledTextField,
  NumberField,
  SelectField,
  TextAreaField,
} from '../layout/forms/FormFields';
import { Track, UpdateTrackFormValuesType } from '../../store/track/types';
import { countryOptions, recordCountryOptions } from '../../constants';

interface Props {
  currentTrack: Track;
  onSubmit: (values: UpdateTrackFormValuesType) => void;
}

const TrackDetailsForm: React.FC<Props> = ({ currentTrack, onSubmit }) => {
  if (currentTrack === null) {
    return (
      <Dimmer>
        <Loader>Loading track details...</Loader>
      </Dimmer>
    );
  }
  let initialPeople = '';
  if (currentTrack.people) {
    initialPeople = currentTrack.people
      .replace(/\| /, '')
      .replace(/\| /g, '\n')
      .replace(/ \|/, '');
  }
  console.log('current track at track details form', currentTrack);
  return (
    <Grid columns={2}>
      <Grid.Column>
        <Header>Track details</Header>
        <Formik
          initialValues={{
            artist: currentTrack.artist,
            album: currentTrack.album,
            track_title: currentTrack.track_title,
            track_id: currentTrack.track_id,
            length: currentTrack.length,
            minutes: Math.floor(currentTrack.length / 60),
            seconds: currentTrack.length % 60,
            country: currentTrack.country || 0,
            record_country: currentTrack.record_country,
            people: initialPeople || '',
            disc_no: currentTrack.disc_no || 1,
            track_no: currentTrack.track_no,
            year: Number(currentTrack.year?.substring(0, 4)) || '',
            label: currentTrack.label,
            cat_id: currentTrack.cat_id,
            isrc: currentTrack.isrc,
            comment: currentTrack.comment || '',
            user_id: null,
            artist_id: currentTrack.artist_id,
            album_id: currentTrack.album_id,
            sortable_rank: null,
            report_track_id: null,
          }}
          onSubmit={onSubmit}
          validate={(values) => {
            console.log(values);
            const requiredError = 'Album name is required';
            const errors: { [field: string]: string } = {};
            if (!values.track_title) {
              errors.name = requiredError;
            }
            return errors;
          }}
        >
          {({ isValid }) => {
            return (
              <Form className='form ui'>
                <Field
                  label='Artist'
                  placeholder='Artist'
                  name='artist'
                  component={DisabledTextField}
                />
                <Field
                  label='Album'
                  placeholder='Album'
                  name='album'
                  component={DisabledTextField}
                />

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
                  disabled={!isValid}
                >
                  Update track
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Grid.Column>
    </Grid>
  );
};

export default TrackDetailsForm;
