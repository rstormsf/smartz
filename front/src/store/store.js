import { combineReducers } from 'redux';
import { createStore } from 'redux';

import app from '../app/AppReducer';
import ctors from '../app/common/ctor-card/CtorsReducer';
import deploy from '../app/deploy/DeployReducer';
import instances from '../app/instances/InstancesReducer';
import login from '../app/auth/login/LoginReducer'

const reducers = combineReducers({
  app,
  ctors,
  deploy,
  instances,
  login
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
