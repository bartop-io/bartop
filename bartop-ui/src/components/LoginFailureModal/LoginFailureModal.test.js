import React from 'react';
import { shallow } from 'enzyme';

import LoginFailureModal from './LoginFailureModal';
import { noop } from '../../test-helpers/utils';

const requiredProps = {
  showCode: noop
};

it('matches the snapshot', () => {
  const wrapper = shallow(<LoginFailureModal {...requiredProps} />);
  expect(wrapper).toMatchSnapshot();
});
