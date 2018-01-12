import { types as authTypes } from '../authentication/authentication';

export const types = {
  REQUEST_NAME: 'USER/REQUEST_NAME',
  SET_NAME: 'USER/SET_NAME'
};

export const actions = {
  requestName: () => ({
    type: types.REQUEST_NAME
  }),
  setName: name => (dispatch, getState) => {
    dispatch({
      type: types.SET_NAME,
      name
    });
    // post name to Auth0 user metadata
    console.log('gonna post name to Auth0 as well');
  }
};

export const initialState = {
  id: '',
  name: '',
  email: '',
  phoneNumber: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authTypes.LOGIN_SUCCESS:
      const { id, name, email, phoneNumber } = action.userInfo;
      return {
        ...state,
        id,
        name,
        email,
        phoneNumber
      };
    case authTypes.LOGOUT:
      return {
        ...initialState
      };
    case types.SET_NAME:
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }
};
