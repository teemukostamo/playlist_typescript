import { Dispatch } from 'redux';
import {
  GET_ONE_ALBUM,
  GET_TRACKLIST_OF_ALBUM,
  CLEAR_CURRENT_ALBUM,
  MERGE_ALBUMS,
  CHANGE_ARTIST_OF_ALBUM,
  SET_LOADING,
  UpdateAlbumParams,
  MergeAlbumsParams,
  ChangeArtistParams,
} from './types';
import albumService from './services';
import searchService from '../search/services';

export const getOneAlbum = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: CLEAR_CURRENT_ALBUM,
    });
    dispatch({
      type: SET_LOADING,
    });
    const album = await albumService.getOneAlbum(id);
    console.log('albumactions getonealbum', album);
    dispatch({
      type: GET_ONE_ALBUM,
      data: album,
    });
    const tracklist = await albumService.getTracklistOfAlbum(id);
    dispatch({
      type: GET_TRACKLIST_OF_ALBUM,
      data: tracklist,
    });
  } catch (error) {
    console.log('albumActions getOneAlbum error:', error);
  }
};

export const updateAlbum = (albumToUpdate: UpdateAlbumParams) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    await albumService.updateAlbum(albumToUpdate);
    const updatedAlbum = await albumService.getOneAlbum(albumToUpdate.id);
    dispatch({
      type: GET_ONE_ALBUM,
      data: updatedAlbum,
    });
  } catch (error) {
    console.log('albumActions updateAlbum error:', error);
  }
};

export const mergeAlbumFunction = (mergeParams: MergeAlbumsParams) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    await searchService.merge(mergeParams);
    const album = await albumService.getOneAlbum(mergeParams.mergeTo);
    dispatch({
      type: GET_ONE_ALBUM,
      data: album,
    });
    const tracklist = await albumService.getTracklistOfAlbum(
      mergeParams.mergeTo
    );
    dispatch({
      type: GET_TRACKLIST_OF_ALBUM,
      data: tracklist,
    });
  } catch (error) {
    console.log('albumActions mergeAlbumsFunction error:', error);
  }
};

export const updateAlbumState = (mergeParams: MergeAlbumsParams) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: MERGE_ALBUMS,
    data: mergeParams,
  });
};

export const updateArtistId = (artistToUpdate: ChangeArtistParams) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    await albumService.changeArtistId(artistToUpdate);
    dispatch({
      type: CHANGE_ARTIST_OF_ALBUM,
      data: artistToUpdate,
    });
  } catch (error) {
    console.log(error);
  }
};
