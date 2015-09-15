'use strict';

/* global Model: false, Utils: false */

class Mailbox extends Model {
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

  getMessageList(options) {
    options = options || {};
    options.filter = {
      inMailboxes: [this.id]
    };

    return this._jmap.getMessageList(options);
  }

  static fromJSONObject(jmap, object) {
    Utils.assertRequiredParameterIsPresent(object, 'object');

    return new Mailbox(jmap, object.id, object.name, object);
  }
}
