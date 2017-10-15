import {
  REDIRECT,
  LOGOUT,
  LOGIN,
  REGISTER,
  ASYNC_START,
  ASYNC_END,
  APP_LOAD
} from '../constants/actionTypes';

const defaultState = {
  appName: 'Meetingku',
  token: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case REDIRECT:
      return { ...state, redirectTo: action.value };
    case LOGOUT:
      return { ...state, redirectTo: '/login', token: null, currentUser: null };
    case LOGIN:
      return {
        ...state,
        redirectTo: action.error ? null : '/agenda',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/login',
        token: null,
        currentUser: null
      };
    case ASYNC_START:
      return {
        ...state,
        inProgress: true
      };
    case ASYNC_END:
      return {
        ...state,
        inProgress: false
      };
    default:
      return state;
  }
};
