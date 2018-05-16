'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client'),
    q = require('q');

require('chai').use(require('chai-datetime'));

describe('The Message class', function() {

  describe('The constructor', function() {

    it('should throw an Error if id is not defined', function() {
      expect(function() {
        new jmap.Message({});
      }).to.throw(Error);
    });

    it('should throw an Error if blobId is not defined', function() {
      expect(function() {
        new jmap.Message({}, 'id');
      }).to.throw(Error, 'blobId');
    });

    it('should throw an Error if threadId is not defined', function() {
      expect(function() {
        new jmap.Message({}, 'id', 'blobId');
      }).to.throw(Error, 'threadId');
    });

    it('should throw an Error if mailboxIds is not defined', function() {
      expect(function() {
        new jmap.Message({}, 'id', 'blobId', 'threadId');
      }).to.throw(Error, 'mailboxIds');
    });

    it('should throw an Error if mailboxIds is not an array', function() {
      expect(function() {
        new jmap.Message({}, 'id', 'blobId', 'threadId', 'mailboxId');
      }).to.throw(Error, 'mailboxIds');
    });

    it('should throw an Error if mailboxIds is zero-length', function() {
      expect(function() {
        new jmap.Message({}, 'id', 'blobId', 'threadId', []);
      }).to.throw(Error, 'mailboxIds');
    });

    it('should use default values for all other fields if not defined', function() {
      var message = new jmap.Message({}, 'id', 'blobId', 'threadId', ['inbox']);

      expect(message.inReplyToMessageId).to.equal(null);
      expect(message.isUnread).to.equal(false);
      expect(message.isFlagged).to.equal(false);
      expect(message.isAnswered).to.equal(false);
      expect(message.isForwarded).to.equal(false);
      expect(message.isDraft).to.equal(false);
      expect(message.hasAttachment).to.equal(false);
      expect(message.headers).to.deep.equal({});
      expect(message.from).to.deep.equal(jmap.EMailer.unknown());
      expect(message.to).to.deep.equal([]);
      expect(message.cc).to.deep.equal([]);
      expect(message.bcc).to.deep.equal([]);
      expect(message.replyTo).to.deep.equal([]);
      expect(message.subject).to.equal(null);
      expect(message.date).to.equal(null);
      expect(message.size).to.equal(0);
      expect(message.preview).to.equal(null);
      expect(message.textBody).to.equal(null);
      expect(message.htmlBody).to.equal(null);
    });

    it('should use default values for all other fields if an empty opts object is given', function() {
      var message = new jmap.Message({}, 'id', 'blobId', 'threadId', ['inbox'], {});

      expect(message.inReplyToMessageId).to.equal(null);
      expect(message.isUnread).to.equal(false);
      expect(message.isFlagged).to.equal(false);
      expect(message.isAnswered).to.equal(false);
      expect(message.isForwarded).to.equal(false);
      expect(message.isDraft).to.equal(false);
      expect(message.hasAttachment).to.equal(false);
      expect(message.headers).to.deep.equal({});
      expect(message.from).to.deep.equal(jmap.EMailer.unknown());
      expect(message.to).to.deep.equal([]);
      expect(message.cc).to.deep.equal([]);
      expect(message.bcc).to.deep.equal([]);
      expect(message.replyTo).to.deep.equal([]);
      expect(message.subject).to.equal(null);
      expect(message.date).to.equal(null);
      expect(message.size).to.equal(0);
      expect(message.preview).to.equal(null);
      expect(message.textBody).to.equal(null);
      expect(message.htmlBody).to.equal(null);
    });

    it('should allow defining optional properties through the opts object', function() {
      var message = new jmap.Message({}, 'id', 'blobId', 'threadId', ['inbox'], {
        from: [{
          name: '',
          email: 'me@open-paas.org'
        }],
        subject: 'subject'
      });

      expect(message.subject).to.equal('subject');
      expect(message.from).to.deep.equal(new jmap.EMailer({
        name: '',
        email: 'me@open-paas.org'
      }));
    });

    it('should set From to the unknown EMailer when not defined', function() {
      expect(new jmap.Message({}, 'id', 'blobId', 'threadId', ['inbox']).from).to.deep.equal(jmap.EMailer.unknown());
    });

    it('should take the first item of the From option', function() {
      var message = new jmap.Message({}, 'id', 'blobId', 'threadId', ['inbox'], {
        from: [{
          name: '',
          email: 'me@open-paas.org'
        }, {
          name: 'another',
          email: 'another@linagora.com'
        }]
      });

      expect(message.from).to.deep.equal(new jmap.EMailer({
        name: '',
        email: 'me@open-paas.org'
      }));
    });

    it('should support a single EMailer in the From option', function() {
      var message = new jmap.Message({}, 'id', 'blobId', 'threadId', ['inbox'], {
        from: {
          name: 'notanarray',
          email: 'notanarray@open-paas.org'
        }
      });

      expect(message.from).to.deep.equal(new jmap.EMailer({
        name: 'notanarray',
        email: 'notanarray@open-paas.org'
      }));
    });

    it('should create EMailer instances for the To option', function() {
      var message = new jmap.Message({}, 'id', 'blobId', 'threadId', ['inbox'], {
        to: [{
          name: '',
          email: 'me@open-paas.org'
        }, {
          name: 'another',
          email: 'another@linagora.com'
        }]
      });

      expect(message.to).to.deep.equal([
        new jmap.EMailer({ name: '', email: 'me@open-paas.org' }),
        new jmap.EMailer({ name: 'another', email: 'another@linagora.com' })
      ]);
    });

    it('should create EMailer instances for the CC option', function() {
      var message = new jmap.Message({}, 'id', 'blobId', 'threadId', ['inbox'], {
        cc: [{
          name: '',
          email: 'me@open-paas.org'
        }, {
          name: 'another',
          email: 'another@linagora.com'
        }]
      });

      expect(message.cc).to.deep.equal([
        new jmap.EMailer({ name: '', email: 'me@open-paas.org' }),
        new jmap.EMailer({ name: 'another', email: 'another@linagora.com' })
      ]);
    });

    it('should create EMailer instances for the BCC option', function() {
      var message = new jmap.Message({}, 'id', 'blobId', 'threadId', ['inbox'], {
        bcc: [{
          name: '',
          email: 'me@open-paas.org'
        }, {
          name: 'another',
          email: 'another@linagora.com'
        }]
      });

      expect(message.bcc).to.deep.equal([
        new jmap.EMailer({ name: '', email: 'me@open-paas.org' }),
        new jmap.EMailer({ name: 'another', email: 'another@linagora.com' })
      ]);
    });

    it('should parse the message date as a Date object', function() {
      var message = new jmap.Message({}, 'id', 'blobId', 'threadId', ['inbox'], {
        date: '2015-09-23T12:34:56Z'
      });

      expect(message.date).to.equalDate(new Date(Date.UTC(2015, 8, 23, 12, 34, 56)));
    });

    it('should set attachments to an empty array if message has no attachments', function() {
      expect(new jmap.Message({}, 'id', 'blobId', 'threadId', ['inbox'], {}).attachments).to.deep.equal([]);
    });

    it('should set attachments to an array of Attachment objects if message has attachments', function() {
      var client = {
        downloadUrl: 'https://jmap.org/dl/{blobId}'
      };

      expect(new jmap.Message(client, 'id', 'blobId', 'threadId', ['inbox'], {
        attachments: [{
          blobId: '1234'
        }, {
          blobId: '5678'
        }]
      }).attachments).to.deep.equal([
        new jmap.Attachment(client, '1234'),
        new jmap.Attachment(client, '5678')
      ]);
    });

  });

  describe('The fromJSONObject static method', function() {

    it('should throw an Error if object is not defined', function() {
      expect(function() {
        jmap.Message.fromJSONObject({});
      }).to.throw(Error);
    });

    it('should throw an Error if object.id is not defined', function() {
      expect(function() {
        jmap.Message.fromJSONObject({}, {});
      }).to.throw(Error);
    });

    it('should throw an Error if object.threadId is not defined', function() {
      expect(function() {
        jmap.Message.fromJSONObject({}, { id: 'id' });
      }).to.throw(Error);
    });

    it('should throw an Error if object.mailboxIds is not defined', function() {
      expect(function() {
        jmap.Message.fromJSONObject({}, { id: 'id', threadId: 'threadId' });
      }).to.throw(Error);
    });

    it('should throw an Error if object.mailboxIds is not an array', function() {
      expect(function() {
        jmap.Message.fromJSONObject({}, { id: 'id', threadId: 'threadId', mailboxIds: 'mailboxIds' });
      }).to.throw(Error);
    });

    it('should throw an Error if object.mailboxIds is zero-length', function() {
      expect(function() {
        jmap.Message.fromJSONObject({}, { id: 'id', threadId: 'threadId', mailboxIds: [] });
      }).to.throw(Error);
    });

    it('should return an instance of Message', function() {
      expect(jmap.Message.fromJSONObject({}, { id: 'id', blobId: 'blobId', threadId: 'threadId', mailboxIds: ['mailboxId'] })).to.be.an.instanceof(jmap.Message);
    });

    it('should copy values for all other fields if defined', function() {
      var message = jmap.Message.fromJSONObject({}, {
        id: 'fm2u12',
        inReplyToMessageId: 'fm2u11',
        blobId: 'fed75e7fb4f512aa',
        threadId: 'fed75e7fb4f512aa',
        mailboxIds: ['mailbox2'],
        isUnread: true,
        isFlagged: true,
        isAnswered: true,
        isForwarded: true,
        isDraft: true,
        hasAttachment: true,
        headers: {
          To: 'To'
        },
        from: [{ name: 'Jane Doe', email: 'janedoe@open-paas.org' }],
        to: [
          { name: 'James Connor', email: 'jamesconnorwork@open-paas.org' },
          { name: 'Joe Bloggs', email: 'joebloggs@open-paas.org' }
        ],
        replyTo: { name: 'Jane Doe', email: 'janedoe@open-paas.org' },
        subject: 'Re: I need the swallow velocity report ASAP',
        date: '2014-07-24T11:32:15Z',
        size: 100,
        preview: 'It\'s on its way. Jane.',
        textBody: 'It\'s on its way. Jane. Keep on rocking !',
        htmlBody: '<html>It\'s on its way. Jane. <b>Keep on rocking !</b></html>'
      });

      expect(message.id).to.equal('fm2u12');
      expect(message.threadId).to.equal('fed75e7fb4f512aa');
      expect(message.mailboxIds).to.deep.equal(['mailbox2']);
      expect(message.inReplyToMessageId).to.equal('fm2u11');
      expect(message.isUnread).to.equal(true);
      expect(message.isFlagged).to.equal(true);
      expect(message.isAnswered).to.equal(true);
      expect(message.isForwarded).to.equal(true);
      expect(message.isDraft).to.equal(true);
      expect(message.hasAttachment).to.equal(true);
      expect(message.headers).to.deep.equal({ To: 'To' });
      expect(message.from).to.deep.equal(new jmap.EMailer({
        name: 'Jane Doe', email: 'janedoe@open-paas.org'
      }));
      expect(message.to).to.deep.equal([
        new jmap.EMailer({ name: 'James Connor', email: 'jamesconnorwork@open-paas.org' }),
        new jmap.EMailer({ name: 'Joe Bloggs', email: 'joebloggs@open-paas.org' })
      ]);
      expect(message.replyTo).to.deep.equal(new jmap.EMailer({
        name: 'Jane Doe', email: 'janedoe@open-paas.org'
      }));
      expect(message.subject).to.equal('Re: I need the swallow velocity report ASAP');
      expect(message.date).to.equalDate(new Date(Date.UTC(2014, 6, 24, 11, 32, 15)));
      expect(message.size).to.equal(100);
      expect(message.preview).to.equal('It\'s on its way. Jane.');
      expect(message.textBody).to.equal('It\'s on its way. Jane. Keep on rocking !');
      expect(message.htmlBody).to.equal('<html>It\'s on its way. Jane. <b>Keep on rocking !</b></html>');
    });

  });

  describe('The move method', function() {

    it('should delegate to the jmap client, passing the id and the given mailboxIds', function(done) {
      new jmap.Message({
        moveMessage: function(id, mailboxIds) {
          expect(id).to.equal('id');
          expect(mailboxIds).to.deep.equal(['mailbox1', 'mailbox2']);

          done();
        }
      }, 'id', 'blobId', 'threadId', ['inbox']).move(['mailbox1', 'mailbox2']);
    });

  });

  describe('The update method', function() {

    it('should delegate to the jmap client, passing the id and the given options', function(done) {
      new jmap.Message({
        updateMessage: function(id, option) {
          expect(id).to.equal('id');
          expect(option).to.deep.equal({ property: 'property' });

          done();
        }
      }, 'id', 'blobId', 'threadId', ['inbox']).update({ property: 'property' });
    });
  });

  describe('The setIsFlagged method', function() {

    it('should throw an Error if isFlagged is not provided', function() {
      expect(function() {
        new jmap.Message({
          updateMessage: function() {}
        }, 'id', 'threadId', ['inbox']).setIsFlagged();
      }).to.throw(Error);
    });

    it('should throw an Error if isFlagged is not Boolean', function() {
      expect(function() {
        new jmap.Message({
          updateMessage: function() {}
        }, 'id', 'threadId', ['inbox']).setIsFlagged('true');
      }).to.throw(Error);
    });

    it('should delegate to message.update, passing the required option', function(done) {
      var message = new jmap.Message({}, 'id', 'blobId', 'threadId', ['inbox']);

      message.update = function(option) {
        expect(option).to.deep.equal({ isFlagged: true });
        done();
      };
      message.setIsFlagged(true);
    });
  });

  describe('The setIsUnread method', function() {

    it('should throw an Error if isUnread is not provided', function() {
      expect(function() {
        new jmap.Message({
          updateMessage: function() {}
        }, 'id', 'threadId', ['inbox']).setIsUnread();
      }).to.throw(Error);
    });

    it('should throw an Error if isUnread is not Boolean', function() {
      expect(function() {
        new jmap.Message({
          updateMessage: function() {}
        }, 'id', 'threadId', ['inbox']).setIsUnread('true');
      }).to.throw(Error);
    });

    it('should delegate to message.update, passing the required option', function(done) {
      var message = new jmap.Message({}, 'id', 'blobId', 'threadId', ['inbox']);

      message.update = function(option) {
        expect(option).to.deep.equal({ isUnread: true });
        done();
      };
      message.setIsUnread(true);
    });
  });

  describe('The setIsAnswered method', function() {

    it('should throw an Error if isAnswered is not provided', function() {
      expect(function() {
        new jmap.Message({
          updateMessage: function() {}
        }, 'id', 'threadId', ['inbox']).setIsAnswered();
      }).to.throw(Error);
    });

    it('should throw an Error if isAnswered is not Boolean', function() {
      expect(function() {
        new jmap.Message({
          updateMessage: function() {}
        }, 'id', 'threadId', ['inbox']).setIsAnswered('true');
      }).to.throw(Error);
    });

    it('should delegate to message.update, passing the required option', function(done) {
      var message = new jmap.Message({}, 'id', 'blobId', 'threadId', ['inbox']);

      message.update = function(option) {
        expect(option).to.deep.equal({ isAnswered: true });
        done();
      };
      message.setIsAnswered(true);
    });
  });

  describe('The destroy method', function() {

    it('should delegate to the jmap client, passing the id as arg', function(done) {
      new jmap.Message({
        destroyMessage: function(id) {
          expect(id).to.equal('id');

          done();
        }
      }, 'id', 'blobId', 'threadId', ['inbox']).destroy();
    });

  });

  describe('The moveToMailboxWithRole method', function() {

    it('should support a MailboxRole argument', function(done) {
      new jmap.Message({
        getMailboxWithRole: function() {
          return q.reject();
        }
      }, 'id', 'blobId', 'threadId', ['inbox']).moveToMailboxWithRole(jmap.MailboxRole.TRASH).then(null, done);
    });

    it('should support a String argument, when it maps to a JMAP role', function(done) {
      new jmap.Message({
        getMailboxWithRole: function() {
          return q.reject();
        }
      }, 'id', 'blobId', 'threadId', ['inbox']).moveToMailboxWithRole('inbox').then(null, done);
    });

    it('should throw an Error if the role is UNKNOWN', function() {
      expect(function() {
        new jmap.Message(new jmap.Client({}), 'id', 'blobId', 'threadId', ['inbox']).moveToMailboxWithRole(jmap.MailboxRole.UNKNOWN);
      }).to.throw(Error);
    });

    it('should throw an Error if the role is an unknown String', function() {
      expect(function() {
        new jmap.Message(new jmap.Client({}), 'id', 'blobId', 'threadId', ['inbox']).moveToMailboxWithRole('test');
      }).to.throw(Error);
    });

    it('should delegate to move if the mailbox exists, passing its id', function(done) {
      new jmap.Message({
        getMailboxWithRole: function() {
          return q({ id: 'mailboxId' });
        },
        moveMessage: function(id, mailboxIds) {
          expect(mailboxIds).to.deep.equal(['mailboxId']);

          done();
        }
      }, 'id', 'blobId', 'threadId', ['inbox']).moveToMailboxWithRole('inbox');
    });

    it('should reject the promise if the mailbox does not exist', function(done) {
      new jmap.Message({
        getMailboxWithRole: function() {
          return q.reject('Does not exist !');
        }
      }, 'id', 'blobId', 'threadId', ['inbox'])
        .moveToMailboxWithRole('inbox')
        .then(null, function() {
          done();
        });
    });

  });

});
