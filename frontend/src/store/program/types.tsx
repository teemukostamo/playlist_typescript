export const GET_ONE_PROGRAM = 'GET_ONE_PROGRAM';
export const GET_ALL_PROGRAMS = 'GET_ALL_PROGRAMS';
export const GET_ALL_ACTIVE_PROGRAMS = 'GET_ALL_ACTIVE_PROGRAMS';
export const CREATE_NEW_PROGRAM = 'CREATE_NEW_PROGRAM';
export const CREATE_NEW_PROGRAM_ON_NEW_REPORT =
  'CREATE_NEW_PROGRAM_ON_NEW_REPORT';
export const UPDATE_PROGRAM = 'UPDATE_PROGRAM';
export const SET_LOADING = 'SET_LOADING';

export interface Program {
  id: number;
  user_id: number;
  name: string;
  identifier?: string;
  display?: number;
  site?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProgramState {
  allPrograms: Array<Program>;
  activePrograms: Array<Program>;
  program: Program | null;
  loading: boolean;
}

export interface NewProgramType {
  display: number;
  identifier?: string;
  name: string;
  site: number;
  user_id?: number;
}

export interface AddProgramFormValues {
  display: number;
  identifier?: string;
  name: string;
  site: number;
  user_id?: number;
}

export interface EditProgramFormValues {
  id: number;
  display: number;
  identifier?: string;
  name: string;
  site: number;
  user_id?: number;
}

export interface UpdateProgramType {
  id: number;
  display: number;
  identifier?: string;
  name: string;
  site: number;
  user_id?: number;
}

export interface MergeProgramParams {
  type: string;
  merge: number;
  mergeTo: number;
}

// program action types
interface SetLoadingAction {
  type: typeof SET_LOADING;
}

interface GetOneProgram {
  type: typeof GET_ONE_PROGRAM;
  data: Program;
}

interface GetAllPrograms {
  type: typeof GET_ALL_PROGRAMS;
  data: Array<Program>;
}

interface GetAllActivePrograms {
  type: typeof GET_ALL_ACTIVE_PROGRAMS;
  data: Array<Program>;
}

interface CreateNewProgram {
  type: typeof CREATE_NEW_PROGRAM;
  data: Program;
}

interface CreateNewProgramOnNewReport {
  type: typeof CREATE_NEW_PROGRAM_ON_NEW_REPORT;
  data: Program;
}

interface UpdateProgram {
  type: typeof UPDATE_PROGRAM;
  data: Program;
}

export type ProgramActionTypes =
  | SetLoadingAction
  | GetOneProgram
  | GetAllPrograms
  | GetAllActivePrograms
  | CreateNewProgram
  | CreateNewProgramOnNewReport
  | UpdateProgram;
