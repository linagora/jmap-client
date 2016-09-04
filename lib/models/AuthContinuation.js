'use strict';

import Utils from '../utils/Utils.js';
import AuthMethod from './AuthMethod';

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
    Utils.assertRequiredParameterIsPresent(payload.loginId, 'loginId');
    Utils.assertRequiredParameterIsArrayWithMinimumLength(payload.methods, 'methods');

    this.loginId = payload.loginId;
    this.methods = payload.methods.map((method) => new AuthMethod(method));
    this.prompt = payload.prompt || null;
  }

  /**
   * Getter for the AuthMethod instance matching the given authentication type
   *
   * @param type {String} The authentication type
   * @return {AuthMethod}
   */
  getMethod(type) {
    Utils.assertRequiredParameterHasType(type, 'type', 'string');

    let result = null;

    this.methods.forEach((authMethod) => {
      if (authMethod.type === type) {
        result = authMethod;
      }
    });

    if (!result) {
      throw new Error('No AuthMethod of type "' + type + '" found');
    }

    return result;
  }

  /**
   * Checks if the given authentication type is supported by one of the registred auth methods
   *
   * @param type {String} The authentication type to check
   * @return {Boolean} True if supported, False otherwise
   */
  supports(type) {
    Utils.assertRequiredParameterHasType(type, 'type', 'string');

    let result = false;

    try {
      this.getMethod(type);
      result = true;
    } catch (e) {
    }

    return result;
  }

}
