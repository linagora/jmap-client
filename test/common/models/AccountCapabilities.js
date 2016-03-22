'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The AccountCapabilities class', function() {

  describe('The constructor', function() {

    it('should use default values if opts is not defined', function() {
      expect(new jmap.AccountCapabilities().maxSizeUpload).to.equal(0);
    });

    it('should use default values if an empty opts object is given', function() {
      expect(new jmap.AccountCapabilities({}).maxSizeUpload).to.equal(0);
    });

    it('should allow defining values through the opts object', function() {
      expect(new jmap.AccountCapabilities({ maxSizeUpload: 1234 }).maxSizeUpload).to.equal(1234);
    });

  });

});
