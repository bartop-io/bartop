import { configure, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered';

const req = require.context('../src/components', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

addDecorator(centered);

configure(loadStories, module);
