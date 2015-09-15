'use strict';

/* global Transport: false, jQuery: false */

class JQueryTransport extends Transport {
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
        data: data,
        dataType: 'json'
      })
        .done(resolve)
        .fail(function(xhr, statusText, err) {
          return reject(new Error('POST on ' + url + ' returned ' + xhr.status + ' (' + (statusText || err) + ').'));
        });
    });
  }
}
