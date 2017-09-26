'use strict';

import Model from './Model.js';
import EMailer from './EMailer.js';
import Utils from '../utils/Utils.js';
import Attachment from './Attachment.js';

export default class Message extends Model {
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
   * @param [opts.blobId=null] {String} The identifier  representing the raw [@!RFC5322] message.
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
  constructor(jmap, id, blobId, threadId, mailboxIds, opts) {
    super(jmap);

    Utils.assertRequiredParameterIsPresent(id, 'id');
    Utils.assertRequiredParameterIsPresent(blobId, 'blobId');
    Utils.assertRequiredParameterIsPresent(threadId, 'threadId');
    Utils.assertRequiredParameterIsArrayWithMinimumLength(mailboxIds, 'mailboxIds', 1);

    opts = opts || {};

    this.id = id;
    this.blobId = blobId;
    this.threadId = threadId;
    this.mailboxIds = mailboxIds;
    this.blobId = opts.blobId || null;
    this.inReplyToMessageId = opts.inReplyToMessageId || null;
    this.isUnread = opts.isUnread || false;
    this.isFlagged = opts.isFlagged || false;
    this.isAnswered = opts.isAnswered || false;
    this.isDraft = opts.isDraft || false;
    this.hasAttachment = opts.hasAttachment || false;
    this.headers = opts.headers || {};
    this.from = Utils._jsonArrayToModelList(jmap, EMailer, Array.isArray(opts.from) ? opts.from : [opts.from])[0];
    this.to = Utils._jsonArrayToModelList(jmap, EMailer, opts.to);
    this.cc = Utils._jsonArrayToModelList(jmap, EMailer, opts.cc);
    this.bcc = Utils._jsonArrayToModelList(jmap, EMailer, opts.bcc);
    this.replyTo = opts.replyTo || [];
    this.subject = opts.subject || null;
    this.date = opts.date ? new Date(opts.date) : null;
    this.size = opts.size || 0;
    this.preview = opts.preview || null;
    this.textBody = opts.textBody || null;
    this.htmlBody = opts.htmlBody || null;
    this.attachments = Utils._jsonArrayToModelList(jmap, Attachment, opts.attachments);
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
  move(mailboxIds) {
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
  moveToMailboxWithRole(role) {
    return this._jmap.getMailboxWithRole(role)
      .then((mailbox) => this.move([mailbox.id]));
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
  update(options) {
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
  setIsFlagged(isFlagged) {
    Utils.assertRequiredParameterHasType(isFlagged, 'isFlagged', 'boolean');

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
  setIsUnread(isUnread) {
    Utils.assertRequiredParameterHasType(isUnread, 'isUnread', 'boolean');

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
  setIsAnswered(isAnswered) {
    Utils.assertRequiredParameterHasType(isAnswered, 'isAnswered', 'boolean');

    return this.update({ isAnswered: isAnswered });
  }

  /**
   * Destroy this {@link Message} on the server.
   *
   * @return {Promise} A {@link Promise}, as per {@link Client.destroyMessage}.
   *
   * @see Client#destroyMessage
   */
  destroy() {
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
  static fromJSONObject(jmap, object) {
    Utils.assertRequiredParameterIsPresent(object, 'object');

    return new Message(jmap, object.id, object.blobId, object.threadId, object.mailboxIds, object);
  }
}
