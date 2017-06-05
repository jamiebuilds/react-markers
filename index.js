// @flow
'use strict';

const React = require('react');

/*::
type ClassComponent<Props> = Class<React.Component<any, Props, any>>;
type FunctionComponent<Props> = (props: Props) => React$Element<any>;

type ComponentOrString<Props> =
  | ClassComponent<Props>
  | FunctionComponent<Props>
  | string;

type Marker<Props> = FunctionComponent<Props>;
*/

let ID = Symbol.for('react-marker-provide-id');
let KEY /*: any */ = Symbol('react-marker-id-key');
let zeroWidthSpace = '\u200b';
let uniqueId = 0;

function marker/*:: <Props: {}> */(
  Component /*: ComponentOrString<Props> */,
  opts /*: Object */ = {}
) /*: Marker<Props> */ {
  let id = opts[ID] || uniqueId++;
  let fn;

  if (process.env.NODE_ENV === 'test') {
    fn = function(props) {
      return React.createElement(Component, Object.assign({}, props, {
        'data-marker': zeroWidthSpace + id,
      }));
    };
  } else {
    fn = function(props) {
      return React.createElement(Component, props);
    };
  }

  fn[KEY] = id;

  return fn;
}

function assertElement(method, element) {
  if (!(element instanceof HTMLElement)) {
    throw new Error('Must pass a DOM element to "' + method + '(element, ...)"');
  }
}

function assertMarker(method, marker) {
  if (!marker || typeof marker[KEY] === 'undefined') {
    throw new Error('Must pass a marker to "' + method + '(..., marker)"');
  }
}

function toSelector(marker) {
  return '[data-marker="' + zeroWidthSpace + marker[KEY] + '"]';
}

function find(element /*: HTMLElement */, marker /*: Marker<Object> */) /*: HTMLElement | null */ {
  assertElement('find', element);
  assertMarker('find', marker);
  return element.querySelector(toSelector(marker));
}

function findAll(element /*: HTMLElement */, marker /*: Marker<Object> */) /*: NodeList<HTMLElement> */ {
  assertElement('findAll', element);
  assertMarker('findAll', marker);
  return element.querySelectorAll(toSelector(marker));
}

exports.marker = marker;
exports.find = find;
exports.findAll = findAll;
