'use strict';

/* global ES6PromiseProvider: false, Utils: false, Account: false */

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
    return this.transport
      .post(this.apiUrl, this._defaultHeaders(), Client._jmapRequest('getAccounts', options))
      .then(Utils.assertValidJMAPResponse.bind(null, 'getAccounts'))
      .then(function(data) {
        return data[0][1].list; // http://jmap.io/spec.html#getaccounts
      })
      .then(Utils.jsonArrayToModelList.bind(null, this, Account));
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
