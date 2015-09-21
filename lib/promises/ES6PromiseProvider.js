'use strict';

import PromiseProvider from './PromiseProvider.js';

/**
 * A {@link PromiseProvider} implementation creating native ES6 Promises.<br />
 * This class supposes that the `Promise` class is available.
 *
 * @class ES6PromiseProvider
 *
 * @see PromiseProvider
 */
export default class ES6PromiseProvider extends PromiseProvider {
  newPromise(resolver) {
    return new Promise(resolver);
  }
}
