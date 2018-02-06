import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, { types, actions, initialState } from './user';
import { types as authTypes } from '../authentication/authentication';
import { mockId, mockName, mockUserInfo } from '../../test-helpers/state-mocks';
import { CALL_API } from '../../middleware/call-api';

describe('user actions', () => {
  it(`can request the user's name`, () => {
    const expectedAction = {
      type: types.REQUEST_NAME
    };
    const action = actions.requestName();
    expect(action).toEqual(expectedAction);
  });

  it('can create a new user', () => {
    const expectedTypes = [
      types.CREATE_REQUEST,
      types.CREATE_SUCCESS,
      types.CREATE_FAILURE
    ];
    const callApi = actions.create(mockId)[CALL_API];
    expect(callApi.types).toEqual(expectedTypes);
    expect(typeof callApi.call).toEqual('function');
  });

  describe(`can set the user's name`, () => {
    let store;

    beforeAll(() => {
      store = configureMockStore([thunk])();
    });

    afterEach(() => {
      store.clearActions();
    });

    it('should dispatch synchronous setName', () => {
      const expectedAction = {
        type: types.SET_NAME,
        name: mockName
      };
      store.dispatch(actions.setName(mockName));
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });
});

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should set user information on login success', () => {
    const expectedState = {
      ...initialState,
      id: mockUserInfo.id,
      name: mockUserInfo.name,
      email: mockUserInfo.email,
      phoneNumber: mockUserInfo.phoneNumber
    };
    expect(
      reducer(undefined, {
        type: authTypes.LOGIN_SUCCESS,
        userInfo: mockUserInfo
      })
    ).toEqual(expectedState);
  });

  it('should clear user information on logout', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should set user's name`, () => {
    const expectedState = {
      ...initialState,
      name: mockName
    };
    expect(
      reducer(undefined, { type: types.SET_NAME, name: mockName })
    ).toEqual(expectedState);
  });
});
