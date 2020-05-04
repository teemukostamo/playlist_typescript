import React from 'react';
import { Button, Grid, Dimmer, Loader, Header } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';
import {
  TextField,
  DisabledTextField,
  NumberField,
} from '../layout/forms/FormFields';
import { Album, UpdateAlbumParams } from '../../store/album/types';

interface Props {
  currentAlbum: Album;
  onSubmit: (values: UpdateAlbumParams) => void;
}

const AlbumDetailsForm: React.FC<Props> = ({ currentAlbum, onSubmit }) => {
  if (currentAlbum === null) {
    return (
      <Dimmer>
        <Loader>Loading album...</Loader>
      </Dimmer>
    );
  }
  return (
    <Grid columns={2}>
      <Grid.Column>
        <Header>Album info</Header>
        <Formik
          initialValues={{
            id: currentAlbum.album_id,
            artist: currentAlbum.artist_name,
            name: currentAlbum.album_name,
            label: currentAlbum.label || '',
            cat_id: currentAlbum.cat_id || '',
            year: Number(currentAlbum.year?.substring(0, 4)) || '',
            spotify_id: currentAlbum.spotify_id || '',
          }}
          onSubmit={onSubmit}
          validate={(values) => {
            console.log(values);
            const requiredError = 'Album name is required';
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
                  label='Artist'
                  placeholder='Artist'
                  name='artist'
                  component={DisabledTextField}
                />
                <Field
                  label='Album name'
                  placeholder='Name'
                  name='name'
                  component={TextField}
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
                  Update album
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Grid.Column>
    </Grid>
  );
};

export default AlbumDetailsForm;
