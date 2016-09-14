'use strict';

import Utils from '../utils/Utils.js';

export default class AuthMethod {
  /**
   * This class represents a JMAP [AuthMethod]{@link http://jmap.io/spec.html#getting-an-access-token}.
   *
   * @constructor
   *
   * @param payload {Object} The server response of POST request to the authentication URL.
   */

  constructor(payload) {
    Utils.assertRequiredParameterIsPresent(payload, 'payload');
    Utils.assertRequiredParameterHasType(payload.type, 'type', 'string');

    Object.assign(this, payload);
  }
}
