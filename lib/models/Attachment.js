'use strict';

import Model from './Model.js';
import Utils from '../utils/Utils.js';

export default class Attachment extends Model {
  /**
   * This class represents a JMAP [Attachment]{@link http://jmap.io/spec.html#messages}.<br />
   * An _Attachment_ object holds all information of a given attachment of a {@link Message}.
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created the parent _Message_.
   * @param blobId {String} The id of the binary data.
   * @param [opts] {Object} The optional properties of this _Attachment_.
   * @param [opts.url=null] {String} The URL to download the attachment. If not passed as a parameter, this will be deduced from
   *  the configured `downloadUrl` of the {@link Client} instance used to fetch the {@link Message} containing this _Attachment_.
   *  If the library does not find a reliable way of knowing the URL for this attachment, for any reason, the `url` property of this
   *  _Attachment_ instance will be set to `null`.
   * @param [opts.type=''] {String} The content-type of the attachment.
   * @param [opts.name=''] {String} The full file name.
   * @param [opts.size=0] {Number} The size, in bytes, of the attachment when fully decoded.
   * @param [opts.cid=null] {String} The id used within the message body to reference this attachment.
   * @param [opts.isInline=false] {String} `true` if the attachment is referenced by a `cid:` link from within the HTML body of the message.
   * @param [opts.width=0] {String} The width (in px) of the image, if the attachment is an image.
   * @param [opts.height=0] {String} TThe height (in px) of the image, if the attachment is an image.
   *
   * @see Model
   */
  constructor(jmap, blobId, opts) {
    super(jmap);

    Utils.assertRequiredParameterIsPresent(blobId, 'blobId');

    opts = opts || {};

    this.blobId = blobId;
    this.type = opts.type || '';
    this.name = opts.name || '';
    this.size = opts.size || 0;
    this.cid = opts.cid || null;
    this.isInline = opts.isInline || false;
    this.width = opts.width || 0;
    this.height = opts.height || 0;
    this.url = opts.url || null;

    // Some JMAP servers might return an already defined attachment URL, some others don't; the spec is vague about that
    // If it is not provided by the server, we do a best effort to derive it from the configured download URL of our client
    if (!this.url && jmap.downloadUrl) {
      this.url = Utils.fillURITemplate(jmap.downloadUrl, {
        blobId: this.blobId,
        name: this.name || this.blobId
      });
    }
  }

  /**
   * Creates an _Attachment_ from its JSON representation.
   *
   * @param jmap {Client} The {@link Client} instance used to fetch the parent {@link Message}.
   * @param object {Object} The JSON representation of the _Attachment_, as a Javascript object.
   * @param object.blobId {String} The id of the binary data for this _Attachment_.
   *
   * @return {Attachment}
   */
  static fromJSONObject(jmap, object) {
    Utils.assertRequiredParameterIsPresent(object, 'object');

    return new Attachment(jmap, object.blobId, object);
  }
}
