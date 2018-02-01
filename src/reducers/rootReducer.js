import { combineReducers } from 'redux';
import { testReducer, neoDataReducer, fireBallDataReducer, dateReducer } from './reducers';

const rootReducer = combineReducers({
  testReducer,
  neoData: neoDataReducer,
  fireBallData: fireBallDataReducer,
  currentDate: dateReducer
})

export default rootReducer;
