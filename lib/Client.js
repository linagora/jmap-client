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
    return this._jmapRequest('getAccounts', options);
  }

  getMailboxes(options) {
    return this._jmapRequest('getMailboxes', options);
  }

  getMessageList(options) {
    return this._jmapRequest('getMessageList', options);
  }

  getThreads(options) {
    return this._jmapRequest('getThreads', options);
  }

  getMessages(options) {
    return this._jmapRequest('getMessages', options);
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
      .then(Utils.assertValidJMAPResponse.bind(null, command))
      .then((data) => {
        return data.map(this._handleResponse.bind(this));
      })
      .then(function(responses) {
        return responses.length > 1 ? responses : responses[0];
      });
  }

  _handleResponse(response) {
    let name = response[0],
        fn = this['_handle' + Utils.capitalize(name) + 'Response'];

    // This will return the "raw" data if the command is unknown to the client
    return fn ? fn.bind(this)(response) : response[1];
  }

  _handleListResponse(response, Model) {
    return Utils.jsonArrayToModelList(this, Model, response[1].list);
  }

  _handleAccountsResponse(response) {
    return this._handleListResponse(response, Account);
  }

  _handleThreadsResponse(response) {
    return this._handleListResponse(response, Thread);
  }

  _handleMessagesResponse(response) {
    return this._handleListResponse(response, Message);
  }

  _handleMailboxesResponse(response) {
    return this._handleListResponse(response, Mailbox);
  }

  _handleMessageListResponse(response) {
    return MessageList.fromJSONObject(this, response[1]);
  }
}
