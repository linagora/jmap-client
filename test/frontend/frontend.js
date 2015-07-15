'use strict';

var expect = chai.expect;

describe('The frontend test setup', function() {
  it('should return the correct array of mailboxes', function() {
    var transport = new JMAP.Transport();
    var jmap = new JMAP.Jmap(transport);

    var expectedArray = [
      {
        id: 'mailbox1',
        name: 'Inbox',
        parentId: null,
        role: 'inbox',
        mustBeOnlyMailbox: false,
        mayAddMessages: true,
        mayRemoveMessages: true,
        mayCreateChild: false,
        mayRenameMailbox: true,
        mayDeleteMailbox: false,
        totalMessages: 1424,
        unreadMessages: 3,
        totalThreads: 1213,
        unreadThreads: 2
      },
      {
        id: 'mailbox2',
        name: 'Sent',
        parentId: null,
        role: 'sent',
        mustBeOnlyMailbox: false,
        mayAddMessages: true,
        mayRemoveMessages: true,
        mayCreateChild: false,
        mayRenameMailbox: true,
        mayDeleteMailbox: false,
        totalMessages: 41,
        unreadMessages: 0,
        totalThreads: 32,
        unreadThreads: 2
      },
      {
        id: 'mailbox3',
        name: 'Trash',
        parentId: null,
        role: 'trash',
        mustBeOnlyMailbox: true,
        mayAddMessages: true,
        mayRemoveMessages: true,
        mayCreateChild: false,
        mayRenameMailbox: true,
        mayDeleteMailbox: false,
        totalMessages: 3,
        unreadMessages: 0,
        totalThreads: 2,
        unreadThreads: 0
      },
      {
        id: 'mailbox4',
        name: 'Awaiting Reply',
        parentId: 'mailbox2',
        role: null,
        mustBeOnlyMailbox: false,
        mayAddMessages: true,
        mayRemoveMessages: true,
        mayCreateChild: true,
        mayRenameMailbox: true,
        mayDeleteMailbox: true,
        totalMessages: 0,
        unreadMessages: 0,
        totalThreads: 0,
        unreadThreads: 0
      }
    ];

    expect(jmap.connect().getMailboxes()).to.deep.equal(expectedArray);
  });
});
