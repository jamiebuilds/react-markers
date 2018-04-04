// @flow
'use strict';
var ATTR = 'data-react-marker';
var MATCH_NONE = '#x:before'; // fastest way to match no elements
var UNIQUE_ID = 0;

/*::
type Marker = { [typeof ATTR]: number };
*/

function marker() /*: Marker | null */ {
  if (process.env.NODE_ENV === 'test') return { [ATTR]: UNIQUE_ID++ };
  return null;
}

function notInTest(/*:: element: HTMLElement, marker: Marker | null */) {
  throw new Error('Can only use marker.find/findAll inside a test environment (NODE_ENV=test)');
}

var find = notInTest;
var findAll = notInTest;

if (process.env.NODE_ENV === 'test') {
  function assert(element /*: HTMLElement */, marker /*: Marker | null */) {
    if (
      !(element instanceof HTMLElement) ||
      !(marker === null || typeof marker === 'object' && typeof marker[ATTR] === 'number')
    ) {
      throw new Error('Must pass a element and marker to "find/findAll(element, marker)"');
    }
  }

  function toSelector(marker /*: Marker | null */) {
    return marker ? '[' + ATTR + '="' + marker[ATTR] + '"]' : MATCH_NONE;
  }

  find = function(element /*: HTMLElement */, marker /*: Marker | null */) /*: HTMLElement | null */ {
    assert(element, marker);
    return element.querySelector(toSelector(marker));
  };

  findAll = function(element /*: HTMLElement */, marker /*: Marker | null */) /*: NodeList<HTMLElement> */ {
    assert(element, marker);
    return element.querySelectorAll(toSelector(marker));
  };
}

module.exports = marker;
module.exports.find = find;
module.exports.findAll = findAll;
