'use strict';

import Transport from './Transport.js';

export default class RequestTransport extends Transport {
  /**
   * A {@link Transport} implementation for [Request]{@link https://github.com/request/request}.
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

        if (res.statusCode !== 200) { // http://jmap.io/spec.html#jmap-over-https
          return reject(new Error('POST on ' + url + ' returned ' + res.statusCode + '. ' + body));
        }

        resolve(body);
      });
    });
  }
}
