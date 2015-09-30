'use strict';

var expect = require('chai').expect,
    jmap = require('../../dist/jmap-client'),
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

    it('should support implicit requests for getThreads and getMessages', function(done) {
      var client = new jmap.Client({
        post: function() {
          return q([
            ['messageList', {
              messageIds: [
                'fm1u314',
                'fm1u312'
              ],
              threadIds: [
                '4f512aafed75e7fb',
                'fed75e7fb4f512aa'
              ]
            }, '#0'],
            ['threads', {
              list: [{
                id: '4f512aafed75e7fb',
                messageIds: ['fm1u314']
              }, {
                id: 'fed75e7fb4f512aa',
                messageIds: ['fm1u312', 'fm2u12']
              }
              ],
              notFound: null
            }, '#0'],
            ['messages', {
              accountId: 'user@example.com',
              state: 'm815034',
              list: [{
                id: 'fm1u314',
                threadId: '4f512aafed75e7fb',
                mailboxIds: ['inbox']
              },
              {
                id: 'fm1u312',
                threadId: 'fed75e7fb4f512aa',
                mailboxIds: ['inbox']
              },
              {
                id: 'fm2u12',
                threadId: 'fed75e7fb4f512aa',
                mailboxIds: ['mailbox2']
              }
              ],
              notFound: null
            }, '#0']
          ]);
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
          expect(data).to.deep.equal([
            new jmap.MessageList(client, {
              messageIds: [
                'fm1u314',
                'fm1u312'
              ],
              threadIds: [
                '4f512aafed75e7fb',
                'fed75e7fb4f512aa'
              ]
            }),
            [
              new jmap.Thread(client, '4f512aafed75e7fb', { messageIds: ['fm1u314'] }),
              new jmap.Thread(client, 'fed75e7fb4f512aa', { messageIds: ['fm1u312', 'fm2u12'] })
            ],
            [
              new jmap.Message(client, 'fm1u314', '4f512aafed75e7fb', ['inbox']),
              new jmap.Message(client, 'fm1u312', 'fed75e7fb4f512aa', ['inbox']),
              new jmap.Message(client, 'fm2u12', 'fed75e7fb4f512aa', ['mailbox2'])
            ]
          ]);

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

    it('should support implicit requests for getMessages', function(done) {
      var client = new jmap.Client({
        post: function() {
          return q([
            ['threads', {
              accountId: 'user@example.com',
              list: [{
                id: '4f512aafed75e7fb',
                messageIds: ['fm1u314']
              }],
              notFound: null
            }, '#0'],
            ['messages', {
              accountId: 'user@example.com',
              list: [{
                id: 'fm1u314',
                threadId: '4f512aafed75e7fb',
                mailboxIds: ['inbox']
              }],
              notFound: null
            }, '#0']
          ]);
        }
      });

      client
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getThreads({
          ids: ['4f512aafed75e7fb'],
          fetchMessages: true
        })
        .then(function(data) {
          expect(data).to.deep.equal([
            [new jmap.Thread(client, '4f512aafed75e7fb', { messageIds: ['fm1u314'] })],
            [new jmap.Message(client, 'fm1u314', '4f512aafed75e7fb', ['inbox'])]
          ]);

          done();
        }).then(null, done);
    });

  });

  describe('The getMessages method', function() {

    it('should post on the API url', function(done) {
      new jmap.Client({
        post: function(url) {
          expect(url).to.equal('https://test');

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMessages()
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
        .getMessages()
        .then(null, done);
    });

    it('should send a valid JMAP "getMessages" request body when there is no options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['getMessages', {}, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMessages()
        .then(null, done);
    });

    it('should send a valid JMAP "getMessages" request body, forwarding options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['getMessages', { ids: ['id1', 'id2'] }, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMessages({ ids: ['id1', 'id2'] })
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
        .getMessages()
        .then(null, function() { done(); });
    });

    it('should resolve the promise with an array of Message objects when the response is valid', function(done) {
      var client = new jmap.Client({
        post: function() {
          return q([['messages', {
            accountId: 'user@example.com',
            list: [{
              id: 'fm1u312',
              threadId: 'fed75e7fb4f512aa',
              mailboxIds: ['mailbox1']
            },
            {
              id: 'fm2u12',
              threadId: 'fed75e7fb4f512aa',
              mailboxIds: ['mailbox2']
            }],
            notFound: null
          }, '#0']]);
        }
      });

      client
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMessages({ ids: ['fm1u312', 'fm2u12'] })
        .then(function(data) {
          expect(data).to.deep.equal([
            new jmap.Message(client, 'fm1u312', 'fed75e7fb4f512aa', ['mailbox1']),
            new jmap.Message(client, 'fm2u12', 'fed75e7fb4f512aa', ['mailbox2'])
          ]);

          done();
        }).then(null, done);
    });

  });

  describe('The setMessages method', function() {

    it('should post on the API url', function(done) {
      new jmap.Client({
        post: function(url) {
          expect(url).to.equal('https://test');

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .setMessages()
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
        .setMessages()
        .then(null, done);
    });

    it('should send a valid JMAP "setMessages" request body when there is no options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['setMessages', {}, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .setMessages()
        .then(null, done);
    });

    it('should send a valid JMAP "setMessages" request body, forwarding options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['setMessages', {
            update: {
              abcd: {
                mailboxIds: ['mailboxId']
              }
            }
          }, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .setMessages({
          update: {
            abcd: {
              mailboxIds: ['mailboxId']
            }
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
        .setMessages()
        .then(null, function() { done(); });
    });

    it('should resolve the promise with a MessagesSet object when the response is valid', function(done) {
      var client = new jmap.Client({
        post: function() {
          return q([['messagesSet', {
            accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
            updated: ['abcd']
          }, '#0']]);
        }
      });

      client
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .setMessages({
          update: {
            abcd: {
              mailboxIds: ['mailboxId']
            }
          }
        })
        .then(function(data) {
          expect(data).to.deep.equal(new jmap.MessagesSet(client, {
            accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
            updated: ['abcd']
          }));

          done();
        }).then(null, done);
    });

  });

  describe('The moveMessage method', function() {

    it('should throw an Error if id is not given', function() {
      expect(function() {
        new jmap.Client({}).moveMessage();
      }).to.throw(Error);
    });

    it('should throw an Error if mailboxIds is not given', function() {
      expect(function() {
        new jmap.Client({}).moveMessage('id');
      }).to.throw(Error);
    });

    it('should throw an Error if mailboxIds is not an Array', function() {
      expect(function() {
        new jmap.Client({}).moveMessage('id', 'notAnArray');
      }).to.throw(Error);
    });

    it('should throw an Error if mailboxIds is zero-length', function() {
      expect(function() {
        new jmap.Client({}).moveMessage('id', []);
      }).to.throw(Error);
    });

    it('should send a JMAP "setMessages" request, passing correct options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['setMessages', {
            update: {
              abcd: {
                mailboxIds: ['mailbox1']
              }
            }
          }, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .moveMessage('abcd', ['mailbox1'])
        .then(null, done);
    });

    it('should reject the promise if the message was not moved', function(done) {
      new jmap.Client({
        post: function() {
          return q([['messagesSet', {
            accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
            updated: [],
            notUpdated: {
              abcd: 'notFound'
            }
          }, '#0']]);
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .moveMessage('abcd', ['mailbox1'])
        .then(null, function() { done(); });
    });

    it('should resolve the promise with nothing is the message was moved', function(done) {
      new jmap.Client({
        post: function() {
          return q([['messagesSet', {
            accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
            updated: ['abcd']
          }, '#0']]);
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .moveMessage('abcd', ['mailbox1'])
        .then(done);
    });

  });

  describe('The getMailboxWithRole method', function() {

    it('should throw an Error if role is not given', function() {
      expect(function() {
        new jmap.Client({}).getMailboxWithRole();
      }).to.throw(Error);
    });

    it('should throw an Error if role is an unknown String', function() {
      expect(function() {
        new jmap.Client({}).getMailboxWithRole('test');
      }).to.throw(Error);
    });

    it('should throw an Error if role is UNKNOWN', function() {
      expect(function() {
        new jmap.Client({}).getMailboxWithRole(jmap.MailboxRole.UNKNOWN);
      }).to.throw(Error);
    });

    it('should send a JMAP "getMailboxes" request, passing options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['getMailboxes', { a: 'b' }, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMailboxWithRole('inbox', { a: 'b' })
        .then(null, done);
    });

    it('should reject the promise if no mailboxes are returned', function(done) {
      new jmap.Client({
        post: function() {
          return q([['mailboxes', {
            list: []
          }, '#0']]);
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMailboxWithRole('inbox')
        .then(null, function() { done(); });
    });

    it('should reject the promise if the mailbox is not found', function(done) {
      new jmap.Client({
        post: function() {
          return q([['mailboxes', {
            list: [{
              id: 'mailbox1',
              name: 'mailbox1',
              role: 'inbox'
            }, {
              id: 'mailbox2',
              name: 'mailbox2',
              role: 'trash'
            }]
          }, '#0']]);
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMailboxWithRole('outbox')
        .then(null, function() { done(); });
    });

    it('should resolve the promise with the mailbox if found', function(done) {
      new jmap.Client({
        post: function() {
          return q([['mailboxes', {
            list: [{
              id: 'mailbox1',
              name: 'mailbox1',
              role: 'inbox'
            }, {
              id: 'outbox',
              name: 'outbox',
              role: 'outbox'
            }, {
              id: 'mailbox2',
              name: 'mailbox2',
              role: 'trash'
            }]
          }, '#0']]);
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getMailboxWithRole('outbox')
        .then(function(mailbox) {
          expect(mailbox.role).to.equal(jmap.MailboxRole.OUTBOX);

          done();
        });
    });
  });

  describe('withAuthenticationUrl method', function() {
    it('should store the url as authenticationUrl', function() {
      expect(new jmap.Client({}).withAuthenticationUrl('https://jmap.open-paas.org').authenticationUrl)
      .to.equal('https://jmap.open-paas.org');
    });
  });

  describe('authExternal method', function() {
    it('should send a request to the authenticationUrl with the right body', function(done) {
      new jmap.Client({
        post: function(url, headers, data) {
          expect(url).to.equal('https://test');
          expect(data.username).to.equal('user@domain.com');
          expect(data.deviceName).to.equal('Device name');
          expect(data.clientName).to.have.length.above(0);
          expect(data.clientVersion).to.have.length.above(0);
          done();
          return q.Promise(function() {});
        }
      })
      .withAuthenticationUrl('https://test')
      .authExternal('user@domain.com', 'Device name', function() {});
    });

    it('should reject if the server does not support external authentication', function(done) {
      new jmap.Client({
        post: function(url, headers, data) {
          return q({
            continuationToken: 'continuationToken1',
            methods: ['password']
          });
        }
      })
      .withAuthenticationUrl('https://test')
      .authExternal('user@domain.com', 'Device name', function() {})
      .then(null, function(err) {
        expect(err).to.be.instanceOf(Error);
        done();
      });
    });

    it('should call the provided continuation calback', function(done) {
      new jmap.Client({
        post: function(url, headers, data) {
          return q({
            continuationToken: 'continuationToken1',
            methods: ['password', 'external']
          });
        }
      })
      .withAuthenticationUrl('https://test')
      .authExternal('user@domain.com', 'Device name', function(authContinuation) {
        expect(authContinuation.continuationToken).to.equal('continuationToken1');
        expect(authContinuation.methods).to.deep.equal(['password', 'external']);
        done();
        return q.reject();
      });
    });

    it('should request the accessToken', function(done) {
      var calls =  0;
      new jmap.Client({
        post: function(url, headers, data) {
          if (calls === 0) {
            calls++;
            return q({
              continuationToken: 'continuationToken1',
              methods: ['password', 'external']
            });
          } else {
            expect(data.token).to.equal('continuationToken1');
            expect(data.method).to.equal('external');
            done();
            return q();
          }
        }
      })
      .withAuthenticationUrl('https://test')
      .authExternal('user@domain.com', 'Device name', function(authContinuation) {
        return q(authContinuation.continuationToken);
      });
    });

    it('should give back a AuthAccess', function(done) {
      var authAccessResponse = {
        accessToken: 'accessToken1',
        api: '/',
        eventSource: '/es',
        upload: '/upload',
        download: '/download'
      };

      new jmap.Client({
        post: function(url, headers, data) {
          if (data.username) {
            return q({
              continuationToken: 'continuationToken1',
              methods: ['password', 'external']
            });
          } else {
            return q(authAccessResponse);
          }
        }
      })
      .withAuthenticationUrl('https://test')
      .authExternal('user@domain.com', 'Device name', function(authContinuation) {
        return q(authContinuation.continuationToken);
      })
      .then(function(authAccess) {
        expect(authAccess).to.deep.equal(authAccessResponse);
        done();
      });
    });

  });

});
