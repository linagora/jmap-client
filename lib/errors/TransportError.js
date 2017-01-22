'use strict';

export default class TransportError extends Error {
  /**
   * A `TransportError` is a custom `Error` thrown when a request to a remote server fails.
   *
   * @constructor
   *
   * @param [cause=null] {*} The underlying cause of this `TransportError`. Though this is usually an {@link Error}, this
   *   might actually be anything and depends on the chosen {@link Transport} implementation.
   * @param [statusCode=0] {Number} The HTTP status code sent by the server, if the request reached the server.
   * @param [responseText=null] {String} The HTTP response sent by the server, if any.
   *
   * @see Transport
   * @see Error
   */
  constructor(cause, statusCode, responseText) {
    super();

    this.cause = cause || null;
    this.statusCode = statusCode || 0;
    this.responseText = responseText || null;
  }
}
