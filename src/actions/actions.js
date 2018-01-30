import * as types from './actionTypes';

export const testAction = data => ({
  type: types.TESTACTION,
  payload: data
})

export const loadData = () => {
  return (dispatch, getState) => {
    console.log('Attempting to retrieve data...');
    fetch("http://localhost:3001/api/1990-02-14")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('Received data from server');
          dispatch(newData(result))
        },
        (error) => {
          console.log(error);
        }
      )
  }
}

export const newData = (data) => ({
    type: types.NEWDATA,
    payload: data
})
