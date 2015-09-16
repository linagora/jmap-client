'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client').jmap;

require('chai').use(require('chai-datetime'));

describe('The Message class', function() {

  describe('The constructor', function() {

    it('should throw an Error if id is not defined', function() {
      expect(function() {
        new jmap.Message({});
      }).to.throw(Error);
    });

    it('should throw an Error if threadId is not defined', function() {
      expect(function() {
        new jmap.Message({}, 'id');
      }).to.throw(Error);
    });

    it('should throw an Error if mailboxIds is not defined', function() {
      expect(function() {
        new jmap.Message({}, 'id', 'threadId');
      }).to.throw(Error);
    });

    it('should throw an Error if mailboxIds is not an array', function() {
      expect(function() {
        new jmap.Message({}, 'id', 'threadId', 'mailboxId');
      }).to.throw(Error);
    });

    it('should throw an Error if mailboxIds is zero-length', function() {
      expect(function() {
        new jmap.Message({}, 'id', 'threadId', []);
      }).to.throw(Error);
    });

    it('should use default values for all other fields if not defined', function() {
      var message = new jmap.Message({}, 'id', 'threadId', ['inbox']);

      expect(message.inReplyToMessageId).to.equal(null);
      expect(message.isUnread).to.equal(false);
      expect(message.isFlagged).to.equal(false);
      expect(message.isAnswered).to.equal(false);
      expect(message.isDraft).to.equal(false);
      expect(message.hasAttachment).to.equal(false);
      expect(message.headers).to.deep.equal({});
      expect(message.from).to.deep.equal(jmap.EMailer.unknown());
      expect(message.to).to.deep.equal([jmap.EMailer.unknown()]);
      expect(message.cc).to.deep.equal([jmap.EMailer.unknown()]);
      expect(message.bcc).to.deep.equal([jmap.EMailer.unknown()]);
      expect(message.replyTo).to.deep.equal(jmap.EMailer.unknown());
      expect(message.subject).to.equal(null);
      expect(message.date).to.equal(null);
      expect(message.size).to.equal(0);
      expect(message.preview).to.equal(null);
      expect(message.textBody).to.equal(null);
      expect(message.htmlBody).to.equal(null);
    });

    it('should use default values for all other fields if an empty opts object is given', function() {
      var message = new jmap.Message({}, 'id', 'threadId', ['inbox'], {});

      expect(message.inReplyToMessageId).to.equal(null);
      expect(message.isUnread).to.equal(false);
      expect(message.isFlagged).to.equal(false);
      expect(message.isAnswered).to.equal(false);
      expect(message.isDraft).to.equal(false);
      expect(message.hasAttachment).to.equal(false);
      expect(message.headers).to.deep.equal({});
      expect(message.from).to.deep.equal(jmap.EMailer.unknown());
      expect(message.to).to.deep.equal([jmap.EMailer.unknown()]);
      expect(message.cc).to.deep.equal([jmap.EMailer.unknown()]);
      expect(message.bcc).to.deep.equal([jmap.EMailer.unknown()]);
      expect(message.replyTo).to.deep.equal(jmap.EMailer.unknown());
      expect(message.subject).to.equal(null);
      expect(message.date).to.equal(null);
      expect(message.size).to.equal(0);
      expect(message.preview).to.equal(null);
      expect(message.textBody).to.equal(null);
      expect(message.htmlBody).to.equal(null);
    });

    it('should allow defining optional properties through the opts object', function() {
      var message = new jmap.Message({}, 'id', 'threadId', ['inbox'], {
        from: {
          name: '',
          email: 'me@open-paas.org'
        },
        subject: 'subject'
      });

      expect(message.subject).to.equal('subject');
      expect(message.from).to.deep.equal(new jmap.EMailer({
        name: '',
        email: 'me@open-paas.org'
      }));
    });

    it('should parse the message date as a Date object', function() {
      var message = new jmap.Message({}, 'id', 'threadId', ['inbox'], {
        date: '2015-09-23T12:34:56Z'
      });

      expect(message.date).to.equalDate(new Date(Date.UTC(2015, 8, 23, 12, 34, 56)));
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
      expect(jmap.Message.fromJSONObject({}, { id: 'id', threadId: 'threadId', mailboxIds: ['mailboxId'] })).to.be.an.instanceof(jmap.Message);
    });

    it('should copy values for all other fields if defined', function() {
      var message = jmap.Message.fromJSONObject({}, {
        id: 'fm2u12',
        inReplyToMessageId: 'fm2u11',
        threadId: 'fed75e7fb4f512aa',
        mailboxIds: ['mailbox2'],
        isUnread: true,
        isFlagged: true,
        isAnswered: true,
        isDraft: true,
        hasAttachment: true,
        headers: {
          To: 'To'
        },
        from: { name: 'Jane Doe', email: 'janedoe@open-paas.org' },
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

});
