'use strict';

export default class Capabilities {
  /**
   * This class represents an abstract JMAP "capabilities" object. See {@link http://jmap.io/spec.html#accounts*}.<br />
   * It is subclassed in more specific xxxCapabilities classes.
   *
   * @param [opts] {Object} The optional properties of this _AccountCapabilities_.
   * @param [opts.isReadOnly=false] {Boolean} Whether the feature denoted by this _Capabilities_ instance is read-only.
   */
  constructor(opts) {
    opts = opts || {};

    this.isReadOnly = !!opts.isReadOnly;
  }
}
