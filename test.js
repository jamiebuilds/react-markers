// @flow
'use strict';

const React = require('react');
const {render} = require('react-dom');
const {marker, find, findAll} = require('./');

test('find()', () => {
  let Button = marker('button');
  let container = document.createElement('div');
  render(React.createElement(Button), container);
  expect(find(container, Button)).toBeInstanceOf(HTMLButtonElement);
});

test('findAll()', () => {
  let Button = marker('button');
  let container = document.createElement('div');
  render(React.createElement(Button), container);
  expect(findAll(container, Button)).toBeInstanceOf(NodeList);
});
