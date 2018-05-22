export const MODAL_TYPES = {
  DEFAULT_MODAL: 'DEFAULT_MODAL',
  LOGIN_MODAL: 'LOGIN_MODAL',
  VERIFY_CODE_MODAL: 'VERIFY_CODE_MODAL',
  LOGIN_FAILURE_MODAL: 'LOGIN_FAILURE_MODAL'
};

export const types = {
  SHOW_MODAL: 'MODALS/SHOW_MODAL',
  HIDE_MODAL: 'MODALS/HIDE_MODAL'
};

export const actions = {
  showModal: (modalType, modalProps = {}) => ({
    type: types.SHOW_MODAL,
    modalType,
    modalProps
  }),
  hideModal: () => ({
    type: types.HIDE_MODAL
  })
};

export const initialState = {
  modalType: null,
  modalProps: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_MODAL:
      const { modalType, modalProps } = action;
      return {
        modalType,
        modalProps
      };
    case types.HIDE_MODAL:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
