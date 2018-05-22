import reducer, { MODAL_TYPES, types, actions, initialState } from './modals';

describe('modal actions', () => {
  it(`can show a modal`, () => {
    const expectedAction = {
      type: types.SHOW_MODAL,
      modalType: MODAL_TYPES.DEFAULT_MODAL,
      modalProps: {}
    };
    const action = actions.showModal(MODAL_TYPES.DEFAULT_MODAL);
    expect(action).toEqual(expectedAction);
  });

  it('can hide a modal', () => {
    const expectedAction = {
      type: types.HIDE_MODAL
    };
    const action = actions.hideModal();
    expect(action).toEqual(expectedAction);
  });
});

describe('modals reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should set modal type & props on showModal', () => {
    const expectedState = {
      ...initialState,
      modalType: MODAL_TYPES.DEFAULT_MODAL,
      modalProps: {}
    };
    expect(
      reducer(undefined, {
        type: types.SHOW_MODAL,
        modalType: MODAL_TYPES.DEFAULT_MODAL,
        modalProps: {}
      })
    ).toEqual(expectedState);
  });

  it('should clear state on hideModal', () => {
    expect(reducer(undefined, { type: types.HIDE_MODAL })).toEqual(
      initialState
    );
  });
});
