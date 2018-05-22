import React from 'react';
import { shallow } from 'enzyme';

import { LoginModal } from './LoginModal';
import { noop } from '../../test-helpers/utils';

const requiredProps = {
  history: {},
  sendCode: noop,
  showModal: noop
};

it('matches the snapshot', () => {
  const wrapper = shallow(<LoginModal {...requiredProps} />);
  expect(wrapper).toMatchSnapshot();
});
