import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers, { RootState } from './reducers';

//Set user info to the state if it is on local storage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo') || '')
  : null;
// type userInfo = {
//   userInfo: object;
// };
// type InitialState = {
//   userLogin: {
//     userInfo: object;
//   };
// };
// type User =
//   | {
//       name: string;
//       email: string;
//       password: string;
//       isAdmin: boolean;
//     }
//   | {};
// interface InitialState {
//   userLogin: User;
// }
const initialState: RootState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk),
);
