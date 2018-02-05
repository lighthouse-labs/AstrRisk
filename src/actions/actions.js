import * as types from './actionTypes';

export const testButton = (data) => ({
  type: types.TEST,
  payload: data
})

export const getNeoData = (date) => {
  return (dispatch, getState) => {
    console.log('Attempting to retrieve data...');
    //Usage: year = '1990-02-14' for sample
    fetch(`http://localhost:3001/api/neo/${date}`)
      .then(res => res.json())
      .then(
      (result) => {
        console.log('Received data from server');
        dispatch(loadNeoData(result));
        dispatch(getDate(date));
      },
      (error) => {
        console.log('Error getting data from server: ', error);
      }
      )
  }
}

export const getFireballData = () => {
  return (dispatch, getState) => {
    console.log('Attempting to retrieve fireball data...');
    fetch('http://localhost:3001/api/fireball')
      .then(res => res.json())
      .then(
      (result) => {
        console.log('Received fireball data from server');
        dispatch(loadFireballData(result))
      },
      (error) => {
        console.log('Error getting fireball data from server: ', error);
      }
      )
  }
}

export const getAnnualNeoData = (year) => {
  return (dispatch, getState) => {
    console.log('Attempting to retrieve annual data...');
    fetch(`http://localhost:3001/api/annual/${year}`)
      .then(res => res.json())
      .then(
      (result) => {
        console.log('Received annual data from server');
        dispatch(getAnnualData(result));
      },
      (error) => {
        console.log('Error getting annual data from server: ', error);
      }
      )
  }
}



export const togglePopUp = () => ({
  type: types.TOGGLEPOPUP
});

export const getAnnualData = (data) => ({
  type: types.LOADANNUALDATA,
  payload: data
});

export const getDate = (date) => ({
  type: types.GETDATE,
  payload: date
});

export const loadFireballData = (data) => ({
  type: types.LOADFIREBALLDATA,
  payload: data
});

export const loadNeoData = (data) => ({
  type: types.LOADNEODATA,
  payload: data
});

export const showNeoData = (data) => ({
  type: types.SHOWNEODATA,
});

export const changeSlider = (data) => ({
  type: types.SLIDERCHANGE,
  payload: data
});
