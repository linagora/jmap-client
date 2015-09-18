'use strict';

import Model from './Model.js';
import Utils from '../utils/Utils.js';

export default class Mailbox extends Model {
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
  constructor(jmap, id, name, opts) {
    super(jmap);

    Utils.assertRequiredParameterIsPresent(id, 'id');
    Utils.assertRequiredParameterIsPresent(name, 'name');

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
  getMessageList(options) {
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
  static fromJSONObject(jmap, object) {
    Utils.assertRequiredParameterIsPresent(object, 'object');

    return new Mailbox(jmap, object.id, object.name, object);
  }
}
