'use strict';

var jmap = require('../../dist/jmap-client.min').jmap,
    q = require('q'),
    options = require('node-getopt').create([ ['', 'token=ARG', ''], ['', 'url=ARG', ''] ]).parseSystem().options;

new jmap.Client(new jmap.RequestTransport(), new jmap.QPromiseProvider())
  .withAPIUrl(options.url)
  .withAuthenticationToken(options.token)
  .getAccounts()
  .then(function(accounts) {
    console.log(accounts[0].name);

    return accounts[0].getMailboxes();
  })
  .then(function(mailboxes) {
    return q.all(mailboxes
      .sort(function(a, b) {
        return a.sortOrder - b.sortOrder;
      })
      .map(function(mailbox) {
        return mailbox.getMessageList()
          .then(function(msgList) {
            console.log('|- ' + mailbox.name + ' (messages: ' + msgList.messageIds.length + ', threads: ' + msgList.threadIds.length + ')');
          });
      })
    );
  })
  .then(null, console.log);

