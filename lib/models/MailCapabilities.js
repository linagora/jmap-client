'use strict';

import Capabilities from './Capabilities';
import Constants from '../utils/Constants';

export default class MailCapabilities extends Capabilities {
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
  constructor(opts) {
    opts = opts || {};

    super(Constants.MAIL_CAPABILITIES_URI);

    this.maxMailboxesPerMessage = opts.maxMailboxesPerMessage || null;
    this.maxSizeMessageAttachments = opts.maxSizeMessageAttachments || 0;
    this.maxDelayedSend = opts.maxDelayedSend || 0;
    this.messageListSortOptions = opts.messageListSortOptions || [];
    this.submissionExtensions = opts.submissionExtensions || {};
  }
}
