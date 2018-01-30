import { combineReducers } from 'redux';
import { testReducer, neoDataReducer } from './reducers';

const rootReducer = combineReducers({
  //Reducers go here
  testReducer,
  neoData: neoDataReducer
})

export default rootReducer;
