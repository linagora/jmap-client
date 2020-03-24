import SUCCESS_RESPONSE_CODES from '../utils/Constants';
import Transport from './Transport';
import TransportError from '../errors/TransportError';

export default class RequestTransport extends Transport {
  /**
   * A {@link Transport} implementation for [Request]{@link https://github.com/request/request}.<br />
   * This class requires `request` to be installed as dependency.
   *
   * @constructor
   *
   * @param [promiseProvider=null] {PromiseProvider} A {@link PromiseProvider} implementation.
   *
   * @see Transport
   */
  constructor(promiseProvider) {
    super();

    this.promiseProvider = promiseProvider;
  }

  post(url, headers, data, raw) {
    return this.promiseProvider.newPromise(function(resolve, reject) {
      require('request')({
        url: url,
        headers: headers,
        method: 'POST',
        body: data,
        json: !raw
      }, function(err, res, body) {
        if (err || SUCCESS_RESPONSE_CODES.indexOf(res.statusCode) < 0) {
          return reject(new TransportError(err, res && res.statusCode, body));
        }

        resolve(body);
      });
    });
  }
}
