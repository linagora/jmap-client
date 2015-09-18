'use strict';

import Model from './Model.js';
import Utils from '../utils/Utils.js';

export default class MessageList extends Model {
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

  getThreads(options) {
    options = options || {};
    options.ids = this.threadIds;

    return this._jmap.getThreads(options);
  }

  getMessages(options) {
    options = options || {};
    options.ids = this.messageIds;

    return this._jmap.getMessages(options);
  }

  static fromJSONObject(jmap, object) {
    Utils.assertRequiredParameterIsPresent(object, 'object');

    return new MessageList(jmap, object);
  }
}
