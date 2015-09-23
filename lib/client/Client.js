'use strict';

import ES6PromiseProvider from './../promises/ES6PromiseProvider.js';
import Utils from './../utils/Utils.js';
import Account from './../models/Account.js';
import Mailbox from './../models/Mailbox.js';
import MessageList from './../models/MessageList.js';
import Thread from './../models/Thread.js';
import Message from './../models/Message.js';
import MessagesSet from './../models/MessagesSet.js';

export default class Client {
  /**
   * The {@link Client} class is the main entry point for sending JMAP requests to a remote server.<br />
   * It uses a fluent API so that it's easy to chain calls. JMAP requests are sent using one of the _getXXX_ methods
   * that map to their equivalent in the JMAP specification. For instance, if you want to do a _getAccounts_ request,
   * you'll use the {@link Client#getAccounts} method.
   *
   * @param transport {Transport} The {@link Transport} instance used to send HTTP requests.
   * @param [promiseProvider={@link ES6PromiseProvider}] {PromiseProvider} The {@link PromiseProvider} implementation to use.
   */
  constructor(transport, promiseProvider) {
    Utils.assertRequiredParameterIsPresent(transport, 'transport');

    this.transport = transport;
    this.transport.promiseProvider = promiseProvider || new ES6PromiseProvider();
  }

  /**
   * Registers an authentication token, obtained by an external mechanism from the target JMAP server.<br />
   * This token will then be used as the `Authorization` header, as per {@link http://jmap.io/spec.html#authenticating-http-requests}.<br />
   * <br />
   * The token will be exposed as the `authToken` property afterwards.
   *
   * @param token {String} The authentication token to use in JMAP requests.
   *
   * @return {Client} This Client instance.
   */
  withAuthenticationToken(token) {
    this.authToken = token;
    return this;
  }

  /**
   * Sets the API URL of the target JMAP server. All JMAP requests will be sent to this URL.<br />
   * <br />
   * The URL will be exposed as the `apiUrl` property afterwards.
   *
   * @param url {String} The API URL of the JMAP server.
   *
   * @return {Client} This Client instance.
   */
  withAPIUrl(url) {
    this.apiUrl = url;
    return this;
  }

  /**
   * Sends a _getAccounts_ JMAP request.
   *
   * @param [options=null] {Object} The options to the _getAccounts_ JMAP request.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to an array of {@link Account} objects.
   *
   * @see http://jmap.io/spec.html#getaccounts
   */
  getAccounts(options) {
    return this._jmapRequest('getAccounts', options);
  }

  /**
   * Sends a _getMailboxes_ JMAP request.
   *
   * @param [options=null] {Object} The options to the _getMailboxes_ JMAP request.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to an array of {@link Mailbox} objects.
   *
   * @see http://jmap.io/spec.html#getmailboxes
   */
  getMailboxes(options) {
    return this._jmapRequest('getMailboxes', options);
  }

  /**
   * Sends a _getMessageList_ JMAP request.
   *
   * @param [options=null] {Object} The options to the _getMessageList_ JMAP request.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to a {@link MessageList} object.
   *
   * @see http://jmap.io/spec.html#getmessagelist
   */
  getMessageList(options) {
    return this._jmapRequest('getMessageList', options);
  }

  /**
   * Sends a _getThreads_ JMAP request.
   *
   * @param [options=null] {Object} The options to the _getThreads_ JMAP request.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to an array of {@link Thread} objects.
   *
   * @see http://jmap.io/spec.html#getthreads
   */
  getThreads(options) {
    return this._jmapRequest('getThreads', options);
  }

  /**
   * Sends a _getMessages_ JMAP request.
   *
   * @param [options=null] {Object} The options to the _getMessages_ JMAP request.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to an array of {@link Message} objects.
   *
   * @see http://jmap.io/spec.html#getmessages
   */
  getMessages(options) {
    return this._jmapRequest('getMessages', options);
  }

  /**
   * Sends a _setMessages_ JMAP request.
   *
   * @param [options=null] {Object} The options to the _setMessages_ JMAP request.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to a {@link MessageSet} object.
   *
   * @see http://jmap.io/spec.html#setmessages
   */
  setMessages(options) {
    return this._jmapRequest('setMessages', options);
  }

  /**
   * Moves a {@link Message} to a different set of mailboxes.<br />
   * This will issue a {@link Client#setMessages} JMAP request under the hoods, passing the correct options.
   *
   * @param id {String} The id of the {@link Message} to move.
   * @param mailboxIds {String[]} The identifiers of the target mailboxes for the message.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to nothing if the message was moved successfully.
   *
   * @see Client#setMessages
   */
  moveMessage(id, mailboxIds) {
    Utils.assertRequiredParameterIsPresent(id, 'id');
    Utils.assertRequiredParameterIsArrayWithMinimumLength(mailboxIds, 'mailboxIds', 1);

    return this.setMessages({
      update: {
        [id]: {
          mailboxIds: mailboxIds
        }
      }
    }).then(function(messagesSet) {
      if (messagesSet.updated.indexOf(id) < 0) {
        throw new Error('Failed to move message ' + id + ', reason is ' + messagesSet.notUpdated[id]);
      }
    });
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
    return Utils._jsonArrayToModelList(this, Model, response[1].list);
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

  _handleMessagesSetResponse(response) {
    return MessagesSet.fromJSONObject(this, response[1]);
  }
}
