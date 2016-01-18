'use strict';

import Model from './Model.js';
import Utils from '../utils/Utils.js';

export default class MailboxesSet extends Model {
  /**
   * This class represents a JMAP [MailboxesSet] {@link http://jmap.io/spec.html#setmailboxes}.
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _MailboxesSet_.
   * @param [opts] {Object} The optional properties of this _MailboxesSet_.
   * @param [opts.accountId=''] {String} The id of the {@link Account} used in the request that originated this _MailboxesSet_.
   * @param [opts.oldState=''] {String} The state string that would have been returned by _getMailboxes_ before making the requested changes,
   *        or null if the server doesn’t know what the previous state string was.
   * @param [opts.newState=''] {String[]} The state string that will now be returned by _getMailboxes_.
   * @param [opts.created=[]] {String[]} A map of the creation id to an object containing the id and mustBeOnlyMailbox
   *        properties for each successfully created _Mailbox_.
   * @param [opts.updated=[]] {String[]} A list of ids for Mailboxes that were successfully updated.
   * @param [opts.destroyed=[]] {String[]} A list of ids for Mailboxes that were successfully destroyed.
   * @param [opts.notCreated=[]] {String[]} A map of creation id to a SetError object for each _Mailbox_ that failed to be created.
   *        The possible errors are defined above.
   * @param [opts.notUpdated=[]] {String[]} A map of _Mailbox_ id to a SetError object for each _Mailbox_ that failed to be updated.
   *        The possible errors are defined above.
   * @param [opts.notDestroyed=[]] {String[]} A map of _Mailbox_ id to a SetError object for each _Mailbox_ that failed to be destroyed.
   *        The possible errors are defined above.
   *
   * @see Model
   */
  constructor(jmap, opts) {
    super(jmap);

    opts = opts || {};

    this.accountId = opts.accountId || '';
    this.oldState = opts.oldState || '';
    this.newState = opts.newState || '';
    this.created = opts.created || [];
    this.updated = opts.updated || [];
    this.destroyed = opts.destroyed || [];
    this.notCreated = opts.notCreated || [];
    this.notUpdated = opts.notUpdated || [];
    this.notDestroyed = opts.notDestroyed || [];
  }

  /**
   * Creates a _MailboxesSet_ from its JSON representation.
   *
   * @param jmap {Client} The {@link Client} instance passed to the _MailboxesSet_ constructor.
   * @param object {Object} The JSON representation of the _MailboxesSet_, as a Javascript object.
   *
   * @return {MailboxesSet}
   */
  static fromJSONObject(jmap, object) {
    Utils.assertRequiredParameterIsPresent(object, 'object');

    return new MailboxesSet(jmap, object);
  }
}
