'use strict';

import Capabilities from './Capabilities';

export default class MailCapabilities extends Capabilities {
  /**
   * This class represents a JMAP [MailCapabilities]{@link http://jmap.io/spec.html#accounts*}.<br />
   * An _MailCapabilities_ object describes mail-related capabilities of a JMAP server.
   *
   * @constructor
   * @extends Capabilities
   *
   * @param [opts] {Object} The optional properties of this _MailCapabilities_.
   * @param [opts.maxSizeMessageAttachments=0] {Number} The maximum total size of attachments, in bytes, allowed for messages.
   * @param [opts.canDelaySend=false] {Boolean} Whether the server supports inserting a message into the outbox to be sent later.
   * @param [opts.messageListSortOptions=0] {String[]} A list of all the message properties the server supports for sorting by.
   *
   * @see Capabilities
   */
  constructor(opts) {
    opts = opts || {};

    super(opts);

    this.maxSizeMessageAttachments = opts.maxSizeMessageAttachments || 0;
    this.canDelaySend = !!opts.canDelaySend;
    this.messageListSortOptions = opts.messageListSortOptions || [];
  }
}
