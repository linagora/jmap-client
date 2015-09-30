'use strict';

import Utils from '../utils/Utils.js';

export default class AuthAccess {
  /**
   * This class represents a JMAP [Auth Access Response]{@link http://jmap.io/spec.html#authentication}.
   *
   * @constructor
   *
   * @param payload {Object} The server response of an auth access request.
   */

  constructor(payload) {
    Utils.assertRequiredParameterIsPresent(payload, 'payload');
    Utils.assertRequiredParameterIsPresent(payload.accessToken, 'accessToken');
    Utils.assertRequiredParameterIsPresent(payload.api, 'api');
    Utils.assertRequiredParameterIsPresent(payload.eventSource, 'eventSource');
    Utils.assertRequiredParameterIsPresent(payload.upload, 'upload');
    Utils.assertRequiredParameterIsPresent(payload.download, 'download');

    this.accessToken = payload.accessToken;
    this.api = payload.api;
    this.eventSource = payload.eventSource;
    this.upload = payload.upload;
    this.download = payload.download;
  }
}
