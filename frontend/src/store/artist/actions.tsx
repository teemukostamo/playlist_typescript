import { Dispatch } from 'redux';
import {
  GET_ONE_ARTIST,
  SET_LOADING,
  GET_ALBUM_LIST_BY_ARTIST,
  CLEAR_CURRENT_ARTIST,
  MERGE_ARTISTS,
  UpdateArtistParams,
  MergeArtistsParams,
} from './types';
import artistService from './services';
import searchService from '../search/services';

export const getOneArtist = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: CLEAR_CURRENT_ARTIST,
    });
    dispatch({
      type: SET_LOADING,
    });
    const artist = await artistService.getOneArtist(id);
    dispatch({
      type: GET_ONE_ARTIST,
      data: artist,
    });
    const albumList = await artistService.getAlbumsByArtist(id);
    dispatch({
      type: GET_ALBUM_LIST_BY_ARTIST,
      data: albumList,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateArtist = (artistToUpdate: UpdateArtistParams) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_LOADING,
  });
  await artistService.updateArtist(artistToUpdate);
  const updatedArtist = await artistService.getOneArtist(artistToUpdate.id);
  dispatch({
    type: GET_ONE_ARTIST,
    data: updatedArtist,
  });
};

export const mergeArtistFunction = (mergeParams: MergeArtistsParams) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    await searchService.merge(mergeParams);
    const artist = await artistService.getOneArtist(mergeParams.mergeTo);
    dispatch({
      type: GET_ONE_ARTIST,
      data: artist,
    });
    const albumList = await artistService.getAlbumsByArtist(
      mergeParams.mergeTo
    );
    dispatch({
      type: GET_ALBUM_LIST_BY_ARTIST,
      data: albumList,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateArtistState = (mergeParams: MergeArtistsParams) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: MERGE_ARTISTS,
    data: mergeParams,
  });
};
