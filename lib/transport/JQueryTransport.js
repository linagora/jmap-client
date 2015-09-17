'use strict';

/* global jQuery: false */

import Transport from './Transport.js';

export default class JQueryTransport extends Transport {
  constructor(promiseProvider) {
    super();

    this.promiseProvider = promiseProvider;
  }

  post(url, headers, data) {
    return this.promiseProvider.newPromise(function(resolve, reject) {
      jQuery.ajax({
        url: url,
        method: 'POST',
        headers: headers,
        data: JSON.stringify(data),
        dataType: 'json',
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
