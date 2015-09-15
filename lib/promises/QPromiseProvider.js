'use strict';

/* global PromiseProvider: false */

class QPromiseProvider extends PromiseProvider {
  newPromise(resolver) {
    return require('q').Promise(resolver);
  }
}
