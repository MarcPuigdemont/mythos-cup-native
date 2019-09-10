import React from 'react';
import 'react-native';
import { JSDOM } from 'jsdom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
global.document = new JSDOM();
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});
configure({ adapter: new Adapter() });

// Ignore React Web errors when using React Native
// allow other errors to propagate if they're relevant
const suppressedErrors = /(React does not recognize the.*prop on a DOM element|Unknown event handler property|is using uppercase HTML|Received `true` for a non-boolean attribute `accessible`|The tag.*is unrecognized in this browser|is using incorrect casing|Received `%s` for a non-boolean attribute `%s`)/;
const realConsoleError = console.error;
console.error = message => {
  if (message.match(suppressedErrors)) {
    return;
  }
  realConsoleError(message);
};
