import { Action, Reducer } from 'redux';
import {
  GET_ONE_ALBUM,
  ADD_TRACK_TO_ALBUM,
  GET_TRACKLIST_OF_ALBUM,
  CLEAR_CURRENT_ALBUM,
  SET_LOADING,
  CHANGE_ARTIST_OF_ALBUM,
  AlbumState,
  AlbumActionTypes,
} from './types';

const initialState: AlbumState = {
  currentAlbum: null,
  tracklist: [],
  loading: false,
};

const albumReducer: Reducer<AlbumState, Action> = (
  state = initialState,
  action: AlbumActionTypes
) => {
  switch (action.type) {
    case GET_ONE_ALBUM:
      return {
        ...state,
        currentAlbum: action.data,
        loading: false,
      };
    case GET_TRACKLIST_OF_ALBUM:
      return {
        ...state,
        tracklist: action.data,
        loading: false,
      };
    case CLEAR_CURRENT_ALBUM:
      return {
        ...state,
        currentAlbum: null,
        tracklist: [],
        loading: false,
      };
    case ADD_TRACK_TO_ALBUM:
      return {
        ...state,
        tracklist: [...state.tracklist, action.data],
      };
    // case CHANGE_ARTIST_OF_ALBUM:
    //   return {
    //     ...state,
    //     currentAlbum: {
    //       ...state.currentAlbum,
    //       artist_id: action.data.artist_id,
    //       artist_name: action.data.artist_name,
    //     },
    //     loading: false,
    //   };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default albumReducer;
