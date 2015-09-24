'use strict';

import Model from './Model.js';
import Utils from '../utils/Utils.js';

export default class MessagesSet extends Model {
  /**
   * This class represents a JMAP [MessagesSet]{@link http://jmap.io/spec.html#setmessages}.
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _MessagesSet_.
   * @param [opts] {Object} The optional properties of this _MessagesSet_.
   * @param [opts.accountId=''] {String} The id of the {@link Account} used in the request that originated this _MessagesSet_.
   * @param [opts.created=Object] {Object} A map of the creation id to an object containing the id, blobId, threadId,
   *   and size properties for each successfully created message.
   * @param [opts.updated=[]] {String[]} A list of Message ids for Messages that were successfully updated.
   * @param [opts.destroyed=[]] {String[]} A list of Message ids for Messages that were successfully destroyed.
   * @param [opts.notCreated=Object] {Object} A map of Message id to an error for each Message that failed to be created.
   * @param [opts.notUpdated=Object] {Object} A map of Message id to an error for each Message that failed to be updated.
   * @param [opts.notDestroyed=Object] {Object} A map of Message id to an error for each Message that failed to be destroyed.
   *
   * @see Model
   */
  constructor(jmap, opts) {
    super(jmap);

    opts = opts || {};

    this.accountId = opts.accountId || '';
    this.created = opts.created || {};
    this.updated = opts.updated || [];
    this.destroyed = opts.destroyed || [];
    this.notCreated = opts.notCreated || {};
    this.notUpdated = opts.notUpdated || {};
    this.notDestroyed = opts.notDestroyed || {};
  }

  /**
   * Creates a _MessagesSet_ from its JSON representation.
   *
   * @param jmap {Client} The {@link Client} instance passed to the _MessagesSet_ constructor.
   * @param object {Object} The JSON representation of the _MessagesSet_, as a Javascript object.
   *
   * @return {MessagesSet}
   */
  static fromJSONObject(jmap, object) {
    Utils.assertRequiredParameterIsPresent(object, 'object');

    return new MessagesSet(jmap, object);
  }
}
