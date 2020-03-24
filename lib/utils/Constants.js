/**
 * The _Constants_ module exports a single object that is a collection of useful constants.
 *
 * @property VERSION {String} The version of this library
 *
 * @module Constants
 */
export default {
  VERSION: '__VERSION__',
  CLIENT_NAME: 'jmap-client (https://github.com/linagora/jmap-client)',
  SUCCESS_RESPONSE_CODES: [200, 201],
  ERROR: 'error',
  CORE_CAPABILITIES_URI: 'http://jmap.io/spec-core.html',
  MAIL_CAPABILITIES_URI: 'http://jmap.io/spec-mail.html'
};
