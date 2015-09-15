'use strict';

var jmap = require('../../dist/jmap-client').jmap,
    q = require('q'),
    options = require('node-getopt').create([ ['', 'token=ARG', ''], ['', 'url=ARG', ''] ]).parseSystem().options;

new jmap.Client(new jmap.RequestTransport(), new jmap.QPromiseProvider())
  .withAPIUrl(options.url)
  .withAuthenticationToken(options.token)
  .getAccounts()
  .then(function(accounts) {
    return q.all(accounts.map(function(account) {
      console.log(account);

      return account.getMailboxes();
    }))
  })
  .then(console.log, console.log);
