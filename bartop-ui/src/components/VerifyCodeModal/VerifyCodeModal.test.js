import React from 'react';
import { shallow } from 'enzyme';

import { VerifyCodeModal } from './VerifyCodeModal';
import { noop } from '../../test-helpers/utils';

const requiredProps = {
  email: 'bilbo@bartop.io',
  verifyCode: noop
};

it('matches the snapshot', () => {
  const wrapper = shallow(<VerifyCodeModal {...requiredProps} />);
  expect(wrapper).toMatchSnapshot();
});
