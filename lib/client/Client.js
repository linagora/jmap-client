'use strict';

import ES6PromiseProvider from './../promises/ES6PromiseProvider.js';
import Utils from './../utils/Utils.js';
import Account from './../models/Account.js';
import Mailbox from './../models/Mailbox.js';
import MessageList from './../models/MessageList.js';
import Thread from './../models/Thread.js';
import Message from './../models/Message.js';
import OutboundMessage from './../models/OutboundMessage.js';
import MessagesSet from './../models/MessagesSet.js';
import MailboxRole from './../models/MailboxRole.js';
import AuthContinuation from './../models/AuthContinuation.js';
import AuthAccess from './../models/AuthAccess.js';
import Constants from '../utils/Constants.js';

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
   * Registers an authentication URL, that will be used as the endpoint to send authentication requests to the server.<br />
   * <br />
   * The URL will be exposed as the `authenticationUrl` property afterwards.
   *
   * @param url {String} The authentication url to use in JMAP requests.
   *
   * @return {Client} This Client instance.
   */
  withAuthenticationUrl(url) {
    this.authenticationUrl = url;
    return this;
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
   * Sets the download URL, i.e.: the URL used to download attachments to {@link Message}s.<br />
   * <br />
   * The URL will be exposed as the `downloadUrl` property afterwards.
   *
   * @param url {String} The download URL of the JMAP server.
   *
   * @return {Client} This Client instance.
   */
  withDownloadUrl(url) {
    this.downloadUrl = url;
    return this;
  }

  /**
   * Implement the JMAP external authentication protocol.<br />
   * This method abstract the two authentication steps:
   *
   * 1. query the JMAP server to get a continuation token
   * 2. query the JMAP server with the authentication token, to get the final accessToken.
   *
   * <br />
   * Between those two steps, a user provided function wil be called to handle the external
   * authentication part.
   * <br />
   * This method returns a promise that will eventually be resovled with a {@link AuthAccess} object.
   * It's the responsability of the caller to then set the AuthToken using for example:
   * <br />
   *
   *     client.withAuthenticationToken(authAccess.accessToken);
   *
   * @param username {String} The username of the user to authenticate.
   * @param deviceName {String} A unique device name
   * @param continuationCallback {Function} A function that takes an {@link AuthContinuation} object as argument, and should return a promise, that will resolve with the continuation token.
   *
   * @return {Client} This Client instance.
   */

  authExternal(username, deviceName, continuationCallback) {
    return this.transport
      .post(this.authenticationUrl, this._defaultNonAuthenticatedHeaders(), {
        username: username,
        deviceName: deviceName,
        clientName: 'jmap-client (https://github.com/linagora/jmap-client)',
        clientVersion: Constants.VERSION
      })
      .then((data) => {
        var authContinuation = new AuthContinuation(data);
        if (authContinuation.methods.indexOf('external') < 0) {
          throw new Error('The "external" authentication protocol is not supported by the server.');
        }
        return authContinuation;
      })
      .then((authContinuation) => continuationCallback(authContinuation))
      .then((continuationToken) => {
        return this.transport
          .post(this.authenticationUrl, this._defaultNonAuthenticatedHeaders(), {
            token: continuationToken,
            method: 'external'
          });
      })
      .then((data) => new AuthAccess(data));
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
   * Finds a {@link Mailbox} with the given role.<br />
   * This will issue a _getMailboxes_ JMAP request and search for the mailbox in the returned list.
   *
   * @param role {MailboxRole|String} The desired mailbox role.
   * @param [options=null] {Object} The options to the implicit _getMailboxes_ JMAP request.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to the {@link Mailbox} if found.
   *
   * @see MailboxRole
   */
  getMailboxWithRole(role, options) {
    if (!(role instanceof MailboxRole)) {
      role = MailboxRole.fromRole(role);
    }

    if (role === MailboxRole.UNKNOWN) {
      throw new Error('A valid role is required to find a mailbox by role');
    }

    return this._jmapRequest('getMailboxes', options)
      .then((mailboxes) => {
        for (let i = 0; i < mailboxes.length; i++) {
          if (mailboxes[i].role === role) {
            return mailboxes[i];
          }
        }

        throw new Error('Cannot find a mailbox with role ' + role.role);
      });
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
   * @return {Promise} A {@link Promise} that eventually resolves to a {@link MessagesSet} object.
   *
   * @see http://jmap.io/spec.html#setmessages
   */
  setMessages(options) {
    return this._jmapRequest('setMessages', options);
  }

  /**
   * Save a message as draft by sending a _setMessages_ JMAP request.<br />
   * The _mailboxIds_ and _isDraft_ properties of the given _message_ will be overridden by this method.
   *
   * @param message {OutboundMessage} The message to save.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to a {@link MessagesSet} object.
   *
   * @see http://jmap.io/spec.html#saving-a-draft
   */
  saveAsDraft(message) {
    Utils.assertRequiredParameterHasType(message, 'message', OutboundMessage);

    var clientId = this._generateClientId();
    return this
      .getMailboxWithRole(MailboxRole.DRAFTS)
      .then((mailbox) => {
        message.mailboxIds = [mailbox.id];
        message.isDraft = true;

        return this.setMessages({
          create: {
            [clientId]: message.toJSONObject()
          }
        });
      });
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

  _generateClientId() {
    return Date.now();
  }

  _defaultNonAuthenticatedHeaders() {
    return {
      Accept: 'application/json; charset=UTF-8',
      'Content-Type': 'application/json; charset=UTF-8'
    };
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
