'use strict';

var expect = require('chai').expect,
    jmap = require('../../dist/jmap-client').jmap,
    q = require('q');

describe('The Client class', function() {

  describe('The constructor', function() {

    it('should throw an Error if transport is not defined', function() {
      expect(function() {
        new jmap.Client();
      }).to.throw(Error);
    });

    it('should set transport.promiseProvider to the given promise provider', function() {
      var promiseProvider = { promise: 'provider' },
          client = new jmap.Client({}, promiseProvider);

      expect(client.transport.promiseProvider).to.deep.equal(promiseProvider);
    });

    it('should set transport.promiseProvider to an instance of ES6PromiseProvider by default', function() {
      var client = new jmap.Client({});

      expect(client.transport.promiseProvider).to.be.an.instanceof(jmap.ES6PromiseProvider);
    });

  });

  describe('The withAuthenticationToken method', function() {

    it('should store the token as authToken', function() {
      expect(new jmap.Client({}).withAuthenticationToken('token').authToken).to.equal('token');
    });

  });

  describe('The withAPIUrl method', function() {

    it('should store the url as apiUrl', function() {
      expect(new jmap.Client({}).withAPIUrl('https://jmap.open-paas.org').apiUrl).to.equal('https://jmap.open-paas.org');
    });

  });

  describe('The getAccounts method', function() {

    it('should post on the API url', function(done) {
      new jmap.Client({
        post: function(url) {
          expect(url).to.equal('https://test');

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getAccounts()
        .then(null, done);
    });

    it('should send correct HTTP headers, including Authorization=token', function(done) {
      new jmap.Client({
        post: function(url, headers) {
          expect(headers).to.deep.equal({
            Authorization: 'token',
            'Content-Type': 'application/json',
            Accept: 'application/json'
          });

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getAccounts()
        .then(null, done);
    });

    it('should send a valid JMAP "getAccounts" request body when there is no options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['getAccounts', {}, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getAccounts()
        .then(null, done);
    });

    it('should send a valid JMAP "getAccounts" request body, forwarding options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['getAccounts', { sinceState: 'state' }, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getAccounts({ sinceState: 'state' })
        .then(null, done);
    });

    it('should reject the promise if the JMAP response is invalid', function(done) {
      new jmap.Client({
        post: function() {
          return q('Invalid JMAP response');
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getAccounts()
        .then(null, function() { done(); });
    });

    it('should resolve the promise with an array of Account objects when the response is valid', function(done) {
      var client = new jmap.Client({
        post: function() {
          return q([['accounts', {list: [{id: 'id'}, {id: 'id2'}]}, '#0']]);
        }
      });

      client
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getAccounts()
        .then(function(data) {
          expect(data).to.deep.equal([
            new jmap.Account(client, 'id'),
            new jmap.Account(client, 'id2')
          ]);

          done();
        });
    });

  });

  describe('The getMailboxes method', function() {

    it('should post on the API url', function(done) {
      new jmap.Client({
        post: function(url) {
          expect(url).to.equal('https://test');

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMailboxes()
        .then(null, done);
    });

    it('should send correct HTTP headers, including Authorization=token', function(done) {
      new jmap.Client({
        post: function(url, headers) {
          expect(headers).to.deep.equal({
            Authorization: 'token',
            'Content-Type': 'application/json',
            Accept: 'application/json'
          });

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMailboxes()
        .then(null, done);
    });

    it('should send a valid JMAP "getMailboxes" request body when there is no options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['getMailboxes', {}, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMailboxes()
        .then(null, done);
    });

    it('should send a valid JMAP "getMailboxes" request body, forwarding options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['getMailboxes', { accountId: 'accountId' }, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMailboxes({ accountId: 'accountId' })
        .then(null, done);
    });

    it('should reject the promise if the JMAP response is invalid', function(done) {
      new jmap.Client({
        post: function() {
          return q('Invalid JMAP response');
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMailboxes()
        .then(null, function() { done(); });
    });

    it('should resolve the promise with an array of Mailbox objects when the response is valid', function(done) {
      var client = new jmap.Client({
        post: function() {
          return q([['mailboxes', {list: [{ id: 'id', name: 'name' }, { id: 'id2', name: 'name' }]}, '#0']]);
        }
      });

      client
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMailboxes()
        .then(function(data) {
          expect(data).to.deep.equal([
            new jmap.Mailbox(client, 'id', 'name'),
            new jmap.Mailbox(client, 'id2', 'name')
          ]);

          done();
        });
    });

  });

  describe('The getMessageList method', function() {

    it('should post on the API url', function(done) {
      new jmap.Client({
        post: function(url) {
          expect(url).to.equal('https://test');

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMessageList()
        .then(null, done);
    });

    it('should send correct HTTP headers, including Authorization=token', function(done) {
      new jmap.Client({
        post: function(url, headers) {
          expect(headers).to.deep.equal({
            Authorization: 'token',
            'Content-Type': 'application/json',
            Accept: 'application/json'
          });

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMessageList()
        .then(null, done);
    });

    it('should send a valid JMAP "getMessageList" request body when there is no options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['getMessageList', {}, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMessageList()
        .then(null, done);
    });

    it('should send a valid JMAP "getMessageList" request body, forwarding options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['getMessageList', {
            filter: {
              inMailboxes: ['inbox']
            }
          }, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMessageList({
          filter: {
            inMailboxes: ['inbox']
          }
        })
        .then(null, done);
    });

    it('should reject the promise if the JMAP response is invalid', function(done) {
      new jmap.Client({
        post: function() {
          return q('Invalid JMAP response');
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMessageList()
        .then(null, function() { done(); });
    });

    it('should resolve the promise with a MessageList object when the response is valid', function(done) {
      var client = new jmap.Client({
        post: function() {
          return q([['messageList', {
            accountId: 'user@example.com',
            filter: {
              inMailboxes: ['inbox']
            },
            sort: ['date desc'],
            collapseThreads: true,
            position: 0,
            total: 100,
            messageIds: [
              'fm1u314',
              'fm1u312'
            ],
            threadIds: [
              '4f512aafed75e7fb',
              'fed75e7fb4f512aa',
              '75e7fb4f512aafed'
            ]
          }, '#0']]);
        }
      });

      client
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMessageList({
          filter: {
            inMailboxes: ['inbox']
          },
          sort: ['date desc'],
          collapseThreads: true
        })
        .then(function(data) {
          expect(data).to.deep.equal(new jmap.MessageList(client, {
            accountId: 'user@example.com',
            filter: {
              inMailboxes: ['inbox']
            },
            sort: ['date desc'],
            collapseThreads: true,
            position: 0,
            total: 100,
            messageIds: [
              'fm1u314',
              'fm1u312'
            ],
            threadIds: [
              '4f512aafed75e7fb',
              'fed75e7fb4f512aa',
              '75e7fb4f512aafed'
            ]
          }));

          done();
        }).then(null, done);
    });

  });

  describe('The getThreads method', function() {

    it('should post on the API url', function(done) {
      new jmap.Client({
        post: function(url) {
          expect(url).to.equal('https://test');

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getThreads()
        .then(null, done);
    });

    it('should send correct HTTP headers, including Authorization=token', function(done) {
      new jmap.Client({
        post: function(url, headers) {
          expect(headers).to.deep.equal({
            Authorization: 'token',
            'Content-Type': 'application/json',
            Accept: 'application/json'
          });

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getThreads()
        .then(null, done);
    });

    it('should send a valid JMAP "getThreads" request body when there is no options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['getThreads', {}, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getThreads()
        .then(null, done);
    });

    it('should send a valid JMAP "getThreads" request body, forwarding options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['getThreads', { ids: ['id1', 'id2'] }, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getThreads({ ids: ['id1', 'id2'] })
        .then(null, done);
    });

    it('should reject the promise if the JMAP response is invalid', function(done) {
      new jmap.Client({
        post: function() {
          return q('Invalid JMAP response');
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getThreads()
        .then(null, function() { done(); });
    });

    it('should resolve the promise with an array of Thread objects when the response is valid', function(done) {
      var client = new jmap.Client({
        post: function() {
          return q([['threads', {
            accountId: 'user@example.com',
            list: [{
              id: '4f512aafed75e7fb',
              messageIds: ['fm1u314']
            }, {
              id: 'fed75e7fb4f512aa',
              messageIds: ['fm1u312', 'fm2u12', 'fm1u304']
            }],
            notFound: null
          }, '#0']]);
        }
      });

      client
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getThreads({ ids: ['4f512aafed75e7fb', 'fed75e7fb4f512aa'] })
        .then(function(data) {
          expect(data).to.deep.equal([
            new jmap.Thread(client, '4f512aafed75e7fb', { messageIds: ['fm1u314'] }),
            new jmap.Thread(client, 'fed75e7fb4f512aa', { messageIds: ['fm1u312', 'fm2u12', 'fm1u304'] })
          ]);

          done();
        }).then(null, done);
    });

  });

});
