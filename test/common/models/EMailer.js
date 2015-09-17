'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The EMailer class', function() {

  describe('The constructor', function() {

    it('should use default value for name and email if not defined', function() {
      var emailer = new jmap.EMailer();

      expect(emailer.name).to.equal('');
      expect(emailer.email).to.equal('@');
    });

    it('should use default value for name and email if an empty opts object is given', function() {
      var emailer = new jmap.EMailer({});

      expect(emailer.name).to.equal('');
      expect(emailer.email).to.equal('@');
    });

    it('should allow defining name and email through the opts object', function() {
      var emailer = new jmap.EMailer({
        name: 'emailer',
        email: 'email@domain'
      });

      expect(emailer.name).to.equal('emailer');
      expect(emailer.email).to.equal('email@domain');
    });

  });

  describe('The unknown static method', function() {

    it('should return an EMailer object', function() {
      expect(jmap.EMailer.unknown()).to.be.an.instanceof(jmap.EMailer);
    });

    it('should return an EMailer object with all properties set to default values', function() {
      expect(jmap.EMailer.unknown()).to.deep.equal(new jmap.EMailer());
    });

  });

});
