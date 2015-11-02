'use strict';

import Model from './Model.js';
import Utils from '../utils/Utils.js';

export default class CreateMessageAck extends Model {
  /**
   * This class should be used to wrap a create response item from a setMessages request.<br />
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _OutboundMessage_.
   * @param response {Object} The raw created response object.
   * @param response.blobId {String} The server side generated blobId of the created message.
   * @param response.size {Number} The server side size of the created message.
   * @param [response.id=null] {String} The server side generated message id of the created message.
   * @param [response.threadId=null] {String} The server side assigned threadId of the created message.
   *
   * @see Model
   */
  constructor(jmap, response) {
    super(jmap);
    Utils.assertRequiredParameterIsObject(response, 'response');
    Utils.assertRequiredParameterIsPresent(response.blobId, 'response.blobId');
    Utils.assertRequiredParameterHasType(response.size, 'response.size', 'number');

    this.id = response.id;
    this.blobId = response.blobId;
    this.size = response.size;
    this.threadId = response.threadId;
  }

}
