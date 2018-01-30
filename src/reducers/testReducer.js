const initialState = ['This is the initial state'];

export const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TESTACTION':
      console.log('The payload is: ', action.payload);
      return action.payload + " I'm adding my own stuff"
    default:
      return state
  }
}

export const loadDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEWDATA':
        console.log('New data is', action.payload)
        return action.payload
    default:
      return state
  }
}

