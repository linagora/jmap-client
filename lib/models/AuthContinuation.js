'use strict';

import Utils from '../utils/Utils.js';

export default class AuthContinuation {
  /**
   * This class represents a JMAP [Auth Continuation Response]{@link http://jmap.io/spec.html#authentication}.
   *
   * @constructor
   *
   * @param payload {Object} The server response of an initial auth request.
   */
  constructor(payload) {
    Utils.assertRequiredParameterIsPresent(payload, 'payload');
    Utils.assertRequiredParameterIsPresent(payload.continuationToken, 'continuationToken');
    Utils.assertRequiredParameterIsArrayWithMinimumLength(payload.methods, 'methods');

    this.continuationToken = payload.continuationToken;
    this.methods = payload.methods;
    this.prompt = payload.prompt || null;
  }
}
