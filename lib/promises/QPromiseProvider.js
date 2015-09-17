'use strict';

import PromiseProvider from './PromiseProvider.js';

export default class QPromiseProvider extends PromiseProvider {
  newPromise(resolver) {
    return require('q').Promise(resolver);
  }
}
