'use strict';

import Transport from './Transport.js';

// http://jmap.io/spec.html#jmap-over-https
// http://jmap.io/spec.html#authentication
var validResponseCodes = [200, 201];

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

  post(url, headers, data) {
    return this.promiseProvider.newPromise(function(resolve, reject) {
      require('request')({
        url: url,
        headers: headers,
        method: 'POST',
        body: data,
        json: true
      }, function(err, res, body) {
        if (err) {
          return reject(err);
        }

        if (validResponseCodes.indexOf(res.statusCode) < 0) {
          return reject(new Error('POST on ' + url + ' returned ' + res.statusCode + '. ' + body));
        }

        resolve(body);
      });
    });
  }
}
