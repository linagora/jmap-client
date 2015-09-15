'use strict';

/* global Model: false, Utils: false */

class MessageList extends Model {
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

  static fromJSONObject(jmap, object) {
    Utils.assertRequiredParameterIsPresent(object, 'object');

    return new MessageList(jmap, object);
  }
}
