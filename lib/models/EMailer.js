'use strict';

export default class EMailer {
  /**
   * This class represents a JMAP [EMailer]{@link http://jmap.io/spec.html#messages}.<br />
   * An _EMailer_ object holds the name and email address of either a sender or a recipient of a {@link Message}.
   *
   * @param [opts] {Object} The optional properties of this _EMailer_.
   * @param [opts.name=''] {String} The name of the emailer.
   * @param [opts.email='@'] {String} The email address of the emailer.
   */
  constructor(opts) {
    opts = opts || {};

    this.name = opts.name || '';
    this.email = opts.email || '@'; // http://jmap.io/spec.html#messages
  }

  /**
   * This method returns the unknown _EMailer_, that is, an _EMailer_ instance with all fields set to defaults.
   *
   * @return {EMailer} The unknown _EMailer_.
   */
  static unknown() {
    return new EMailer();
  }

  /**
   * Creates a _EMailer_ from its JSON representation.
   *
   * @param jmap {Client} The {@link Client} instance that originates the _EMailer_ instance. Is actually ignored.
   * @param object {Object} The JSON representation of the _EMailer_, as a Javascript object
   *
   * @return {EMailer}
   */
  static fromJSONObject(jmap, object) {
    return new EMailer(object);
  }
}
