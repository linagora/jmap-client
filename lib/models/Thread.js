'use strict';

/* global Model: false, Utils: false */

class Thread extends Model {
  constructor(jmap, id, opts) {
    super(jmap);

    Utils.assertRequiredParameterIsPresent(id, 'id');

    opts = opts || {};

    this.id = id;
    this.messageIds = opts.messageIds || [];
  }

  static fromJSONObject(jmap, object) {
    Utils.assertRequiredParameterIsPresent(object, 'object');

    return new Thread(jmap, object.id, object);
  }
}
