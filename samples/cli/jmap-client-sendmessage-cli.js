'use strict';

var jmap = require('../../dist/jmap-client.min'),
    q = require('q'),
    options = require('node-getopt').create([
      ['', 'token=ARG', ''],
      ['', 'url=ARG', ''],
      ['', 'from=ARG', ''],
      ['', 'to=ARG', ''],
      ['', 'cc=ARG', ''],
      ['', 'subject=ARG', ''],
      ['', 'body=ARG', '']
    ]).parseSystem().options;

var client = new jmap.Client(new jmap.RequestTransport(), new jmap.QPromiseProvider());

client
  .withAPIUrl(options.url)
  .withAuthenticationToken(options.token)
  .getAccounts()
  .then(function(accounts) {
    console.log('Sending message to ' + options.to + ' using account: ' + accounts[0].name);

    return client.send(new jmap.OutboundMessage(client, {
      from: { email: options.from },
      to: [{ email: options.to }],
      cc: [{ email: options.cc }],
      subject: options.subject,
      textBody: options.body
    }));
  })
  .then(function() { console.log('Message sent !'); }, console.log);
