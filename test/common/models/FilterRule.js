'use strict';

var expect = require('chai').expect,
  jmap = require('../../../dist/jmap-client'),
  sinon = require('sinon');

describe('The FilterRule class', function () {
  context('class logic', function () {
    describe('the constructor', function () {
      it('should initialise an id', function () {
        var target = new jmap.FilterRule(null, '');

        expect(target.id).to.exist;
      });
    });

    describe('toJSONObject', function () {
      it('should assert condition is defined', function () {
        var target = new jmap.FilterRule(null, '').then.moveTo.mailboxId('').filterRule;

        expect(function () {
          target.toJSONObject();
        }).to.throw('Filter must have a condition. Use \'when\'.');
      });

      it('should assert action is defined', function () {
        var target = new jmap.FilterRule(null, '')
          .when.from.value('').comparator(jmap.FilterRule.Comparator.EXACTLY_EQUALS).filterRule;

        expect(function () {
          target.toJSONObject();
        }).to.throw('Filter must have an action. Use \'then\'.');
      });

      it('should validate condition', function () {
        var target = new jmap.FilterRule(null, '').then.moveTo.mailboxId('')
          .when.from.value('').comparator(jmap.FilterRule.Comparator.EXACTLY_EQUALS).filterRule;

        sinon.spy(target.filterCondition, '_validate');

        target.toJSONObject();

        expect(target.filterCondition._validate).to.have.been.called;
      });

      it('should validate action', function () {
        var target = new jmap.FilterRule(null, '').then.moveTo.mailboxId('')
          .when.from.value('').comparator(jmap.FilterRule.Comparator.EXACTLY_EQUALS).filterRule;

        sinon.spy(target.filterAction, '_validate');

        target.toJSONObject();

        expect(target.filterAction._validate).to.have.been.called;
      });

      it('should generate a JSON object', function () {
        var target = new jmap.FilterRule(null, 'My rule').then.moveTo.mailboxId('')
          .when.from.value('').comparator(jmap.FilterRule.Comparator.EXACTLY_EQUALS).filterRule;

        target.id = 'id';

        sinon.stub(target.filterCondition, '_toJSONObject').returns({ filterCondition: '_toJSONObject' });
        sinon.stub(target.filterAction, '_toJSONObject').returns({ filterAction: '_toJSONObject' });

        expect(target.toJSONObject()).to.eql({
          id: 'id',
          name: 'My rule',
          condition: { filterCondition: '_toJSONObject' },
          action: { filterAction: '_toJSONObject' }
        });
      });
    });
  });

  context('builder grammar', function () {
    context('conditions', function () {
      var target;

      beforeEach(function () {
        target = new jmap.FilterRule(null, 'My rule');
        target.id = 'e71a07e5-1985-4c8e-9979-8c8671d8e76f';
        target.filterAction = {
          _toJSONObject: function () {
            return { filterAction: '_toJSONObject' };
          },
          _validate: function () {
          }
        };
      });

      describe('from', function () {
        it('should build the JSON object', function () {
          target.when.from.value('admin@open-paas.org').comparator(jmap.FilterRule.Comparator.EXACTLY_EQUALS);

          expect(target.toJSONObject()).to.eql({
            id: 'e71a07e5-1985-4c8e-9979-8c8671d8e76f',
            name: 'My rule',
            condition: {
              field: 'from',
              comparator: jmap.FilterRule.Comparator.EXACTLY_EQUALS,
              value: 'admin@open-paas.org',
            },
            action: { filterAction: '_toJSONObject' }
          });
        });
      });

      describe('to', function () {
        it('should build the JSON object', function () {
          target.when.to.value('admin@open-paas.org').comparator(jmap.FilterRule.Comparator.EXACTLY_EQUALS);

          expect(target.toJSONObject()).to.eql({
            id: 'e71a07e5-1985-4c8e-9979-8c8671d8e76f',
            name: 'My rule',
            condition: {
              field: 'to',
              comparator: jmap.FilterRule.Comparator.EXACTLY_EQUALS,
              value: 'admin@open-paas.org',
            },
            action: { filterAction: '_toJSONObject' }
          });
        });
      });

      describe('cc', function () {
        it('should build the JSON object', function () {
          target.when.cc.value('admin@open-paas.org').comparator(jmap.FilterRule.Comparator.EXACTLY_EQUALS);

          expect(target.toJSONObject()).to.eql({
            id: 'e71a07e5-1985-4c8e-9979-8c8671d8e76f',
            name: 'My rule',
            condition: {
              field: 'cc',
              comparator: jmap.FilterRule.Comparator.EXACTLY_EQUALS,
              value: 'admin@open-paas.org',
            },
            action: { filterAction: '_toJSONObject' }
          });
        });
      });

      describe('recipient', function () {
        it('should build the JSON object', function () {
          target.when.recipient.value('admin@open-paas.org').comparator(jmap.FilterRule.Comparator.EXACTLY_EQUALS);

          expect(target.toJSONObject()).to.eql({
            id: 'e71a07e5-1985-4c8e-9979-8c8671d8e76f',
            name: 'My rule',
            condition: {
              field: 'recipient',
              comparator: jmap.FilterRule.Comparator.EXACTLY_EQUALS,
              value: 'admin@open-paas.org',
            },
            action: { filterAction: '_toJSONObject' }
          });
        });
      });

      describe('subject', function () {
        it('should build the JSON object', function () {
          target.when.subject.value('email subject').comparator(jmap.FilterRule.Comparator.EXACTLY_EQUALS);

          expect(target.toJSONObject()).to.eql({
            id: 'e71a07e5-1985-4c8e-9979-8c8671d8e76f',
            name: 'My rule',
            condition: {
              field: 'subject',
              comparator: jmap.FilterRule.Comparator.EXACTLY_EQUALS,
              value: 'email subject',
            },
            action: { filterAction: '_toJSONObject' }
          });
        });
      });
    });

    context('actions', function () {
      var target;

      beforeEach(function () {
        target = new jmap.FilterRule(null, 'My rule');
        target.id = 'e71a07e5-1985-4c8e-9979-8c8671d8e76f';
        target.filterCondition = {
          _toJSONObject: function () {
            return { filterCondition: '_toJSONObject' };
          },
          _validate: function () {
          }
        };
      });

      describe('moveTo', function () {
        it('should build the JSON object', function () {
          target.then.moveTo.mailboxId('ac5be9b9-babe-43b8-be69-97425482f30e');

          expect(target.toJSONObject()).to.eql({
            id: 'e71a07e5-1985-4c8e-9979-8c8671d8e76f',
            name: 'My rule',
            condition: { filterCondition: '_toJSONObject' },
            action: {
              appendIn: {
                mailboxIds: ['ac5be9b9-babe-43b8-be69-97425482f30e']
              }
            }
          });
        });
      });
    });
  });
});
