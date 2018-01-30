const initialState = ['STATE IS CURRENTLY EMPTY'];

export const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST':
      console.log('The payload is: ', action.payload);
      return action.payload
    default:
      return state
  }
}

export const neoDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADNEODATA':
      console.log('New NEO Data: ', action.payload)
      return action.payload
    default:
      return state
  }
}