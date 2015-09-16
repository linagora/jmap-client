'use strict';

/* global ES6PromiseProvider: false, Utils: false, Account: false, Mailbox: false */
/* global MessageList: false, Thread: false, Message: false */

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

  getMessageList(options) {
    return this._jmapRequest('getMessageList', options)
      .then(function(data) {
        return MessageList.fromJSONObject(this, data[0][1]);
      }.bind(this));
  }

  getThreads(options) {
    return this._jmapListRequest('getThreads', options, Thread);
  }

  getMessages(options) {
    return this._jmapListRequest('getMessages', options, Message);
  }

  _jmapListRequest(command, options, Model) {
    return this._jmapRequest(command, options)
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

  _jmapRequest(command, options) {
    return this.transport
      .post(this.apiUrl, this._defaultHeaders(), [[command, options || {}, '#0']])
      .then(Utils.assertValidJMAPResponse.bind(null, command));
  }

}
