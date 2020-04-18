import { Action, Reducer } from 'redux';
import {
  // AUTOCOMPLETE_RESULTS,
  ADVANCED_RESULTS,
  SORT_ADVANCED_RESULTS,
  GET_DISCOGS_DATA,
  CLEAR_DISCOGS_DATA,
  TOP_100,
  SET_SEARCH_LOADING,
  // GET_CHANGE_ALBUM_OPTIONS,
  // GET_CHANGE_ARTIST_OPTIONS,
  // RESET_CHANGE_ALBUM_OPTIONS,
  // RESET_CHANGE_ARTIST_OPTIONS,
  // MERGE_ALBUMS,
  MERGE_ARTISTS,
  MERGE_TRACKS,
  SearchState,
  SearchActionTypes,
} from './types';

const initialState: SearchState = {
  // searchResults: [],
  top100: [],
  top100Query: null,
  advancedResults: [],
  sortAdvancedResults: null,
  // changeArtistOptions: [],
  // changeAlbumOptions: [],
  loading: false,
  discogsData: null,
};

const searchReducer: Reducer<SearchState, Action> = (
  state = initialState,
  action: SearchActionTypes
) => {
  switch (action.type) {
    case ADVANCED_RESULTS:
      return {
        ...state,
        advancedResults: action.data,
        loading: false,
      };
    case SORT_ADVANCED_RESULTS:
      return {
        ...state,
        sortAdvancedResults: action.data,
      };
    case TOP_100:
      return {
        ...state,
        top100: action.data,
        top100Query: action.query,
        loading: false,
      };
    case GET_DISCOGS_DATA:
      return {
        ...state,
        discogsData: action.data,
      };
    case CLEAR_DISCOGS_DATA:
      return {
        ...state,
        discogsData: null,
      };
    case SET_SEARCH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MERGE_TRACKS:
      return {
        ...state,
        advancedResults: state.advancedResults.filter(
          (result) => result.track_id !== action.data.merge
        ),
      };
    case MERGE_ARTISTS: {
      const artistToMerge = action.data.merge;
      const mergeArtistTo = action.data.mergeTo;
      const newArtistName = action.data.newName;
      // get the artists that need name and id changing
      const filteredArtists = state.advancedResults.filter(
        (r) => r.artist_id === artistToMerge
      );
      // update the names and ids of those artists
      const renamedArtists = filteredArtists.map((result) => ({
        ...result,
        artist_id: mergeArtistTo,
        artist_name: newArtistName,
      }));
      // remove albums with old ids from advancedResults
      const removeMergedArtists = state.advancedResults.filter(
        (r) => r.artist_id !== artistToMerge
      );
      //
      const newArtistResults = [...renamedArtists, ...removeMergedArtists];
      return {
        ...state,
        advancedResults: newArtistResults,
      };
    }
    default:
      return state;
  }
};

export default searchReducer;
