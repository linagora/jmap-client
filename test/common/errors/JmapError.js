'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The JmapError class', function() {

  it('should require payload', function() {
    expect(function() {
      new jmap.JmapError();
    }).to.throw(Error);
  });

  it('should require payload.type', function() {
    expect(function() {
      new jmap.JmapError({});
    }).to.throw(Error);
  });

  it('should be an Error', function() {
    expect(new jmap.JmapError({ type: 'invalidArguments' })).to.be.a.instanceof(Error);
  });

  it('should expose type, description, method and payload as members', function() {
    var error = new jmap.JmapError({ type: 'invalidArguments', description: 'The `date` parameter is not supported' }, 'setMessages');

    expect(error.payload).to.deep.equal({
      type: 'invalidArguments',
      description: 'The `date` parameter is not supported'
    });
    expect(error.type).to.equal('invalidArguments');
    expect(error.description).to.equal('The `date` parameter is not supported');
    expect(error.method).to.equal('setMessages');
  });

  it('should default to null for description and method', function() {
    var error = new jmap.JmapError({ type: 'invalidArguments' });

    expect(error.description).to.equal(null);
    expect(error.method).to.equal(null);
  });

});
