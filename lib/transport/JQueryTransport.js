'use strict';

/* global jQuery: false */

import Transport from './Transport.js';

export default class JQueryTransport extends Transport {
  /**
   * A {@link Transport} implementation for [jQuery]{@link https://jquery.com/}.<br />
   * This class supposes that the `jQuery` global object is available.
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
      jQuery.ajax({
        url: url,
        method: 'POST',
        headers: headers,
        data: raw ? data : JSON.stringify(data),
        dataType: raw ? undefined : 'json',
        processData: false,
        jsonp: false
      })
        .done(resolve)
        .fail(function(xhr, statusText, err) {
          return reject(new Error('POST on ' + url + ' returned ' + xhr.status + ' (' + (statusText || err) + ').'));
        });
    });
  }
}
