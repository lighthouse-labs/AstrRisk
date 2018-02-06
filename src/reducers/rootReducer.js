import { combineReducers } from 'redux';
import { testReducer, neoDataReducer, fireBallDataReducer, dateReducer, getSliderReducer, togglePopUpReducer, toggleFireballReducer, annualDataReducer, toggleGraphReducer } from './reducers';

const rootReducer = combineReducers({
  neoData: neoDataReducer,
  fireBallData: fireBallDataReducer,
  currentDate: dateReducer,
  sliderData: getSliderReducer,
  showPopUp: togglePopUpReducer,
  annualData: annualDataReducer,
  showFireball: toggleFireballReducer,
  showGraph: toggleGraphReducer
})

export default rootReducer;
