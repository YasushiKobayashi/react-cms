import { combineReducers } from 'redux';
import { routeReducer as routing } from 'redux-simple-router';
import app from './app';


const rootReducer = combineReducers({
  app,
  routing,
});

export default rootReducer;
