import { types } from './app';
import { actions } from './app';

describe('app actions', () => {
  it('should create an action to toggle something', () => {
    const expectedAction = {
      type: types.TOGGLE_SOMETHING
    };
    expect(actions.toggleSomething()).toEqual(expectedAction);
  });
});
