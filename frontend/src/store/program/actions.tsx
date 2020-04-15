import { Dispatch } from 'redux';
import programService from './services';
import {
  GET_ALL_PROGRAMS,
  GET_ALL_ACTIVE_PROGRAMS,
  GET_ONE_PROGRAM,
  CREATE_NEW_PROGRAM,
  UPDATE_PROGRAM,
  SET_LOADING,
  MergeProgramParams,
  NewProgramType,
  UpdateProgramType,
} from './types';

export const getAllPrograms = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const programs = await programService.getAll();
    dispatch({
      type: GET_ALL_PROGRAMS,
      data: programs,
    });
  } catch (err) {
    console.log(
      'error getting all programs programActions.getAllPrograms',
      err
    );
  }
};

// get all active programs
export const initializePrograms = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const programs = await programService.getAllActive();
    dispatch({
      type: GET_ALL_ACTIVE_PROGRAMS,
      data: programs,
    });
  } catch (err) {
    console.log(
      'error getting all active programs programActions.initializePrograms',
      err
    );
  }
};

export const getOneProgram = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const program = await programService.getOne(id);
    dispatch({
      type: GET_ONE_PROGRAM,
      data: program,
      id,
    });
  } catch (err) {
    console.log('error getting one program programActions.getOneProgram', err);
  }
};

export const createNewProgram = (programToAdd: NewProgramType) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const program = await programService.createProgram(programToAdd);
    dispatch({
      type: CREATE_NEW_PROGRAM,
      data: program,
    });
  } catch (err) {
    console.log('error creating new program', err);
  }
};

export const updateProgram = (updatedProgram: UpdateProgramType) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    await programService.updateProgram(updatedProgram);
    dispatch({
      type: UPDATE_PROGRAM,
      data: updatedProgram,
    });
  } catch (error) {
    console.log('error updating program', error);
  }
};

export const mergePrograms = (mergeParams: MergeProgramParams) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    await programService.mergePrograms(mergeParams);
    const programs = await programService.getAll();
    dispatch({
      type: GET_ALL_PROGRAMS,
      data: programs,
    });
  } catch (error) {
    console.log(
      'error merging two programs programActions.mergePrograms',
      error
    );
  }
};
