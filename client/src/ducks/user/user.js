import barTopAPI from '../../singletons/bartop-api';
import { types as authTypes } from '../authentication/authentication';

export const types = {
  CREATE_REQUEST: 'USER/CREATE_REQUEST',
  CREATE_SUCCESS: 'USER/CREATE_SUCCESS',
  CREATE_FAILURE: 'USER/CREATE_FAILURE',
  REQUEST_NAME: 'USER/REQUEST_NAME',
  SET_NAME: 'USER/SET_NAME'
};

export const actions = {
  create: id => ({
    types: [types.CREATE_REQUEST, types.CREATE_SUCCESS, types.CREATE_FAILURE],
    call: () => barTopAPI.createUser(id)
  }),
  requestName: () => ({
    type: types.REQUEST_NAME
  }),
  setName: name => (dispatch, getState) => {
    dispatch({
      type: types.SET_NAME,
      name
    });
    // TODO - post name to Auth0 user metadata
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
