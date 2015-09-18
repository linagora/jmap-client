'use strict';

import Model from './Model.js';
import Utils from '../utils/Utils.js';

export default class MessageList extends Model {
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
  constructor(jmap, opts) {
    super(jmap);

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
  getThreads(options) {
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
  getMessages(options) {
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
  static fromJSONObject(jmap, object) {
    Utils.assertRequiredParameterIsPresent(object, 'object');

    return new MessageList(jmap, object);
  }
}
