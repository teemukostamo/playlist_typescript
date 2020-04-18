import { Action, Reducer } from 'redux';
import {
  GET_ONE_TRACK,
  GET_ONE_TRACK_HISTORY,
  CLEAR_CURRENT_TRACK,
  SET_LOADING,
  CHANGE_ALBUM,
  CHANGE_ARTIST,
  TrackState,
  TrackActionTypes,
} from './types';

const initialState: TrackState = {
  currentTrack: null,
  playHistory: [],
  loading: false,
};

const trackReducer: Reducer<TrackState, Action> = (
  state = initialState,
  action: TrackActionTypes
) => {
  switch (action.type) {
    case GET_ONE_TRACK:
      return {
        ...state,
        currentTrack: action.data,
        loading: false,
      };
    case GET_ONE_TRACK_HISTORY:
      return {
        ...state,
        playhistory: action.data,
        loading: false,
      };
    case CLEAR_CURRENT_TRACK:
      return {
        ...state,
        playhistory: null,
        currentTrack: null,
      };
    // case CHANGE_ALBUM:
    //   return {
    //     ...state,
    //     currentTrack: {
    //       ...state.currentTrack,
    //       album_id: action.data.album_id,
    //       album: action.data.album_name,
    //     },
    //     loading: false,
    //   };
    // case CHANGE_ARTIST:
    //   return {
    //     ...state,
    //     currentTrack: {
    //       ...state.currentTrack,
    //       artist_id: action.data.artist_id,
    //       artist: action.data.artist,
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
export default trackReducer;
