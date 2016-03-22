'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The Capabilities class', function() {

  describe('The constructor', function() {

    it('should use default values if opts is not defined', function() {
      expect(new jmap.Capabilities().isReadOnly).to.equal(false);
    });

    it('should use default values if an empty opts object is given', function() {
      expect(new jmap.Capabilities({}).isReadOnly).to.equal(false);
    });

    it('should allow defining values through the opts object', function() {
      expect(new jmap.Capabilities({ isReadOnly: true }).isReadOnly).to.equal(true);
    });

  });

});
