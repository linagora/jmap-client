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
 * @property Thread { Thread} The {@link  Thread} class
 *
 * @module API
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  Client: require('./client/Client'),
  Utils: require('./utils/Utils'),
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
  Thread: require('./models/Thread')
};
module.exports = exports['default'];

},{"./client/Client":2,"./models/Account":3,"./models/EMailer":4,"./models/Mailbox":5,"./models/Message":6,"./models/MessageList":7,"./models/Model":8,"./models/Thread":9,"./promises/ES6PromiseProvider":10,"./promises/PromiseProvider":11,"./promises/QPromiseProvider":12,"./transport/JQueryTransport":13,"./transport/RequestTransport":14,"./transport/Transport":15,"./utils/Utils":16}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _promisesES6PromiseProviderJs = require('./../promises/ES6PromiseProvider.js');

var _promisesES6PromiseProviderJs2 = _interopRequireDefault(_promisesES6PromiseProviderJs);

var _utilsUtilsJs = require('./../utils/Utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var _modelsAccountJs = require('./../models/Account.js');

var _modelsAccountJs2 = _interopRequireDefault(_modelsAccountJs);

var _modelsMailboxJs = require('./../models/Mailbox.js');

var _modelsMailboxJs2 = _interopRequireDefault(_modelsMailboxJs);

var _modelsMessageListJs = require('./../models/MessageList.js');

var _modelsMessageListJs2 = _interopRequireDefault(_modelsMessageListJs);

var _modelsThreadJs = require('./../models/Thread.js');

var _modelsThreadJs2 = _interopRequireDefault(_modelsThreadJs);

var _modelsMessageJs = require('./../models/Message.js');

var _modelsMessageJs2 = _interopRequireDefault(_modelsMessageJs);

var Client = (function () {
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

    _utilsUtilsJs2['default'].assertRequiredParameterIsPresent(transport, 'transport');

    this.transport = transport;
    this.transport.promiseProvider = promiseProvider || new _promisesES6PromiseProviderJs2['default']();
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

  _createClass(Client, [{
    key: 'withAuthenticationToken',
    value: function withAuthenticationToken(token) {
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
  }, {
    key: 'withAPIUrl',
    value: function withAPIUrl(url) {
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
  }, {
    key: 'getAccounts',
    value: function getAccounts(options) {
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
  }, {
    key: '_defaultHeaders',
    value: function _defaultHeaders() {
      return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.authToken
      };
    }
  }, {
    key: '_jmapRequest',
    value: function _jmapRequest(command, options) {
      var _this = this;

      return this.transport.post(this.apiUrl, this._defaultHeaders(), [[command, options || {}, '#0']]).then(_utilsUtilsJs2['default'].assertValidJMAPResponse.bind(null, command)).then(function (data) {
        return data.map(_this._handleResponse.bind(_this));
      }).then(function (responses) {
        return responses.length > 1 ? responses : responses[0];
      });
    }
  }, {
    key: '_handleResponse',
    value: function _handleResponse(response) {
      var name = response[0],
          fn = this['_handle' + _utilsUtilsJs2['default'].capitalize(name) + 'Response'];

      // This will return the "raw" data if the command is unknown to the client
      return fn ? fn.bind(this)(response) : response[1];
    }
  }, {
    key: '_handleListResponse',
    value: function _handleListResponse(response, Model) {
      return _utilsUtilsJs2['default']._jsonArrayToModelList(this, Model, response[1].list);
    }
  }, {
    key: '_handleAccountsResponse',
    value: function _handleAccountsResponse(response) {
      return this._handleListResponse(response, _modelsAccountJs2['default']);
    }
  }, {
    key: '_handleThreadsResponse',
    value: function _handleThreadsResponse(response) {
      return this._handleListResponse(response, _modelsThreadJs2['default']);
    }
  }, {
    key: '_handleMessagesResponse',
    value: function _handleMessagesResponse(response) {
      return this._handleListResponse(response, _modelsMessageJs2['default']);
    }
  }, {
    key: '_handleMailboxesResponse',
    value: function _handleMailboxesResponse(response) {
      return this._handleListResponse(response, _modelsMailboxJs2['default']);
    }
  }, {
    key: '_handleMessageListResponse',
    value: function _handleMessageListResponse(response) {
      return _modelsMessageListJs2['default'].fromJSONObject(this, response[1]);
    }
  }]);

  return Client;
})();

exports['default'] = Client;
module.exports = exports['default'];

},{"./../models/Account.js":3,"./../models/Mailbox.js":5,"./../models/Message.js":6,"./../models/MessageList.js":7,"./../models/Thread.js":9,"./../promises/ES6PromiseProvider.js":10,"./../utils/Utils.js":16}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ModelJs = require('./Model.js');

var _ModelJs2 = _interopRequireDefault(_ModelJs);

var _utilsUtilsJs = require('../utils/Utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var Account = (function (_Model) {
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
   * @param [opts.isReadOnly=false] {Boolean} Whether this _Account_ is read-only.
   *
   * @see Model
   */

  function Account(jmap, id, opts) {
    _classCallCheck(this, Account);

    _get(Object.getPrototypeOf(Account.prototype), 'constructor', this).call(this, jmap);

    _utilsUtilsJs2['default'].assertRequiredParameterIsPresent(id, 'id');

    opts = opts || {};

    this.id = id;
    this.name = opts.name || '';
    this.isPrimary = opts.isPrimary || false;
    this.isReadOnly = opts.isReadOnly || false;
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

  _createClass(Account, [{
    key: 'getMailboxes',
    value: function getMailboxes(options) {
      options = options || {};
      options.accountId = this.id;

      return this._jmap.getMailboxes(options);
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
      _utilsUtilsJs2['default'].assertRequiredParameterIsPresent(object, 'object');

      return new Account(jmap, object.id, object);
    }
  }]);

  return Account;
})(_ModelJs2['default']);

exports['default'] = Account;
module.exports = exports['default'];

},{"../utils/Utils.js":16,"./Model.js":8}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EMailer = (function () {
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
  }]);

  return EMailer;
})();

exports['default'] = EMailer;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ModelJs = require('./Model.js');

var _ModelJs2 = _interopRequireDefault(_ModelJs);

var _utilsUtilsJs = require('../utils/Utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var Mailbox = (function (_Model) {
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
   * @param [opts.parentId=null] {String} The _Mailbox_ id for the parent of this mailbox, or _null_ if this mailbox is at the top level.
   * @param [opts.role=null] {String} The role of this mailbox, if it is a system mailbox. See the specification for the possible values.
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

    _get(Object.getPrototypeOf(Mailbox.prototype), 'constructor', this).call(this, jmap);

    _utilsUtilsJs2['default'].assertRequiredParameterIsPresent(id, 'id');
    _utilsUtilsJs2['default'].assertRequiredParameterIsPresent(name, 'name');

    opts = opts || {};

    this.id = id;
    this.name = name;
    this.parentId = opts.parentId || null;
    this.role = opts.role || null;
    this.sortOrder = opts.sortOrder || 0;
    this.mustBeOnlyMailbox = opts.mustBeOnlyMailbox || false;
    this.mayReadItems = opts.mayReadItems || false;
    this.mayAddItems = opts.mayAddItems || false;
    this.mayRemoveItems = opts.mayRemoveItems || false;
    this.mayCreateChild = opts.mayCreateChild || false;
    this.mayRename = opts.mayRename || false;
    this.mayDelete = opts.mayDelete || false;
    this.totalMessages = opts.totalMessages || 0;
    this.unreadMessages = opts.unreadMessages || 0;
    this.totalThreads = opts.totalThreads || 0;
    this.unreadThreads = opts.unreadThreads || 0;
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
      _utilsUtilsJs2['default'].assertRequiredParameterIsPresent(object, 'object');

      return new Mailbox(jmap, object.id, object.name, object);
    }
  }]);

  return Mailbox;
})(_ModelJs2['default']);

exports['default'] = Mailbox;
module.exports = exports['default'];

},{"../utils/Utils.js":16,"./Model.js":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ModelJs = require('./Model.js');

var _ModelJs2 = _interopRequireDefault(_ModelJs);

var _EMailerJs = require('./EMailer.js');

var _EMailerJs2 = _interopRequireDefault(_EMailerJs);

var _utilsUtilsJs = require('../utils/Utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var Message = (function (_Model) {
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
   * @param [opts.from=null] {EMailer} The {@link EMailer} object representing the _From:_ of this _Message_.
   * @param [opts.to=[{@link EMailer.unknown}]] {EMailer[]} The array of {@link EMailer} objects representing the _To:_ of this _Message_.
   * @param [opts.cc=[{@link EMailer.unknown}]] {EMailer[]} The array of {@link EMailer} objects representing the _CC:_ of this _Message_.
   * @param [opts.bcc=[{@link EMailer.unknown}]] {EMailer[]} The array of {@link EMailer} objects representing the _BCC:_ of this _Message_.
   * @param [opts.replyTo={@link EMailer.unknown}] {EMailer} The {@link EMailer} object representing the _Reply-To:_ of this _Message_.
   * @param [opts.subject=null] {String} The subject of this _Message_.
   * @param [opts.date=null] {Date} The date the _Message_ was sent (or saved, if the message is a draft).
   * @param [opts.size=0] {String} The size in bytes of the whole message as counted by the server.
   * @param [opts.preview=null] {String} Up to 256 characters of the beginning of a plain text version of the _Message_ body.
   * @param [opts.textBody=null] {String} The plain text body part for the _Message_.
   * @param [opts.htmlBody=null] {String} The HTML body part for the _Message_, if present.
   *
   * @see Model
   * @see EMailer
   */

  function Message(jmap, id, threadId, mailboxIds, opts) {
    _classCallCheck(this, Message);

    _get(Object.getPrototypeOf(Message.prototype), 'constructor', this).call(this, jmap);

    _utilsUtilsJs2['default'].assertRequiredParameterIsPresent(id, 'id');
    _utilsUtilsJs2['default'].assertRequiredParameterIsPresent(threadId, 'threadId');

    if (!Array.isArray(mailboxIds) || mailboxIds.length < 1) {
      throw new Error('A Message object is required to be in at least one Mailbox.');
    }

    opts = opts || {};

    this.id = id;
    this.threadId = threadId;
    this.mailboxIds = mailboxIds;
    this.inReplyToMessageId = opts.inReplyToMessageId || null;
    this.isUnread = opts.isUnread || false;
    this.isFlagged = opts.isFlagged || false;
    this.isAnswered = opts.isAnswered || false;
    this.isDraft = opts.isDraft || false;
    this.hasAttachment = opts.hasAttachment || false;
    this.headers = opts.headers || {};
    this.from = opts.from || _EMailerJs2['default'].unknown();
    this.to = opts.to || [_EMailerJs2['default'].unknown()];
    this.cc = opts.cc || [_EMailerJs2['default'].unknown()];
    this.bcc = opts.bcc || [_EMailerJs2['default'].unknown()];
    this.replyTo = opts.replyTo || _EMailerJs2['default'].unknown();
    this.subject = opts.subject || null;
    this.date = opts.date ? new Date(opts.date) : null;
    this.size = opts.size || 0;
    this.preview = opts.preview || null;
    this.textBody = opts.textBody || null;
    this.htmlBody = opts.htmlBody || null;
  }

  /**
   * Creates a _Message_ from its JSON representation.
   *
   * @param jmap {Client} The {@link Client} instance passed to the _Message_ constructor.
   * @param object {Object} The JSON representation of the _Message_, as a Javascript object.
   * @param object.id {Object} The identifier of the _Message_.
   * @param object.threadId {String} The identifier of the thread the _Message_ is in.
   * @param object.mailboxIds {String[]} The array of _Mailbox_ identifiers the _Message_ is present into.
   *
   * @return {Message}
   */

  _createClass(Message, null, [{
    key: 'fromJSONObject',
    value: function fromJSONObject(jmap, object) {
      _utilsUtilsJs2['default'].assertRequiredParameterIsPresent(object, 'object');

      return new Message(jmap, object.id, object.threadId, object.mailboxIds, object);
    }
  }]);

  return Message;
})(_ModelJs2['default']);

exports['default'] = Message;
module.exports = exports['default'];

},{"../utils/Utils.js":16,"./EMailer.js":4,"./Model.js":8}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ModelJs = require('./Model.js');

var _ModelJs2 = _interopRequireDefault(_ModelJs);

var _utilsUtilsJs = require('../utils/Utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var MessageList = (function (_Model) {
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

    _get(Object.getPrototypeOf(MessageList.prototype), 'constructor', this).call(this, jmap);

    opts = opts || {};

    this.accountId = opts.accountId || '';
    this.filter = opts.filter || null;
    this.sort = opts.sort || null;
    this.collapseThreads = opts.collapseThreads || false;
    this.position = opts.position || 0;
    this.total = opts.total || 0;
    this.threadIds = opts.threadIds || [];
    this.messageIds = opts.messageIds || [];
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
      _utilsUtilsJs2['default'].assertRequiredParameterIsPresent(object, 'object');

      return new MessageList(jmap, object);
    }
  }]);

  return MessageList;
})(_ModelJs2['default']);

exports['default'] = MessageList;
module.exports = exports['default'];

},{"../utils/Utils.js":16,"./Model.js":8}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

exports['default'] = Model;
module.exports = exports['default'];

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ModelJs = require('./Model.js');

var _ModelJs2 = _interopRequireDefault(_ModelJs);

var _utilsUtilsJs = require('../utils/Utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var Thread = (function (_Model) {
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

    _get(Object.getPrototypeOf(Thread.prototype), 'constructor', this).call(this, jmap);

    _utilsUtilsJs2['default'].assertRequiredParameterIsPresent(id, 'id');

    opts = opts || {};

    this.id = id;
    this.messageIds = opts.messageIds || [];
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
      _utilsUtilsJs2['default'].assertRequiredParameterIsPresent(object, 'object');

      return new Thread(jmap, object.id, object);
    }
  }]);

  return Thread;
})(_ModelJs2['default']);

exports['default'] = Thread;
module.exports = exports['default'];

},{"../utils/Utils.js":16,"./Model.js":8}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _PromiseProviderJs = require('./PromiseProvider.js');

var _PromiseProviderJs2 = _interopRequireDefault(_PromiseProviderJs);

/**
 * A {@link PromiseProvider} implementation creating native ES6 Promises.<br />
 * This class supposes that the `Promise` class is available.
 *
 * @class ES6PromiseProvider
 *
 * @see PromiseProvider
 */

var ES6PromiseProvider = (function (_PromiseProvider) {
  _inherits(ES6PromiseProvider, _PromiseProvider);

  function ES6PromiseProvider() {
    _classCallCheck(this, ES6PromiseProvider);

    _get(Object.getPrototypeOf(ES6PromiseProvider.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ES6PromiseProvider, [{
    key: 'newPromise',
    value: function newPromise(resolver) {
      return new Promise(resolver);
    }
  }]);

  return ES6PromiseProvider;
})(_PromiseProviderJs2['default']);

exports['default'] = ES6PromiseProvider;
module.exports = exports['default'];

},{"./PromiseProvider.js":11}],11:[function(require,module,exports){
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
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var PromiseProvider = (function () {
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
})();

exports['default'] = PromiseProvider;
module.exports = exports['default'];

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _PromiseProviderJs = require('./PromiseProvider.js');

var _PromiseProviderJs2 = _interopRequireDefault(_PromiseProviderJs);

/**
 * A {@link PromiseProvider} implementation creating [Q]{@link https://github.com/kriskowal/q} promises.<br />
 * This class requires `Q` to be installed as dependency.
 *
 * @class QPromiseProvider
 *
 * @see PromiseProvider
 */

var QPromiseProvider = (function (_PromiseProvider) {
  _inherits(QPromiseProvider, _PromiseProvider);

  function QPromiseProvider() {
    _classCallCheck(this, QPromiseProvider);

    _get(Object.getPrototypeOf(QPromiseProvider.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(QPromiseProvider, [{
    key: 'newPromise',
    value: function newPromise(resolver) {
      return require('q').Promise(resolver);
    }
  }]);

  return QPromiseProvider;
})(_PromiseProviderJs2['default']);

exports['default'] = QPromiseProvider;
module.exports = exports['default'];

},{"./PromiseProvider.js":11,"q":"q"}],13:[function(require,module,exports){
'use strict';

/* global jQuery: false */

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _TransportJs = require('./Transport.js');

var _TransportJs2 = _interopRequireDefault(_TransportJs);

var JQueryTransport = (function (_Transport) {
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

    _get(Object.getPrototypeOf(JQueryTransport.prototype), 'constructor', this).call(this);

    this.promiseProvider = promiseProvider;
  }

  _createClass(JQueryTransport, [{
    key: 'post',
    value: function post(url, headers, data) {
      return this.promiseProvider.newPromise(function (resolve, reject) {
        jQuery.ajax({
          url: url,
          method: 'POST',
          headers: headers,
          data: JSON.stringify(data),
          dataType: 'json',
          processData: false,
          jsonp: false
        }).done(resolve).fail(function (xhr, statusText, err) {
          return reject(new Error('POST on ' + url + ' returned ' + xhr.status + ' (' + (statusText || err) + ').'));
        });
      });
    }
  }]);

  return JQueryTransport;
})(_TransportJs2['default']);

exports['default'] = JQueryTransport;
module.exports = exports['default'];

},{"./Transport.js":15}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _TransportJs = require('./Transport.js');

var _TransportJs2 = _interopRequireDefault(_TransportJs);

var RequestTransport = (function (_Transport) {
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

    _get(Object.getPrototypeOf(RequestTransport.prototype), 'constructor', this).call(this);

    this.promiseProvider = promiseProvider;
  }

  _createClass(RequestTransport, [{
    key: 'post',
    value: function post(url, headers, data) {
      return this.promiseProvider.newPromise(function (resolve, reject) {
        require('request')({
          url: url,
          headers: headers,
          method: 'POST',
          body: data,
          json: true
        }, function (err, res, body) {
          if (err) {
            return reject(err);
          }

          if (res.statusCode !== 200) {
            // http://jmap.io/spec.html#jmap-over-https
            return reject(new Error('POST on ' + url + ' returned ' + res.statusCode + '. ' + body));
          }

          resolve(body);
        });
      });
    }
  }]);

  return RequestTransport;
})(_TransportJs2['default']);

exports['default'] = RequestTransport;
module.exports = exports['default'];

},{"./Transport.js":15,"request":"request"}],15:[function(require,module,exports){
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
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Transport = (function () {
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
     *
     * @return {Promise}
     */
    value: function post(url, headers, data) {
      throw new Error('Transport is an abstract class. Please use a concrete implementation.');
    }
  }]);

  return Transport;
})();

exports['default'] = Transport;
module.exports = exports['default'];

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Utils = (function () {
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

  _createClass(Utils, null, [{
    key: 'assertRequiredParameterIsPresent',
    value: function assertRequiredParameterIsPresent(parameter, name) {
      if (!parameter) {
        throw new Error('The "' + name + '" parameter is required.');
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

      var expectedResponse = Utils._expectedResponseFor(request);

      if (expectedResponse && data[0][0] !== expectedResponse) {
        throw new Error('Expected "' + expectedResponse + '" as the JMAP response for a "' + request + '" request, but got "' + data[0][0] + '".');
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
  }, {
    key: '_jsonArrayToModelList',
    value: function _jsonArrayToModelList(jmap, Model, array) {
      return array.map(Model.fromJSONObject.bind(null, jmap));
    }
  }, {
    key: '_expectedResponseFor',
    value: function _expectedResponseFor(request) {
      return ({
        getAccounts: 'accounts',
        getMailboxes: 'mailboxes',
        getMessageList: 'messageList',
        getThreads: 'threads',
        getMessages: 'messages'
      })[request];
    }
  }]);

  return Utils;
})();

exports['default'] = Utils;
module.exports = exports['default'];

},{}]},{},[1])(1)
});