'use strict';

var jmap = require('../../dist/jmap-client.min'),
    options = require('node-getopt').create([ ['', 'token=ARG', ''], ['', 'url=ARG', ''] ]).parseSystem().options;

new jmap.Client(new jmap.RequestTransport(), new jmap.QPromiseProvider())
  .withAPIUrl(options.url)
  .withAuthenticationToken(options.token)
  .getVacationResponse()
  .then(function(response) {
    console.log('Vacation is ' + (response.isEnabled ? 'enabled' : 'disabled'));
    console.log('|- From ' + response.fromDate);
    console.log('|- To ' + response.toDate);
    console.log('|- Subject ' + response.subject);
    console.log('|- TextBody ' + response.textBody);
    console.log('|- HTMLBody ' + response.htmlBody);
  })
  .then(null, console.log);
