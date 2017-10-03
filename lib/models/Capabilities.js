'use strict';

import Utils from '../utils/Utils.js';

export default class Capabilities {
  /**
   * This class represents an generic JMAP "capabilities" object. See {@link http://jmap.io/spec-core.html#getting-an-access-token*}.<br />
   *
   * @param namespace {String} The namespace/identifier of the capabilities.
   * @param [opts] {Object} The optional properties of this _Capabilities_.
   */
  constructor(namespace, opts) {
    Utils.assertRequiredParameterIsPresent(namespace, 'namespace');

    opts = opts || {};

    this.ns = namespace;
    Object.assign(this, opts);
  }
}
