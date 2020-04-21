import React from 'react';
import { Button, Grid, Dimmer, Loader, Header } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';
import { TextField, NumberField } from '../layout/forms/FormFields';
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
            country: currentTrack.country,
            record_country: currentTrack.record_country,
            people: currentTrack.people,
            disc_no: currentTrack.disc_no,
            track_no: currentTrack.track_no,
            year: Number(currentTrack.year?.substring(0, 4)) || '',
            label: currentTrack.label,
            cat_id: currentTrack.cat_id,
            isrc: currentTrack.isrc,
            comment: currentTrack.comment,
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
                  component={TextField}
                />
                <Field
                  label='Album'
                  placeholder='Album'
                  name='album'
                  component={TextField}
                />
                <Field
                  label='Track title'
                  placeholder='Track title...'
                  name='track_title'
                  component={TextField}
                />
                <Field
                  label='Minutes'
                  name='minutes'
                  component={NumberField}
                  min={0}
                  max={999}
                />
                <Field
                  label='Seconds'
                  name='seconds'
                  component={NumberField}
                  min={0}
                  max={59}
                />
                <Field
                  label='Label'
                  placeholder='Label...'
                  name='label'
                  component={TextField}
                />
                <Field
                  label='Catalog ID'
                  placeholder='Catalog ID...'
                  name='cat_id'
                  component={TextField}
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
