import { combineReducers } from 'redux';
import userReducer from './userReducer';

let rootReducer = combineReducers({
  userReducer: userReducer,
});

export default rootReducer;