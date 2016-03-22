'use strict';

var util = require('util'),
    jmap = require('../../dist/jmap-client.min'),
    q = require('q'),
    options = require('node-getopt').create([ ['', 'token=ARG', ''], ['', 'url=ARG', ''] ]).parseSystem().options;

function oneline(value) {
  return util.inspect(value).split('\n').join(' ');
}

new jmap.Client(new jmap.RequestTransport(), new jmap.QPromiseProvider())
  .withAPIUrl(options.url)
  .withAuthenticationToken(options.token)
  .getAccounts()
  .then(function(accounts) {
    var a = accounts[0];

    console.log(a.name);
    console.log('|- Capabilities: ' + oneline(a.capabilities));
    console.log('|- Mail: ' + oneline(a.mail));
    console.log('|- Calendars: ' + oneline(a.calendars));
    console.log('|- Contacts: ' + oneline(a.contacts));

    return a.getMailboxes();
  })
  .then(function(mailboxes) {
    console.log('|- Mailboxes');

    return q.all(mailboxes
      .sort(function(a, b) {
        return a.sortOrder - b.sortOrder;
      })
      .map(function(mailbox) {
        return mailbox.getMessageList({
          collapseThreads: true,
          fetchMessages: true,
          fetchThreads: true
        }).then(function(data) {
          var threads = data[1] || [],
              messages = data[2] || [];

          console.log('   |- ' + mailbox.name + ' (threads: ' + threads.length + ', messages: ' + messages.length + ')');
        });
      })
    );
  })
  .then(null, console.log);
