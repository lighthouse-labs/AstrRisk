import * as types from './actionTypes';

export const testButton = (data) => ({
  type: types.TEST,
  payload: data
})

export const getNeoData = (year) => {
  return (dispatch, getState) => {
    console.log('Attempting to retrieve data...');
    //Usage: year = '1990-02-14' for sample
    fetch(`http://localhost:3001/api/${year}`)
      .then(res => res.json())
      .then(
      (result) => {
        console.log('Received data from server');
        dispatch(loadNeoData(result))
      },
      (error) => {
        console.log('Error getting data from server', error);
      }
      )
  }
}

export const loadNeoData = (data) => ({
  type: types.LOADNEODATA,
  payload: data
})