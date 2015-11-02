'use strict';

import Model from './Model.js';
import Utils from '../utils/Utils.js';
import Attachment from './Attachment.js';
import JSONBuilder from '../utils/JSONBuilder.js';

export default class OutboundMessage extends Model {
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
  constructor(jmap, opts) {
    super(jmap);

    opts = opts || {};

    this.mailboxIds = opts.mailboxIds || [];
    this.inReplyToMessageId = opts.inReplyToMessageId || null;
    this.isUnread = opts.isUnread;
    this.isFlagged = opts.isFlagged;
    this.isAnswered = opts.isAnswered;
    this.isDraft = opts.isDraft;
    this.headers = opts.headers || null;
    this.from = opts.from || null;
    this.to = opts.to || null;
    this.cc = opts.cc || null;
    this.bcc = opts.bcc || null;
    this.replyTo = opts.replyTo || null;
    this.subject = opts.subject || null;
    this.textBody = opts.textBody || null;
    this.htmlBody = opts.htmlBody || null;
    this.attachments = Utils._jsonArrayToModelList(jmap, Attachment, opts.attachments);
  }

  /**
   * Creates a JSON representation from this model.
   *
   * @return JSON object with only owned properties and non default values.
   */
  toJSONObject() {
    return new JSONBuilder()
      .appendIfNotEmpty('mailboxIds', this.mailboxIds)
      .appendIfDefined('inReplyToMessageId', this.inReplyToMessageId)
      .appendIfDefined('isUnread', this.isUnread)
      .appendIfDefined('isFlagged', this.isFlagged)
      .appendIfDefined('isAnswered', this.isAnswered)
      .appendIfDefined('isDraft', this.isDraft)
      .appendIfDefined('headers', this.headers)
      .appendIfDefined('from', this.from)
      .appendIfDefined('to', this.to)
      .appendIfDefined('cc', this.cc)
      .appendIfDefined('bcc', this.bcc)
      .appendIfDefined('replyTo', this.replyTo)
      .appendIfDefined('subject', this.subject)
      .appendIfDefined('textBody', this.textBody)
      .appendIfDefined('htmlBody', this.htmlBody)
      .appendIfNotEmpty('attachments', this.attachments)
      .build();
  }
}
