'use strict';

import Model from './Model.js';
import Utils from '../utils/Utils.js';

export default class CreateMailboxAck extends Model {
  /**
   * This class should be used to wrap a create response item from a setMailboxes request.<br />
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _Mailbox_.
   * @param response {Object} The raw created response object.
   * @param response.Id {String} The server side generated id of the created mailbox.
   * @param response.mustBeOnlyMailbox {Boolean} The server decision whether messages in this mailbox may/may not be in any other mailbox.
   *
   * @see Model
   */
  constructor(jmap, response) {
    super(jmap);
    Utils.assertRequiredParameterIsObject(response, 'response');
    Utils.assertRequiredParameterIsPresent(response.id, 'response.id');
    Utils.assertRequiredParameterHasType(response.mustBeOnlyMailbox, 'response.mustBeOnlyMailbox', 'boolean');

    this.id = response.id;
    this.mustBeOnlyMailbox = response.mustBeOnlyMailbox;
  }

}
