import { combineReducers } from 'redux';
import { testReducer, neoDataReducer, fireBallDataReducer, yearReducer } from './reducers';

const rootReducer = combineReducers({
  testReducer,
  neoData: neoDataReducer,
  fireBallData: fireBallDataReducer,
  currentDate: yearReducer
})

export default rootReducer;
