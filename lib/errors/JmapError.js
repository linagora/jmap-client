'use strict';

import Utils from '../utils/Utils';

export default class JmapError extends Error {
  /**
   * A `JmapError` is a custom `Error` thrown when a request is rejected by the JMAP backend. <br />
   * The _type_ property holds the type of error that happened. Refer to the JMAP [spec](http://jmap.io/spec-core.html#errors)
   * for details on the available errors. <br />
   * Other properties may be present with further information; these are detailed in the method descriptions where appropriate.
   *
   * @constructor
   *
   * @param payload {Object} The error payload, from which detailed information about the error can be retrieved.
   * @param [payload.type] {String} The type of this `JmapError`.
   * @param [payload.description=null] {String} The description, if any, of this `JmapError`.
   * @param [method=null] {String} The JMAP method that triggered this `JmapError`.
   *
   * @see Error
   */
  constructor(payload, method) {
    super();

    Utils.assertRequiredParameterIsPresent(payload, 'payload');
    Utils.assertRequiredParameterIsPresent(payload.type, 'payload.type');

    this.payload = payload;
    this.type = payload.type;
    this.description = payload.description || null;

    this.method = method || null;
  }

  /**
   * Returns a {@link String} representation of this `JmapError`.
   *
   * @returns {String} The human-readable representation of this `JmapError`.
   */
  toString() {
    return `JmapError{type=${this.type},description=${this.description},method=${this.method}}`;
  }
}
