import { Action, Reducer } from 'redux';
import {
  GET_ONE_PROGRAM,
  GET_ALL_PROGRAMS,
  GET_ALL_ACTIVE_PROGRAMS,
  CREATE_NEW_PROGRAM,
  CREATE_NEW_PROGRAM_ON_NEW_REPORT,
  UPDATE_PROGRAM,
  ProgramState,
  ProgramActionTypes,
} from './types';

const initialState: ProgramState = {
  allPrograms: [],
  activePrograms: [],
  program: null,
  loading: false,
};

const programReducer: Reducer<ProgramState, Action> = (
  state = initialState,
  action: ProgramActionTypes
) => {
  switch (action.type) {
    case GET_ALL_PROGRAMS:
      return {
        ...state,
        allPrograms: action.data,
        loading: false,
      };
    case GET_ALL_ACTIVE_PROGRAMS:
      return {
        ...state,
        activePrograms: action.data,
        loading: false,
      };
    case GET_ONE_PROGRAM:
      return {
        ...state,
        program: action.data,
        loading: false,
      };
    case CREATE_NEW_PROGRAM:
      return {
        ...state,
        allPrograms: [...state.allPrograms, action.data],
        loading: false,
      };
    case CREATE_NEW_PROGRAM_ON_NEW_REPORT:
      return {
        ...state,
        activePrograms: [...state.activePrograms, action.data],
        loading: false,
      };
    case UPDATE_PROGRAM:
      return {
        ...state,
        allPrograms: state.allPrograms.map((program) =>
          program.id === action.data.id ? action.data : program
        ),
        loading: false,
      };
    default:
      return state;
  }
};
export default programReducer;
