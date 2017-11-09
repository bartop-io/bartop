import { types } from './app';
import { actions } from './app';
import reducer from './app';

it('should create an action to toggle something', () => {
  const expectedAction = {
    type: types.TOGGLE_SOMETHING
  };
  expect(actions.toggleSomething()).toEqual(expectedAction);
});

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    something: false
  });
});

it('should handle TOGGLE_SOMETHING', () => {
  expect(
    reducer(undefined, {
      type: types.TOGGLE_SOMETHING
    })
  ).toEqual({
    something: true
  });
});
