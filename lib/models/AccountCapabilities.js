'use strict';

export default class AccountCapabilities {
  /**
   * This class represents a JMAP [AccountCapabilities]{@link http://jmap.io/spec.html#accounts*}.<br />
   * An _AccountCapabilities_ object describes general capabilities of a JMAP server.
   *
   * @constructor
   *
   * @param [opts] {Object} The optional properties of this _AccountCapabilities_.
   * @param [opts.maxSizeUpload=0] {Number} The maximum file size, in bytes, that the server will accept for a single file upload.
   */
  constructor(opts) {
    opts = opts || {};

    this.maxSizeUpload = opts.maxSizeUpload || 0;
  }
}
