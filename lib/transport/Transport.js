'use strict';

/**
 * The {@link Transport} class is the base class for providers of a HTTP transport layer.<br />
 * A concrete implementation is required to implement {@link Transport#post} so that this method returns a
 * {@link Promise} that will be resolved or rejected depending on the result of the underlying HTTP request<br />
 * To create {@link Promise} instances, a {@link Transport} implementation should use a {@link PromiseProvider}.
 * {@link Client} instances will automatically provide transports with the configured {@link PromiseProvider} as the
 * `promiseProvider` property.
 * <br />
 * This level of abstraction allows users of the library to plug in their own implementation in order to use their
 * favorite HTTP transport library. Implementations for [Request]{@link https://github.com/request/request}
 * and [jQuery]{@link https://jquery.com/} are provided.
 *
 * @abstract
 * @class Transport
 *
 * @see JQueryTransport
 * @see RequestTransport
 * @see PromiseProvider
 */
export default class Transport {
  /**
   * This method must be implemented by concrete {@link Transport} implementations in such a way that:
   * * A HTTP POST request is made on `url` with the given `headers` and `data` (i.e.: payload)
   * * A {@link Promise} is returned (`this.promiseProvider` will be available to create Promise instances)
   * * The {@link Promise} is fulfilled when the HTTP request returns 200 (http://jmap.io/spec.html#jmap-over-https)
   * * The {@link Promise} is rejected if the HTTP request fails, or if the return status code is not 200
   * * When the {@link Promise} is fulfilled, the raw JMAP response is returned
   *
   * @abstract
   *
   * @param url {String} The URL to POST to
   * @param headers {Object} A hash of header names to header values that must be transmitted as part of the request
   * @param data {*} The request payload, as a Javascript object. It's the responsibility of the {@link Transport} implementation
   *   to serialize the data as a JSON {@link String} whenever required.
   *
   * @return {Promise}
   */
  post(url, headers, data) {
    throw new Error('Transport is an abstract class. Please use a concrete implementation.');
  }
}
