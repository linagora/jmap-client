'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The MailCapabilities class', function() {

  var defaultMailCapabilities = {
    isReadOnly: false,
    maxSizeMessageAttachments: 0,
    canDelaySend: false,
    messageListSortOptions: []
  };

  describe('The constructor', function() {

    it('should use default values if opts is not defined', function() {
      expect(new jmap.MailCapabilities()).to.deep.equal(defaultMailCapabilities);
    });

    it('should use default values if an empty opts object is given', function() {
      expect(new jmap.MailCapabilities({})).to.deep.equal(defaultMailCapabilities);
    });

    it('should allow defining values through the opts object', function() {
      var capabilities = new jmap.MailCapabilities({
        isReadOnly: true,
        maxSizeMessageAttachments: 1234,
        canDelaySend: true,
        messageListSortOptions: ['date', 'id']
      });

      expect(capabilities.isReadOnly).to.equal(true);
      expect(capabilities.maxSizeMessageAttachments).to.equal(1234);
      expect(capabilities.canDelaySend).to.equal(true);
      expect(capabilities.messageListSortOptions).to.deep.equal(['date', 'id']);
    });

  });

});
