'use strict';

export default class ServerCapabilities {
  /**
   * This class represents a JMAP [ServerCapabilities]{@link http://jmap.io/spec-core.html#201-authentication-is-complete-access-token-created}.<br />
   * An _ServerCapabilities_ object describes general capabilities of a JMAP server.
   *
   * @constructor
   *
   * @param [opts] {Object} The optional properties of this _ServerCapabilities_.
   * @param [opts.maxSizeUpload=0] {Number} The maximum file size, in bytes, that the server will accept for a single file upload.
   * @param [opts.maxSizeRequest=0] {Number} The maximum size, in bytes, that the server will accept for a single request to the API endpoint.
   * @param [opts.maxConcurrentUpload=1] {Number} The maximum number of concurrent requests the server will accept to the upload endpoint.
   * @param [opts.maxConcurrentRequests=1] {Number} The maximum number of concurrent requests the server will accept to the API endpoint.
   * @param [opts.maxCallsInRequest=1] {Number} The maximum number of method calls the server will accept in a single request to the API endpoint.
   * @param [opts.maxObjectsInGet=0] {Number} The maximum number of objects that the client may request in a single getXXX type method call.
   * @param [opts.maxObjectsInSet=0] {Number} The maximum number of objects the client may send to create, update or destroy in a single setXXX type method call.
   */
  constructor(opts) {
    opts = opts || {};

    this.maxSizeUpload = opts.maxSizeUpload || 0;
    this.maxSizeRequest = opts.maxSizeRequest || 0;
    this.maxConcurrentUpload = opts.maxConcurrentUpload || 1;
    this.maxConcurrentRequests = opts.maxConcurrentRequests || 1;
    this.maxCallsInRequest = opts.maxCallsInRequest || 1;
    this.maxObjectsInGet = opts.maxObjectsInGet || 0;
    this.maxObjectsInSet = opts.maxObjectsInSet || 0;
  }
}
