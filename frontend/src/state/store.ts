import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';

//Set user info to the state if it is on local storage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo') || '')
  : null;
const initialState = {
  userLogin: { loading: false, userInfo: userInfoFromStorage },
};

const middleware = [thunk];

export const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
  // applyMiddleware(thunk),
);
