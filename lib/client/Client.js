'use strict';

import ES6PromiseProvider from './../promises/ES6PromiseProvider.js';
import Utils from './../utils/Utils.js';
import Account from './../models/Account.js';
import Mailbox from './../models/Mailbox.js';
import MessageList from './../models/MessageList.js';
import SetResponse from './../models/SetResponse.js';
import Thread from './../models/Thread.js';
import Message from './../models/Message.js';
import OutboundMessage from './../models/OutboundMessage.js';
import CreateMessageAck from './../models/CreateMessageAck.js';
import MailboxRole from './../models/MailboxRole.js';
import AuthContinuation from './../models/AuthContinuation.js';
import AuthAccess from './../models/AuthAccess.js';
import Constants from '../utils/Constants.js';
import VacationResponse from './../models/VacationResponse';
import JmapError from '../errors/JmapError';

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

    this.promiseProvider = promiseProvider || new ES6PromiseProvider();
    this.transport = transport;
    this.transport.promiseProvider = this.promiseProvider;
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
   * @param [scheme] {String} The authentication scheme according to RFC 7235
   *
   * @return {Client} This Client instance.
   */
  withAuthenticationToken(token, scheme) {
    this.authToken = token;
    this.authScheme = scheme;

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
   * Initializes the client with an {@link AuthAccess} model from an authentication response.<br />
   * <br />
   * The individual properties of the AuthAccess object will be copied into client properties.
   *
   * @param access {AuthAccess|Object} The response object from an authenticate process.
   *
   * @return {Client} This Client instance.
   */
  withAuthAccess(access) {
    Utils.assertRequiredParameterIsObject(access, 'access');

    // create an instance of AuthAccess if plain object is given
    if (!(access instanceof AuthAccess)) {
      access = new AuthAccess(this, access);
    }

    this.authAccess = access;
    this.authScheme = 'X-JMAP';
    this.authToken = access.accessToken;
    ['username', 'signingId', 'signingKey', 'apiUrl', 'eventSourceUrl', 'uploadUrl', 'downloadUrl', 'serverCapabilities', 'mailCapabilities'].forEach((property) => {
      this[property] = access[property];
    });

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
    return this.transport
      .post(this.authenticationUrl, this._defaultNonAuthenticatedHeaders(), {
        username: username,
        deviceName: deviceName,
        clientName: Constants.CLIENT_NAME,
        clientVersion: Constants.VERSION
      })
      .then(data => this._authenticateResponse(data, continuationCallback));
  }

  /**
   * Sub-routine handling JMAP server responses on authentication requests
   *
   * Depending on the server's response, this either (recursively) executes the second
   * authentication step by calling the provided continuationCallback or resolves on
   * successfully completed authentication.
   *
   * @param data {Object} The JMAP response data
   * @param continuationCallback {Function} The callback function initially passed to the authenticate() method
   *
   * @return {Promise} A {@link Promise} that will eventually be resovled with a {@link AuthAccess} object
   */
  _authenticateResponse(data, continuationCallback) {
    if (data.loginId && data.accessToken === undefined) {
      // got an AuthContinuation response
      var authContinuation = new AuthContinuation(data);

      return continuationCallback(authContinuation)
        .then(continueData => {
          if (!authContinuation.supports(continueData.type)) {
            throw new Error('The "' + continueData.type + '" authentication type is not supported by the server.');
          }
          let param = {
            loginId: authContinuation.loginId,
            type: continueData.type
          };

          if (continueData.value) {
            param.value = continueData.value;
          }

          return this.transport
            .post(this.authenticationUrl, this._defaultNonAuthenticatedHeaders(), param);
        })
        .then(resp => this._authenticateResponse(resp, continuationCallback));
    } else if (data.accessToken && data.loginId === undefined) {
      // got auth access response
      return new AuthAccess(this, data);
    } else {
      // got unknown response data
      throw new Error('Unexpected response on authorization request');
    }
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
      return continuationCallback(authContinuation).then(() => ({ type: 'external' }));
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
      return this.promiseProvider.newPromise(function(resolve, reject) {
        resolve({ type: 'password', value: password });
      });
    }.bind(this));
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
    // resolve with accounts list from AuthAccess
    if (this.authAccess instanceof AuthAccess) {
      return this.promiseProvider.newPromise(function(resolve, reject) {
        let accounts = [];

        // equivalent to Object.values()
        for (let id in this.authAccess.accounts) {
          if (this.authAccess.accounts.hasOwnProperty(id)) {
            accounts.push(this.authAccess.accounts[id]);
          }
        }

        resolve(accounts);
      }.bind(this));
    }

    // fallback to deprecated getAccounts request
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
   * @return {Promise} A {@link Promise} that eventually resolves to a {@link Mailbox}.
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
    }).then(response => {
      var created = response.created[clientId];

      if (!created) {
        throw new Error('Failed to create mailbox, clientId: ' + clientId + ', message: ' + (response.notCreated[clientId] || 'none'));
      }

      return new Mailbox(this, created.id, created.name || name, created);
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
    }).then(response => {
      if (response.updated.indexOf(id) < 0) {
        throw new Error('Failed to update mailbox ' + id + ', the reason is: ' + response.notUpdated[id]);
      }
    });
  }

  /**
   * Destroy the {@link Mailbox} related to the given _id_ on the server.<br />
   * This will issue a {@link Client#destroyMailboxes} request under the hoods, passing _[id]_ option.
   *
   * @param id {String} The id of the mailbox to destroy.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to nothing if the {@link Mailbox} was destroyed successfully.
   *
   */
  destroyMailbox(id) {
    Utils.assertRequiredParameterIsPresent(id, 'id');

    return this.destroyMailboxes([id]);
  }

  /**
   * Destroy multiple {@link Mailbox}es specified to the given _ids_ on the server.<br />
   * This will issue a {@link Client#setMailboxes} JMAP request under the hoods, passing the correct options.
   *
   * @param ids {String[]} An array IDs of the mailboxes to destroy. These IDs must be in the right order: Destroy X comes before destroy Y if X is a descendent of Y.
   *
   * @return {Promise} A {@link Promise} that eventually resolves to nothing if all {@link Mailbox}es were destroyed successfully. Otherwise, it rejects error message of the first `notDestroyed` mailbox.
   *
   * @see http://jmap.io/spec.html#destroying-mailboxes
   */
  destroyMailboxes(ids) {
    Utils.assertRequiredParameterIsArrayWithMinimumLength(ids, 'ids', 1);

    return this.setMailboxes({
      destroy: ids
    }).then(response => {
      let notDestroyedIds = Object.keys(response.notDestroyed);

      if (notDestroyedIds.length > 0) {
        // take the first one for incrementally debugging
        let setError = response.notDestroyed[notDestroyedIds[0]];
        let reason = setError.type + ' (' + setError.description + ')';

        throw new Error('Failed to destroy ' + notDestroyedIds[0] + ', the reason is: ' + reason);
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

        throw new Error('Cannot find a mailbox with role ' + role.value);
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
   * @return {Promise} A {@link Promise} that eventually resolves to a {@link SetResponse} object.
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
    }).then(response => {
      if (response.updated.indexOf(id) < 0) {
        throw new Error('Failed to update message ' + id + ', the reason is: ' + (response.notUpdated[id] || 'missing'));
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
    return this.destroyMessages(id && [id]).then(response => {
      if (response.destroyed.indexOf(id) < 0) {
        throw new Error('Failed to destroy ' + id + ', the reason is: ' + (response.notDestroyed[id] || 'missing'));
      }
    });
  }

  /**
   * Destroy several {@link Message}s at once.<br />
   * This will issue a {@link Client#setMessages} JMAP request under the hoods, passing the correct options.
   *
   * @param ids {String[]} The list of ids of the messages to destroy.
   *
   * @return {Promise} A {@link Promise} that resolves to a {@link SetResponse}, containing the result of the operation.
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
    return this._createMessage(message, MailboxRole.DRAFTS);
  }

  /**
   * Sends a message by issuing a _setMessages_ JMAP request.<br />
   * The _mailboxIds_ and _isDraft_ properties of the given _message_ will be overridden by this method.
   *
   * @param message {OutboundMessage} The message to send.
   * @param outbox {Mailbox} The {@link Mailbox} with role='outbox', if already available
   *
   * @return {Promise} A {@link Promise} that eventually resolves to a {@link CreateMessageAck}.
   *
   * @see http://jmap.io/spec.html#sending-messages
   */
  send(message, outbox) {
    return this._createMessage(message, MailboxRole.OUTBOX, outbox);
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

  /**
   * Gets the singleton {@link VacationResponse} instance for a given account.<br />
   * This will send a `getVacationResponse` request to the JMAP backend.
   *
   * @param [options] {Object} The options to the underlying `getVacationResponse` JMAP request.
   * @param [options.accountId=null] {String} The account ID to get the vacation response for. If `null`, the primary account is used.
   *
   * @returns {Promise} A {@link Promise} that eventually resolves to the {@link VacationResponse} instance.
   */
  getVacationResponse(options) {
    return this._jmapRequest('getVacationResponse', options).then(list => list[0]);
  }

  /**
   * Sets the singleton {@link VacationResponse} instance for a given account.<br />
   * This will send a `setVacationResponse` request to the JMAP backend.
   *
   * @param vacationResponse {VacationResponse} The {@link VacationResponse} instance to set
   * @param [options] {Object} The options to the underlying `setVacationResponse` JMAP request.
   * @param [options.accountId=null] {String} The account ID to set the vacation response for. If `null`, the primary account is used.
   *
   * @returns {Promise} A {@link Promise} that eventually resolves to nothing upon success.
   */
  setVacationResponse(vacationResponse, options) {
    Utils.assertRequiredParameterHasType(vacationResponse, 'vacationResponse', VacationResponse);

    return this._jmapRequest('setVacationResponse', {
      accountId: options && options.accountId,
      update: {
        [VacationResponse.ID]: vacationResponse.toJSONObject()
      }
    }).then(response => {
      if (response.updated.indexOf(VacationResponse.ID) < 0) {
        throw new Error('Failed to set vacation response. Error: ' + (response.notUpdated[VacationResponse.ID] || 'none'));
      }
    });
  }

  _createMessage(message, role, mailbox) {
    Utils.assertRequiredParameterHasType(message, 'message', OutboundMessage);

    let clientId = this._generateClientId(),
        doSetMessages = mailbox => {
          message.mailboxIds = [mailbox.id];
          message.isDraft = MailboxRole.DRAFTS.value === role.value ? true : null;

          return this.setMessages({
            create: {
              [clientId]: message.toJSONObject()
            }
          }).then(response => {
            if (!response.created[clientId]) {
              throw new Error('Failed to store message with clientId ' + clientId + '. Error: ' + (response.notCreated[clientId] || 'none'));
            }

            return new CreateMessageAck(this, response.created[clientId]);
          });
        };

    return mailbox ? doSetMessages(mailbox) : this.getMailboxWithRole(role).then(doSetMessages);
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
      Accept: 'application/json; charset=UTF-8',
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: (this.authScheme ? this.authScheme + ' ' : '') + this.authToken
    };
  }

  _jmapRequest(method, options) {
    return this.transport
      .post(this.apiUrl, this._defaultHeaders(), [[method, options || {}, '#0']])
      .then(data => Utils.assertValidJMAPResponse(method, data))
      .then(data => data.map(response => this._handleResponse(response, method)))
      .then(responses => responses.length > 1 ? responses : responses[0]);
  }

  _handleResponse(response, method) {
    let name = response[0],
        fn = this[`_handle${Utils.capitalize(name)}Response`];

    // This will return the "raw" data if the command is unknown to the client
    return fn ? fn.bind(this)(response, method) : response[1];
  }

  _handleErrorResponse(response, method) {
    throw new JmapError(response[1], method);
  }

  _handleListResponse(response, Model, filter) {
    return Utils._jsonArrayToModelList(this, Model, response[1].list, filter);
  }

  _handleSetResponse(response) {
    return SetResponse.fromJSONObject(this, response[1]);
  }

  _handleAccountsResponse(response) {
    return this._handleListResponse(response, Account);
  }

  _handleThreadsResponse(response) {
    return this._handleListResponse(response, Thread);
  }

  _handleMessagesResponse(response) {
    return this._handleListResponse(response, Message, function(message) {
      try {
        return Utils.assertRequiredParameterIsArrayWithMinimumLength(message.mailboxIds, 'mailboxIds', 1);
      } catch (err) {
        return false;
      }
    });
  }

  _handleMailboxesResponse(response) {
    return this._handleListResponse(response, Mailbox);
  }

  _handleMailboxesSetResponse(response) {
    return this._handleSetResponse(response);
  }

  _handleMessageListResponse(response) {
    return MessageList.fromJSONObject(this, response[1]);
  }

  _handleMessagesSetResponse(response) {
    return this._handleSetResponse(response);
  }

  _handleVacationResponseResponse(response) {
    return this._handleListResponse(response, VacationResponse);
  }

  _handleVacationResponseSetResponse(response) {
    return this._handleSetResponse(response);
  }
}
