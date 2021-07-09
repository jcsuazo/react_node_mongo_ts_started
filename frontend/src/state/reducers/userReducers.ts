import {
  USER_LOGIN_ACTION,
  USER_REGISTER_ACTION,
  USER_DETAILS_ACTION,
  USER_UPDATE_PROFILE_ACTION,
  USER_LIST_ACTION,
  USER_REQUEST_ACTION,
  USER_UPDATE_ACTION,
} from '../action-types/index';
import { UserAction } from '../actions/UserAction';
export type User = {
  name?: string;
  _id?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
  token?: string;
};
export interface UserState {
  userInfo?: User;
  loading: boolean;
  error?: string | null;
  data?: User | {};
  users?: User[] | [];
  user?: User;
  success?: boolean;
}
const initialSate = {
  loading: false,
  error: null,
  data: {},
};
export const userLoginReducer = (
  state: UserState = initialSate,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case USER_LOGIN_ACTION.USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_ACTION.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_ACTION.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGIN_ACTION.USER_LOGOUT:
      return { loading: false };
    default:
      return state;
  }
};

export const userRegisterReducer = (
  state: UserState = initialSate,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case USER_REGISTER_ACTION.USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_ACTION.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_ACTION.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_ACTION.USER_REGISTER_LOGOUT:
      return { loading: false };
    default:
      return state;
  }
};

export const userDetailsReducer = (
  state: UserState = initialSate,
  action: UserAction,
  // state: State = { user: {} },
): UserState => {
  switch (action.type) {
    case USER_DETAILS_ACTION.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_ACTION.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_ACTION.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_ACTION.USER_DETAILS_RESET:
      return { loading: false, user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (
  state: UserState = initialSate,
  action: UserAction,
  // action: Action,
): UserState => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_ACTION.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_ACTION.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_ACTION.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userListReducer = (
  state: UserState = initialSate,
  action: UserAction,
  // state: State = { users: [] },
  // action: Action,
): UserState => {
  switch (action.type) {
    case USER_LIST_ACTION.USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_ACTION.USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_ACTION.USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_ACTION.USER_LIST_RESET:
      return { loading: false, users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (
  state: UserState = initialSate,
  action: UserAction,
  // state: State = {},
  // action: Action
): UserState => {
  switch (action.type) {
    case USER_REQUEST_ACTION.USER_DELETE_REQUEST:
      return { loading: true };
    case USER_REQUEST_ACTION.USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_REQUEST_ACTION.USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (
  state: UserState = initialSate,
  action: UserAction,
  // state: State = { user: {} },
  // action: Action,
): UserState => {
  switch (action.type) {
    case USER_UPDATE_ACTION.USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_ACTION.USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_ACTION.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_ACTION.USER_UPDATE_RESET:
      return { loading: false, user: {} };
    default:
      return state;
  }
};
