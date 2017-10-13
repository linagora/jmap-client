'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The Capabilities class', function() {

  describe('The constructor', function() {
    var namespace = 'com.linagora.jmap.ext1';

    it('should throw an Error if namespace parameter is not defined', function() {
      expect(function() {
        new jmap.Capabilities();
      }).to.throw(Error);
    });

    it('should store namespace parameter', function() {
      expect(new jmap.Capabilities(namespace).ns).to.equal(namespace);
    });

    it('should allow defining values through the opts object', function() {
      expect(new jmap.Capabilities(namespace, { isReadOnly: true }).isReadOnly).to.equal(true);
    });

  });

});
