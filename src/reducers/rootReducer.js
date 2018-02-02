import { combineReducers } from 'redux';
import { testReducer, neoDataReducer, fireBallDataReducer, dateReducer, togglePopUpReducer } from './reducers';

const rootReducer = combineReducers({
  testReducer,
  neoData: neoDataReducer,
  fireBallData: fireBallDataReducer,
  currentDate: dateReducer,
  showPopUp: togglePopUpReducer
})

export default rootReducer;
