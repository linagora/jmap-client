'use strict';

/* global jmap: false, chai: false, Q: false */

window.require = function(name) {
  if (/jmap-client/.test(name)) {
    return { jmap: jmap };
  }

  if (name === 'chai') {
    return chai;
  }

  if (name === 'q') {
    return Q;
  }
};
