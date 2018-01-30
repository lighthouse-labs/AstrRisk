import { combineReducers } from 'redux';
import { testReducer, loadDataReducer } from './testReducer';


const rootReducer = combineReducers({
  //Reducers go here
  testReducer,
  loadDataReducer
})

export default rootReducer;