'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The MailboxRole class', function() {

  describe('The fromRole method', function() {

    it('should return MailboxRole.UNKNOWN when the role is not defined', function() {
      expect(jmap.MailboxRole.fromRole()).to.equal(jmap.MailboxRole.UNKNOWN);
    });

    it('should return MailboxRole.UNKNOWN when the role is null', function() {
      expect(jmap.MailboxRole.fromRole(null)).to.equal(jmap.MailboxRole.UNKNOWN);
    });

    it('should return MailboxRole.UNKNOWN when the role is the empty String', function() {
      expect(jmap.MailboxRole.fromRole('')).to.equal(jmap.MailboxRole.UNKNOWN);
    });

    it('should return MailboxRole.UNKNOWN when the role is not found', function() {
      expect(jmap.MailboxRole.fromRole('test')).to.equal(jmap.MailboxRole.UNKNOWN);
    });

    it('should return the correct MailboxRole for all predefined JMAP roles', function() {
      ['inbox', 'archive', 'drafts', 'outbox', 'sent', 'trash', 'spam', 'templates'].forEach(function(role) {
        expect(jmap.MailboxRole.fromRole(role)).to.equal(jmap.MailboxRole[role.toUpperCase()]);
      });
    });

  });

  it('should contain class constants for predefined JMAP roles', function() {
    ['inbox', 'archive', 'drafts', 'outbox', 'sent', 'trash', 'spam', 'templates'].forEach(function(role) {
      expect(jmap.MailboxRole[role.toUpperCase()].value).to.equal(role);
    });
  });

  it('should expose the UNKNOWN role', function() {
    expect(jmap.MailboxRole.UNKNOWN.value).to.equal(null);
  });

});
