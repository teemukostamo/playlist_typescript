import { Action, Reducer } from 'redux';
import {
  GET_ONE_ARTIST,
  GET_ALBUM_LIST_BY_ARTIST,
  CLEAR_CURRENT_ARTIST,
  SET_LOADING,
  ArtistState,
  ArtistActionTypes,
} from './types';

const initialState: ArtistState = {
  currentArtist: null,
  albumList: [],
  loading: false,
};

const artistReducer: Reducer<ArtistState, Action> = (
  state = initialState,
  action: ArtistActionTypes
) => {
  switch (action.type) {
    case GET_ONE_ARTIST:
      return {
        ...state,
        currentArtist: action.data,
        loading: false,
      };
    case GET_ALBUM_LIST_BY_ARTIST:
      return {
        ...state,
        albumList: action.data,
        loading: false,
      };
    case CLEAR_CURRENT_ARTIST:
      return {
        ...state,
        currentArtist: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default artistReducer;
