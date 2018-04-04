// @flow
'use strict';
const test = require('ava');
const React = require('react');
const {render} = require('react-dom');
const marker = require('./');

test('find()', t => {
  let button = marker();
  let container = document.createElement('div');
  render(React.createElement('button', { ...button }), container);
  let found = marker.find(container, button);
  t.is(found instanceof HTMLButtonElement, true);
});

test('findAll()', t => {
  let button = marker();
  let container = document.createElement('div');
  render(React.createElement('button', { ...button }), container);
  let found = marker.findAll(container, button);
  t.is(found instanceof NodeList, true);
  t.is(found.length, 1);
});
