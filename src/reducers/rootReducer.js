import { combineReducers } from 'redux';
import { testReducer, neoDataReducer, fireBallDataReducer, dateReducer, getSliderReducer, togglePopUpReducer, toggleFireballReducer, annualDataReducer } from './reducers';

const rootReducer = combineReducers({
  neoData: neoDataReducer,
  fireBallData: fireBallDataReducer,
  currentDate: dateReducer,
  sliderData: getSliderReducer,
  showPopUp: togglePopUpReducer,
  annualData: annualDataReducer,
  showFireball: toggleFireballReducer,
})

export default rootReducer;
