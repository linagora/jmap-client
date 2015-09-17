'use strict';

import PromiseProvider from './PromiseProvider.js';

export default class ES6PromiseProvider extends PromiseProvider {
  newPromise(resolver) {
    return new Promise(resolver);
  }
}
