import { combineReducers } from 'redux';
import repositoriesReducer from './repositoriesReducer';
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './userReducers';

const reducers = combineReducers({
  repositories: repositoriesReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
