'use strict';

import ES6PromiseProvider from './../promises/ES6PromiseProvider.js';
import Utils from './../utils/Utils.js';
import Account from './../models/Account.js';
import Mailbox from './../models/Mailbox.js';
import MessageList from './../models/MessageList.js';
import MailboxesSet from './../models/MailboxesSet.js';
import Thread from './../models/Thread.js';
import Message from './../models/Message.js';
import OutboundMessage from './../models/OutboundMessage.js';
import CreateMessageAck from './../models/CreateMessageAck.js';
import CreateMailboxAck from './../models/CreateMailboxAck.js';
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
   * Implement the 2-step JMAP authentication protocol.<br />
   * This method abstract the two authentication steps:
   *
   * 1. query the JMAP server to get a continuation token
   * 2. query the JMAP server with the continuation token (and password), to get the final accessToken.
   *
   * @param username {String} The username to authenticate with
   * @param deviceName {String} A unique device name
   * @param continuationCallback {Function} A function that takes an {@link AuthContinuation}
   *   object as argument, and should return a promise, that will eventually resolve with an
   *   object denoting the chosen authentication method and the optional password (if method == password).
   *
   * @return {Promise} A {@link Promise} that will eventually be resovled with a {@link AuthAccess} object
   */
  authenticate(username, deviceName, continuationCallback) {
    var authContinuation;

    return this.transport
      .post(this.authenticationUrl, this._defaultNonAuthenticatedHeaders(), {
        username: username,
        deviceName: deviceName,
        clientName: Constants.CLIENT_NAME,
        clientVersion: Constants.VERSION
      })
      .then(data => {
        authContinuation = new AuthContinuation(data);

        return authContinuation;
      })
      .then(authContinuation => continuationCallback(authContinuation))
      .then(continueData => {
        if (authContinuation.methods.indexOf(continueData.method) < 0) {
          throw new Error('The "' + continueData.method + '" authentication protocol is not supported by the server.');
        }
        let param = {
          token: authContinuation.continuationToken,
          method: continueData.method
        };

        if (continueData.password) {
          param.password = continueData.password;
        }

        return this.transport
          .post(this.authenticationUrl, this._defaultNonAuthenticatedHeaders(), param);
      })
      .then(data => new AuthAccess(data));
  }

  /**
   * Implement the JMAP external authentication protocol.<br />
   * This method abstract the two authentication steps:
   *
   * 1. query the JMAP server to get a continuation token
   * 2. query the JMAP server with the continuation token, to get the final accessToken.
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
   * @param continuationCallback {Function} A function that takes an {@link AuthContinuation} object as argument, and should return a promise, that will resolve once the external authentication is complete.
   *
   * @return {Promise} A {@link Promise} that will eventually be resovled with a {@link AuthAccess} object
   */
  authExternal(username, deviceName, continuationCallback) {
    return this.authenticate(username, deviceName, function(authContinuation) {
      // wrap the continuationCallback to resolve with method:'external'
      return continuationCallback(authContinuation).then(() => {
        return { method: 'external' };
      });
    });
  }

  /**
   * Implement the JMAP password authentication protocol.<br />
   * This method abstract the two authentication steps:
   *
   * 1. query the JMAP server to get a continuation token
   * 2. query the JMAP server with the continuation token and the password, to get the final accessToken.
   *
   * @param username {String} The username of the user to authenticate
   * @param password {String} The password of the user to authenticate
   * @param deviceName {String} A unique device name
   *
   * @return {Promise} A {@link Promise} that will eventually be resovled with a {@link AuthAccess} object
   */
  authPassword(username, password, deviceName) {
    return this.authenticate(username, deviceName, function() {
      return { method: 'password', password: password };
    });
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
   * Sends a _setMailboxes_ JMAP request.
   *
   * @param [options=null] {Object} The options to the _setMailboxes_ JMAP request.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to a {@link Mailbox} object.
   *
   * @see http://jmap.io/spec.html#setmailboxes
   */
  setMailboxes(options) {
    return this._jmapRequest('setMailboxes', options);
  }

  /**
   * Creates a mailbox  by sending a _setMailboxes_ JMAP request.<br />
   *
   * @param name {String} The name of the mailbox to create.
   * @param [parentId=null] {String} The id of the parent of the mailbox to create.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to a {@link CreateMailboxAck}.
   *
   * @see http://jmap.io/spec.html#creating-mailboxes
   */
  createMailbox(name, parentId) {
    Utils.assertRequiredParameterIsPresent(name, 'name');

    var clientId = this._generateClientId();

    return this.setMailboxes({
      create: {
        [clientId]: {
          name: name,
          parentId: parentId
        }
      }
    }).then((mailboxesSet) => {
      if (!mailboxesSet.created[clientId]) {
        throw new Error('Failed to create mailbox, clientId: ' + clientId + ', message: ' + (mailboxesSet.notCreated[clientId] || 'none'));
      }

      return new CreateMailboxAck(this, mailboxesSet.created[clientId]);
    });
  }

  /**
   * Updates properties of a {@link Mailbox}.<br />
   * This will issue a {@link Client#setMailboxes} JMAP request under the hoods, passing the correct options.
   *
   * @param id {String} The id of the {@link Mailbox} to update.
   * @param options {Object} The options of the target mailbox to be updated.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to nothing if the mailbox was updated successfully.
   *
   * @see http://jmap.io/spec.html#updating-mailboxes
   */
  updateMailbox(id, options) {
    Utils.assertRequiredParameterIsPresent(id, 'id');

    return this.setMailboxes({
      update: {
        [id]: options
      }
    }).then((mailboxesSet) => {
      if (mailboxesSet.updated.indexOf(id) < 0) {
        throw new Error('Failed to update mailbox ' + id + ', the reason is: ' + mailboxesSet.notUpdated[id]);
      }
    });
  }

  /**
   * Destroy the {@link Mailbox} related to the given _id_ on the server.<br />
   * This will issue a {@link Client#setMailboxes} JMAP request under the hoods, passing the correct options.
   *
   * @param id {String} The id of the mailbox to destroy.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to nothing if the {@link Mailbox} was destroyed successfully.
   *
   * @see http://jmap.io/spec.html#destroying-mailboxes
   */
  destroyMailbox(id) {
    Utils.assertRequiredParameterIsPresent(id, 'id');

    return this.setMailboxes({destroy: [id]})
      .then((mailboxesSet) => {
        if (mailboxesSet.destroyed.indexOf(id) < 0) {
          throw new Error('Failed to destroy ' + id + ', the reason is: ' + (mailboxesSet.notDestroyed[id] || 'missing'));
        }
      });
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
   * Updates properties of a {@link Message}.<br />
   * This will issue a {@link Client#setMessages} JMAP request under the hoods, passing the correct options.
   *
   * @param id {String} The id of the {@link Message} to update.
   * @param options {Object} The options of the target message to be updated.
   * @param options.mailboxIds {String[]} The identifiers of the new mailboxes for the message.
   * @param options.isFlagged {Boolean} This corresponds whether the message is flagged or not
   * @param options.isUnread {Boolean} This corresponds whether the message has been yet read or not
   * @param options.isAnswered {Boolean} This corresponds whether the message has been yet replied or not
   *
   * @return {Promise} A {@link Promise} that eventually resolves to nothing if the message was updated successfully.
   *
   * @see http://jmap.io/spec.html#updating-messages
   */
  updateMessage(id, options) {
    Utils.assertRequiredParameterIsPresent(id, 'id');
    Utils.assertRequiredParameterIsObject(options, 'options');

    return this.setMessages({
      update: {
        [id]: options
      }
    }).then(messagesSet => {
      if (messagesSet.updated.indexOf(id) < 0) {
        throw new Error('Failed to update message ' + id + ', the reason is: ' + (messagesSet.notUpdated[id] || 'missing'));
      }
    });
  }

  /**
   * Destroy the {@link Message} related to the given _id_ on the server.<br />
   * This will issue a {@link Client#setMessages} JMAP request under the hoods, passing the correct options.
   *
   * @param id {String} The id of the object to destroy.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to nothing if the {@link Message} was destroyed successfully.
   *
   * @see Client#setMessages
   */
  destroyMessage(id) {
    return this.destroyMessages(id && [id]).then(messagesSet => {
      if (messagesSet.destroyed.indexOf(id) < 0) {
        throw new Error('Failed to destroy ' + id + ', the reason is: ' + (messagesSet.notDestroyed[id] || 'missing'));
      }
    });
  }

  /**
   * Destroy several {@link Message}s at once.<br />
   * This will issue a {@link Client#setMessages} JMAP request under the hoods, passing the correct options.
   *
   * @param ids {String[]} The list of ids of the messages to destroy.
   *
   * @return {Promise} A {@link Promise} that resolves to a {@link MessagesSet}, containing the result of the operation.
   *
   * @see Client#setMessages
   */
  destroyMessages(ids) {
    Utils.assertRequiredParameterIsArrayWithMinimumLength(ids, 'ids', 1);

    return this.setMessages({ destroy: ids });
  }

  /**
   * Save a message as draft by sending a _setMessages_ JMAP request.<br />
   * The _mailboxIds_ and _isDraft_ properties of the given _message_ will be overridden by this method.
   *
   * @param message {OutboundMessage} The message to save.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to a {@link CreateMessageAck}.
   *
   * @see http://jmap.io/spec.html#saving-a-draft
   */
  saveAsDraft(message) {
    Utils.assertRequiredParameterHasType(message, 'message', OutboundMessage);

    var clientId = this._generateClientId();

    return this
      .getMailboxWithRole(MailboxRole.DRAFTS)
      .then(mailbox => {
        message.mailboxIds = [mailbox.id];
        message.isDraft = true;

        return this.setMessages({
          create: {
            [clientId]: message.toJSONObject()
          }
        });
      }).then(response => {
        if (!response.created[clientId]) {
          throw new Error('Failed to save the message as draft, clientId: ' + clientId + ', message: ' + (response.notCreated[clientId] || 'none'));
        }

        return new CreateMessageAck(this, response.created[clientId]);
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

    return this.updateMessage(id, { mailboxIds: mailboxIds });
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

  _handleMailboxesSetResponse(response) {
    return MailboxesSet.fromJSONObject(this, response[1]);
  }

  _handleMessageListResponse(response) {
    return MessageList.fromJSONObject(this, response[1]);
  }

  _handleMessagesSetResponse(response) {
    return MessagesSet.fromJSONObject(this, response[1]);
  }
}
