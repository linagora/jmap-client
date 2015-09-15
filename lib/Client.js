'use strict';

/* global ES6PromiseProvider: false, Utils: false, Account: false, Mailbox: false */

class Client {
  constructor(transport, promiseProvider) {
    Utils.assertRequiredParameterIsPresent(transport, 'transport');

    this.transport = transport;
    this.transport.promiseProvider = promiseProvider || new ES6PromiseProvider();
  }

  withAuthenticationToken(token) {
    this.authToken = token;
    return this;
  }

  withAPIUrl(url) {
    this.apiUrl = url;
    return this;
  }

  getAccounts(options) {
    return this._jmapListRequest('getAccounts', options, Account);
  }

  getMailboxes(options) {
    return this._jmapListRequest('getMailboxes', options, Mailbox);
  }

  _jmapListRequest(command, options, Model) {
    return this.transport
      .post(this.apiUrl, this._defaultHeaders(), Client._jmapRequest(command, options))
      .then(Utils.assertValidJMAPResponse.bind(null, command))
      .then(function(data) {
        return data[0][1].list;
      })
      .then(Utils.jsonArrayToModelList.bind(null, this, Model));
  }

  _defaultHeaders() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: this.authToken
    };
  }

  static _jmapRequest(command, options) {
    return [[command, options || {}, '#0']];
  }

}
