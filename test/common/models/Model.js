'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client').jmap;

describe('The Model class', function() {

  describe('The constructor', function() {

    it('should store the Client instance as _jmap', function() {
      var client = { client: 'jmap' };

      expect(new jmap.Model(client)._jmap).to.deep.equal(client);
    });

  });

});
