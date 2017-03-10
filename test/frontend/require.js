'use strict';

/* global jmap: false, chai: false, Q: false, sinon: false */

window.require = function(name) {
  if (/jmap-client/.test(name)) {
    return jmap;
  }

  if (name === 'chai') {
    return chai;
  }

  if (name === 'q') {
    return Q;
  }

  if (name === 'sinon') {
    return sinon;
  }

  // chai plugins are self-registering in the browser
  // we're returning a noop function so that the call to chai.use() does nothing
  if (name === 'chai-datetime' || name === 'chai-shallow-deep-equal' || name === 'sinon-chai') {
    return function() {};
  }
};
