'use strict';

/* global PromiseProvider: false */

class ES6PromiseProvider extends PromiseProvider {
  newPromise(resolver) {
    return new Promise(resolver);
  }
}
