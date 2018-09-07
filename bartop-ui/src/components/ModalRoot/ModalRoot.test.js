import React from 'react';
import { shallow } from 'enzyme';

import { noop } from '../../test-helpers/utils';
import { ModalRoot } from './ModalRoot';
import { MODAL_TYPES } from '../../ducks/modals/modals';
import Modal from '../Modal/Modal';

const requiredProps = {
  hideModal: noop
};

it('if modalType is null, renders nothing', () => {
  const wrapper = shallow(<ModalRoot {...requiredProps} />);
  expect(wrapper.type()).toBe(null);
});

it('renders the provided modalType', () => {
  const wrapper = shallow(
    <ModalRoot {...requiredProps} modalType={MODAL_TYPES.DEFAULT_MODAL} />
  );
  expect(wrapper.type()).toEqual(Modal);
});
