'use strict';

import Model from './Model.js';
import Utils from '../utils/Utils.js';

export default class SetResponse extends Model {
  /**
   * This class represents a JMAP [xxxSet] {@link http://jmap.io/spec.html#setfoos}.
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _SetResponse_.
   * @param [opts] {Object} The optional properties of this _SetResponse_.
   * @param [opts.accountId=''] {String} The id of the {@link Account} used in the request that originated this _SetResponse_.
   * @param [opts.oldState=''] {String} The state string that would have been returned by _getXXX_ before making the requested changes,
   *        or null if the server doesn’t know what the previous state string was.
   * @param [opts.newState=''] {String[]} The state string that will now be returned by _getXXX_.
   * @param [opts.created=[]] {String[]} A map of the creation id to an object containing any server-assigned properties of
   *        the _XXX_ object (including the id) for all successfully created records.
   * @param [opts.updated=[]] {String[]}  A list of _XXX_ ids for records that were successfully updated.
   * @param [opts.destroyed=[]] {String[]}  A list of _XXX_ ids for records that were successfully destroyed.
   * @param [opts.notCreated=[]] {String[]} A map of creation id to a SetError object for each _XXX_ that failed to be created.
   * @param [opts.notUpdated=[]] {String[]} A map of _XXX_ id to a SetError object for each _XXX_ that failed to be updated.
   * @param [opts.notDestroyed=[]] {String[]} A map of _XXX_ id to a SetError object for each _XXX_ that failed to be destroyed.
   *
   * @see Model
   */
  constructor(jmap, opts) {
    super(jmap);

    opts = opts || {};

    this.accountId = opts.accountId || null;
    this.oldState = opts.oldState || null;
    this.newState = opts.newState || '';
    this.created = opts.created || {};
    this.updated = opts.updated || [];
    this.destroyed = opts.destroyed || [];
    this.notCreated = opts.notCreated || {};
    this.notUpdated = opts.notUpdated || {};
    this.notDestroyed = opts.notDestroyed || {};
  }

  /**
   * Creates a _SetResponse_ from its JSON representation.
   *
   * @param jmap {Client} The {@link Client} instance passed to the _SetResponse_ constructor.
   * @param object {Object} The JSON representation of the _SetResponse_, as a Javascript object.
   *
   * @return {SetResponse}
   */
  static fromJSONObject(jmap, object) {
    Utils.assertRequiredParameterIsPresent(object, 'object');

    return new SetResponse(jmap, object);
  }
}
