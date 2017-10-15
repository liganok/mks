import agent from './agent';
import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  REGISTER,
  AGENDA_SAVE,
  GET_LIST_AGENDA,
  GET_LIST_TRASH,
  AGENDA_GET_DETAIL,
  AI_ACTION_LOGIC_DEL,
} from './constants/actionTypes';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;


    action.payload.then(
      res => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        //console.log('RESULT', res);
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
        //console.log('action', action);
        if(action.type === AGENDA_SAVE){
          store.dispatch({ type: AGENDA_GET_DETAIL, payload:agent.Agenda.get(res.id)});
        }
        if(action.type === AI_ACTION_LOGIC_DEL){
          store.dispatch({type:GET_LIST_AGENDA, payload:agent.Agenda.all(1,0)})
          store.dispatch({type:GET_LIST_TRASH, payload:agent.Agenda.all(1,1)})          
        }
      },
      error => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('ERROR', error);
        action.error = true;
        action.payload = error.response.body;
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload });
        }
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === REGISTER || action.type === LOGIN) {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.user.token);
      agent.setToken(action.payload.user.token);
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('jwt', '');
    agent.setToken(null);
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware }
