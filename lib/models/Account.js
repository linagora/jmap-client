'use strict';

/* global Model: false, Utils: false */

class Account extends Model {
  constructor(jmap, id, opts) {
    super(jmap);

    Utils.assertRequiredParameterIsPresent(id, 'id');

    opts = opts || {};

    this.id = id;
    this.name = opts.name || '';
    this.isPrimary = opts.isPrimary || false;
    this.isReadOnly = opts.isReadOnly || false;
  }

  static fromJSONObject(jmap, object) {
    Utils.assertRequiredParameterIsPresent(object, 'object');

    return new Account(jmap, object.id, object);
  }
}
