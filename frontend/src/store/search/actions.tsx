import { Dispatch } from 'redux';
import searchService from './services';
import {
  AUTOCOMPLETE_RESULTS,
  SET_SEARCH_LOADING,
  TOP_100,
  GET_DISCOGS_DATA,
  CLEAR_DISCOGS_DATA,
  ADVANCED_RESULTS,
  SORT_ADVANCED_RESULTS,
  GET_CHANGE_ALBUM_OPTIONS,
  GET_CHANGE_ARTIST_OPTIONS,
  RESET_CHANGE_ARTIST_OPTIONS,
  RESET_CHANGE_ALBUM_OPTIONS,
  AdvancedSearchQueryType,
  DiscogsQueryType,
  DiscogsDataType,
  Top100QueryType,
} from './types';

export const getAutocompleteResults = (query: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_SEARCH_LOADING,
    });
    const results = await searchService.getTracksForAutocompleteSearch(query);
    dispatch({
      type: AUTOCOMPLETE_RESULTS,
      data: results,
    });
  } catch (error) {
    console.log('searchActions error getting autocomplete results', error);
  }
};

export const advancedSearch = (searchParams: AdvancedSearchQueryType) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_SEARCH_LOADING,
    });
    const results = await searchService.advancedSearch(searchParams);
    dispatch({
      type: ADVANCED_RESULTS,
      data: results,
    });
  } catch (error) {
    console.log('searchActions error getting advanced results', error);
  }
};

export const sortAdvancedResults = (sortBy: number) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SORT_ADVANCED_RESULTS,
      data: sortBy,
    });
  } catch (error) {
    console.log('searchActions error sorting advanced results', error);
  }
};

export const getCatIdFromDiscogs = (query: DiscogsQueryType) => async (
  dispatch: Dispatch
) => {
  try {
    let catId: string = '';
    let year: string = '';
    let label: string = '';
    const results = await searchService.getDiscogsData(query);

    console.log(results.results.length);
    if (results.results.length === 0) {
      catId = 'EI ILMOITETTU';
    } else if (results.results[0].catno !== 'none') {
      console.log(results.results[0]);

      catId = results.results[0].catno;
    } else if (results.results[1].catno !== 'none') {
      console.log(results.results[1]);

      catId = results.results[1].catno;
    } else if (results.results[2].catno !== 'none') {
      console.log(results.results[2]);

      catId = results.results[2].catno;
    } else if (results.results[3].catno !== 'none') {
      console.log(results.results[3]);

      catId = results.results[3].catno;
    } else if (results.results[4].catno !== 'none') {
      console.log(results.results[4]);

      catId = results.results[4].catno;
    } else {
      catId = 'EI ILMOITETTU';
    }
    const discogsData: DiscogsDataType = {
      cat_id: catId,
      year,
      label,
    };
    console.log(catId);
    dispatch({
      type: GET_DISCOGS_DATA,
      data: discogsData,
    });
  } catch (error) {
    console.log('searchActions error getting discogs data', error);
  }
};

export const clearDiscogsCatId = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: CLEAR_DISCOGS_DATA,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTop100 = (query: Top100QueryType) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_SEARCH_LOADING,
    });
    const results = await searchService.getTop100(query);
    dispatch({
      type: TOP_100,
      data: results,
      query,
    });
  } catch (error) {
    console.log('searchActions error getting top100 results', error);
  }
};
