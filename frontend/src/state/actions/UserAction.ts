import {
  USER_LOGIN_ACTION,
  USER_REGISTER_ACTION,
  USER_DETAILS_ACTION,
  USER_UPDATE_ACTION,
  USER_LIST_ACTION,
  USER_REQUEST_ACTION,
  USER_UPDATE_PROFILE_ACTION,
} from '../action-types';
type User = {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
};
/**
 * User Login
 */
interface UserLoginRequest {
  type: USER_LOGIN_ACTION.USER_LOGIN_REQUEST;
}
interface UserLoginSuccess {
  type: USER_LOGIN_ACTION.USER_LOGIN_SUCCESS;
  payload: User;
}
interface UserLoginFail {
  type: USER_LOGIN_ACTION.USER_LOGIN_FAIL;
  payload: any;
}
interface UserLogout {
  type: USER_LOGIN_ACTION.USER_LOGOUT;
}
/**
 * User Register
 */
interface UserRegisterRequest {
  type: USER_REGISTER_ACTION.USER_REGISTER_REQUEST;
}

interface UserRegisterSuccess {
  type: USER_REGISTER_ACTION.USER_REGISTER_SUCCESS;
  payload: User;
}

interface UserRegisterFail {
  type: USER_REGISTER_ACTION.USER_REGISTER_FAIL;
  payload: any;
}

interface UserRegisterLogout {
  type: USER_REGISTER_ACTION.USER_REGISTER_LOGOUT;
}

/**
 * User Details
 */
interface UserDetailRequest {
  type: USER_DETAILS_ACTION.USER_DETAILS_REQUEST;
}

interface UserDetailSuccess {
  type: USER_DETAILS_ACTION.USER_DETAILS_SUCCESS;
  payload: User;
}

interface UserDetailFail {
  type: USER_DETAILS_ACTION.USER_DETAILS_FAIL;
  payload: any;
}

interface UserDetailReset {
  type: USER_DETAILS_ACTION.USER_DETAILS_RESET;
}

interface UserUpdateProfileRequest {
  type: USER_UPDATE_PROFILE_ACTION.USER_UPDATE_PROFILE_REQUEST;
}

interface UserUpdateProfileSuccess {
  type: USER_UPDATE_PROFILE_ACTION.USER_UPDATE_PROFILE_SUCCESS;
  payload: User;
}

interface UserUpdateProfileFail {
  type: USER_UPDATE_PROFILE_ACTION.USER_UPDATE_PROFILE_FAIL;
  payload: any;
}

interface UserListRequest {
  type: USER_LIST_ACTION.USER_LIST_REQUEST;
}

interface UserListSuccess {
  type: USER_LIST_ACTION.USER_LIST_SUCCESS;
  payload: User[];
}

interface UserListFail {
  type: USER_LIST_ACTION.USER_LIST_FAIL;
  payload: any;
}

interface UserListReset {
  type: USER_LIST_ACTION.USER_LIST_RESET;
}

interface UserDeleteRequest {
  type: USER_REQUEST_ACTION.USER_DELETE_REQUEST;
}

interface UserDeleteSuccess {
  type: USER_REQUEST_ACTION.USER_DELETE_SUCCESS;
}

interface UserDeleteFail {
  type: USER_REQUEST_ACTION.USER_DELETE_FAIL;
  payload: any;
}

interface UserUpdateRequest {
  type: USER_UPDATE_ACTION.USER_UPDATE_REQUEST;
}

interface UserUpdateSuccess {
  type: USER_UPDATE_ACTION.USER_UPDATE_SUCCESS;
}

interface UserUpdateFail {
  type: USER_UPDATE_ACTION.USER_UPDATE_FAIL;
  payload: any;
}

interface UserUpdateReset {
  type: USER_UPDATE_ACTION.USER_UPDATE_RESET;
}

export type UserAction =
  | UserLoginRequest
  | UserLoginSuccess
  | UserLoginFail
  | UserLogout
  | UserRegisterRequest
  | UserRegisterSuccess
  | UserRegisterFail
  | UserRegisterLogout
  | UserDetailRequest
  | UserDetailSuccess
  | UserDetailFail
  | UserDetailFail
  | UserDetailReset
  | UserUpdateProfileRequest
  | UserUpdateProfileSuccess
  | UserUpdateProfileFail
  | UserListRequest
  | UserListSuccess
  | UserListFail
  | UserListReset
  | UserDeleteRequest
  | UserDeleteSuccess
  | UserDeleteFail
  | UserUpdateRequest
  | UserUpdateSuccess
  | UserUpdateFail
  | UserUpdateReset;
