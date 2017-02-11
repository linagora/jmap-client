'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The JSONBuilder class', function() {

  describe('The append method', function() {

    it('should throw an Error if the name is undefined', function() {
      expect(function() {
        new jmap.JSONBuilder().append(undefined, { val: 'yolo' });
      }).to.throw(Error);
    });

    it('should throw an Error if the value is undefined', function() {
      expect(function() {
        new jmap.JSONBuilder().append('name', undefined);
      }).to.throw(Error);
    });

    it('should append object value', function() {
      expect(new jmap.JSONBuilder().append('name', { val: 'yolo' }).build())
        .to.deep.equal({ name: { val: 'yolo' } });
    });

    it('should append number value', function() {
      expect(new jmap.JSONBuilder().append('name', 5).build())
        .to.deep.equal({ name: 5 });
    });

    it('should append string value', function() {
      expect(new jmap.JSONBuilder().append('name', 'yolo').build())
        .to.deep.equal({ name: 'yolo' });
    });

    it('should append false value', function() {
      expect(new jmap.JSONBuilder().append('name', false).build())
        .to.deep.equal({ name: false });
    });

  });

  describe('The appendIfDefined method', function() {

    it('should throw an Error if the name is undefined', function() {
      expect(function() {
        new jmap.JSONBuilder().appendIfDefined(undefined, { val: 'yolo' });
      }).to.throw(Error);
    });

    it('should append nothing if the value is undefined', function() {
      expect(new jmap.JSONBuilder().appendIfDefined('name', undefined).build())
        .to.deep.equal({});
    });

    it('should append if the value is defined', function() {
      expect(new jmap.JSONBuilder().appendIfDefined('name', 'yolo').build())
        .to.deep.equal({ name: 'yolo' });
    });

    it('should append if the value is zero', function() {
      expect(new jmap.JSONBuilder().appendIfDefined('name', 0).build())
        .to.deep.equal({ name: 0 });
    });

    it('should append if the value is empty string', function() {
      expect(new jmap.JSONBuilder().appendIfDefined('name', '').build())
        .to.deep.equal({ name: '' });
    });

  });

  describe('The appendIfNotEmpty method', function() {

    function TestType() {
      this.value = 'yo';
    }

    TestType.prototype.toJSONObject = function() {
      return 'lo';
    };

    it('should throw an Error if the name is undefined', function() {
      expect(function() {
        new jmap.JSONBuilder().appendIfNotEmpty(undefined, [1, 2]);
      }).to.throw(Error);
    });

    it('should throw an Error if the value is not an array', function() {
      expect(function() {
        new jmap.JSONBuilder().appendIfNotEmpty(undefined, {});
      }).to.throw(Error);
    });

    it('should append nothing if the value is undefined', function() {
      expect(new jmap.JSONBuilder().appendIfNotEmpty('name', undefined).build())
        .to.deep.equal({});
    });

    it('should append nothing if the value is empty', function() {
      expect(new jmap.JSONBuilder().appendIfNotEmpty('name', []).build())
        .to.deep.equal({});
    });

    it('should append if the value is not empty', function() {
      expect(new jmap.JSONBuilder().appendIfNotEmpty('name', [1, 'bla']).build())
        .to.deep.equal({ name: [1, 'bla'] });
    });

    it('should append with transformation if the value is an object with toJSONObject method', function() {
      expect(new jmap.JSONBuilder().appendIfNotEmpty('name', [new TestType()]).build())
        .to.deep.equal({ name: ['lo'] });
    });

    it('should transform only if the value is an object with toJSONObject method', function() {
      expect(new jmap.JSONBuilder().appendIfNotEmpty('name', [1, new TestType(), 'bla']).build())
        .to.deep.equal({ name: [1, 'lo', 'bla'] });
    });
  });

  describe('The appendDateIfDefined method', function() {

    var date = new Date(Date.UTC(2016, 5, 10, 17, 0, 0, 0));

    it('should throw an Error if the name is undefined', function() {
      expect(function() {
        new jmap.JSONBuilder().appendDateIfDefined(undefined, new Date());
      }).to.throw(Error);
    });

    it('should throw an Error if date is not a Date', function() {
      expect(function() {
        new jmap.JSONBuilder().appendDateIfDefined(undefined, {});
      }).to.throw(Error);
    });

    it('should append nothing if the date is undefined', function() {
      expect(new jmap.JSONBuilder().appendDateIfDefined('date').build()).to.deep.equal({});
    });

    it('should append an ISO Date String if the value is a Date', function() {
      expect(new jmap.JSONBuilder().appendDateIfDefined('date', date).build()).to.deep.equal({ date: '2016-06-10T17:00:00Z' });
    });

  });

});
