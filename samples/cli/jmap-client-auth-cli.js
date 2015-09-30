'use strict';

var jmap = require('../../dist/jmap-client.min'),
    q = require('q'),
    options = require('node-getopt')
    .create([ ['', 'authUrl=ARG', ''], ['', 'username=ARG', ''], ['', 'deviceName=ARG', ''] ])
    .parseSystem().options;

function continuationCallback(authContinuation) {
  return q.resolve(authContinuation.continuationToken);
}

var client = new jmap.Client(new jmap.RequestTransport(), new jmap.QPromiseProvider())
  .withAuthenticationUrl(options.authUrl)
  .authExternal(options.username, options.deviceName, continuationCallback)
  .then(function(authAccess) {
    client.withAuthenticationToken(authAccess.accessToken);
    console.log('client is authenticated, accesstoken=',authAccess.accessToken);
  }, function(err) {
    console.log('something went horribly wrong', err);
  });
