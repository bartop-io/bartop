// each duck will be split in to seperate files as the app evolves
// for now we just have one app duck
// w/ fake action type and the corresponding reducer and action creator

// ACTION TYPES
export const types = {
  TOGGLE_SOMETHING: 'APP/TOGGLE_SOMETHING'
};

// ACTION CREATORS
export const actions = {
  toggleSomething: () => ({ type: types.TOGGLE_SOMETHING })
};

// REDUCER
export const initialState = {
  something: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_SOMETHING:
      return { ...state, something: !state.something };
    default:
      return state;
  }
};
