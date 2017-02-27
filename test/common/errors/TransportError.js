'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The TransportError class', function() {

  it('should be an Error', function() {
    expect(new jmap.TransportError()).to.be.a.instanceof(Error);
  });

  it('should default cause, statusCode and responseText', function() {
    var error = new jmap.TransportError();

    expect(error.cause).to.equal(null);
    expect(error.statusCode).to.equal(0);
    expect(error.responseText).to.equal(null);
  });

  it('should expose cause, statusCode and responseText as members', function() {
    var error = new jmap.TransportError('a', 1, 'b');

    expect(error.cause).to.equal('a');
    expect(error.statusCode).to.equal(1);
    expect(error.responseText).to.equal('b');
  });

});
