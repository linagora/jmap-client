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

  // chai-datetime is self-registering in the browser
  // we're returning a noop function so that the call to chai.use() does nothing
  if (name === 'chai-datetime') {
    return function() {};
  }
};
