'use strict';

import Model from './Model.js';
import Utils from '../utils/Utils.js';
import Constants from '../utils/Constants.js';
import Account from './Account.js';
import ServerCapabilities from './ServerCapabilities.js';
import MailCapabilities from './MailCapabilities.js';
import JSONBuilder from '../utils/JSONBuilder.js';

export default class AuthAccess extends Model {
  /**
   * This class represents a JMAP [Auth Access Response]{@link http://jmap.io/spec-core.html#201-authentication-is-complete-access-token-created}.
   *
   * @constructor
   *
   * @param jmap {Client} The {@link Client} instance that created this _AuthAccess_.
   * @param payload {Object} The server response of an auth access request.
   */
  constructor(jmap, payload) {
    super(jmap);

    Utils.assertRequiredParameterIsPresent(payload, 'payload');
    ['username', 'accessToken', 'signingId', 'signingKey', 'apiUrl', 'eventSourceUrl', 'uploadUrl', 'downloadUrl', 'accounts', 'capabilities'].forEach((property) => {
      Utils.assertRequiredParameterIsPresent(payload[property], property);
    });

    this.username = payload.username;
    this.accessToken = payload.accessToken;
    this.signingId = payload.signingId;
    this.signingKey = payload.signingKey;
    this.apiUrl = payload.apiUrl;
    this.eventSourceUrl = payload.eventSourceUrl;
    this.uploadUrl = payload.uploadUrl;
    this.downloadUrl = payload.downloadUrl;
    this.capabilities = payload.capabilities;
    this.serverCapabilities = new ServerCapabilities(this.capabilities[Constants.CORE_CAPABILITIES_URI] || {});
    this.mailCapabilities = new MailCapabilities(this.capabilities[Constants.MAIL_CAPABILITIES_URI] || {});

    this.accounts = {};
    for (var accountId in payload.accounts) {
      this.accounts[accountId] = Account.fromJSONObject(jmap, Object.assign({ id: accountId }, payload.accounts[accountId]));
    }
  }

  /**
   * Creates a JSON representation from this {@link AuthAccess}.
   *
   * @return JSON object with only owned properties and non-null default values.
   */
  toJSONObject() {
    return new JSONBuilder()
      .append('username', this.username)
      .append('accessToken', this.accessToken)
      .append('signingId', this.signingId)
      .append('signingKey', this.signingKey)
      .append('apiUrl', this.apiUrl)
      .append('eventSourceUrl', this.eventSourceUrl)
      .append('uploadUrl', this.uploadUrl)
      .append('downloadUrl', this.downloadUrl)
      .appendObject('accounts', this.accounts)
      .appendObject('capabilities', this.capabilities)
      .build();
  }
}
