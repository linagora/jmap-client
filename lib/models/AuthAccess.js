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
    ['username', 'accessToken', 'apiUrl', 'eventSourceUrl', 'uploadUrl', 'downloadUrl'].forEach((property) => {
      Utils.assertRequiredParameterIsPresent(payload[property], property);
    });

    this.username = payload.username;
    this.versions = payload.versions || [];
    this.extensions = payload.extensions || {};
    this.accessToken = payload.accessToken;
    this.apiUrl = payload.apiUrl;
    this.eventSourceUrl = payload.eventSourceUrl;
    this.uploadUrl = payload.uploadUrl;
    this.downloadUrl = payload.downloadUrl;
  }
}
