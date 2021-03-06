export const INIT_USER_LIST = 'INIT_USER_LIST';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const SET_LOADING = 'SET_LOADING';

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  address?: string;
  zip?: string;
  city?: string;
  country?: string;
  phone?: string;
  status: number | null;
  level: number;
  last_seen?: string;
  reset_key?: string;
  old_id?: number;
  created_at?: Date;
  updated_at?: Date;
}
export type Users = Array<User>;

export interface UserToAdd {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
}

export enum UserLevel {
  'DJ' = 1,
  'Staff' = 2,
  'Admin' = 3,
}

export type UserLevelOptions = {
  value: UserLevel;
  label: string;
};

export interface AddUserFormValues {
  username: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface EditUserFormValues {
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  email: string;
  level: number;
  status: number | null;
}

export interface CurrentUserFormValues {
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserToUpdate {
  id: number;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  level: number;
  status: number | null;
}

export interface UserState {
  users: Users;
  loading: boolean;
}

// user action types
interface SetLoadingAction {
  type: typeof SET_LOADING;
}

interface InitUserListAction {
  type: typeof INIT_USER_LIST;
  data: Users;
}

interface CreateUser {
  type: typeof CREATE_USER;
  data: User;
}

interface UpdateUser {
  type: typeof UPDATE_USER;
  data: Users;
}

interface DeleteUser {
  type: typeof DELETE_USER;
  data: number;
}

export type UserActionTypes =
  | SetLoadingAction
  | InitUserListAction
  | CreateUser
  | UpdateUser
  | DeleteUser;
