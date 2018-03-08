(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jmap = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * The _API_ module is the entry point of the library.<br />
 * It exports a single {@link Object} that is exposed as, either:
 * * A global `jmap` variable when jmap-client included in a web page through a `script` tag
 * * A NodeJS module when jmap-client is `require`'d in a NodeJS application
 *
 * When extending the library with new models, utility classes, etc. don't forget to update this module
 * so that your new code gets exposed in the public API.<br />
 * <br />
 * The exported object has the following properties:
 *
 * @property Client {Client} The {@link Client} class
 * @property Utils {Utils} The {@link Utils} class
 * @property JSONBuilder {JSONBuilder} The {@link JSONBuilder} class helping to serialize model to json
 * @property PromiseProvider {PromiseProvider} The {@link PromiseProvider} class
 * @property ES6PromiseProvider { ES6PromiseProvider} The {@link  ES6PromiseProvider} class
 * @property QPromiseProvider { QPromiseProvider} The {@link  QPromiseProvider} class
 * @property Transport { Transport} The {@link  Transport} class
 * @property JQueryTransport { JQueryTransport} The {@link  JQueryTransport} class
 * @property RequestTransport { RequestTransport} The {@link  RequestTransport} class
 * @property Model { Model} The {@link  Model} class
 * @property Account { Account} The {@link  Account} class
 * @property EMailer { EMailer} The {@link  EMailer} class
 * @property Mailbox { Mailbox} The {@link  Mailbox} class
 * @property MessageList { MessageList} The {@link  MessageList} class
 * @property Message { Message} The {@link  Message} class
 * @property OutboundMessage {OutboundMessage} The {@link OutboundMessage} class
 * @property CreateMessageAck {CreateMessageAck} The {@link CreateMessageAck} class
 * @property Thread { Thread} The {@link  Thread} class
 * @property MailboxRole {MailboxRole} The {@link MailboxRole} class
 * @property SetResponse {SetResponse} The {@link SetResponse} class
 * @property AuthAccess {AuthAccess} The {@link AuthAccess} class
 * @property AuthContinuation {AuthContinuation} The {@link AuthContinuation} class
 * @property Constants {Constants} The {@link module:Constants|Constants} object
 * @property Attachment {Attachment} The {@link Attachment} class
 * @property Capabilities {Capabilities} The {@link Capabilities} class
 * @property MailCapabilities {MailCapabilities} The {@link MailCapabilities} class
 * @property ServerCapabilities {ServerCapabilities} The {@link ServerCapabilities} class
 * @property VacationResponse {VacationResponse} The {@link VacationResponse} class
 * @property TransportError {TransportError} The {@link TransportError} class
 * @property JmapError {JmapError} The {@link JmapError} class
 *
 * @module API
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  Client: require('./client/Client'),
  Utils: require('./utils/Utils'),
  JSONBuilder: require('./utils/JSONBuilder'),
  PromiseProvider: require('./promises/PromiseProvider'),
  ES6PromiseProvider: require('./promises/ES6PromiseProvider'),
  QPromiseProvider: require('./promises/QPromiseProvider'),
  Transport: require('./transport/Transport'),
  JQueryTransport: require('./transport/JQueryTransport'),
  RequestTransport: require('./transport/RequestTransport'),
  Model: require('./models/Model'),
  Account: require('./models/Account'),
  EMailer: require('./models/EMailer'),
  Mailbox: require('./models/Mailbox'),
  MessageList: require('./models/MessageList'),
  Message: require('./models/Message'),
  OutboundMessage: require('./models/OutboundMessage'),
  CreateMessageAck: require('./models/CreateMessageAck'),
  Thread: require('./models/Thread'),
  MailboxRole: require('./models/MailboxRole'),
  SetResponse: require('./models/SetResponse'),
  AuthAccess: require('./models/AuthAccess'),
  AuthContinuation: require('./models/AuthContinuation'),
  AuthMethod: require('./models/AuthMethod'),
  Constants: require('./utils/Constants'),
  Attachment: require('./models/Attachment'),
  Capabilities: require('./models/Capabilities'),
  MailCapabilities: require('./models/MailCapabilities'),
  ServerCapabilities: require('./models/ServerCapabilities'),
  VacationResponse: require('./models/VacationResponse'),
  TransportError: require('./errors/TransportError'),
  JmapError: require('./errors/JmapError')
};
module.exports = exports['default'];

},{"./client/Client":2,"./errors/JmapError":3,"./errors/TransportError":4,"./models/Account":5,"./models/Attachment":6,"./models/AuthAccess":7,"./models/AuthContinuation":8,"./models/AuthMethod":9,"./models/Capabilities":10,"./models/CreateMessageAck":11,"./models/EMailer":12,"./models/MailCapabilities":13,"./models/Mailbox":14,"./models/MailboxRole":15,"./models/Message":16,"./models/MessageList":17,"./models/Model":18,"./models/OutboundMessage":19,"./models/ServerCapabilities":20,"./models/SetResponse":21,"./models/Thread":22,"./models/VacationResponse":23,"./promises/ES6PromiseProvider":24,"./promises/PromiseProvider":25,"./promises/QPromiseProvider":26,"./transport/JQueryTransport":27,"./transport/RequestTransport":28,"./transport/Transport":29,"./utils/Constants":30,"./utils/JSONBuilder":31,"./utils/Utils":32}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ES6PromiseProvider = require('./../promises/ES6PromiseProvider.js');

var _ES6PromiseProvider2 = _interopRequireDefault(_ES6PromiseProvider);

var _Utils = require('./../utils/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

var _Account = require('./../models/Account.js');

var _Account2 = _interopRequireDefault(_Account);

var _Mailbox = require('./../models/Mailbox.js');

var _Mailbox2 = _interopRequireDefault(_Mailbox);

var _MessageList = require('./../models/MessageList.js');

var _MessageList2 = _interopRequireDefault(_MessageList);

var _SetResponse = require('./../models/SetResponse.js');

var _SetResponse2 = _interopRequireDefault(_SetResponse);

var _Thread = require('./../models/Thread.js');

var _Thread2 = _interopRequireDefault(_Thread);

var _Message = require('./../models/Message.js');

var _Message2 = _interopRequireDefault(_Message);

var _OutboundMessage = require('./../models/OutboundMessage.js');

var _OutboundMessage2 = _interopRequireDefault(_OutboundMessage);

var _CreateMessageAck = require('./../models/CreateMessageAck.js');

var _CreateMessageAck2 = _interopRequireDefault(_CreateMessageAck);

var _MailboxRole = require('./../models/MailboxRole.js');

var _MailboxRole2 = _interopRequireDefault(_MailboxRole);

var _AuthContinuation = require('./../models/AuthContinuation.js');

var _AuthContinuation2 = _interopRequireDefault(_AuthContinuation);

var _AuthAccess = require('./../models/AuthAccess.js');

var _AuthAccess2 = _interopRequireDefault(_AuthAccess);

var _Constants = require('../utils/Constants.js');

var _Constants2 = _interopRequireDefault(_Constants);

var _VacationResponse = require('./../models/VacationResponse');

var _VacationResponse2 = _interopRequireDefault(_VacationResponse);

var _JmapError = require('../errors/JmapError');

var _JmapError2 = _interopRequireDefault(_JmapError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
  /**
   * The {@link Client} class is the main entry point for sending JMAP requests to a remote server.<br />
   * It uses a fluent API so that it's easy to chain calls. JMAP requests are sent using one of the _getXXX_ methods
   * that map to their equivalent in the JMAP specification. For instance, if you want to do a _getAccounts_ request,
   * you'll use the {@link Client#getAccounts} method.
   *
   * @param transport {Transport} The {@link Transport} instance used to send HTTP requests.
   * @param [promiseProvider={@link ES6PromiseProvider}] {PromiseProvider} The {@link PromiseProvider} implementation to use.
   */
  function Client(transport, promiseProvider) {
    _classCallCheck(this, Client);

    _Utils2.default.assertRequiredParameterIsPresent(transport, 'transport');

    this.promiseProvider = promiseProvider || new _ES6PromiseProvider2.default();
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


  _createClass(Client, [{
    key: 'withAuthenticationUrl',
    value: function withAuthenticationUrl(url) {
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

  }, {
    key: 'withAuthenticationToken',
    value: function withAuthenticationToken(token, scheme) {
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

  }, {
    key: 'withAPIUrl',
    value: function withAPIUrl(url) {
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

  }, {
    key: 'withDownloadUrl',
    value: function withDownloadUrl(url) {
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

  }, {
    key: 'withAuthAccess',
    value: function withAuthAccess(access) {
      var _this = this;

      _Utils2.default.assertRequiredParameterIsObject(access, 'access');

      // create an instance of AuthAccess if plain object is given
      if (!(access instanceof _AuthAccess2.default)) {
        access = new _AuthAccess2.default(this, access);
      }

      this.authAccess = access;
      this.authScheme = 'X-JMAP';
      this.authToken = access.accessToken;
      ['username', 'signingId', 'signingKey', 'apiUrl', 'eventSourceUrl', 'uploadUrl', 'downloadUrl', 'serverCapabilities', 'mailCapabilities'].forEach(function (property) {
        _this[property] = access[property];
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

  }, {
    key: 'authenticate',
    value: function authenticate(username, deviceName, continuationCallback) {
      var _this2 = this;

      return this.transport.post(this.authenticationUrl, this._defaultNonAuthenticatedHeaders(), {
        username: username,
        deviceName: deviceName,
        clientName: _Constants2.default.CLIENT_NAME,
        clientVersion: _Constants2.default.VERSION
      }).then(function (data) {
        return _this2._authenticateResponse(data, continuationCallback);
      });
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

  }, {
    key: '_authenticateResponse',
    value: function _authenticateResponse(data, continuationCallback) {
      var _this3 = this;

      if (data.loginId && data.accessToken === undefined) {
        // got an AuthContinuation response
        var authContinuation = new _AuthContinuation2.default(data);

        return continuationCallback(authContinuation).then(function (continueData) {
          if (!authContinuation.supports(continueData.type)) {
            throw new Error('The "' + continueData.type + '" authentication type is not supported by the server.');
          }
          var param = {
            loginId: authContinuation.loginId,
            type: continueData.type
          };

          if (continueData.value) {
            param.value = continueData.value;
          }

          return _this3.transport.post(_this3.authenticationUrl, _this3._defaultNonAuthenticatedHeaders(), param);
        }).then(function (resp) {
          return _this3._authenticateResponse(resp, continuationCallback);
        });
      } else if (data.accessToken && data.loginId === undefined) {
        // got auth access response
        return new _AuthAccess2.default(this, data);
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

  }, {
    key: 'authExternal',
    value: function authExternal(username, deviceName, continuationCallback) {
      return this.authenticate(username, deviceName, function (authContinuation) {
        // wrap the continuationCallback to resolve with method:'external'
        return continuationCallback(authContinuation).then(function () {
          return { type: 'external' };
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

  }, {
    key: 'authPassword',
    value: function authPassword(username, password, deviceName) {
      return this.authenticate(username, deviceName, function () {
        return this.promiseProvider.newPromise(function (resolve, reject) {
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

  }, {
    key: 'getAccounts',
    value: function getAccounts(options) {
      // resolve with accounts list from AuthAccess
      if (this.authAccess instanceof _AuthAccess2.default) {
        return this.promiseProvider.newPromise(function (resolve, reject) {
          var accounts = [];

          // equivalent to Object.values()
          for (var id in this.authAccess.accounts) {
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

  }, {
    key: 'getMailboxes',
    value: function getMailboxes(options) {
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

  }, {
    key: 'setMailboxes',
    value: function setMailboxes(options) {
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

  }, {
    key: 'createMailbox',
    value: function createMailbox(name, parentId) {
      var _this4 = this;

      _Utils2.default.assertRequiredParameterIsPresent(name, 'name');

      var clientId = this._generateClientId();

      return this.setMailboxes({
        create: _defineProperty({}, clientId, {
          name: name,
          parentId: parentId
        })
      }).then(function (response) {
        var created = response.created[clientId];

        if (!created) {
          throw new Error('Failed to create mailbox, clientId: ' + clientId + ', message: ' + (response.notCreated[clientId] || 'none'));
        }

        return new _Mailbox2.default(_this4, created.id, created.name || name, created);
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

  }, {
    key: 'updateMailbox',
    value: function updateMailbox(id, options) {
      _Utils2.default.assertRequiredParameterIsPresent(id, 'id');

      return this.setMailboxes({
        update: _defineProperty({}, id, options)
      }).then(function (response) {
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

  }, {
    key: 'destroyMailbox',
    value: function destroyMailbox(id) {
      _Utils2.default.assertRequiredParameterIsPresent(id, 'id');

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

  }, {
    key: 'destroyMailboxes',
    value: function destroyMailboxes(ids) {
      _Utils2.default.assertRequiredParameterIsArrayWithMinimumLength(ids, 'ids', 1);

      return this.setMailboxes({
        destroy: ids
      }).then(function (response) {
        var notDestroyedIds = Object.keys(response.notDestroyed);

        if (notDestroyedIds.length > 0) {
          // take the first one for incrementally debugging
          var setError = response.notDestroyed[notDestroyedIds[0]];
          var reason = setError.type + ' (' + setError.description + ')';

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

  }, {
    key: 'getMailboxWithRole',
    value: function getMailboxWithRole(role, options) {
      if (!(role instanceof _MailboxRole2.default)) {
        role = _MailboxRole2.default.fromRole(role);
      }

      if (role === _MailboxRole2.default.UNKNOWN) {
        throw new Error('A valid role is required to find a mailbox by role');
      }

      return this._jmapRequest('getMailboxes', options).then(function (mailboxes) {
        for (var i = 0; i < mailboxes.length; i++) {
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

  }, {
    key: 'getMessageList',
    value: function getMessageList(options) {
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

  }, {
    key: 'getThreads',
    value: function getThreads(options) {
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

  }, {
    key: 'getMessages',
    value: function getMessages(options) {
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

  }, {
    key: 'setMessages',
    value: function setMessages(options) {
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

  }, {
    key: 'updateMessage',
    value: function updateMessage(id, options) {
      _Utils2.default.assertRequiredParameterIsPresent(id, 'id');
      _Utils2.default.assertRequiredParameterIsObject(options, 'options');

      return this.setMessages({
        update: _defineProperty({}, id, options)
      }).then(function (response) {
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

  }, {
    key: 'destroyMessage',
    value: function destroyMessage(id) {
      return this.destroyMessages(id && [id]).then(function (response) {
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

  }, {
    key: 'destroyMessages',
    value: function destroyMessages(ids) {
      _Utils2.default.assertRequiredParameterIsArrayWithMinimumLength(ids, 'ids', 1);

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

  }, {
    key: 'saveAsDraft',
    value: function saveAsDraft(message) {
      return this._createMessage(message, _MailboxRole2.default.DRAFTS);
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

  }, {
    key: 'send',
    value: function send(message, outbox) {
      return this._createMessage(message, _MailboxRole2.default.OUTBOX, outbox);
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

  }, {
    key: 'moveMessage',
    value: function moveMessage(id, mailboxIds) {
      _Utils2.default.assertRequiredParameterIsPresent(id, 'id');
      _Utils2.default.assertRequiredParameterIsArrayWithMinimumLength(mailboxIds, 'mailboxIds', 1);

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

  }, {
    key: 'getVacationResponse',
    value: function getVacationResponse(options) {
      return this._jmapRequest('getVacationResponse', options).then(function (list) {
        return list[0];
      });
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

  }, {
    key: 'setVacationResponse',
    value: function setVacationResponse(vacationResponse, options) {
      _Utils2.default.assertRequiredParameterHasType(vacationResponse, 'vacationResponse', _VacationResponse2.default);

      return this._jmapRequest('setVacationResponse', {
        accountId: options && options.accountId,
        update: _defineProperty({}, _VacationResponse2.default.ID, vacationResponse.toJSONObject())
      }).then(function (response) {
        if (response.updated.indexOf(_VacationResponse2.default.ID) < 0) {
          throw new Error('Failed to set vacation response. Error: ' + (response.notUpdated[_VacationResponse2.default.ID] || 'none'));
        }
      });
    }
  }, {
    key: '_createMessage',
    value: function _createMessage(message, role, mailbox) {
      var _this5 = this;

      _Utils2.default.assertRequiredParameterHasType(message, 'message', _OutboundMessage2.default);

      var clientId = this._generateClientId(),
          doSetMessages = function doSetMessages(mailbox) {
        message.mailboxIds = [mailbox.id];
        message.isDraft = _MailboxRole2.default.DRAFTS.value === role.value ? true : null;

        return _this5.setMessages({
          create: _defineProperty({}, clientId, message.toJSONObject())
        }).then(function (response) {
          if (!response.created[clientId]) {
            throw new Error('Failed to store message with clientId ' + clientId + '. Error: ' + (response.notCreated[clientId] || 'none'));
          }

          return new _CreateMessageAck2.default(_this5, response.created[clientId]);
        });
      };

      return mailbox ? doSetMessages(mailbox) : this.getMailboxWithRole(role).then(doSetMessages);
    }
  }, {
    key: '_generateClientId',
    value: function _generateClientId() {
      return Date.now();
    }
  }, {
    key: '_defaultNonAuthenticatedHeaders',
    value: function _defaultNonAuthenticatedHeaders() {
      return {
        Accept: 'application/json; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8'
      };
    }
  }, {
    key: '_defaultHeaders',
    value: function _defaultHeaders() {
      return {
        Accept: 'application/json; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: (this.authScheme ? this.authScheme + ' ' : '') + this.authToken
      };
    }
  }, {
    key: '_jmapRequest',
    value: function _jmapRequest(method, options) {
      var _this6 = this;

      return this.transport.post(this.apiUrl, this._defaultHeaders(), [[method, options || {}, '#0']]).then(function (data) {
        return _Utils2.default.assertValidJMAPResponse(method, data);
      }).then(function (data) {
        return data.map(function (response) {
          return _this6._handleResponse(response, method);
        });
      }).then(function (responses) {
        return responses.length > 1 ? responses : responses[0];
      });
    }
  }, {
    key: '_handleResponse',
    value: function _handleResponse(response, method) {
      var name = response[0],
          fn = this['_handle' + _Utils2.default.capitalize(name) + 'Response'];

      // This will return the "raw" data if the command is unknown to the client
      return fn ? fn.bind(this)(response, method) : response[1];
    }
  }, {
    key: '_handleErrorResponse',
    value: function _handleErrorResponse(response, method) {
      throw new _JmapError2.default(response[1], method);
    }
  }, {
    key: '_handleListResponse',
    value: function _handleListResponse(response, Model, filter) {
      return _Utils2.default._jsonArrayToModelList(this, Model, response[1].list, filter);
    }
  }, {
    key: '_handleSetResponse',
    value: function _handleSetResponse(response) {
      return _SetResponse2.default.fromJSONObject(this, response[1]);
    }
  }, {
    key: '_handleAccountsResponse',
    value: function _handleAccountsResponse(response) {
      return this._handleListResponse(response, _Account2.default);
    }
  }, {
    key: '_handleThreadsResponse',
    value: function _handleThreadsResponse(response) {
      return this._handleListResponse(response, _Thread2.default);
    }
  }, {
    key: '_handleMessagesResponse',
    value: function _handleMessagesResponse(response) {
      return this._handleListResponse(response, _Message2.default, function (message) {
        try {
          return _Utils2.default.assertRequiredParameterIsArrayWithMinimumLength(message.mailboxIds, 'mailboxIds', 1);
        } catch (err) {
          return false;
        }
      });
    }
  }, {
    key: '_handleMailboxesResponse',
    value: function _handleMailboxesResponse(response) {
      return this._handleListResponse(response, _Mailbox2.default);
    }
  }, {
    key: '_handleMailboxesSetResponse',
    value: function _handleMailboxesSetResponse(response) {
      return this._handleSetResponse(response);
    }
  }, {
    key: '_handleMessageListResponse',
    value: function _handleMessageListResponse(response) {
      return _MessageList2.default.fromJSONObject(this, response[1]);
    }
  }, {
    key: '_handleMessagesSetResponse',
    value: function _handleMessagesSetResponse(response) {
      return this._handleSetResponse(response);
    }
  }, {
    key: '_handleVacationResponseResponse',
    value: function _handleVacationResponseResponse(response) {
      return this._handleListResponse(response, _VacationResponse2.default);
    }
  }, {
    key: '_handleVacationResponseSetResponse',
    value: function _handleVacationResponseSetResponse(response) {
      return this._handleSetResponse(response);
    }
  }]);

  return Client;
}();

exports.default = Client;
module.exports = exports['default'];

},{"../errors/JmapError":3,"../utils/Constants.js":30,"./../models/Account.js":5,"./../models/AuthAccess.js":7,"./../models/AuthContinuation.js":8,"./../models/CreateMessageAck.js":11,"./../models/Mailbox.js":14,"./../models/MailboxRole.js":15,"./../models/Message.js":16,"./../models/MessageList.js":17,"./../models/OutboundMessage.js":19,"./../models/SetResponse.js":21,"./../models/Thread.js":22,"./../models/VacationResponse":23,"./../promises/ES6PromiseProvider.js":24,"./../utils/Utils.js":32}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require('../utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    cls.apply(this, arguments);
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

var JmapError = function (_extendableBuiltin2) {
  _inherits(JmapError, _extendableBuiltin2);

  /**
   * A `JmapError` is a custom `Error` thrown when a request is rejected by the JMAP backend. <br />
   * The _type_ property holds the type of error that happened. Refer to the JMAP [spec](http://jmap.io/spec-core.html#errors)
   * for details on the available errors. <br />
   * Other properties may be present with further information; these are detailed in the method descriptions where appropriate.
   *
   * @constructor
   *
   * @param payload {Object} The error payload, from which detailed information about the error can be retrieved.
   * @param [payload.type] {String} The type of this `JmapError`.
   * @param [payload.description=null] {String} The description, if any, of this `JmapError`.
   * @param [method=null] {String} The JMAP method that triggered this `JmapError`.
   *
   * @see Error
   */
  function JmapError(payload, method) {
    _classCallCheck(this, JmapError);

    var _this = _possibleConstructorReturn(this, (JmapError.__proto__ || Object.getPrototypeOf(JmapError)).call(this));

    _Utils2.default.assertRequiredParameterIsPresent(payload, 'payload');
    _Utils2.default.assertRequiredParameterIsPresent(payload.type, 'payload.type');

    _this.payload = payload;
    _this.type = payload.type;
    _this.description = payload.description || null;

    _this.method = method || null;
    return _this;
  }

  /**
   * Returns a {@link String} representation of this `JmapError`.
   *
   * @returns {String} The human-readable representation of this `JmapError`.
   */


  _createClass(JmapError, [{
    key: 'toString',
    value: function toString() {
      return 'JmapError{type=' + this.type + ',description=' + this.description + ',method=' + this.method + '}';
    }
  }]);

  return JmapError;
}(_extendableBuiltin(Error));

exports.default = JmapError;
module.exports = exports['default'];

},{"../utils/Utils":32}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    cls.apply(this, arguments);
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

var TransportError = function (_extendableBuiltin2) {
  _inherits(TransportError, _extendableBuiltin2);

  /**
   * A `TransportError` is a custom `Error` thrown when a request to a remote server fails.
   *
   * @constructor
   *
   * @param [cause=null] {*} The underlying cause of this `TransportError`. Though this is usually an {@link Error}, this
   *   might actually be anything and depends on the chosen {@link Transport} implementation.
   * @param [statusCode=0] {Number} The HTTP status code sent by the server, if the request reached the server.
   * @param [responseText=null] {String} The HTTP response sent by the server, if any.
   *
   * @see Transport
   * @see Error
   */
  function TransportError(cause, statusCode, responseText) {
    _classCallCheck(this, TransportError);

    var _this = _possibleConstructorReturn(this, (TransportError.__proto__ || Object.getPrototypeOf(TransportError)).call(this));

    _this.cause = cause || null;
    _this.statusCode = statusCode || 0;
    _this.responseText = responseText || null;
    return _this;
  }

  return TransportError;
}(_extendableBuiltin(Error));

exports.default = TransportError;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Model2 = require('./Model.js');

var _Model3 = _interopRequireDefault(_Model2);

var _Utils = require('../utils/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

var _JSONBuilder = require('../utils/JSONBuilder.js');

var _JSONBuilder2 = _interopRequireDefault(_JSONBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Account = function (_Model) {
  _inherits(Account, _Model);

  /**
   * This class represents a JMAP [Account]{@link http://jmap.io/spec.html#accounts}.
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _Account_.
   * @param id {String} The unique identifier of this _Account_.
   * @param [opts] {Object} The optional properties of this _Account_.
   * @param [opts.name=''] {String} The name of this _Account_.
   * @param [opts.isPrimary=false] {Boolean} Whether this _Account_ is the primary email account.
   * @param [opts.isReadOnly=false] {Boolean} Whether the entire _Account_ is read-only
   * @param [opts.hasDataFor=[]] {String[]} A list of the data profiles available in this account
  server.
   *
   * @see Model
   */
  function Account(jmap, id, opts) {
    _classCallCheck(this, Account);

    var _this = _possibleConstructorReturn(this, (Account.__proto__ || Object.getPrototypeOf(Account)).call(this, jmap));

    _Utils2.default.assertRequiredParameterIsPresent(id, 'id');

    opts = opts || {};

    _this.id = id;
    _this.name = opts.name || '';
    _this.isPrimary = opts.isPrimary || false;
    _this.isReadOnly = opts.isReadOnly || false;
    _this.hasDataFor = opts.hasDataFor || [];
    return _this;
  }

  /**
   * Returns whether this `Account` supports mail or not.
   *
   * @returns {Boolean} _true_ if and only if this `Account` has mail enabled, _false_ otherwise.
   */


  _createClass(Account, [{
    key: 'hasMail',
    value: function hasMail() {
      return this.hasDataFor.indexOf('mail') >= 0;
    }

    /**
     * Returns whether this `Account` supports calendars or not.
     *
     * @returns {Boolean} _true_ if and only if this `Account` has calendars enabled, _false_ otherwise.
     */

  }, {
    key: 'hasCalendars',
    value: function hasCalendars() {
      return this.hasDataFor.indexOf('calendars') >= 0;
    }

    /**
     * Returns whether this `Account` supports contacts or not.
     *
     * @returns {Boolean} _true_ if and only if this `Account` has contacts enabled, _false_ otherwise.
     */

  }, {
    key: 'hasContacts',
    value: function hasContacts() {
      return this.hasDataFor.indexOf('contacts') >= 0;
    }

    /**
     * Fetches all mailboxes of this _Account_.<br />
     * This will delegate to {@link Client#getMailboxes}, passing this Account's _id_ as the _accountId_ option.
     *
     * @param [options] {Object} The options object passed to {@link Client#getMailboxes}.
     *   Please note that the _accountId_ option will be overriden if defined.
     * @returns {Promise} A promise that eventually resolves with an array of {@link Mailbox} instances.
     *
     * @see Client#getMailboxes
     * @see PromiseProvider
     */

  }, {
    key: 'getMailboxes',
    value: function getMailboxes(options) {
      options = options || {};
      options.accountId = this.id;

      return this._jmap.getMailboxes(options);
    }

    /**
     * Creates a JSON representation from this {@link Account}.
     *
     * @return JSON object with only owned properties and non-null default values.
     */

  }, {
    key: 'toJSONObject',
    value: function toJSONObject() {
      return new _JSONBuilder2.default().append('name', this.name).append('isPrimary', this.isPrimary).append('isReadOnly', this.isReadOnly).append('hasDataFor', this.hasDataFor).build();
    }

    /**
     * Creates an _Account_ from its JSON representation.
     *
     * @param jmap {Client} The {@link Client} instance passed to the _Account_ constructor.
     * @param object {Object} The JSON representation of the _Account_, as a Javascript object.
     * @param object.id {String} The identifier of the _Account_.
     *
     * @return {Account}
     */

  }], [{
    key: 'fromJSONObject',
    value: function fromJSONObject(jmap, object) {
      _Utils2.default.assertRequiredParameterIsPresent(object, 'object');

      return new Account(jmap, object.id, object);
    }
  }]);

  return Account;
}(_Model3.default);

exports.default = Account;
module.exports = exports['default'];

},{"../utils/JSONBuilder.js":31,"../utils/Utils.js":32,"./Model.js":18}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Model2 = require('./Model.js');

var _Model3 = _interopRequireDefault(_Model2);

var _Utils = require('../utils/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

var _JSONBuilder = require('../utils/JSONBuilder.js');

var _JSONBuilder2 = _interopRequireDefault(_JSONBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Attachment = function (_Model) {
  _inherits(Attachment, _Model);

  /**
   * This class represents a JMAP [Attachment]{@link http://jmap.io/spec.html#messages}.<br />
   * An _Attachment_ object holds all information of a given attachment of a {@link Message}.
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created the parent _Message_.
   * @param blobId {String} The id of the binary data.
   * @param [opts] {Object} The optional properties of this _Attachment_.
   * @param [opts.url=null] {String} The URL to download the attachment. If not passed as a parameter, this will be deduced from
   *  the configured `downloadUrl` of the {@link Client} instance used to fetch the {@link Message} containing this _Attachment_.
   *  If the library does not find a reliable way of knowing the URL for this attachment, for any reason, the `url` property of this
   *  _Attachment_ instance will be set to `null`.
   * @param [opts.type=''] {String} The content-type of the attachment.
   * @param [opts.name=''] {String} The full file name.
   * @param [opts.size=null] {Number} The size, in bytes, of the attachment when fully decoded.
   * @param [opts.cid=null] {String} The id used within the message body to reference this attachment.
   * @param [opts.isInline=false] {String} `true` if the attachment is referenced by a `cid:` link from within the HTML body of the message.
   * @param [opts.width=null] {String} The width (in px) of the image, if the attachment is an image.
   * @param [opts.height=null] {String} TThe height (in px) of the image, if the attachment is an image.
   *
   * @see Model
   */
  function Attachment(jmap, blobId, opts) {
    _classCallCheck(this, Attachment);

    var _this = _possibleConstructorReturn(this, (Attachment.__proto__ || Object.getPrototypeOf(Attachment)).call(this, jmap));

    _Utils2.default.assertRequiredParameterIsPresent(blobId, 'blobId');

    opts = opts || {};

    _this.blobId = blobId;
    _this.type = opts.type || null;
    _this.name = opts.name || null;
    _this.size = opts.size || 0;
    _this.cid = opts.cid || null;
    _this.isInline = opts.isInline || false;
    _this.width = opts.width || null;
    _this.height = opts.height || null;
    _this.url = opts.url || null;

    // Some JMAP servers might return an already defined attachment URL, some others don't; the spec is vague about that
    // If it is not provided by the server, we do a best effort to derive it from the configured download URL of our client
    if (!_this.url && jmap.downloadUrl) {
      _this.url = _Utils2.default.fillURITemplate(jmap.downloadUrl, {
        blobId: _this.blobId,
        name: _this.name || _this.blobId
      });
    }
    return _this;
  }

  /**
   * Gets a signed download URL for this {@link Attachment}.
   * Details of this process can be found in [the spec](http://jmap.io/spec.html#downloading-an-attachment-through-a-signed-request).
   * <br />
   * This mandates that `url` is defined on this {@link Attachment} instance, otherwise we cannot get a signed URL.
   *
   * @returns {Promise} A {@link Promise} eventually resolving to the signed download URL.
   *
   * @throws {Error} If this `Attachment` instance has no URL available.
   */


  _createClass(Attachment, [{
    key: 'getSignedDownloadUrl',
    value: function getSignedDownloadUrl() {
      _Utils2.default.assertRequiredParameterIsPresent(this.url, 'url');

      return this._jmap.transport.post(this.url, this._jmap._defaultHeaders(), null, true).then(_Utils2.default.appendQueryParameter.bind(null, this.url, 'access_token'));
    }

    /**
     * Creates a JSON representation from this model.
     *
     * @return JSON object with only owned properties and non default values.
     */

  }, {
    key: 'toJSONObject',
    value: function toJSONObject() {
      return new _JSONBuilder2.default().appendIfDefined('blobId', this.blobId).appendIfDefined('type', this.type).appendIfDefined('name', this.name).appendIfDefined('size', this.size).appendIfDefined('cid', this.cid).appendIfDefined('width', this.width).appendIfDefined('height', this.height).appendIfDefined('url', this.url).appendIfDefined('isInline', this.isInline).build();
    }

    /**
     * Creates an _Attachment_ from its JSON representation.
     *
     * @param jmap {Client} The {@link Client} instance used to fetch the parent {@link Message}.
     * @param object {Object} The JSON representation of the _Attachment_, as a Javascript object.
     * @param object.blobId {String} The id of the binary data for this _Attachment_.
     *
     * @return {Attachment}
     */

  }], [{
    key: 'fromJSONObject',
    value: function fromJSONObject(jmap, object) {
      _Utils2.default.assertRequiredParameterIsPresent(object, 'object');

      return new Attachment(jmap, object.blobId, object);
    }
  }]);

  return Attachment;
}(_Model3.default);

exports.default = Attachment;
module.exports = exports['default'];

},{"../utils/JSONBuilder.js":31,"../utils/Utils.js":32,"./Model.js":18}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Model2 = require('./Model.js');

var _Model3 = _interopRequireDefault(_Model2);

var _Utils = require('../utils/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

var _Constants = require('../utils/Constants.js');

var _Constants2 = _interopRequireDefault(_Constants);

var _Account = require('./Account.js');

var _Account2 = _interopRequireDefault(_Account);

var _ServerCapabilities = require('./ServerCapabilities.js');

var _ServerCapabilities2 = _interopRequireDefault(_ServerCapabilities);

var _MailCapabilities = require('./MailCapabilities.js');

var _MailCapabilities2 = _interopRequireDefault(_MailCapabilities);

var _JSONBuilder = require('../utils/JSONBuilder.js');

var _JSONBuilder2 = _interopRequireDefault(_JSONBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthAccess = function (_Model) {
  _inherits(AuthAccess, _Model);

  /**
   * This class represents a JMAP [Auth Access Response]{@link http://jmap.io/spec-core.html#201-authentication-is-complete-access-token-created}.
   *
   * @constructor
   *
   * @param jmap {Client} The {@link Client} instance that created this _AuthAccess_.
   * @param payload {Object} The server response of an auth access request.
   */
  function AuthAccess(jmap, payload) {
    _classCallCheck(this, AuthAccess);

    var _this = _possibleConstructorReturn(this, (AuthAccess.__proto__ || Object.getPrototypeOf(AuthAccess)).call(this, jmap));

    _Utils2.default.assertRequiredParameterIsPresent(payload, 'payload');
    ['username', 'accessToken', 'signingId', 'signingKey', 'apiUrl', 'eventSourceUrl', 'uploadUrl', 'downloadUrl', 'accounts', 'capabilities'].forEach(function (property) {
      _Utils2.default.assertRequiredParameterIsPresent(payload[property], property);
    });

    _this.username = payload.username;
    _this.accessToken = payload.accessToken;
    _this.signingId = payload.signingId;
    _this.signingKey = payload.signingKey;
    _this.apiUrl = payload.apiUrl;
    _this.eventSourceUrl = payload.eventSourceUrl;
    _this.uploadUrl = payload.uploadUrl;
    _this.downloadUrl = payload.downloadUrl;
    _this.capabilities = payload.capabilities;
    _this.serverCapabilities = new _ServerCapabilities2.default(_this.capabilities[_Constants2.default.CORE_CAPABILITIES_URI] || {});
    _this.mailCapabilities = new _MailCapabilities2.default(_this.capabilities[_Constants2.default.MAIL_CAPABILITIES_URI] || {});

    _this.accounts = {};
    for (var accountId in payload.accounts) {
      _this.accounts[accountId] = _Account2.default.fromJSONObject(jmap, _extends({ id: accountId }, payload.accounts[accountId]));
    }
    return _this;
  }

  /**
   * Creates a JSON representation from this {@link AuthAccess}.
   *
   * @return JSON object with only owned properties and non-null default values.
   */


  _createClass(AuthAccess, [{
    key: 'toJSONObject',
    value: function toJSONObject() {
      return new _JSONBuilder2.default().append('username', this.username).append('accessToken', this.accessToken).append('signingId', this.signingId).append('signingKey', this.signingKey).append('apiUrl', this.apiUrl).append('eventSourceUrl', this.eventSourceUrl).append('uploadUrl', this.uploadUrl).append('downloadUrl', this.downloadUrl).appendObject('accounts', this.accounts).appendObject('capabilities', this.capabilities).build();
    }
  }]);

  return AuthAccess;
}(_Model3.default);

exports.default = AuthAccess;
module.exports = exports['default'];

},{"../utils/Constants.js":30,"../utils/JSONBuilder.js":31,"../utils/Utils.js":32,"./Account.js":5,"./MailCapabilities.js":13,"./Model.js":18,"./ServerCapabilities.js":20}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require('../utils/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

var _AuthMethod = require('./AuthMethod');

var _AuthMethod2 = _interopRequireDefault(_AuthMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthContinuation = function () {
  /**
   * This class represents a JMAP [Auth Continuation Response]{@link http://jmap.io/spec.html#authentication}.
   *
   * @constructor
   *
   * @param payload {Object} The server response of an initial auth request.
   */
  function AuthContinuation(payload) {
    _classCallCheck(this, AuthContinuation);

    _Utils2.default.assertRequiredParameterIsPresent(payload, 'payload');
    _Utils2.default.assertRequiredParameterIsPresent(payload.loginId, 'loginId');
    _Utils2.default.assertRequiredParameterIsArrayWithMinimumLength(payload.methods, 'methods');

    this.loginId = payload.loginId;
    this.methods = payload.methods.map(function (method) {
      return new _AuthMethod2.default(method);
    });
    this.prompt = payload.prompt || null;
  }

  /**
   * Getter for the AuthMethod instance matching the given authentication type
   *
   * @param type {String} The authentication type
   * @return {AuthMethod}
   */


  _createClass(AuthContinuation, [{
    key: 'getMethod',
    value: function getMethod(type) {
      _Utils2.default.assertRequiredParameterHasType(type, 'type', 'string');

      var result = null;

      this.methods.forEach(function (authMethod) {
        if (authMethod.type === type) {
          result = authMethod;
        }
      });

      if (!result) {
        throw new Error('No AuthMethod of type "' + type + '" found');
      }

      return result;
    }

    /**
     * Checks if the given authentication type is supported by one of the registred auth methods
     *
     * @param type {String} The authentication type to check
     * @return {Boolean} True if supported, False otherwise
     */

  }, {
    key: 'supports',
    value: function supports(type) {
      _Utils2.default.assertRequiredParameterHasType(type, 'type', 'string');

      var result = false;

      try {
        this.getMethod(type);
        result = true;
      } catch (e) {}

      return result;
    }
  }]);

  return AuthContinuation;
}();

exports.default = AuthContinuation;
module.exports = exports['default'];

},{"../utils/Utils.js":32,"./AuthMethod":9}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Utils = require('../utils/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthMethod =
/**
 * This class represents a JMAP [AuthMethod]{@link http://jmap.io/spec.html#getting-an-access-token}.
 *
 * @constructor
 *
 * @param payload {Object} The server response of POST request to the authentication URL.
 */

function AuthMethod(payload) {
  _classCallCheck(this, AuthMethod);

  _Utils2.default.assertRequiredParameterIsPresent(payload, 'payload');
  _Utils2.default.assertRequiredParameterHasType(payload.type, 'type', 'string');

  _extends(this, payload);
};

exports.default = AuthMethod;
module.exports = exports['default'];

},{"../utils/Utils.js":32}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Utils = require('../utils/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Capabilities =
/**
 * This class represents an generic JMAP "capabilities" object. See {@link http://jmap.io/spec-core.html#getting-an-access-token*}.<br />
 *
 * @param namespace {String} The namespace/identifier of the capabilities.
 * @param [opts] {Object} The optional properties of this _Capabilities_.
 */
function Capabilities(namespace, opts) {
  _classCallCheck(this, Capabilities);

  _Utils2.default.assertRequiredParameterIsPresent(namespace, 'namespace');

  opts = opts || {};

  this.ns = namespace;
  _extends(this, opts);
};

exports.default = Capabilities;
module.exports = exports['default'];

},{"../utils/Utils.js":32}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Model2 = require('./Model.js');

var _Model3 = _interopRequireDefault(_Model2);

var _Utils = require('../utils/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateMessageAck = function (_Model) {
  _inherits(CreateMessageAck, _Model);

  /**
   * This class should be used to wrap a create response item from a setMessages request.<br />
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _OutboundMessage_.
   * @param response {Object} The raw created response object.
   * @param response.blobId {String} The server side generated blobId of the created message.
   * @param response.size {Number} The server side size of the created message.
   * @param [response.id=null] {String} The server side generated message id of the created message.
   * @param [response.threadId=null] {String} The server side assigned threadId of the created message.
   *
   * @see Model
   */
  function CreateMessageAck(jmap, response) {
    _classCallCheck(this, CreateMessageAck);

    var _this = _possibleConstructorReturn(this, (CreateMessageAck.__proto__ || Object.getPrototypeOf(CreateMessageAck)).call(this, jmap));

    _Utils2.default.assertRequiredParameterIsObject(response, 'response');
    _Utils2.default.assertRequiredParameterIsPresent(response.blobId, 'response.blobId');
    _Utils2.default.assertRequiredParameterHasType(response.size, 'response.size', 'number');

    _this.id = response.id;
    _this.blobId = response.blobId;
    _this.size = response.size;
    _this.threadId = response.threadId;
    return _this;
  }

  return CreateMessageAck;
}(_Model3.default);

exports.default = CreateMessageAck;
module.exports = exports['default'];

},{"../utils/Utils.js":32,"./Model.js":18}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EMailer = function () {
  /**
   * This class represents a JMAP [EMailer]{@link http://jmap.io/spec.html#messages}.<br />
   * An _EMailer_ object holds the name and email address of either a sender or a recipient of a {@link Message}.
   *
   * @param [opts] {Object} The optional properties of this _EMailer_.
   * @param [opts.name=''] {String} The name of the emailer.
   * @param [opts.email='@'] {String} The email address of the emailer.
   */
  function EMailer(opts) {
    _classCallCheck(this, EMailer);

    opts = opts || {};

    this.name = opts.name || '';
    this.email = opts.email || '@'; // http://jmap.io/spec.html#messages
  }

  /**
   * This method returns the unknown _EMailer_, that is, an _EMailer_ instance with all fields set to defaults.
   *
   * @return {EMailer} The unknown _EMailer_.
   */


  _createClass(EMailer, null, [{
    key: 'unknown',
    value: function unknown() {
      return new EMailer();
    }

    /**
     * Creates a _EMailer_ from its JSON representation.
     *
     * @param jmap {Client} The {@link Client} instance that originates the _EMailer_ instance. Is actually ignored.
     * @param object {Object} The JSON representation of the _EMailer_, as a Javascript object
     *
     * @return {EMailer}
     */

  }, {
    key: 'fromJSONObject',
    value: function fromJSONObject(jmap, object) {
      return new EMailer(object);
    }
  }]);

  return EMailer;
}();

exports.default = EMailer;
module.exports = exports['default'];

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Capabilities2 = require('./Capabilities');

var _Capabilities3 = _interopRequireDefault(_Capabilities2);

var _Constants = require('../utils/Constants');

var _Constants2 = _interopRequireDefault(_Constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MailCapabilities = function (_Capabilities) {
  _inherits(MailCapabilities, _Capabilities);

  /**
   * This class represents a JMAP [MailCapabilities]{@link http://jmap.io/spec.html#accounts*}.<br />
   * An _MailCapabilities_ object describes mail-related capabilities of a JMAP server.
   *
   * @constructor
   * @extends Capabilities
   *
   * @param [opts] {Object} The optional properties of this _MailCapabilities_.
   * @param [opts.maxMailboxesPerMessage=null] {Number} The maximum number of mailboxes that can be can assigned to a single message.
   * @param [opts.maxSizeMessageAttachments=0] {Number} The maximum total size of attachments, in bytes, allowed for messages.
   * @param [opts.maxDelayedSend=0] {Number} The number in seconds of the maximum delay the server supports in sending. 0 if delayed send is not supported.
   * @param [opts.messageListSortOptions=[]] {String[]} A list of all the message properties the server supports for sorting by.
   * @param [opts.submissionExtensions={} {String[String[]]} Known safe-to-expose EHLO capabilities of the submission server.
   *
   * @see Capabilities
   */
  function MailCapabilities(opts) {
    _classCallCheck(this, MailCapabilities);

    opts = opts || {};

    var _this = _possibleConstructorReturn(this, (MailCapabilities.__proto__ || Object.getPrototypeOf(MailCapabilities)).call(this, _Constants2.default.MAIL_CAPABILITIES_URI));

    _this.maxMailboxesPerMessage = opts.maxMailboxesPerMessage || null;
    _this.maxSizeMessageAttachments = opts.maxSizeMessageAttachments || 0;
    _this.maxDelayedSend = opts.maxDelayedSend || 0;
    _this.messageListSortOptions = opts.messageListSortOptions || [];
    _this.submissionExtensions = opts.submissionExtensions || {};
    return _this;
  }

  return MailCapabilities;
}(_Capabilities3.default);

exports.default = MailCapabilities;
module.exports = exports['default'];

},{"../utils/Constants":30,"./Capabilities":10}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Model2 = require('./Model.js');

var _Model3 = _interopRequireDefault(_Model2);

var _Utils = require('../utils/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

var _MailboxRole = require('./MailboxRole.js');

var _MailboxRole2 = _interopRequireDefault(_MailboxRole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mailbox = function (_Model) {
  _inherits(Mailbox, _Model);

  /**
   * This class represents a JMAP [Mailbox]{@link http://jmap.io/spec.html#mailboxes}.
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _Mailbox_.
   * @param id {String} The unique identifier of this _Mailbox_.
   * @param name {String} The user-visible name (i.e.: display name) of this _Mailbox_.
   * @param [opts] {Object} The optional properties of this _Mailbox_.
   * @param [opts.namespace={}] {Object} The namespace give information about mailbox type and owner.
   * @param [opts.parentId=null] {String} The _Mailbox_ id for the parent of this mailbox, or _null_ if this mailbox is at the top level.
   * @param [opts.role=null] {String} The role of this mailbox, if it is a system mailbox. See the specification for the possible values.
   * @param [opts.sharedWith={}] {Object} The sharedWith give information about mailbox shared and rights.
   * @param [opts.sortOrder=0] {String} Defines the sort order of mailboxes when presented in the UI.
   * @param [opts.mustBeOnlyMailbox=false] {Boolean} If _true_, messages in this mailbox may not also be in any other mailbox.
   * @param [opts.mayReadItems=false] {Boolean}  If _true_, may use this mailbox as part of a filter in a {@link Client#getMessageList} call.
   * @param [opts.mayAddItems=false] {Boolean} If _true_, the user may add messages to this mailbox.
   * @param [opts.mayRemoveItems=false] {Boolean} If _true_, the user may remove messages from this mailbox.
   * @param [opts.mayCreateChild=false] {Boolean} If _true_, the user may create a _Mailbox_ with this _Mailbox_ as its parent.
   * @param [opts.mayRename=false] {Boolean} If _true_, the user may rename this mailbox or make it a child of another mailbox.
   * @param [opts.mayDelete=false] {Boolean} If _true_, the user may delete this mailbox.
   * @param [opts.totalMessages=0] {Number} The number of messages in this mailbox.
   * @param [opts.unreadMessages=0] {Number} The number of messages in this mailbox with _isUnread_=true and _isDraft_=false.
   * @param [opts.totalThreads=0] {Number} The number of threads where at least one message in the thread is in this mailbox.
   * @param [opts.unreadThreads=0] {Number} The number of threads where at least one message in the thread is in this mailbox with _isUnread_=true and _isDraft_=false.
   *
   * @see Model
   */
  function Mailbox(jmap, id, name, opts) {
    _classCallCheck(this, Mailbox);

    var _this = _possibleConstructorReturn(this, (Mailbox.__proto__ || Object.getPrototypeOf(Mailbox)).call(this, jmap));

    _Utils2.default.assertRequiredParameterIsPresent(id, 'id');
    _Utils2.default.assertRequiredParameterIsPresent(name, 'name');

    opts = opts || {};

    _this.id = id;
    _this.name = name;
    _this.namespace = opts.namespace || {};
    _this.parentId = opts.parentId || null;
    _this.role = _MailboxRole2.default.fromRole(opts.role);
    _this.sharedWith = opts.sharedWith || {};
    _this.sortOrder = opts.sortOrder || 0;
    _this.mustBeOnlyMailbox = opts.mustBeOnlyMailbox || false;
    _this.mayReadItems = opts.mayReadItems || false;
    _this.mayAddItems = opts.mayAddItems || false;
    _this.mayRemoveItems = opts.mayRemoveItems || false;
    _this.mayCreateChild = opts.mayCreateChild || false;
    _this.mayRename = opts.mayRename || false;
    _this.mayDelete = opts.mayDelete || false;
    _this.totalMessages = opts.totalMessages || 0;
    _this.unreadMessages = opts.unreadMessages || 0;
    _this.totalThreads = opts.totalThreads || 0;
    _this.unreadThreads = opts.unreadThreads || 0;
    return _this;
  }

  /**
   * Fetches a message list from this _Mailbox_.<br />
   * This will delegate to {@link Client#getMessageList}, passing the following filter:
   *
   *     {
   *       inMailboxes: [<this Mailbox id>]
   *     }
   *
   * @param [options] {Object} The options object passed to {@link Client#getMessageList}.
   *   Please note that the _filter_ option will be overriden if defined.
   * @returns {Promise} A promise that eventually resolves with a {@link MessageList} instance.
   *
   * @see Client#getMessageList
   * @see PromiseProvider
   */


  _createClass(Mailbox, [{
    key: 'getMessageList',
    value: function getMessageList(options) {
      options = options || {};
      options.filter = {
        inMailboxes: [this.id]
      };

      return this._jmap.getMessageList(options);
    }

    /**
     * Update this {@link Mailbox}.
     *
     * @param options {Object} The attribute to be updated in this {@link Mailbox}.
     * @param options.name {String} The user-visible name of the _Mailbox_.
     * @param [options.parentId = null] {String} The _Mailbox_ id for the parent of this mailbox, or _null_ if this mailbox is at the top level.
     *
     * @return {Promise} A {@link Promise}, as per {@link Client.updateMailbox}.
     *
     * @see Client#updateMailbox
     */

  }, {
    key: 'update',
    value: function update(options) {
      return this._jmap.updateMailbox(this.id, options);
    }

    /**
     * Destroy this {@link Mailbox} on the server.
     *
     * @return {Promise} A {@link Promise}, as per {@link Client.destroyMailbox}.
     *
     * @see Client#destroyMailbox
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      return this._jmap.destroyMailbox(this.id);
    }

    /**
     * Creates a _Mailbox_ from its JSON representation.
     *
     * @param jmap {Client} The {@link Client} instance passed to the _Mailbox_ constructor.
     * @param object {Object} The JSON representation of the _Mailbox_, as a Javascript object.
     * @param object.id {String} The identifier of the _Mailbox_.
     * @param object.name {String} The user-visible name of the _Mailbox_.
     *
     * @return {Mailbox}
     */

  }], [{
    key: 'fromJSONObject',
    value: function fromJSONObject(jmap, object) {
      _Utils2.default.assertRequiredParameterIsPresent(object, 'object');

      return new Mailbox(jmap, object.id, object.name, object);
    }
  }]);

  return Mailbox;
}(_Model3.default);

exports.default = Mailbox;
module.exports = exports['default'];

},{"../utils/Utils.js":32,"./MailboxRole.js":15,"./Model.js":18}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MailboxRole = function () {
  /**
   * The MailboxRole class is simply a holder for predefined JMAP mailbox roles.<br />
   * It exposes class constants for every predefined roles (trash, inbox, etc.)
   *
   * @constructor
   *
   * @param role {String} The JMAP mailbox role. This is exposed as the `value` property.
   *
   * @see http://jmap.io/spec.html#mailboxes
   */
  function MailboxRole(role) {
    _classCallCheck(this, MailboxRole);

    this.value = role;
  }

  /**
   * Returns the class constant mapping to the given JMAP role, or {@link MailboxRole.UNKNOWN}
   * if the role is undefined, null or isn't a predefined role.
   *
   * @param role {String} The JMAP role to find the {@link MailboxRole} for.
   *
   * @return {MailboxRole}
   */


  _createClass(MailboxRole, null, [{
    key: 'fromRole',
    value: function fromRole(role) {
      if (role) {
        for (var key in MailboxRole) {
          if (MailboxRole.hasOwnProperty(key) && MailboxRole[key].value === role) {
            return MailboxRole[key];
          }
        }
      }

      return MailboxRole.UNKNOWN;
    }
  }]);

  return MailboxRole;
}();

['inbox', 'archive', 'drafts', 'outbox', 'sent', 'trash', 'spam', 'templates'].forEach(function (role) {
  MailboxRole[role.toUpperCase()] = new MailboxRole(role);
});
MailboxRole.UNKNOWN = new MailboxRole(null);

exports.default = MailboxRole;
module.exports = exports['default'];

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Model2 = require('./Model.js');

var _Model3 = _interopRequireDefault(_Model2);

var _EMailer = require('./EMailer.js');

var _EMailer2 = _interopRequireDefault(_EMailer);

var _Utils = require('../utils/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

var _Attachment = require('./Attachment.js');

var _Attachment2 = _interopRequireDefault(_Attachment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Message = function (_Model) {
  _inherits(Message, _Model);

  /**
   * This class represents a JMAP [Message]{@link http://jmap.io/spec.html#messages}.<br />
   * When creating a new _Message_ instance, the following requirements must be met:
   *   * The _threadId_ must be defined (in JMAP, a _Message_ is always in a _Thread_)
   *   * The _mailboxIds_ must contain at least one element.
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _Message_.
   * @param id {String} The unique identifier of this _Message_.
   * @param blobId {String} The identifier  representing the raw [@!RFC5322] message.
   * @param threadId {String} The unique identifier of the _Thread_ this _Message_ is in.
   * @param mailboxIds {String[]} The array of _Mailbox_ identifiers this _Message_ is present into.
   * @param [opts] {Object} The optional properties of this _Message_.
   * @param [opts.inReplyToMessageId=null] {String} The id of the _Message_ this _Message_ is a reply to.
   * @param [opts.isUnread=false] {Boolean} Has the message not yet been read? This maps to the opposite of the \Seen flag in IMAP.
   * @param [opts.isFlagged=false] {Boolean} Is the message flagged? This maps to the \Flagged flag in IMAP.
   * @param [opts.isAnswered=false] {Boolean} Has the message been replied to? This maps to the \Answered flag in IMAP.
   * @param [opts.isDraft=false] {Boolean} Is the message a draft? This maps to the \Draft flag in IMAP.
   * @param [opts.hasAttachment=false] {Boolean} Does the message have any attachments?
   * @param [opts.headers] {Object} A hash of header name to header value for all headers in the message.
   *   For headers that occur multiple times, the values are concatenated with a single new line (\n) character in between each one.
   * @param [opts.from=null] {EMailer} The {@link EMailer} object representing the first identified sender of this _Message_.
   * @param [opts.to=[{@link EMailer.unknown}]] {EMailer[]} The array of {@link EMailer} objects representing the _To:_ of this _Message_.
   * @param [opts.cc=[{@link EMailer.unknown}]] {EMailer[]} The array of {@link EMailer} objects representing the _CC:_ of this _Message_.
   * @param [opts.bcc=[{@link EMailer.unknown}]] {EMailer[]} The array of {@link EMailer} objects representing the _BCC:_ of this _Message_.
   * @param [opts.replyTo={@link EMailer.unknown}] {EMailer[]} The array of {@link EMailer} objects representing the _Reply-To:_ of this _Message_.
   * @param [opts.subject=null] {String} The subject of this _Message_.
   * @param [opts.date=null] {Date} The date the _Message_ was sent (or saved, if the message is a draft).
   * @param [opts.size=0] {String} The size in bytes of the whole message as counted by the server.
   * @param [opts.preview=null] {String} Up to 256 characters of the beginning of a plain text version of the _Message_ body.
   * @param [opts.textBody=null] {String} The plain text body part for the _Message_.
   * @param [opts.htmlBody=null] {String} The HTML body part for the _Message_, if present.
   * @param [opts.attachments=[]] {Attachment[]} An array of {@link Attachment} objects detailing all the attachments to the message.
   *
   * @see Model
   * @see EMailer
   */
  function Message(jmap, id, blobId, threadId, mailboxIds, opts) {
    _classCallCheck(this, Message);

    var _this = _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, jmap));

    _Utils2.default.assertRequiredParameterIsPresent(id, 'id');
    _Utils2.default.assertRequiredParameterIsPresent(blobId, 'blobId');
    _Utils2.default.assertRequiredParameterIsPresent(threadId, 'threadId');
    _Utils2.default.assertRequiredParameterIsArrayWithMinimumLength(mailboxIds, 'mailboxIds', 1);

    opts = opts || {};

    _this.id = id;
    _this.blobId = blobId;
    _this.threadId = threadId;
    _this.mailboxIds = mailboxIds;
    _this.inReplyToMessageId = opts.inReplyToMessageId || null;
    _this.isUnread = opts.isUnread || false;
    _this.isFlagged = opts.isFlagged || false;
    _this.isAnswered = opts.isAnswered || false;
    _this.isDraft = opts.isDraft || false;
    _this.hasAttachment = opts.hasAttachment || false;
    _this.headers = opts.headers || {};
    _this.from = _Utils2.default._jsonArrayToModelList(jmap, _EMailer2.default, Array.isArray(opts.from) ? opts.from : [opts.from])[0];
    _this.to = _Utils2.default._jsonArrayToModelList(jmap, _EMailer2.default, opts.to);
    _this.cc = _Utils2.default._jsonArrayToModelList(jmap, _EMailer2.default, opts.cc);
    _this.bcc = _Utils2.default._jsonArrayToModelList(jmap, _EMailer2.default, opts.bcc);
    _this.replyTo = opts.replyTo || [];
    _this.subject = opts.subject || null;
    _this.date = opts.date ? new Date(opts.date) : null;
    _this.size = opts.size || 0;
    _this.preview = opts.preview || null;
    _this.textBody = opts.textBody || null;
    _this.htmlBody = opts.htmlBody || null;
    _this.attachments = _Utils2.default._jsonArrayToModelList(jmap, _Attachment2.default, opts.attachments);
    return _this;
  }

  /**
   * Moves this {@link Message} to a different set of mailboxes.
   *
   * @param mailboxIds {String[]} The identifiers of the target mailboxes for the message.
   *
   * @return {Promise} A {@link Promise}, as per {@link Client.moveMessage}.
   *
   * @see Client#moveMessage
   */


  _createClass(Message, [{
    key: 'move',
    value: function move(mailboxIds) {
      return this._jmap.moveMessage(this.id, mailboxIds);
    }

    /**
     * Moves this {@link Message} to the mailbox holding the given `role`.<br />
     * This will first do a JMAP request to find the mailbox with the given role, then a {@link Message#move} to move the message.
     *
     * @param role {MailboxRole|String} The desired mailbox role.
     *
     * @return {Promise} A {@link Promise}, as per {@link Message#move}.
     *
     * @see MailboxRole
     * @see Client#getMailboxWithRole
     */

  }, {
    key: 'moveToMailboxWithRole',
    value: function moveToMailboxWithRole(role) {
      var _this2 = this;

      return this._jmap.getMailboxWithRole(role).then(function (mailbox) {
        return _this2.move([mailbox.id]);
      });
    }

    /**
     * Updates this {@link Message}.
     *
     * @param options {Object} The options to be updated in this {@link Message} as per {@link Client.updateMessage}.
     *
     * @return {Promise} A {@link Promise}, as per {@link Client.updateMessage}.
     *
     * @see Client#updateMessage
     */

  }, {
    key: 'update',
    value: function update(options) {
      return this._jmap.updateMessage(this.id, options);
    }

    /**
     * Updates the isFlagged field of this {@link Message}.
     *
     * @param isFlagged {Boolean} The isFlagged field of the message.
     *
     * @return {Promise} A {@link Promise}, as per {@link Client.updateMessage}.
     *
     * @see Client#updateMessage
     */

  }, {
    key: 'setIsFlagged',
    value: function setIsFlagged(isFlagged) {
      _Utils2.default.assertRequiredParameterHasType(isFlagged, 'isFlagged', 'boolean');

      return this.update({ isFlagged: isFlagged });
    }

    /**
     * Updates the isUnread field of this {@link Message}.
     *
     * @param isUnread {Boolean} The isUnread field of the message.
     *
     * @return {Promise} A {@link Promise}, as per {@link Client.updateMessage}.
     *
     * @see Client#updateMessage
     */

  }, {
    key: 'setIsUnread',
    value: function setIsUnread(isUnread) {
      _Utils2.default.assertRequiredParameterHasType(isUnread, 'isUnread', 'boolean');

      return this.update({ isUnread: isUnread });
    }

    /**
     * Updates the isAnswered field of this {@link Message}.
     *
     * @param isAnswered {Boolean} The isAnswered field of the message.
     *
     * @return {Promise} A {@link Promise}, as per {@link Client.updateMessage}.
     *
     * @see Client#updateMessage
     */

  }, {
    key: 'setIsAnswered',
    value: function setIsAnswered(isAnswered) {
      _Utils2.default.assertRequiredParameterHasType(isAnswered, 'isAnswered', 'boolean');

      return this.update({ isAnswered: isAnswered });
    }

    /**
     * Destroy this {@link Message} on the server.
     *
     * @return {Promise} A {@link Promise}, as per {@link Client.destroyMessage}.
     *
     * @see Client#destroyMessage
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      return this._jmap.destroyMessage(this.id);
    }

    /**
     * Creates a _Message_ from its JSON representation.
     *
     * @param jmap {Client} The {@link Client} instance passed to the _Message_ constructor.
     * @param object {Object} The JSON representation of the _Message_, as a Javascript object.
     * @param object.id {Object} The identifier of the _Message_.
     * @param object.blobId {String} The identifier  representing the raw [@!RFC5322] message.
     * @param object.threadId {String} The identifier of the thread the _Message_ is in.
     * @param object.mailboxIds {String[]} The array of _Mailbox_ identifiers the _Message_ is present into.
     *
     * @return {Message}
     */

  }], [{
    key: 'fromJSONObject',
    value: function fromJSONObject(jmap, object) {
      _Utils2.default.assertRequiredParameterIsPresent(object, 'object');

      return new Message(jmap, object.id, object.blobId, object.threadId, object.mailboxIds, object);
    }
  }]);

  return Message;
}(_Model3.default);

exports.default = Message;
module.exports = exports['default'];

},{"../utils/Utils.js":32,"./Attachment.js":6,"./EMailer.js":12,"./Model.js":18}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Model2 = require('./Model.js');

var _Model3 = _interopRequireDefault(_Model2);

var _Utils = require('../utils/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageList = function (_Model) {
  _inherits(MessageList, _Model);

  /**
   * This class represents a JMAP [MessageList]{@link http://jmap.io/spec.html#messagelists}.
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _Mailbox_.
   * @param [opts] {Object} The optional properties of this _Mailbox_.
   * @param [opts.accountId=''] {String} The id of the {@link Account} used in the request that originated this _MessageList_.
   * @param [opts.filter=null] {Object} The filter used in the request that originated this _MessageList_.
   * @param [opts.sort=null] {Object} The sort properties used in the request that originated this _MessageList_.
   * @param [opts.collapseThreads=false] {Boolean} The collapseThreads value used in the request that originated this _MessageList_.
   * @param [opts.position=0] {Number} The 0-based index of the first result in the _threadIds_ array within the complete list.
   * @param [opts.total=0] {Number} The total number of messages in the message list (given the filter and collapseThreads arguments).
   * @param [opts.threadIds=[]] {String[]} The list of _Thread_ identifiers for each message in the list after filtering, sorting and collapsing threads.
   * @param [opts.messageIds=[]] {String[]} The list of _Message_ identifiers for each message in the list after filtering, sorting and collapsing threads.
   *
   * @see Model
   * @see Thread
   * @see Message
   */
  function MessageList(jmap, opts) {
    _classCallCheck(this, MessageList);

    var _this = _possibleConstructorReturn(this, (MessageList.__proto__ || Object.getPrototypeOf(MessageList)).call(this, jmap));

    opts = opts || {};

    _this.accountId = opts.accountId || '';
    _this.filter = opts.filter || null;
    _this.sort = opts.sort || null;
    _this.collapseThreads = opts.collapseThreads || false;
    _this.position = opts.position || 0;
    _this.total = opts.total || 0;
    _this.threadIds = opts.threadIds || [];
    _this.messageIds = opts.messageIds || [];
    return _this;
  }

  /**
   * Fetches all threads contained in this _MessageList_.<br />
   * This will delegate to {@link Client#getThreads}, passing this MessageList's _threadIds_ as the _ids_ option.
   *
   * @param [options] {Object} The options object passed to {@link Client#getThreads}.
   *   Please note that the _ids_ option will be overriden if defined.
   * @returns {Promise} A promise that eventually resolves with an array of {@link Thread} instances.
   *
   * @see Client#getThreads
   * @see PromiseProvider
   */


  _createClass(MessageList, [{
    key: 'getThreads',
    value: function getThreads(options) {
      options = options || {};
      options.ids = this.threadIds;

      return this._jmap.getThreads(options);
    }

    /**
     * Fetches all messages contained in this _MessageList_.<br />
     * This will delegate to {@link Client#getMessages}, passing this MessageList's _messageIds_ as the _ids_ option.
     *
     * @param [options] {Object} The options object passed to {@link Client#getMessages}.
     *   Please note that the _ids_ option will be overriden if defined.
     * @returns {Promise} A promise that eventually resolves with an array of {@link Message} instances.
     *
     * @see Client#getMessages
     * @see PromiseProvider
     */

  }, {
    key: 'getMessages',
    value: function getMessages(options) {
      options = options || {};
      options.ids = this.messageIds;

      return this._jmap.getMessages(options);
    }

    /**
     * Creates a _MessageList_ from its JSON representation.
     *
     * @param jmap {Client} The {@link Client} instance passed to the _MessageList_ constructor.
     * @param object {Object} The JSON representation of the _MessageList_, as a Javascript object.
     *
     * @return {MessageList}
     */

  }], [{
    key: 'fromJSONObject',
    value: function fromJSONObject(jmap, object) {
      _Utils2.default.assertRequiredParameterIsPresent(object, 'object');

      return new MessageList(jmap, object);
    }
  }]);

  return MessageList;
}(_Model3.default);

exports.default = MessageList;
module.exports = exports['default'];

},{"../utils/Utils.js":32,"./Model.js":18}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model =
/**
 * The base class for all JMAP entities.<br />
 * When implementing new entities you should always try to inherit from this.<br />
 * <br />
 * You shouldn't use this constructor directly, but rather create instances of concrete implementations.
 *
 * @constructor
 * @abstract
 *
 * @param jmap {Client} The {@link Client} instance that created this _Model_. This will be exposed as the **_jmap** property.
 */
function Model(jmap) {
  _classCallCheck(this, Model);

  this._jmap = jmap;
};

exports.default = Model;
module.exports = exports['default'];

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Model2 = require('./Model.js');

var _Model3 = _interopRequireDefault(_Model2);

var _Utils = require('../utils/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

var _Attachment = require('./Attachment.js');

var _Attachment2 = _interopRequireDefault(_Attachment);

var _JSONBuilder = require('../utils/JSONBuilder.js');

var _JSONBuilder2 = _interopRequireDefault(_JSONBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OutboundMessage = function (_Model) {
  _inherits(OutboundMessage, _Model);

  /**
   * This class represents a JMAP [Message]{@link http://jmap.io/spec.html#messages} but for client-to-server purpose.<br />
   * When creating a new _OutboundMessage_ instance, the following requirements must be met:
   *   * The _id_, _blobId_, _threadId_, _size_, _preview_, _hasAttachment_ and _attachedMessages_ must be not defined (it is set by the server upon creation)
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _OutboundMessage_.
   * @param [opts] {Object} The optional properties of this _OutboundMessage_.
   * @param [opts.mailboxIds=[]] {String[]} The array of _Mailbox_ identifiers which will contain this _OutboundMessage_.
   * @param [opts.inReplyToMessageId=null] {String} The id of the _Message_ this _OutboundMessage_ is a reply to.
   * @param [opts.isUnread=null] {Boolean} Has the message not yet been read? This maps to the opposite of the \Seen flag in IMAP.
   * @param [opts.isFlagged=null] {Boolean} Is the message flagged? This maps to the \Flagged flag in IMAP.
   * @param [opts.isAnswered=null] {Boolean} Has the message been replied to? This maps to the \Answered flag in IMAP.
   * @param [opts.isDraft=null] {Boolean} Is the message a draft? This maps to the \Draft flag in IMAP.
   * @param [opts.headers] {Object} A hash of header name to header value for all headers in the message.
   *   For headers that occur multiple times, the values are concatenated with a single new line (\n) character in between each one.
   * @param [opts.from=null] {String} Overrides the value used as _From:_ in the headers.
   * @param [opts.to=null] {String[]} Overrides the value used as _To:_ in the headers.
   * @param [opts.cc=null] {String[]} Overrides the value used as _CC:_ in the headers.
   * @param [opts.bcc=null] {String[]} Overrides the value used as _BCC:_ in the headers.
   * @param [opts.replyTo=null] {String} Overrides the value used as _Reply-To:_ in the headers.
   * @param [opts.subject=null] {String} The subject of this _OutboundMessage_.
   * @param [opts.textBody=null] {String} The plain text body part.
   * @param [opts.htmlBody=null] {String} The HTML body part.
   * @param [opts.attachments=[]] {Attachment[]} An array of {@link Attachment} objects detailing all the attachments to the message.
   *   Attachments must first be uploaded using the standard upload mechanism.
   *
   * @see Model
   */
  function OutboundMessage(jmap, opts) {
    _classCallCheck(this, OutboundMessage);

    var _this = _possibleConstructorReturn(this, (OutboundMessage.__proto__ || Object.getPrototypeOf(OutboundMessage)).call(this, jmap));

    opts = opts || {};

    _this.mailboxIds = opts.mailboxIds || [];
    _this.inReplyToMessageId = opts.inReplyToMessageId || null;
    _this.isUnread = opts.isUnread;
    _this.isFlagged = opts.isFlagged;
    _this.isAnswered = opts.isAnswered;
    _this.isDraft = opts.isDraft;
    _this.headers = opts.headers || null;
    _this.from = opts.from || null;
    _this.to = opts.to || null;
    _this.cc = opts.cc || null;
    _this.bcc = opts.bcc || null;
    _this.replyTo = opts.replyTo || null;
    _this.subject = opts.subject || null;
    _this.textBody = opts.textBody || null;
    _this.htmlBody = opts.htmlBody || null;
    _this.attachments = _Utils2.default._jsonArrayToModelList(jmap, _Attachment2.default, opts.attachments);
    return _this;
  }

  /**
   * Creates a JSON representation from this model.
   *
   * @return JSON object with only owned properties and non default values.
   */


  _createClass(OutboundMessage, [{
    key: 'toJSONObject',
    value: function toJSONObject() {
      return new _JSONBuilder2.default().appendIfNotEmpty('mailboxIds', this.mailboxIds).appendIfDefined('inReplyToMessageId', this.inReplyToMessageId).appendIfDefined('isUnread', this.isUnread).appendIfDefined('isFlagged', this.isFlagged).appendIfDefined('isAnswered', this.isAnswered).appendIfDefined('isDraft', this.isDraft).appendIfDefined('headers', this.headers).appendIfDefined('from', this.from).appendIfDefined('to', this.to).appendIfDefined('cc', this.cc).appendIfDefined('bcc', this.bcc).appendIfDefined('replyTo', this.replyTo).appendIfDefined('subject', this.subject).appendIfDefined('textBody', this.textBody).appendIfDefined('htmlBody', this.htmlBody).appendIfNotEmpty('attachments', this.attachments).build();
    }
  }]);

  return OutboundMessage;
}(_Model3.default);

exports.default = OutboundMessage;
module.exports = exports['default'];

},{"../utils/JSONBuilder.js":31,"../utils/Utils.js":32,"./Attachment.js":6,"./Model.js":18}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServerCapabilities =
/**
 * This class represents a JMAP [ServerCapabilities]{@link http://jmap.io/spec-core.html#201-authentication-is-complete-access-token-created}.<br />
 * An _ServerCapabilities_ object describes general capabilities of a JMAP server.
 *
 * @constructor
 *
 * @param [opts] {Object} The optional properties of this _ServerCapabilities_.
 * @param [opts.maxSizeUpload=0] {Number} The maximum file size, in bytes, that the server will accept for a single file upload.
 * @param [opts.maxSizeRequest=0] {Number} The maximum size, in bytes, that the server will accept for a single request to the API endpoint.
 * @param [opts.maxConcurrentUpload=1] {Number} The maximum number of concurrent requests the server will accept to the upload endpoint.
 * @param [opts.maxConcurrentRequests=1] {Number} The maximum number of concurrent requests the server will accept to the API endpoint.
 * @param [opts.maxCallsInRequest=1] {Number} The maximum number of method calls the server will accept in a single request to the API endpoint.
 * @param [opts.maxObjectsInGet=0] {Number} The maximum number of objects that the client may request in a single getXXX type method call.
 * @param [opts.maxObjectsInSet=0] {Number} The maximum number of objects the client may send to create, update or destroy in a single setXXX type method call.
 */
function ServerCapabilities(opts) {
  _classCallCheck(this, ServerCapabilities);

  opts = opts || {};

  this.maxSizeUpload = opts.maxSizeUpload || 0;
  this.maxSizeRequest = opts.maxSizeRequest || 0;
  this.maxConcurrentUpload = opts.maxConcurrentUpload || 1;
  this.maxConcurrentRequests = opts.maxConcurrentRequests || 1;
  this.maxCallsInRequest = opts.maxCallsInRequest || 1;
  this.maxObjectsInGet = opts.maxObjectsInGet || 0;
  this.maxObjectsInSet = opts.maxObjectsInSet || 0;
};

exports.default = ServerCapabilities;
module.exports = exports['default'];

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Model2 = require('./Model.js');

var _Model3 = _interopRequireDefault(_Model2);

var _Utils = require('../utils/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

var _JmapError = require('../errors/JmapError');

var _JmapError2 = _interopRequireDefault(_JmapError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SetResponse = function (_Model) {
  _inherits(SetResponse, _Model);

  /**
   * This class represents a JMAP [xxxSet] {@link http://jmap.io/spec.html#setfoos}.
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _SetResponse_.
   * @param [opts] {Object} The optional properties of this _SetResponse_.
   * @param [opts.accountId=''] {String} The id of the {@link Account} used in the request that originated this _SetResponse_.
   * @param [opts.oldState=''] {String} The state string that would have been returned by _getXXX_ before making the requested changes,
   *        or null if the server doesn’t know what the previous state string was.
   * @param [opts.newState=''] {String[]} The state string that will now be returned by _getXXX_.
   * @param [opts.created=[]] {String[]} A map of the creation id to an object containing any server-assigned properties of
   *        the _XXX_ object (including the id) for all successfully created records.
   * @param [opts.updated=[]] {String[]}  A list of _XXX_ ids for records that were successfully updated.
   * @param [opts.destroyed=[]] {String[]}  A list of _XXX_ ids for records that were successfully destroyed.
   * @param [opts.MDNSent=[]] {String[]|null}  A list of receipt request ids for receipt that were successfully sent.
   * @param [opts.notCreated=[]] {String[]} A map of creation id to a SetError object for each _XXX_ that failed to be created.
   * @param [opts.notUpdated=[]] {String[]} A map of _XXX_ id to a SetError object for each _XXX_ that failed to be updated.
   * @param [opts.notDestroyed=[]] {String[]} A map of _XXX_ id to a SetError object for each _XXX_ that failed to be destroyed.
   * @param [opts.MDNNotSent={}] {String[SetError]|null} A map of MDN request id to a SetError object for each receipt that failed to be sent, or null if all successful.
   *
   * @see Model
   */
  function SetResponse(jmap, opts) {
    _classCallCheck(this, SetResponse);

    var _this = _possibleConstructorReturn(this, (SetResponse.__proto__ || Object.getPrototypeOf(SetResponse)).call(this, jmap));

    opts = opts || {};

    _this.accountId = opts.accountId || null;
    _this.oldState = opts.oldState || null;
    _this.newState = opts.newState || '';
    _this.created = opts.created || {};
    _this.updated = opts.updated || [];
    _this.destroyed = opts.destroyed || [];
    _this.MDNSent = opts.MDNSent || [];
    _this.notCreated = SetResponse._mapSetErrorsToJmapErrors(opts.notCreated || {});
    _this.notUpdated = SetResponse._mapSetErrorsToJmapErrors(opts.notUpdated || {});
    _this.notDestroyed = SetResponse._mapSetErrorsToJmapErrors(opts.notDestroyed || {});
    _this.MDNNotSent = SetResponse._mapSetErrorsToJmapErrors(opts.MDNNotSent || {});
    return _this;
  }

  /**
   * Creates a _SetResponse_ from its JSON representation.
   *
   * @param jmap {Client} The {@link Client} instance passed to the _SetResponse_ constructor.
   * @param object {Object} The JSON representation of the _SetResponse_, as a Javascript object.
   *
   * @return {SetResponse}
   */


  _createClass(SetResponse, null, [{
    key: 'fromJSONObject',
    value: function fromJSONObject(jmap, object) {
      _Utils2.default.assertRequiredParameterIsPresent(object, 'object');

      return new SetResponse(jmap, object);
    }
  }, {
    key: '_mapSetErrorsToJmapErrors',
    value: function _mapSetErrorsToJmapErrors(errors) {
      var newErrors = {};

      for (var key in errors) {
        if (errors.hasOwnProperty(key)) {
          newErrors[key] = new _JmapError2.default(errors[key]);
        }
      }

      return newErrors;
    }
  }]);

  return SetResponse;
}(_Model3.default);

exports.default = SetResponse;
module.exports = exports['default'];

},{"../errors/JmapError":3,"../utils/Utils.js":32,"./Model.js":18}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Model2 = require('./Model.js');

var _Model3 = _interopRequireDefault(_Model2);

var _Utils = require('../utils/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Thread = function (_Model) {
  _inherits(Thread, _Model);

  /**
   * This class represents a JMAP [Thread]{@link http://jmap.io/spec.html#threads}.
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _Thread_.
   * @param id {String} The unique identifier of this _Thread_.
   * @param [opts] {Object} The optional properties of this _Thread_.
   * @param [opts.messageIds=[]] {String[]} An array of message identifiers contained in this _Thread_.
   *
   * @see Model
   */
  function Thread(jmap, id, opts) {
    _classCallCheck(this, Thread);

    var _this = _possibleConstructorReturn(this, (Thread.__proto__ || Object.getPrototypeOf(Thread)).call(this, jmap));

    _Utils2.default.assertRequiredParameterIsPresent(id, 'id');

    opts = opts || {};

    _this.id = id;
    _this.messageIds = opts.messageIds || [];
    return _this;
  }

  /**
   * Fetches all messages contained in this _Thread_.<br />
   * This will delegate to {@link Client#getMessages}, passing this Thread's _messageIds_ as the _ids_ option.
   *
   * @param [options] {Object} The options object passed to {@link Client#getMessages}.
   *   Please note that the _ids_ option will be overriden if defined.
   * @returns {Promise} A promise that eventually resolves with an array of {@link Message} instances.
   *
   * @see Client#getMessages
   * @see PromiseProvider
   */


  _createClass(Thread, [{
    key: 'getMessages',
    value: function getMessages(options) {
      options = options || {};
      options.ids = this.messageIds;

      return this._jmap.getMessages(options);
    }

    /**
     * Updates the isFlagged field of all {@link Message}s of this {@link Thread}.
     *
     * @param isFlagged {Boolean} The isFlagged field of the thread.
     *
     * @return {Promise} A {@link Promise}, as per {@link Client.setMessages}.
     *
     * @see Client#setMessages
     */

  }, {
    key: 'setIsFlagged',
    value: function setIsFlagged(isFlagged) {
      return this._flagAllMessages('isFlagged', isFlagged);
    }

    /**
     * Updates the isUnread field of this {@link Message}.
     *
     * @param isUnread {Boolean} The isUnread field of the thread.
     *
     * @return {Promise} A {@link Promise}, as per {@link Client.setMessages}.
     *
     * @see Client#setMessages
     */

  }, {
    key: 'setIsUnread',
    value: function setIsUnread(isUnread) {
      return this._flagAllMessages('isUnread', isUnread);
    }

    /**
     * Moves this {@link Thread} to a different set of mailboxes.
     *
     * @param mailboxIds {String[]} The identifiers of the target mailboxes for the thread.
     *
     * @return {Promise} A {@link Promise}, as per {@link Client.setMessages}.
     *
     * @see Client#setMessages
     */

  }, {
    key: 'move',
    value: function move(mailboxIds) {
      return this._updateAllMessages({ mailboxIds: mailboxIds });
    }

    /**
     * Moves this {@link Thread} to the mailbox holding the given `role`.<br />
     * This will first do a JMAP request to find the mailbox with the given role, then a {@link Thread#move} to move the message.
     *
     * @param role {MailboxRole|String} The desired mailbox role.
     *
     * @return {Promise} A {@link Promise}, as per {@link Thread#move}.
     *
     * @see MailboxRole
     * @see Client#getMailboxWithRole
     */

  }, {
    key: 'moveToMailboxWithRole',
    value: function moveToMailboxWithRole(role) {
      var _this2 = this;

      return this._jmap.getMailboxWithRole(role).then(function (mailbox) {
        return _this2.move([mailbox.id]);
      });
    }

    /**
     * Destroy this {@link Thread} on the server.<br />
     * This will internally destory all messages contained in this thread.
     *
     * @return {Promise} A {@link Promise}, as per {@link Client.destroyMessages}.
     *
     * @see Client#destroyMessages
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      return this._jmap.destroyMessages(this.messageIds);
    }
  }, {
    key: '_updateAllMessages',
    value: function _updateAllMessages(updates) {
      var options = {};

      this.messageIds.forEach(function (id) {
        options[id] = updates;
      });

      return this._jmap.setMessages({ update: options });
    }
  }, {
    key: '_flagAllMessages',
    value: function _flagAllMessages(flag, state) {
      _Utils2.default.assertRequiredParameterHasType(state, 'state', 'boolean');

      return this._updateAllMessages(_defineProperty({}, flag, state));
    }

    /**
     * Creates a _Thread_ from its JSON representation.
     *
     * @param jmap {Client} The {@link Client} instance passed to the _Thread_ constructor.
     * @param object {Object} The JSON representation of the _Thread_, as a Javascript object.
     * @param object.id {String} The identifier of the _Thread_.
     *
     * @return {Thread}
     */

  }], [{
    key: 'fromJSONObject',
    value: function fromJSONObject(jmap, object) {
      _Utils2.default.assertRequiredParameterIsPresent(object, 'object');

      return new Thread(jmap, object.id, object);
    }
  }]);

  return Thread;
}(_Model3.default);

exports.default = Thread;
module.exports = exports['default'];

},{"../utils/Utils.js":32,"./Model.js":18}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Model2 = require('./Model.js');

var _Model3 = _interopRequireDefault(_Model2);

var _Utils = require('../utils/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

var _JSONBuilder = require('../utils/JSONBuilder.js');

var _JSONBuilder2 = _interopRequireDefault(_JSONBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VacationResponse = function (_Model) {
  _inherits(VacationResponse, _Model);

  /**
   * This class represents a JMAP [VacationResponse]{@link http://jmap.io/spec.html#vacation-response}.<br />
   * The _VacationResponse_ object represents the state of vacation-response related settings for an account.
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _VacationResponse_.
   * @param [opts] {Object} The optional properties of this _VacationResponse_.
   * @param [opts.isEnabled=false] {Boolean} Is the vacation response enabled?
   * @param [opts.isActivated=false] {Boolean} Is the vacation response activated?
   * @param [opts.fromDate=null] {Date} The date/time after which messages that arrive should receive the user’s vacation response, in UTC.
   * @param [opts.toDate=null] {Date} The date/time after which messages that arrive should no longer receive the user’s vacation response, in UTC.
   * @param [opts.subject=null] {String} The subject that will be used by the mail sent in response to messages when the vacation response is enabled.
   * @param [opts.textBody=null] {Number} The plain text part of the message to send in response to messages when the vacation response is enabled.
   * @param [opts.htmlBody=null] {String} The HTML part of the message to send in response to messages when the vacation response is enabled.
   *
   * @see Model
   */
  function VacationResponse(jmap, opts) {
    _classCallCheck(this, VacationResponse);

    var _this = _possibleConstructorReturn(this, (VacationResponse.__proto__ || Object.getPrototypeOf(VacationResponse)).call(this, jmap));

    opts = opts || {};

    _this.id = VacationResponse.ID;
    _this.isEnabled = opts.isEnabled || false;
    _this.isActivated = opts.isActivated || false;
    _this.fromDate = opts.fromDate ? new Date(opts.fromDate) : null;
    _this.toDate = opts.toDate ? new Date(opts.toDate) : null;
    _this.subject = opts.subject || null;
    _this.textBody = opts.textBody || null;
    _this.htmlBody = opts.htmlBody || null;
    return _this;
  }

  /**
   * Creates a JSON representation from this {@link VacationResponse}.
   *
   * @return JSON object with only owned properties and non-null default values.
   */


  _createClass(VacationResponse, [{
    key: 'toJSONObject',
    value: function toJSONObject() {
      return new _JSONBuilder2.default().append('id', this.id).append('isEnabled', this.isEnabled).appendDateIfDefined('fromDate', this.fromDate).appendDateIfDefined('toDate', this.toDate).appendIfDefined('subject', this.subject).appendIfDefined('textBody', this.textBody).appendIfDefined('htmlBody', this.htmlBody).build();
    }

    /**
     * Creates an _VacationResponse_ from its JSON representation.
     *
     * @param jmap {Client} The {@link Client} instance that created this _VacationResponse_.
     * @param object {Object} The JSON representation of the _VacationResponse_, as a Javascript object.
     *
     * @return {VacationResponse}
     */

  }], [{
    key: 'fromJSONObject',
    value: function fromJSONObject(jmap, object) {
      _Utils2.default.assertRequiredParameterIsPresent(object, 'object');

      return new VacationResponse(jmap, object);
    }
  }]);

  return VacationResponse;
}(_Model3.default);

VacationResponse.ID = 'singleton'; // http://jmap.io/spec.html#vacation-response

exports.default = VacationResponse;
module.exports = exports['default'];

},{"../utils/JSONBuilder.js":31,"../utils/Utils.js":32,"./Model.js":18}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PromiseProvider2 = require('./PromiseProvider.js');

var _PromiseProvider3 = _interopRequireDefault(_PromiseProvider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A {@link PromiseProvider} implementation creating native ES6 Promises.<br />
 * This class supposes that the `Promise` class is available.
 *
 * @class ES6PromiseProvider
 *
 * @see PromiseProvider
 */
var ES6PromiseProvider = function (_PromiseProvider) {
  _inherits(ES6PromiseProvider, _PromiseProvider);

  function ES6PromiseProvider() {
    _classCallCheck(this, ES6PromiseProvider);

    return _possibleConstructorReturn(this, (ES6PromiseProvider.__proto__ || Object.getPrototypeOf(ES6PromiseProvider)).apply(this, arguments));
  }

  _createClass(ES6PromiseProvider, [{
    key: 'newPromise',
    value: function newPromise(resolver) {
      return new Promise(resolver);
    }
  }]);

  return ES6PromiseProvider;
}(_PromiseProvider3.default);

exports.default = ES6PromiseProvider;
module.exports = exports['default'];

},{"./PromiseProvider.js":25}],25:[function(require,module,exports){
'use strict';

/**
 * The {@link PromiseProvider} class is the base class for providers of {@link Promise} instances.<br />
 * A concrete implementation is required to implement {@link PromiseProvider#newPromise} so that this method
 * returns a {@link Promise} that will be used by the library to do JMAP requests and other asynchronous things.<br />
 * <br />
 * This level of abstraction allows users of the library to plug in their own implementation in order to use their
 * favorite {@link Promise} library. Implementations for [Q]{@link https://github.com/kriskowal/q}
 * and native [ES6 Promises]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise} are provided.
 *
 * @abstract
 * @class PromiseProvider
 *
 * @see ES6PromiseProvider
 * @see QPromiseProvider
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PromiseProvider = function () {
  function PromiseProvider() {
    _classCallCheck(this, PromiseProvider);
  }

  _createClass(PromiseProvider, [{
    key: 'newPromise',

    /**
     * This method must be implemented by concrete {@link PromiseProvider} implementations in such a way that:
     * * A {@link Promise} is created from the `resolver` argument and is returned.
     * * The {@link Promise} will be fulfilled when the `resolve` function of the resolver is called.
     * * The {@link Promise} will be rejected when the `reject` function of the resolver is called.
     *
     * @abstract
     *
     * @param resolver {Function} A {@link Function} with two arguments `resolve` and `reject`, both functions.
     *   The first argument fulfills the promise, the second argument rejects it.
     *
     * @return {Promise}
     */
    value: function newPromise(resolver) {
      throw new Error('PromiseProvider is an abstract class. Please use a concrete implementation.');
    }
  }]);

  return PromiseProvider;
}();

exports.default = PromiseProvider;
module.exports = exports['default'];

},{}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PromiseProvider2 = require('./PromiseProvider.js');

var _PromiseProvider3 = _interopRequireDefault(_PromiseProvider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A {@link PromiseProvider} implementation creating [Q]{@link https://github.com/kriskowal/q} promises.<br />
 * This class requires `Q` to be installed as dependency.
 *
 * @class QPromiseProvider
 *
 * @see PromiseProvider
 */
var QPromiseProvider = function (_PromiseProvider) {
  _inherits(QPromiseProvider, _PromiseProvider);

  function QPromiseProvider() {
    _classCallCheck(this, QPromiseProvider);

    return _possibleConstructorReturn(this, (QPromiseProvider.__proto__ || Object.getPrototypeOf(QPromiseProvider)).apply(this, arguments));
  }

  _createClass(QPromiseProvider, [{
    key: 'newPromise',
    value: function newPromise(resolver) {
      return require('q').Promise(resolver);
    }
  }]);

  return QPromiseProvider;
}(_PromiseProvider3.default);

exports.default = QPromiseProvider;
module.exports = exports['default'];

},{"./PromiseProvider.js":25,"q":"q"}],27:[function(require,module,exports){
'use strict';

/* global jQuery: false */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Transport2 = require('./Transport.js');

var _Transport3 = _interopRequireDefault(_Transport2);

var _TransportError = require('../errors/TransportError');

var _TransportError2 = _interopRequireDefault(_TransportError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JQueryTransport = function (_Transport) {
  _inherits(JQueryTransport, _Transport);

  /**
   * A {@link Transport} implementation for [jQuery]{@link https://jquery.com/}.<br />
   * This class supposes that the `jQuery` global object is available.
   *
   * @constructor
   *
   * @param [promiseProvider=null] {PromiseProvider} A {@link PromiseProvider} implementation.
   *
   * @see Transport
   */
  function JQueryTransport(promiseProvider) {
    _classCallCheck(this, JQueryTransport);

    var _this = _possibleConstructorReturn(this, (JQueryTransport.__proto__ || Object.getPrototypeOf(JQueryTransport)).call(this));

    _this.promiseProvider = promiseProvider;
    return _this;
  }

  _createClass(JQueryTransport, [{
    key: 'post',
    value: function post(url, headers, data, raw) {
      return this.promiseProvider.newPromise(function (resolve, reject) {
        jQuery.ajax({
          url: url,
          method: 'POST',
          headers: headers,
          data: raw ? data : JSON.stringify(data),
          dataType: raw ? undefined : 'json',
          processData: false,
          jsonp: false
        }).done(resolve).fail(function (xhr, statusText, err) {
          return reject(new _TransportError2.default(err, xhr.status, xhr.responseText));
        });
      });
    }
  }]);

  return JQueryTransport;
}(_Transport3.default);

exports.default = JQueryTransport;
module.exports = exports['default'];

},{"../errors/TransportError":4,"./Transport.js":29}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Transport2 = require('./Transport');

var _Transport3 = _interopRequireDefault(_Transport2);

var _TransportError = require('../errors/TransportError');

var _TransportError2 = _interopRequireDefault(_TransportError);

var _Constants = require('../utils/Constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RequestTransport = function (_Transport) {
  _inherits(RequestTransport, _Transport);

  /**
   * A {@link Transport} implementation for [Request]{@link https://github.com/request/request}.<br />
   * This class requires `request` to be installed as dependency.
   *
   * @constructor
   *
   * @param [promiseProvider=null] {PromiseProvider} A {@link PromiseProvider} implementation.
   *
   * @see Transport
   */
  function RequestTransport(promiseProvider) {
    _classCallCheck(this, RequestTransport);

    var _this = _possibleConstructorReturn(this, (RequestTransport.__proto__ || Object.getPrototypeOf(RequestTransport)).call(this));

    _this.promiseProvider = promiseProvider;
    return _this;
  }

  _createClass(RequestTransport, [{
    key: 'post',
    value: function post(url, headers, data, raw) {
      return this.promiseProvider.newPromise(function (resolve, reject) {
        require('request')({
          url: url,
          headers: headers,
          method: 'POST',
          body: data,
          json: !raw
        }, function (err, res, body) {
          if (err || _Constants.SUCCESS_RESPONSE_CODES.indexOf(res.statusCode) < 0) {
            return reject(new _TransportError2.default(err, res && res.statusCode, body));
          }

          resolve(body);
        });
      });
    }
  }]);

  return RequestTransport;
}(_Transport3.default);

exports.default = RequestTransport;
module.exports = exports['default'];

},{"../errors/TransportError":4,"../utils/Constants":30,"./Transport":29,"request":"request"}],29:[function(require,module,exports){
'use strict';

/**
 * The {@link Transport} class is the base class for providers of a HTTP transport layer.<br />
 * A concrete implementation is required to implement {@link Transport#post} so that this method returns a
 * {@link Promise} that will be resolved or rejected depending on the result of the underlying HTTP request<br />
 * To create {@link Promise} instances, a {@link Transport} implementation should use a {@link PromiseProvider}.
 * {@link Client} instances will automatically provide transports with the configured {@link PromiseProvider} as the
 * `promiseProvider` property.
 * <br />
 * This level of abstraction allows users of the library to plug in their own implementation in order to use their
 * favorite HTTP transport library. Implementations for [Request]{@link https://github.com/request/request}
 * and [jQuery]{@link https://jquery.com/} are provided.
 *
 * @abstract
 * @class Transport
 *
 * @see JQueryTransport
 * @see RequestTransport
 * @see PromiseProvider
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transport = function () {
  function Transport() {
    _classCallCheck(this, Transport);
  }

  _createClass(Transport, [{
    key: 'post',

    /**
     * This method must be implemented by concrete {@link Transport} implementations in such a way that:
     * * A HTTP POST request is made on `url` with the given `headers` and `data` (i.e.: payload)
     * * A {@link Promise} is returned (`this.promiseProvider` will be available to create Promise instances)
     * * The {@link Promise} is fulfilled when the HTTP request returns 200 (http://jmap.io/spec.html#jmap-over-https)
     * * The {@link Promise} is rejected if the HTTP request fails, or if the return status code is not 200
     * * When the {@link Promise} is fulfilled, the raw JMAP response is returned
     *
     * @abstract
     *
     * @param url {String} The URL to POST to
     * @param headers {Object} A hash of header names to header values that must be transmitted as part of the request
     * @param data {*} The request payload, as a Javascript object. It's the responsibility of the {@link Transport} implementation
     *   to serialize the data as a JSON {@link String} whenever required.
     * @param raw {Boolean} Whether the requests sends and expects raw (plain text) data instead of the default JSON.
     *
     * @return {Promise}
     */
    value: function post(url, headers, data, raw) {
      throw new Error('Transport is an abstract class. Please use a concrete implementation.');
    }
  }]);

  return Transport;
}();

exports.default = Transport;
module.exports = exports['default'];

},{}],30:[function(require,module,exports){
'use strict';

/**
 * The _Constants_ module exports a single object that is a collection of useful constants.
 *
 * @property VERSION {String} The version of this library
 *
 * @module Constants
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  VERSION: '0.0.26-dev',
  CLIENT_NAME: 'jmap-client (https://github.com/linagora/jmap-client)',
  SUCCESS_RESPONSE_CODES: [200, 201],
  ERROR: 'error',
  CORE_CAPABILITIES_URI: 'http://jmap.io/spec-core.html',
  MAIL_CAPABILITIES_URI: 'http://jmap.io/spec-mail.html'
};
module.exports = exports['default'];

},{}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require('../utils/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSONBuilder = function () {
  /**
   * This class helps to create JSON representation from a model.
   * Usage:
   *
   *       return new JSONBuilder()
   *         .appendIfDefined('inReplyToMessageId', this.inReplyToMessageId)
   *         .appendIfDefined('isUnread', this.isUnread)
   *         .appendIfDefined('isFlagged', this.isFlagged)
   *         .build();
   *
   * @constructor
   **/
  function JSONBuilder() {
    _classCallCheck(this, JSONBuilder);

    this.result = {};
  }

  /**
   * Will append the _value_ to the building object, using the _name_ as key.
   *
   * @param name {String} The name to use as key.
   * @param value {*} The value to append.
   *
   * @return this builder
   **/


  _createClass(JSONBuilder, [{
    key: 'append',
    value: function append(name, value) {
      _Utils2.default.assertRequiredParameterIsPresent(name, 'name');
      _Utils2.default.assertRequiredParameterIsPresent(value, 'value');

      this.result[name] = value;

      return this;
    }

    /**
     * If defined, it will append the _value_ to the building object, using the _name_ as key.
     *
     * @param name {String} The name to use as key.
     * @param [value] {*} The value to append.
     *
     * @return this builder
     **/

  }, {
    key: 'appendIfDefined',
    value: function appendIfDefined(name, value) {
      if (_Utils2.default.isDefined(value)) {
        this.append(name, value);
      }

      return this;
    }

    /**
     * If defined, it will append _date_ to the building object as an ISO Date String, using _name_ as the key.
     *
     * @param name {String} The name to use as key.
     * @param [date] {Date} The `Date` to append.
     *
     * @return This {@link JSONBuilder} instance
     *
     * @see http://jmap.io/spec.html#the-date-datatypes
     **/

  }, {
    key: 'appendDateIfDefined',
    value: function appendDateIfDefined(name, date) {
      if (_Utils2.default.isDefined(date)) {
        _Utils2.default.assertRequiredParameterHasType(date, 'date', Date);

        this.append(name, date.toISOString().replace(/.\d+Z/, 'Z')); // Milliseconds should not be there, as per https://tools.ietf.org/html/rfc3339
      }

      return this;
    }

    /**
     * If defined and not empty, it will append the _value_ array to the building object, using the _name_ as key.
     *
     * @param name {String} The name to use as key.
     * @param [value] {Array} The value to append.
     *
     * @return this builder
     **/

  }, {
    key: 'appendIfNotEmpty',
    value: function appendIfNotEmpty(name, value) {
      if (value) {
        _Utils2.default.assertRequiredParameterIsArrayWithMinimumLength(value, name);
        if (value.length > 0) {
          this.append(name, value.map(function (item) {
            return item.toJSONObject ? item.toJSONObject() : item;
          }));
        }
      }

      return this;
    }

    /**
     * Will append the _value_ object to the building object by recursively calling toJSONObject()
     * on each child if an object.
     *
     * @param name {String} The name to use as key.
     * @param value {Array} The `Object` to append
     */

  }, {
    key: 'appendObject',
    value: function appendObject(name, value) {
      var key = void 0,
          obj = {};

      _Utils2.default.assertRequiredParameterIsObject(value, 'value');

      for (key in value) {
        if (value.hasOwnProperty(key)) {
          if (_typeof(value[key]) === 'object' && value[key].toJSONObject) {
            obj[key] = value[key].toJSONObject();
          } else {
            obj[key] = value[key];
          }
        }
      }

      this.append(name, obj);

      return this;
    }

    /**
     * @return an object with all appended values
     **/

  }, {
    key: 'build',
    value: function build() {
      return this.result;
    }
  }]);

  return JSONBuilder;
}();

exports.default = JSONBuilder;
module.exports = exports['default'];

},{"../utils/Utils.js":32}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Constants = require('./Constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  /**
   * This class contains some useful utility methods.<br />
   * The Utils class cannot be instantiated (its constructor will throw if called), all its methods are static.
   *
   * @constructor
   */
  function Utils() {
    _classCallCheck(this, Utils);

    throw new Error('The Utils class cannot be instantiated.');
  }

  /**
   * Check is the `parameter` is not undefined and not null.
   *
   * @param parameter {*} The parameter to check.
   *
   * @return {Boolean} True if `parameter` is not undefined and not null.
   */


  _createClass(Utils, null, [{
    key: 'isDefined',
    value: function isDefined(parameter) {
      return typeof parameter !== 'undefined' && parameter !== null;
    }

    /**
     * Asserts that the given `parameter` is present (read: truthy).<br />
     * This method is intended to be called when you need to validate input parameters of functions.
     *
     * @param parameter {*} The parameter to validate.
     * @param name {String} The name of the parameter, as given to the calling function.
     *   This is used to format the error message contained by the thrown {@link Error}.
     *
     * @return {*} The validated parameter, as-is.
     *
     * @throws {Error} If the parameter is not defined.
     */

  }, {
    key: 'assertRequiredParameterIsPresent',
    value: function assertRequiredParameterIsPresent(parameter, name) {
      if (!Utils.isDefined(parameter)) {
        throw new Error('The "' + name + '" parameter is required.');
      }

      return parameter;
    }

    /**
     * Asserts that the given `parameter` is present and is an object.<br />
     * This method is intended to be called when you need to validate input parameters of functions.
     *
     * @param parameter {*} The parameter to validate.
     * @param name {String} The name of the parameter, as given to the calling function.
     *   This is used to format the error message contained by the thrown {@link Error}.
     *
     * @return {*} The validated parameter, as-is.
     *
     * @throws {Error} If the parameter is not defined or is not an object.
     */

  }, {
    key: 'assertRequiredParameterIsObject',
    value: function assertRequiredParameterIsObject(parameter, name) {
      Utils.assertRequiredParameterIsPresent(parameter, name);

      if ((typeof parameter === 'undefined' ? 'undefined' : _typeof(parameter)) !== 'object' || Array.isArray(parameter)) {
        throw new Error('The "' + name + '" parameter is not an object.');
      }

      return parameter;
    }

    /**
     * Asserts that the given `parameter` is present and has the expected type.<br />
     * This method is intended to be called when you need to validate input parameters of functions.
     * Examples:
     *     assertRequiredParameterHasType(5, 'name', 'number') => returns 5
     *     assertRequiredParameterHasType({}, 'name', CustomClass) => throws an Error
     *
     * @param parameter {*} The parameter to validate.
     * @param name {String} The name of the parameter, as given to the calling function.
     *   This is used to format the error message contained by the thrown {@link Error}.
     * @param type {String|Type} The expected type of the parameter.
     *
     * @return {*} The validated parameter, as-is.
     *
     * @throws {Error} If the parameter is not defined or is not an object.
     */

  }, {
    key: 'assertRequiredParameterHasType',
    value: function assertRequiredParameterHasType(parameter, name, type) {
      Utils.assertRequiredParameterIsPresent(parameter, name);

      if (typeof type === 'string') {
        if ((typeof parameter === 'undefined' ? 'undefined' : _typeof(parameter)) !== type) {
          throw new Error('The "' + name + '" parameter has not the expected type: ' + type);
        }
      } else if (!(parameter instanceof type)) {
        throw new Error('The "' + name + '" parameter has not the expected type: ' + type);
      }

      return parameter;
    }

    /**
     * Asserts that the given `parameter` is an {@link Array} with a minimum length.<br />
     * This method is intended to be called when you need to validate input parameters of functions.
     *
     * @param parameter {*} The parameter to validate.
     * @param name {String} The name of the parameter, as given to the calling function.
     *   This is used to format the error message contained by the thrown {@link Error}.
     * @param [length=0] {Number} The minimum required length of the array.
     *
     * @return {*} The validated parameter, as-is.
     *
     * @throws {Error} If the parameter is not an array of does not have the minimum length.
     */

  }, {
    key: 'assertRequiredParameterIsArrayWithMinimumLength',
    value: function assertRequiredParameterIsArrayWithMinimumLength(parameter, name, length) {
      if (!Array.isArray(parameter)) {
        throw new Error('The "' + name + '" parameter must be an Array.');
      }

      if (length && parameter.length < length) {
        throw new Error('The "' + name + '" parameter must have at least ' + length + ' element(s).');
      }

      return parameter;
    }

    /**
     * Asserts that the given `data` is a valid JMAP response.<br />
     * This method is intended to be called by instances of {@link Client}, or by any other object making JMAP requests,
     * when validation of the response is required.<br />
     * <br />
     * The following checks are made by this method:
     * * `data` is defined and is an array
     * * `data` has one or more elements, and all elements are arrays
     * * `data[0][0]` is either
     *   * the expected response string (computed with the help of the `request` parameter)
     *   * 'error'
     *   * an unknown response
     * * `data[0][1]` exists
     *
     * @param request {String} The JMAP request to check the response for. This should be a valid JMAP request name.
     * @param data {*} The JMAP response to validate.
     *
     * @return {*} The data, as-is, if it is detected as a valid JMAP response.
     *
     * @throws {Error} If the received data is not a valid JMAP response.
     */

  }, {
    key: 'assertValidJMAPResponse',
    value: function assertValidJMAPResponse(request, data) {
      function allArrayElementsAreArray(array) {
        return array.filter(function (element) {
          return !Array.isArray(element);
        }).length === 0;
      }

      if (!data || !Array.isArray(data)) {
        throw new Error('Expected an array as the JMAP response for a "' + request + '" request.');
      }

      if (data.length === 0 || !allArrayElementsAreArray(data)) {
        throw new Error('Expected an array of exactly 1 array element as the JMAP response for a "' + request + '" request.');
      }

      var response = data[0][0],
          expectedResponse = Utils._expectedResponseFor(request);

      if (response !== _Constants.ERROR && expectedResponse && response !== expectedResponse) {
        throw new Error('Expected "' + expectedResponse + '" as the JMAP response for a "' + request + '" request, but got "' + response + '".');
      }

      if (!data[0][1]) {
        throw new Error('The JMAP response for a "' + request + '" request should return some data.');
      }

      return data;
    }

    /**
     * Capitalizes the given {@link String}, that is, returns the same string with the first character in uppercase.<br />
     * If `undefined`, `null`, the _empty string_ or something else that a string is given, the argument is returned as-is.
     *
     * @param str {String} The {@link String} to capitalize.
     *
     * @return {String} The capitalized {@link String}.
     */

  }, {
    key: 'capitalize',
    value: function capitalize(str) {
      if (!str || typeof str !== 'string') {
        return str;
      }

      return str.charAt(0).toUpperCase() + str.substring(1);
    }

    /**
     * Fills a URI template by substituting variables by their corresponding values.<br />
     * This supports Level 1 URI templates *only*, as per [this RFC](https://tools.ietf.org/html/rfc6570#section-1.2).
     *
     * @param uri {String} The URI template to fill.
     * @param parameters {Object} A hash of name/value pairs used for variables substitution.
     *
     * @return {String} The filled URI template.
     */

  }, {
    key: 'fillURITemplate',
    value: function fillURITemplate(uri, parameters) {
      Utils.assertRequiredParameterIsPresent(uri, 'uri');

      if (!parameters) {
        return uri;
      }

      return uri.replace(/{(.+?)}/g, function (match, variable) {
        var value = parameters[variable];

        return value ? encodeURIComponent(value) : match;
      });
    }

    /**
     * Appends a query parameter to an existing URL, taking care of existing query parameters.<br />
     * This method returns `uri` as-is if `key` or `value` is not defined.
     *
     * @param uri {String} The URI to modify.
     * @param key {String} The name of the parameter to append.
     * @param value {String} The value of the parameter to append.
     *
     * @returns {String} The modified URI.
     */

  }, {
    key: 'appendQueryParameter',
    value: function appendQueryParameter(uri, key, value) {
      if (!uri || !key || !value) {
        return uri;
      }

      return uri + (uri.indexOf('?') > -1 ? '&' : '?') + encodeURIComponent(key) + '=' + encodeURIComponent(value);
    }

    /**
     * Returns the value at _index_ in the given  `Array`, or the default value if the array is undefined, null,
     * if _index_ is negative or there is not enough elements in the array.
     *
     * @param array The `Array` to get the value from.
     * @param index The index of the desired value.
     * @param defaultValue The default value to return if the element cannot be found in the array.
     *
     * @returns {*} The found value or the given default.
     */

  }, {
    key: 'nthElementOrDefault',
    value: function nthElementOrDefault(array, index, defaultValue) {
      if (Array.isArray(array) && index >= 0 && array.length > index) {
        return array[index];
      }

      return defaultValue;
    }
  }, {
    key: '_jsonArrayToModelList',
    value: function _jsonArrayToModelList(jmap, Model, array, filter) {
      if (!Array.isArray(array)) {
        return [];
      }

      if (filter) {
        array = array.filter(filter);
      }

      return array.map(Model.fromJSONObject.bind(null, jmap));
    }
  }, {
    key: '_nullOrNewInstance',
    value: function _nullOrNewInstance(value, Model) {
      return value && new Model(value) || null;
    }
  }, {
    key: '_expectedResponseFor',
    value: function _expectedResponseFor(request) {
      return {
        getAccounts: 'accounts',
        getMailboxes: 'mailboxes',
        getMessageList: 'messageList',
        getThreads: 'threads',
        getMessages: 'messages',
        setMessages: 'messagesSet',
        setMailboxes: 'mailboxesSet',
        getVacationResponse: 'vacationResponse',
        setVacationResponse: 'vacationResponseSet'
      }[request];
    }
  }]);

  return Utils;
}();

exports.default = Utils;
module.exports = exports['default'];

},{"./Constants":30}]},{},[1])(1)
});