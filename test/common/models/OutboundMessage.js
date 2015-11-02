'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The OutboundMessage class', function() {

  describe('The constructor', function() {

    function expectDefaultValues(message) {
      expect(message.mailboxIds).to.deep.equal([]);
      expect(message.inReplyToMessageId).to.not.exist;
      expect(message.isUnread).to.not.exist;
      expect(message.isFlagged).to.not.exist;
      expect(message.isAnswered).to.not.exist;
      expect(message.isDraft).to.not.exist;
      expect(message.headers).to.not.exist;
      expect(message.from).to.not.exist;
      expect(message.to).to.not.exist;
      expect(message.cc).to.not.exist;
      expect(message.bcc).to.not.exist;
      expect(message.replyTo).to.not.exist;
      expect(message.subject).to.not.exist;
      expect(message.textBody).to.not.exist;
      expect(message.htmlBody).to.not.exist;
      expect(message.attachments).to.deep.equal([]);
    }

    it('should use default values for fields if opts is not defined', function() {
      var message = new jmap.OutboundMessage({});
      expectDefaultValues(message);
    });

    it('should use default values for fields if opts is empty', function() {
      var message = new jmap.OutboundMessage({}, {});
      expectDefaultValues(message);
    });

    it('should allow defining optional properties through the opts object', function() {
      var message = new jmap.OutboundMessage({}, {
        mailboxIds: ['1', '5'],
        inReplyToMessageId: 'inReplyToMessageId',
        isUnread: true,
        isFlagged: true,
        isAnswered: true,
        isDraft: false,
        headers: {custom: 'header'},
        from: 'from@open-paas.org',
        to: 'to@open-paas.org',
        cc: 'cc@open-paas.org',
        bcc: 'bcc@open-paas.org',
        replyTo: 'replyTo',
        subject: 'subject',
        textBody: 'textBody',
        htmlBody: 'htmlBody',
        attachments: [{blobId: 'att'}]
      });

      expect(message.mailboxIds).to.deep.equal(['1', '5']);
      expect(message.inReplyToMessageId).to.equal('inReplyToMessageId');
      expect(message.isUnread).to.equal(true);
      expect(message.isFlagged).to.equal(true);
      expect(message.isAnswered).to.equal(true);
      expect(message.isDraft).to.equal(false);
      expect(message.headers).to.deep.equal({custom: 'header'});
      expect(message.from).to.equal('from@open-paas.org');
      expect(message.to).to.equal('to@open-paas.org');
      expect(message.cc).to.equal('cc@open-paas.org');
      expect(message.bcc).to.equal('bcc@open-paas.org');
      expect(message.replyTo).equal('replyTo');
      expect(message.subject).to.equal('subject');
      expect(message.textBody).to.equal('textBody');
      expect(message.htmlBody).to.equal('htmlBody');
      expect(message.attachments).to.deep.equal([new jmap.Attachment({}, 'att')]);
    });

  });

  describe('The toJSONObject', function() {

    it('should produce empty object when no opts', function() {
      expect(new jmap.OutboundMessage({}, {}).toJSONObject()).to.deep.equal({});
    });

    it('should produce partial json when only few opts', function() {
      var opts = {
        subject: 'subject',
        htmlBody: 'htmlBody'
      };

      expect(new jmap.OutboundMessage({}, opts).toJSONObject()).to.deep.equal(opts);
    });

    it('should produce full json when full opts', function() {
      var opts = {
        mailboxIds: ['1', '5'],
        inReplyToMessageId: 'inReplyToMessageId',
        isUnread: true,
        isFlagged: true,
        isAnswered: true,
        isDraft: true,
        headers: {custom: 'header'},
        from: 'from@open-paas.org',
        to: 'to@open-paas.org',
        cc: 'cc@open-paas.org',
        bcc: 'bcc@open-paas.org',
        replyTo: 'replyTo',
        subject: 'subject',
        textBody: 'textBody',
        htmlBody: 'htmlBody',
        attachments: [{blobId: 'att', isInline: true}]
      };

      expect(new jmap.OutboundMessage({}, opts).toJSONObject()).to.deep.equal(opts);
    });

  });

});
