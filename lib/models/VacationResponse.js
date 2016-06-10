'use strict';

import Model from './Model.js';
import Utils from '../utils/Utils.js';
import JSONBuilder from '../utils/JSONBuilder.js';

class VacationResponse extends Model {
  /**
   * This class represents a JMAP [VacationResponse]{@link http://jmap.io/spec.html#vacation-response}.<br />
   * The _VacationResponse_ object represents the state of vacation-response related settings for an account.
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _VacationResponse_.
   * @param [opts] {Object} The optional properties of this _VacationResponse_.
   * @param [opts.isEnabled=false] {Boolean} Is the vacation response enabled?
   * @param [opts.fromDate=null] {Date} The date/time after which messages that arrive should receive the user’s vacation response, in UTC.
   * @param [opts.toDate=null] {Date} The date/time after which messages that arrive should no longer receive the user’s vacation response, in UTC.
   * @param [opts.subject=null] {String} The subject that will be used by the mail sent in response to messages when the vacation response is enabled.
   * @param [opts.textBody=null] {Number} The plain text part of the message to send in response to messages when the vacation response is enabled.
   * @param [opts.htmlBody=null] {String} The HTML part of the message to send in response to messages when the vacation response is enabled.
   *
   * @see Model
   */
  constructor(jmap, opts) {
    super(jmap);

    opts = opts || {};

    this.id = VacationResponse.ID;
    this.isEnabled = opts.isEnabled || false;
    this.fromDate = opts.fromDate ? new Date(opts.fromDate) : null;
    this.toDate = opts.toDate ? new Date(opts.toDate) : null;
    this.subject = opts.subject || null;
    this.textBody = opts.textBody || null;
    this.htmlBody = opts.htmlBody || null;
  }

  /**
   * Creates a JSON representation from this {@link VacationResponse}.
   *
   * @return JSON object with only owned properties and non-null default values.
   */
  toJSONObject() {
    return new JSONBuilder()
      .append('id', this.id)
      .append('isEnabled', this.isEnabled)
      .appendDateIfDefined('fromDate', this.fromDate)
      .appendDateIfDefined('toDate', this.toDate)
      .appendIfDefined('subject', this.subject)
      .appendIfDefined('textBody', this.textBody)
      .appendIfDefined('htmlBody', this.htmlBody)
      .build();
  }

  /**
   * Creates an _VacationResponse_ from its JSON representation.
   *
   * @param jmap {Client} The {@link Client} instance that created this _VacationResponse_.
   * @param object {Object} The JSON representation of the _VacationResponse_, as a Javascript object.
   *
   * @return {VacationResponse}
   */
  static fromJSONObject(jmap, object) {
    Utils.assertRequiredParameterIsPresent(object, 'object');

    return new VacationResponse(jmap, object);
  }
}

VacationResponse.ID = 'singleton'; // http://jmap.io/spec.html#vacation-response

export default VacationResponse;
