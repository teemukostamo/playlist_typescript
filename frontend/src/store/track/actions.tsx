import { Dispatch } from 'redux';
import {
  ADD_NEW_TRACK,
  ADD_TRACK_TO_ALBUM,
  UPDATE_TRACK,
  SET_LOADING,
  GET_ONE_TRACK,
  GET_ONE_TRACK_HISTORY,
  CLEAR_CURRENT_TRACK,
  REMOVE_CURRENT_TRACK,
  CHANGE_ALBUM,
  CHANGE_ARTIST,
  MERGE_TRACKS,
  AddTrackToDbAndReportType,
  AddTrackToDbType,
  UpdateTrackType,
  MergeTrackParamsType,
  ChangeAlbumParams,
  ChangeArtistParams,
  // UpdateTrackFormValuesType,
  // ADD_TRACK_TO_REPORT
} from './types';

import trackService from './services';
import searchService from '../search/services';

// add a new track and save it to current report
export const addNewTrack = (trackToAdd: AddTrackToDbAndReportType) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const track = await trackService.addNewTrack(trackToAdd);
    dispatch({
      type: ADD_NEW_TRACK,
      data: track,
    });
  } catch (error) {
    console.log('trackActions addNewTrack error:', error);
  }
};

// add a new track to db - not in a report
export const addTrackToDb = (trackToAdd: AddTrackToDbType) => async () => {
  try {
    await trackService.addTrackToDb(trackToAdd);
  } catch (error) {
    console.log('trackActions addTrackToDb error: ', error);
  }
};

export const addTrackToAlbum = (trackToAdd: AddTrackToDbType) => async (
  dispatch: Dispatch
) => {
  try {
    const track = await trackService.addTrackToAlbum(trackToAdd);
    dispatch({
      type: ADD_TRACK_TO_ALBUM,
      data: track,
    });
  } catch (error) {
    console.log('trackactions addTrackToAlbum error: ', error);
  }
};

export const addTrackToAlbumAndReport = (
  trackToAdd: AddTrackToDbAndReportType
) => async (dispatch: Dispatch) => {
  try {
    const track = await trackService.addTrackToAlbum(trackToAdd);
    const trackToReport = {
      track_id: track.track_id,
      report_id: trackToAdd.report_id,
      length: trackToAdd.length,
      sortable_rank: trackToAdd.sortable_rank,
    };
    // const report = await reportService.addTrackToReport(trackToReport);
    // const trackToReducer = {
    //   ...report,
    //   ...track
    // };
    // dispatch({
    //   type: ADD_TRACK_TO_ALBUM,
    //   data: track
    // });
    // dispatch({
    //   type: ADD_TRACK_TO_REPORT,
    //   data: trackToReducer
    // });
  } catch (error) {
    console.log('trackActions addTrackToAlbumAndReport error: ', error);
  }
};

export const updateTrack = (trackToUpdate: UpdateTrackType) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    console.log('track to update at action', trackToUpdate);
    await trackService.updateTrack(trackToUpdate);
    dispatch({
      type: UPDATE_TRACK,
      data: trackToUpdate,
    });
  } catch (error) {
    console.log('trackActions updateTrack error: ', error);
  }
};

export const getOneTrack = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const track = await trackService.getOneTrack(id);
    dispatch({
      type: GET_ONE_TRACK,
      data: track,
    });
  } catch (error) {
    console.log('trackActions getoneTrack error: ', error);
  }
};

export const getOneTrackHistory = (id: number) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: CLEAR_CURRENT_TRACK,
    });
    dispatch({
      type: SET_LOADING,
    });
    const history = await trackService.getOneTrackHistory(id);
    dispatch({
      type: GET_ONE_TRACK_HISTORY,
      data: history,
    });
  } catch (error) {
    console.log('trackActions getOneTrackHistory error: ', error);
  }
};

export const removeCurrentTrack = () => async (dispatch: Dispatch) => {
  dispatch({
    type: REMOVE_CURRENT_TRACK,
  });
};

export const mergeTrackFunction = (mergeParams: MergeTrackParamsType) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const mergeAction = await searchService.merge(mergeParams);
    console.log(mergeAction);
    const track = await trackService.getOneTrack(mergeParams.mergeTo);
    dispatch({
      type: GET_ONE_TRACK,
      data: track,
    });
    const history = await trackService.getOneTrackHistory(mergeParams.mergeTo);
    dispatch({
      type: GET_ONE_TRACK_HISTORY,
      data: history,
    });
  } catch (error) {
    console.log('trackActions mergeTracksFunction error:', error);
  }
};

export const changeAlbumId = (albumToUpdate: ChangeAlbumParams) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const updateAlbum = await trackService.updateAlbumId(albumToUpdate);
    console.log(updateAlbum);
    dispatch({
      type: CHANGE_ALBUM,
      data: albumToUpdate,
    });
  } catch (error) {
    console.log(error);
  }
};

export const changeArtistId = (artistToUpdate: ChangeArtistParams) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const updateArtist = await trackService.updateArtistId(artistToUpdate);
    console.log(updateArtist);
    dispatch({
      type: CHANGE_ARTIST,
      data: artistToUpdate,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTrackState = (mergeParams: MergeTrackParamsType) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: MERGE_TRACKS,
    data: mergeParams,
  });
};
