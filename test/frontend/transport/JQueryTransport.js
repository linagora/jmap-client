'use strict';

/* global chai: false, jmap: false, jQuery: false */

var expect = chai.expect;

function newTransport() {
  return new jmap.JQueryTransport(new jmap.QPromiseProvider());
}

describe('The JQueryTransport class', function() {

  before(function() {
    jQuery.mockjaxSettings.logging = false;
  });

  afterEach(function() {
    jQuery.mockjax.clear();
  });

  describe('The post method', function() {

    it('should reject the promise when an error occurs', function(done) {
      jQuery.mockjax({
        url: 'http://test',
        isTimeout: true
      });

      newTransport()
        .post('http://test')
        .then(null, function() {
          done();
        });
    });

    it('should reject the promise when request fails with an error status code', function(done) {
      jQuery.mockjax({
        url: 'http://test',
        status: 400
      });

      newTransport()
        .post('http://test')
        .then(null, function() {
          done();
        });
    });

    it('should resolve the promise when request succeeds', function(done) {
      jQuery.mockjax({
        url: 'http://test',
        status: 200,
        responseText: '[]'
      });

      newTransport()
        .post('http://test')
        .then(function() {
          done();
        });
    });

    it('should serialize data to JSON, build a correct options object, and pass it to jQuery', function(done) {
      jQuery.mockjax({
        url: 'http://test',
        response: function(options) {
          expect(options).to.deep.equal({
            method: 'POST',
            url: 'http://test',
            headers: {
              Authorization: 'SuperSecretToken'
            },
            data: '{"a":"b","c":0}',
            dataType: 'json',
            jsonp: false,
            processData: false
          });

          this.responseText = '[]';
        }
      });

      newTransport()
        .post('http://test', {
          Authorization: 'SuperSecretToken'
        }, {
          a: 'b',
          c: 0
        })
        .then(function() {
          done();
        });
    });

  });

});
