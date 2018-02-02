import { combineReducers } from 'redux';
import { testReducer, neoDataReducer, fireBallDataReducer, dateReducer, getSliderReducer } from './reducers';

const rootReducer = combineReducers({
  testReducer,
  neoData: neoDataReducer,
  fireBallData: fireBallDataReducer,
  currentDate: dateReducer,
  sliderData: getSliderReducer
})

export default rootReducer;
