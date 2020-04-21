import React from 'react';
import { Button, Grid, Dimmer, Loader, Header } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';
import { TextField } from '../layout/forms/FormFields';
import { Artist, UpdateArtistParams } from '../../store/artist/types';

interface Props {
  currentArtist: Artist;
  onSubmit: (values: UpdateArtistParams) => void;
}

const ArtistDetailsForm: React.FC<Props> = ({ currentArtist, onSubmit }) => {
  if (currentArtist === null) {
    return (
      <Dimmer>
        <Loader>Loading artist...</Loader>
      </Dimmer>
    );
  }

  return (
    <Grid columns={2}>
      <Grid.Column>
        <Header>Artist info</Header>
        <Formik
          initialValues={{
            id: currentArtist.id,
            name: currentArtist.name,
            spotify_id: currentArtist.spotify_id || '',
          }}
          onSubmit={onSubmit}
          validate={(values) => {
            const requiredError = 'Artist name is required';
            const errors: { [field: string]: string } = {};
            if (!values.name) {
              errors.name = requiredError;
            }
            return errors;
          }}
        >
          {({ isValid }) => {
            return (
              <Form className='form ui'>
                <Field
                  label='Artist name'
                  placeholder='Name'
                  name='name'
                  component={TextField}
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
                  Update artist
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Grid.Column>
    </Grid>
  );
};

export default ArtistDetailsForm;
