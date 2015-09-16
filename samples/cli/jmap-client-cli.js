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
            return {
              mailbox: mailbox,
              msgList: msgList
            };
          });
      })
    );
  })
  .then(function(infos) {
    return q.all(infos.map(function (info) {
      return info.msgList.getThreads()
        .then(function(threads) {
          return info.msgList.getMessages().then(function(messages) {
            return {
              mailbox: info.mailbox,
              msgList: info.msgList,
              threads: threads,
              messages: messages
            };
          });
        });
    }))
  })
  .then(function(infos) {
    infos.forEach(function(info) {
      console.log('|- ' + info.mailbox.name + ' (threads: ' + info.threads.length + ', messages: ' + info.messages.length + ')');
    });
  })
  .then(null, console.log);
