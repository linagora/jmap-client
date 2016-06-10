'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

require('chai').use(require('chai-shallow-deep-equal'));

describe('The VacationResponse class', function() {

  var defaultVacation = {
    id: jmap.VacationResponse.ID,
    isEnabled: false,
    fromDate: null,
    toDate: null,
    subject: null,
    textBody: null,
    htmlBody: null
  };

  describe('The constructor', function() {

    it('should use default value for all fields if not defined', function() {
      expect(new jmap.VacationResponse({})).to.shallowDeepEqual(defaultVacation);
    });

    it('should use default value for all other fields if an empty opts object is given', function() {
      expect(new jmap.VacationResponse({}, {})).to.shallowDeepEqual(defaultVacation);
    });

    it('should allow defining other fields through the opts object', function() {
      var vacation = new jmap.VacationResponse({}, {
        isEnabled: true,
        fromDate: '2016-06-10T17:00:00Z',
        toDate: '2016-06-20T17:00:00Z',
        subject: 'Out Of Office',
        textBody: 'Text',
        htmlBody: '<p>HTML</p>'
      });

      expect(vacation).to.shallowDeepEqual({
        isEnabled: true,
        fromDate: new Date(Date.UTC(2016, 5, 10, 17, 0, 0, 0)),
        toDate: new Date(Date.UTC(2016, 5, 20, 17, 0, 0, 0)),
        subject: 'Out Of Office',
        textBody: 'Text',
        htmlBody: '<p>HTML</p>'
      });
    });

  });

  describe('The fromJSONObject static method', function() {

    it('should return an instance of VacationResponse', function() {
      expect(jmap.VacationResponse.fromJSONObject({}, {})).to.be.an.instanceof(jmap.VacationResponse);
    });

    it('should use default values for for all other fields if not defined', function() {
      expect(jmap.VacationResponse.fromJSONObject({}, {})).to.shallowDeepEqual(defaultVacation);
    });

    it('should copy values for all other fields if defined', function() {
      var vacation = jmap.VacationResponse.fromJSONObject({}, {
        isEnabled: true,
        fromDate: '2016-06-10T17:00:00Z',
        toDate: '2016-06-20T17:00:00Z',
        subject: 'Out Of Office',
        textBody: 'Text',
        htmlBody: '<p>HTML</p>'
      });

      expect(vacation).to.shallowDeepEqual({
        isEnabled: true,
        fromDate: new Date(Date.UTC(2016, 5, 10, 17, 0, 0, 0)),
        toDate: new Date(Date.UTC(2016, 5, 20, 17, 0, 0, 0)),
        subject: 'Out Of Office',
        textBody: 'Text',
        htmlBody: '<p>HTML</p>'
      });
    });

  });

  describe('The toJSONObject', function() {

    it('should produce minimal object when no opts', function() {
      expect(new jmap.VacationResponse({}).toJSONObject()).to.deep.equal({
        id: jmap.VacationResponse.ID,
        isEnabled: false
      });
    });

    it('should produce partial json when only few opts', function() {
      expect(new jmap.VacationResponse({}, {
        isEnabled: true,
        textBody: 'Text'
      }).toJSONObject()).to.deep.equal({
        id: jmap.VacationResponse.ID,
        isEnabled: true,
        textBody: 'Text'
      });
    });

    it('should produce full json when full opts', function() {
      var vacation = new jmap.VacationResponse({}, {
        isEnabled: true,
        fromDate: new Date(Date.UTC(2016, 5, 10, 17, 0, 0, 0)),
        toDate: new Date(Date.UTC(2016, 5, 20, 17, 0, 0, 0)),
        subject: 'Out Of Office',
        textBody: 'Text',
        htmlBody: '<p>HTML</p>'
      });

      expect(vacation.toJSONObject()).to.deep.equal({
        id: jmap.VacationResponse.ID,
        isEnabled: true,
        fromDate: '2016-06-10T17:00:00Z',
        toDate: '2016-06-20T17:00:00Z',
        subject: 'Out Of Office',
        textBody: 'Text',
        htmlBody: '<p>HTML</p>'
      });
    });

  });

});
