'use strict';

import PromiseProvider from './PromiseProvider.js';

/**
 * A {@link PromiseProvider} implementation creating [Q]{@link https://github.com/kriskowal/q} promises.<br />
 * This class requires `Q` to be installed as dependency.
 *
 * @class QPromiseProvider
 *
 * @see PromiseProvider
 */
export default class QPromiseProvider extends PromiseProvider {
  newPromise(resolver) {
    return require('q').Promise(resolver);
  }
}
