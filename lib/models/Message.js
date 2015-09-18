'use strict';

import Model from './Model.js';
import EMailer from './EMailer.js';
import Utils from '../utils/Utils.js';

export default class Message extends Model {
  constructor(jmap, id, threadId, mailboxIds, opts) {
    super(jmap);

    Utils.assertRequiredParameterIsPresent(id, 'id');
    Utils.assertRequiredParameterIsPresent(threadId, 'threadId');

    if (!Array.isArray(mailboxIds) || mailboxIds.length < 1) {
      throw new Error('A Message object is required to be in at least one Mailbox.');
    }

    opts = opts || {};

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
    this.from = opts.from || EMailer.unknown();
    this.to = opts.to || [EMailer.unknown()];
    this.cc = opts.cc || [EMailer.unknown()];
    this.bcc = opts.bcc || [EMailer.unknown()];
    this.replyTo = opts.replyTo || EMailer.unknown();
    this.subject = opts.subject || null;
    this.date = opts.date ? new Date(opts.date) : null;
    this.size = opts.size || 0;
    this.preview = opts.preview || null;
    this.textBody = opts.textBody || null;
    this.htmlBody = opts.htmlBody || null;
  }

  static fromJSONObject(jmap, object) {
    Utils.assertRequiredParameterIsPresent(object, 'object');

    return new Message(jmap, object.id, object.threadId, object.mailboxIds, object);
  }
}
