import { combineReducers } from 'redux';
import { testReducer, neoDataReducer, fireBallDataReducer, dateReducer, getSliderReducer, togglePopUpReducer, annualDataReducer } from './reducers';

const rootReducer = combineReducers({
  testReducer,
  neoData: neoDataReducer,
  fireBallData: fireBallDataReducer,
  currentDate: dateReducer,
  sliderData: getSliderReducer,
  showPopUp: togglePopUpReducer,
  annualData: annualDataReducer
})

export default rootReducer;
