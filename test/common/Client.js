'use strict';

var expect = require('chai').expect,
    sinon = require('sinon'),
    jmap = require('../../dist/jmap-client'),
    q = require('q');

require('chai').use(require('chai-shallow-deep-equal'));
require('chai').use(require('sinon-chai'));

describe('The Client class', function() {

  function defaultClient() {
    return new jmap.Client({
      post: function() {
        return q.reject();
      }
    });
  }

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
      expect(defaultClient().withAuthenticationToken('token').authToken).to.equal('token');
    });

  });

  describe('The withAPIUrl method', function() {

    it('should store the url as apiUrl', function() {
      expect(defaultClient().withAPIUrl('https://jmap.open-paas.org').apiUrl).to.equal('https://jmap.open-paas.org');
    });

  });

  describe('The withAuthenticationUrl method', function() {

    it('should store the url as authenticationUrl', function() {
      expect(defaultClient().withAuthenticationUrl('https://jmap.open-paas.org/auth').authenticationUrl).to.equal('https://jmap.open-paas.org/auth');
    });

  });

  describe('The withDownloadUrl method', function() {

    it('should store the url as downloadUrl', function() {
      expect(defaultClient().withDownloadUrl('https://jmap.open-paas.org/dl').downloadUrl).to.equal('https://jmap.open-paas.org/dl');
    });

  });

  describe('The withAuthAccess method', function() {

    var authAccess = new jmap.AuthAccess({
      username: 'user',
      versions: [1],
      extensions: { 'com.linagory.ext': [1] },
      accessToken: 'accessToken1',
      apiUrl: '/es',
      eventSourceUrl: '/eventSource',
      uploadUrl: '/upload',
      downloadUrl: '/download'
    });

    it('should throw if access parameter is not an instance of AuthAccess', function() {
      expect(function() {
        defaultClient().withAuthAccess({});
      }).to.throw(Error);
    });

    it('should store the AuthAccess properties', function() {
      var client = defaultClient().withAuthAccess(authAccess);

      expect(client.authToken).to.equal(authAccess.accessToken);
      expect(client.authScheme).to.equal('X-JMAP');
      ['username', 'versions', 'extensions', 'apiUrl', 'eventSourceUrl', 'uploadUrl', 'downloadUrl'].forEach(function(property) {
        expect(client[property]).to.equal(authAccess[property]);
      });
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
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json; charset=UTF-8'
          });

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getAccounts()
        .then(null, done);
    });

    it('should send correct HTTP headers with Authorization scheme', function(done) {
      new jmap.Client({
        post: function(url, headers) {
          expect(headers).to.deep.equal({
            Authorization: 'Bearer token',
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json; charset=UTF-8'
          });

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token', 'Bearer')
        .getAccounts()
        .then(null, done);
    });

    it('should send correct HTTP Authorization header after JMAP authentication', function(done) {
      var authAccess = new jmap.AuthAccess({
        username: 'user',
        accessToken: 'accessToken1',
        apiUrl: 'https://test',
        eventSourceUrl: '/es',
        uploadUrl: '/upload',
        downloadUrl: '/download'
      });

      new jmap.Client({
        post: function(url, headers) {
          expect(headers).to.deep.equal({
            Authorization: 'X-JMAP accessToken1',
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json; charset=UTF-8'
          });

          return q.reject();
        }
      })
        .withAuthAccess(authAccess)
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
          return q([['accounts', { list: [{ id: 'id' }, { id: 'id2' }] }, '#0']]);
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
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json; charset=UTF-8'
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
          return q([['mailboxes', { list: [{ id: 'id', name: 'name' }, { id: 'id2', name: 'name' }] }, '#0']]);
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

  describe('The setMailboxes method', function() {

    it('should post on the API url', function(done) {
      new jmap.Client({
        post: function(url) {
          expect(url).to.equal('https://test');

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .setMailboxes()
        .then(null, done);
    });

    it('should send correct HTTP headers, including Authorization=token', function(done) {
      new jmap.Client({
        post: function(url, headers) {
          expect(headers).to.deep.equal({
            Authorization: 'token',
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json; charset=UTF-8'
          });

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .setMailboxes()
        .then(null, done);
    });

    it('should send a valid JMAP "setMailboxes" request body when there is no options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['setMailboxes', {}, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .setMailboxes()
        .then(null, done);
    });

    it('should send a valid JMAP "setMailboxes" request body, forwarding options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['setMailboxes', {
            create: {
              property: {
                mailboxIds: ['mailboxId']
              }
            }
          }, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .setMailboxes({
          create: {
            property: {
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
        .setMailboxes()
        .then(null, function() { done(); });
    });

    it('should resolve the promise with a Mailbox object when the response is valid', function(done) {
      var client = new jmap.Client({
        post: function() {
          return q([['mailboxesSet', {
            accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
          }, '#0']]);
        }
      });

      client
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .setMailboxes()
        .then(function(data) {
          expect(data).to.deep.equal(new jmap.SetResponse(client, { accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa' }));
          done();
        });
    });

  });

  describe('The createMailbox method', function() {

    it('should throw an Error if the name is undefined', function() {
      expect(function() {
        defaultClient().createMailbox();
      }).to.throw(Error);
    });

    it('should not throw an Error if the parent id is not undefined', function() {
      expect(function() {
        defaultClient().createMailbox('name');
      }).to.not.throw(Error);
    });

    function createMailboxClient() {
      var client = defaultClient()
        .withAPIUrl('https://test')
        .withAuthenticationToken('token');

      client._generateClientId = function() {
        return 'expectedClientId';
      };

      return client;
    }

    it('should resolve the promise with a Mailbox object if clientId in the response.created', function(done) {
      var client = createMailboxClient();

      client.transport.post = function() {
        return q([['mailboxesSet', {
          created: {
            expectedClientId: {
              id: 'id',
              name: 'another name'
            }
          }
        }, '#0']]);
      };

      client
        .createMailbox('name')
        .then(function(resolved) {
          expect(resolved).to.be.an.instanceof(jmap.Mailbox);
          expect(resolved).to.include({
            id: 'id',
            name: 'another name'
          });

          done();
        });
    });

    it('should resolve the promise with a Mailbox object if clientId in the response.created, reusing the name', function(done) {
      var client = createMailboxClient();

      client.transport.post = function() {
        return q([['mailboxesSet', {
          created: {
            expectedClientId: {
              id: 'id',
              mustBeOnlyMailbox: true,
              sortOrder: 123
            }
          }
        }, '#0']]);
      };

      client
        .createMailbox('name')
        .then(function(resolved) {
          expect(resolved).to.be.an.instanceof(jmap.Mailbox);
          expect(resolved).to.include({
            id: 'id',
            mustBeOnlyMailbox: true,
            sortOrder: 123,
            name: 'name'
          });

          done();
        });
    });

    it('should throw an error if response.created does not contains the expected response format', function(done) {
      var client = createMailboxClient();

      client.transport.post = function() {
        return q([['mailboxesSet', {
          created: {
            expectedClientId: {
              otherProperty: 'otherProperty'
            }
          }
        }, '#0']]);
      };

      client
        .createMailbox('name')
        .then(null, function(err) {
          expect(err).to.be.an.instanceof(Error);
          done();
        });
    });

    it('should trigger an error if no clientId in the response.created object', function(done) {
      var client = createMailboxClient();

      client.transport.post = function() {
        return q([['mailboxesSet', {
          created: {},
          notCreated: {
            otherId: {
              type: 'invalidArguments'
            }
          }
        }, '#0']]);
      };

      client
        .createMailbox('name')
        .then(null, function(err) {
          expect(err.message).to.equal('Failed to create mailbox, clientId: expectedClientId, message: none');
          done();
        });
    });

    it('should trigger an error if no clientId in the response.created object but in response.notCreated', function(done) {
      var client = createMailboxClient();

      client.transport.post = function() {
        return q([['mailboxesSet', {
          created: {},
          notCreated: {
            expectedClientId: {
              type: 'invalidArguments'
            }
          }
        }, '#0']]);
      };

      client
        .createMailbox('name')
        .then(null, function(err) {
          expect(err.message).to.equal('Failed to create mailbox, clientId: expectedClientId, message: JmapError{type=invalidArguments,description=null,method=null}');

          done();
        });
    });

  });

  describe('The updateMailbox method', function() {

    it('should throw an Error if id is not given', function() {
      expect(function() {
        defaultClient().updateMailbox();
      }).to.throw(Error);
    });

    it('should send a JMAP "setMailboxes" request, passing correct options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['setMailboxes', {
            update: {
              id: {
                property: 'property'
              }
            }
          }, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .updateMailbox('id', { property: 'property' })
        .then(null, done);
    });

    it('should reject the promise if the mailbox was not updated', function(done) {
      new jmap.Client({
        post: function() {
          return q([['mailboxesSet', {
            accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
            updated: [],
            notUpdated: {
              id: {
                type: 'notFound'
              }
            }
          }, '#0']]);
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .updateMailbox('id', {})
        .then(null, function() { done(); });
    });

    it('should resolve the promise with nothing if the mailbox was updated', function(done) {
      new jmap.Client({
        post: function() {
          return q([['mailboxesSet', {
            accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
            updated: ['id']
          }, '#0']]);
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .updateMailbox('id', {})
        .then(done);
    });

  });

  describe('The destroyMailbox method', function() {

    it('should throw an Error if the id is undefined', function() {
      expect(function() {
        defaultClient().destroyMailbox();
      }).to.throw(Error);
    });

    it('should delegate to Client#destroyMailboxes method', function(done) {
      var client = defaultClient();

      client.destroyMailboxes = function(ids) {
        expect(ids).to.deep.equal(['id']);

        return q.reject(new Error('some error'));
      };

      client.destroyMailbox('id').catch(function(err) {
        expect(err).to.be.an.instanceof(Error);
        done();
      });
    });

  });

  describe('The destroyMailboxes method', function() {

    it('should throw an Error if the ids is undefined', function() {
      expect(function() {
        defaultClient().destroyMailboxes();
      }).to.throw(Error);
    });

    it('should throw an Error if the ids is not an array', function() {
      expect(function() {
        defaultClient().destroyMailboxes({});
      }).to.throw(Error);
    });

    it('should throw an Error if the ids array is empty', function() {
      expect(function() {
        defaultClient().destroyMailboxes([]);
      }).to.throw(Error);
    });

    it('should call setMailboxes with the expected ids', function(done) {
      var client = defaultClient();
      var ids = ['m1', 'm2'];

      client.transport.post = function(url, headers, body) {
        expect(body).to.deep.equal([['setMailboxes', {
          destroy: ids
        }, '#0']]);
        done();

        return q.reject();
      };

      client.destroyMailboxes(ids);
    });

    it('should reject the promise if there is an error while destroying mailboxes', function(done) {
      var client = defaultClient();

      client.transport.post = function(url, headers, body) {
        return q.reject(new Error('some error'));
      };

      client.destroyMailboxes(['id1', 'id2', 'id3']).then(null, function(err) {
        expect(err).to.be.an.instanceof(Error);
        done();
      });
    });

    it('should reject the promise with error if some mailboxes were not successfully destroyed', function(done) {
      var client = defaultClient();
      var response = [['mailboxesSet', {
        accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
        destroyed: ['id1'],
        notDestroyed: {
          id2: { type: 'type2', description: 'description2' },
          id3: { type: 'type3', description: 'description3' }
        }
      }, '#0']];

      client.transport.post = function() {
        return q(response);
      };

      client.destroyMailboxes(['id1', 'id2', 'id3']).catch(function(err) {
        expect(err).to.be.an.instanceof(Error);
        expect(err.message).to.equal('Failed to destroy id2, the reason is: type2 (description2)');
        done();
      });
    });

    it('should resolve the promise with nothing if all mailboxes were successfully destroyed', function(done) {
      var client = defaultClient();
      var response = [['mailboxesSet', {
        accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
        destroyed: ['id1', 'id2', 'id3'],
        notDestroyed: {}
      }, '#0']];

      client.transport.post = function() {
        return q(response);
      };

      client.destroyMailboxes(['id1', 'id2', 'id3']).then(function(resp) {
        expect(resp).to.be.undefined;
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
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json; charset=UTF-8'
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
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json; charset=UTF-8'
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
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json; charset=UTF-8'
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

    it('should filter messages with no mailboxIds from the response', function(done) {
      var client = new jmap.Client({
        post: function() {
          return q([['messages', {
            accountId: 'user@example.com',
            list: [{
              id: 'fm1u312',
              threadId: 'fed75e7fb4f512aa',
              mailboxIds: ['mailbox1']
            }, {
              id: 'fm1azf52',
              threadId: 'fed75e7fb4f512aa',
              mailboxIds: null
            }, {
              id: 'fm2u12',
              threadId: 'fed75e7fb4f512aa',
              mailboxIds: ['mailbox2']
            }, {
              id: 'fm1ab32',
              threadId: 'fed75e7fb4f512aa',
              mailboxIds: []
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
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json; charset=UTF-8'
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

    it('should resolve the promise with a SetResponse object when the response is valid', function(done) {
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
          expect(data).to.deep.equal(new jmap.SetResponse(client, {
            accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
            updated: ['abcd']
          }));

          done();
        }).then(null, done);
    });

  });

  describe('The updateMessage method', function() {

    it('should throw an Error if id is not given', function() {
      expect(function() {
        defaultClient().updateMessage();
      }).to.throw(Error);
    });

    it('should throw an Error if options is not given', function() {
      expect(function() {
        defaultClient().updateMessage('id');
      }).to.throw(Error);
    });

    it('should throw an Error if options is not an object', function() {
      expect(function() {
        defaultClient().updateMessage('id', 'options');
      }).to.throw(Error);
    });

    it('should send a JMAP "setMessages" request, passing correct options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['setMessages', {
            update: {
              id: {
                property: 'property'
              }
            }
          }, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .updateMessage('id', { property: 'property' })
        .then(null, done);
    });

    it('should reject the promise leveraging the returned error message if the message was not updated', function(done) {
      new jmap.Client({
        post: function() {
          return q([['messagesSet', {
            accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
            updated: [],
            notUpdated: {
              id: {
                type: 'notFound'
              }
            }
          }, '#0']]);
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .updateMessage('id',  { property: 'property' })
        .then(null, function(err) {
          expect(err.message).to.equal('Failed to update message id, the reason is: JmapError{type=notFound,description=null,method=null}');

          done();
        });
    });

    it('should reject the promise leveraging the default error message if the message was not updated', function(done) {
      new jmap.Client({
        post: function() {
          return q([['messagesSet', {
            accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
            updated: [],
            notUpdated: {}
          }, '#0']]);
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .updateMessage('id',  { property: 'property' })
        .then(null, function(err) {
          expect(err.message).to.equal('Failed to update message id, the reason is: missing');
          done();
        });
    });

    it('should resolve the promise with nothing is the message was updated', function(done) {
      new jmap.Client({
        post: function() {
          return q([['messagesSet', {
            accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
            updated: ['id']
          }, '#0']]);
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .updateMessage('id', { property: 'property' })
        .then(done);
    });
  });

  describe('The moveMessage method', function() {

    it('should throw an Error if id is not given', function() {
      expect(function() {
        defaultClient().moveMessage();
      }).to.throw(Error);
    });

    it('should throw an Error if mailboxIds is not given', function() {
      expect(function() {
        defaultClient().moveMessage('id');
      }).to.throw(Error);
    });

    it('should throw an Error if mailboxIds is not an Array', function() {
      expect(function() {
        defaultClient().moveMessage('id', 'notAnArray');
      }).to.throw(Error);
    });

    it('should throw an Error if mailboxIds is zero-length', function() {
      expect(function() {
        defaultClient().moveMessage('id', []);
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
              abcd: {
                type: 'notFound'
              }
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
        defaultClient().getMailboxWithRole();
      }).to.throw(Error);
    });

    it('should throw an Error if role is an unknown String', function() {
      expect(function() {
        defaultClient().getMailboxWithRole('test');
      }).to.throw(Error);
    });

    it('should throw an Error if role is UNKNOWN', function() {
      expect(function() {
        defaultClient().getMailboxWithRole(jmap.MailboxRole.UNKNOWN);
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
      expect(defaultClient().withAuthenticationUrl('https://jmap.open-paas.org').authenticationUrl)
      .to.equal('https://jmap.open-paas.org');
    });
  });

  describe('The authenticate method', function() {
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
      .authenticate('user@domain.com', 'Device name', function() {});
    });

    it('should call the provided continuation calback', function(done) {
      new jmap.Client({
        post: function(url, headers, data) {

          return q({
            loginId: 'loginId1',
            methods: [{ type: 'password' }, { type: 'external' }]
          });
        }
      })
      .withAuthenticationUrl('https://test')
      .authenticate('user@domain.com', 'Device name', function(authContinuation) {
        expect(authContinuation.loginId).to.equal('loginId1');
        expect(authContinuation.methods.length).to.deep.equal(2);
        done();

        return q.reject();
      });
    });

    it('should request the accessToken with the selected method', function(done) {
      var calls =  0;

      new jmap.Client({
        post: function(url, headers, data) {
          if (calls === 0) {
            calls++;

            return q({
              loginId: 'loginId1',
              methods: [{ type: 'password' }, { type: 'external' }]
            });
          } else {
            expect(data.loginId).to.equal('loginId1');
            expect(data.type).to.equal('password');
            expect(data.value).to.equal('password1');
            done();

            return q();
          }
        }
      })
      .withAuthenticationUrl('https://test')
      .authenticate('user@domain.com', 'Device name', function(authContinuation) {
        return q({
          type: 'password',
          value: 'password1'
        });
      });
    });

    it('should reject if an unsupported auth method is requested', function(done) {
      new jmap.Client({
        post: function(url, headers, data) {
          return q({
            loginId: 'loginId1',
            methods: [{ type: 'password' }]
          });
        }
      })
      .withAuthenticationUrl('https://test')
      .authenticate('user@domain.com', 'Device name', function(authContinuation) {
        return q({ type: 'external' });
      })
      .then(null, function(err) {
        expect(err).to.be.instanceOf(Error);
        done();
      });
    });

    it('should resolve with AuthAccess', function(done) {
      var authAccessResponse = {
        username: 'user@domain.com',
        versions: [1],
        extensions: {},
        accessToken: 'accessToken1',
        apiUrl: '/',
        eventSourceUrl: '/es',
        uploadUrl: '/upload',
        downloadUrl: '/download'
      };

      new jmap.Client({
        post: function(url, headers, data) {
          if (data.username) {
            return q({
              loginId: 'loginId1',
              methods: [{ type: 'password' }, { type: 'external' }]
            });
          } else {
            return q(authAccessResponse);
          }
        }
      })
      .withAuthenticationUrl('https://test')
      .authenticate('user@domain.com', 'Device name', function(authContinuation) {
        return q({ type: 'external' });
      })
      .then(function(authAccess) {
        expect(authAccess).to.deep.equal(authAccessResponse);
        done();
      });
    });

    it('should repeat authentication steps if server demands to', function(done) {
      var authAccessResponse = {
        username: 'user@domain.com',
        versions: [1],
        extensions: {},
        accessToken: 'accessToken1',
        apiUrl: '/',
        eventSourceUrl: '/es',
        uploadUrl: '/upload',
        downloadUrl: '/download'
      };

      new jmap.Client({
        post: function(url, headers, data) {
          if (data.username) {
            return q({
              loginId: 'loginId1',
              methods: [{ type: 'password' }]
            });
          } else if (data.value === 'pwd1') {
            return q({
              loginId: 'loginId2',
              prompt: '2nd Auth Factor',
              methods: [{ type: 'totp' }]
            });
          } else if (data.value === 'pwd2') {
            return q({
              loginId: 'loginId3',
              prompt: '3rd Auth Factor',
              methods: [{ type: 'yubikeyotp' }]
            });
          } else {
            return q(authAccessResponse);
          }
        }
      })
      .withAuthenticationUrl('https://test')
      .authenticate('user@domain.com', 'Device name', function(authContinuation) {
        if (authContinuation.loginId === 'loginId1') {
          return q({ type: 'password', value: 'pwd1' });
        } else if (authContinuation.loginId === 'loginId2') {
          return q({ type: 'totp', value: 'pwd2' });
        } else {
          return q({ type: 'yubikeyotp', value: 'pwd3' });
        }
      })
      .then(function(authAccess) {
        expect(authAccess).to.deep.equal(authAccessResponse);
        done();
      }, done);
    });

    it('should reject on ambiguous server response', function(done) {
      new jmap.Client({
        post: function(url, headers, data) {
          return q({
            accessToken: 'accessToken1',
            loginId: 'loginId1'
          });
        }
      })
      .withAuthenticationUrl('https://test')
      .authenticate('user@domain.com', 'Device name', function(authContinuation) {
        return q({ type: 'external' });
      })
      .then(null, function(err) {
        expect(err).to.be.instanceOf(Error);
        done();
      });
    });

    it('should reject on invalid server responses', function(done) {
      new jmap.Client({
        post: function(url, headers, data) {
          if (data.username) {
            return q({
              loginId: 'loginId1',
              methods: [{ type: 'external' }]
            });
          } else {
            return q({
              some: 'rubbish response'
            });
          }
        }
      })
      .withAuthenticationUrl('https://test')
      .authenticate('user@domain.com', 'Device name', function(authContinuation) {
        return q({ method: 'external' });
      })
      .then(null, function(err) {
        expect(err).to.be.instanceOf(Error);
        done();
      });
    });

  });

  describe('The authExternal method', function() {
    it('should reject if the server does not support external authentication', function(done) {
      new jmap.Client({
        post: function(url, headers, data) {
          return q({
            loginId: 'loginId1',
            methods: [{ type: 'password' }]
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
            loginId: 'loginId1',
            methods: [{ type: 'password' }, { type: 'external' }]
          });
        }
      })
      .withAuthenticationUrl('https://test')
      .authExternal('user@domain.com', 'Device name', function(authContinuation) {
        expect(authContinuation.loginId).to.equal('loginId1');
        expect(authContinuation.methods.length).to.equal(2);
        done();

        return q.reject();
      });
    });

    it('should give back a AuthAccess', function(done) {
      var authAccessResponse = {
        username: 'user@domain.com',
        versions: [1],
        extensions: {},
        accessToken: 'accessToken1',
        apiUrl: '/',
        eventSourceUrl: '/es',
        uploadUrl: '/upload',
        downloadUrl: '/download'
      };

      new jmap.Client({
        post: function(url, headers, data) {
          if (data.username) {
            return q({
              loginId: 'loginId1',
              methods: [{ type: 'password' }, { type: 'external' }]
            });
          } else {
            return q(authAccessResponse);
          }
        }
      })
      .withAuthenticationUrl('https://test')
      .authExternal('user@domain.com', 'Device name', function(authContinuation) {
        return q(authContinuation.loginId);
      })
      .then(function(authAccess) {
        expect(authAccess).to.deep.equal(authAccessResponse);
        done();
      });
    });

  });

  describe('The authPassword method', function() {
    var promiseProvider = new jmap.QPromiseProvider();

    it('should reject if the server does not support password authentication', function(done) {
      new jmap.Client({
        post: function(url, headers, data) {
          return q({
            loginId: 'loginId1',
            methods: [{ type: 'external' }]
          });
        }
      }, promiseProvider)
      .withAuthenticationUrl('https://test')
      .authPassword('user@domain.com', 'xxxxxx', 'Device name')
      .then(null, function(err) {
        expect(err).to.be.instanceOf(Error);
        done();
      });
    });

    it('should give back a AuthAccess', function(done) {
      var authAccessResponse = {
        username: 'user@domain.com',
        versions: [1],
        extensions: {},
        accessToken: 'accessToken1',
        apiUrl: '/',
        eventSourceUrl: '/es',
        uploadUrl: '/upload',
        downloadUrl: '/download'
      };

      new jmap.Client({
        post: function(url, headers, data) {
          if (data.username) {
            return q({
              loginId: 'loginId1',
              methods: [{ type: 'password' }, { type: 'external' }]
            });
          } else {
            return q(authAccessResponse);
          }
        }
      }, promiseProvider)
      .withAuthenticationUrl('https://test')
      .authPassword('user@domain.com', 'xxxxxx', 'Device name')
      .then(function(authAccess) {
        expect(authAccess).to.deep.equal(authAccessResponse);
        done();
      });
    });

  });

  describe('The saveAsDraft method', function() {

    it('should throw an Error if the message is undefined', function() {
      expect(function() {
        defaultClient().saveAsDraft();
      }).to.throw(Error);
    });

    it('should throw an Error if message has not the expected type', function() {
      expect(function() {
        defaultClient().saveAsDraft('message');
      }).to.throw(Error);
    });

    it('should call getMailboxWithRole to find the draft mailbox id', function(done) {
      var client = defaultClient();

      client.getMailboxWithRole = function(role) {
        expect(role).to.deep.equal(jmap.MailboxRole.DRAFTS);

        done();

        return q.reject();
      };

      client
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .saveAsDraft(new jmap.OutboundMessage(jmap));
    });

    function saveAsDraftReadyClient() {
      var client = defaultClient()
        .withAPIUrl('https://test')
        .withAuthenticationToken('token');

      client._generateClientId = function() {
        return 'expectedClientId';
      };
      client.getMailboxWithRole = function() {
        return q.resolve(new jmap.Mailbox({}, 5, 'my drafts', { role: jmap.MailboxRole.DRAFTS }));
      };

      return client;
    }

    it('should assign the draft mailbox id in mailboxIds', function(done) {
      var client = saveAsDraftReadyClient();

      client.transport.post = function(url, headers, body) {
        expect(body).to.deep.equal([['setMessages', {
          create: {
            expectedClientId: {
              subject: 'message topic',
              mailboxIds: [5],
              isDraft: true
            }
          }
        }, '#0']]);

        return q.reject();
      };

      client.saveAsDraft(new jmap.OutboundMessage(jmap, {
          subject: 'message topic'
        }))
        .then(null, done);
    });

    it('should force the isDraft flag', function(done) {
      var client = saveAsDraftReadyClient();

      client.transport.post = function(url, headers, body) {
        expect(body).to.deep.equal([['setMessages', {
          create: {
            expectedClientId: {
              subject: 'message topic',
              mailboxIds: [5],
              isDraft: true
            }
          }
        }, '#0']]);

        return q.reject();
      };

      client.saveAsDraft(new jmap.OutboundMessage(jmap, {
          subject: 'message topic',
          isDraft: false
        }))
        .then(null, done);
    });

    it('should resolve the promise with returned object if clientId in the response.created', function(done) {
      var client = saveAsDraftReadyClient();

      client.transport.post = function() {
        return q([['messagesSet', {
          created: {
            expectedClientId: {
              blobId: 'm-ma294202da',
              id: 'ma294202da',
              size: 281,
              threadId: 'ta294202da'
            }
          }
        }, '#0']]);
      };

      client
        .saveAsDraft(new jmap.OutboundMessage(jmap, {
          subject: 'message topic'
        }))
        .then(function(resolved) {
          expect(resolved).to.be.an.instanceof(jmap.CreateMessageAck);
          expect(resolved).to.include({
            blobId: 'm-ma294202da',
            id: 'ma294202da',
            size: 281,
            threadId: 'ta294202da'
          });
          done();
        });
    });

    it('should throw an error if response.created does not contain the expected response format', function(done) {
      var client = saveAsDraftReadyClient();

      client.transport.post = function() {
        return q([['messagesSet', {
          created: {
            expectedClientId: {
              size: 281
            }
          }
        }, '#0']]);
      };

      client
        .saveAsDraft(new jmap.OutboundMessage(jmap, {
          subject: 'message topic'
        }))
        .then(null, function(err) {
          expect(err).to.be.an.instanceof(Error);
          done();
        });
    });

    it('should trigger an error if no clientId in the response.created object', function(done) {
      var client = saveAsDraftReadyClient();

      client.transport.post = function() {
        return q([['messagesSet', {
          created: {},
          notCreated: {
            otherId: {
              type: 'invalidArguments'
            }
          }
        }, '#0']]);
      };

      client
        .saveAsDraft(new jmap.OutboundMessage(jmap, {
          subject: 'message topic'
        }))
        .then(null, function(err) {
          expect(err.message).to.equal('Failed to store message with clientId expectedClientId. Error: none');

          done();
        });
    });

    it('should trigger an error if no clientId in the response.created object but in response.notCreated', function(done) {
      var client = saveAsDraftReadyClient();

      client.transport.post = function() {
        return q([['messagesSet', {
          created: {},
          notCreated: {
            expectedClientId: {
              type: 'invalidArguments'
            }
          }
        }, '#0']]);
      };

      client
        .saveAsDraft(new jmap.OutboundMessage(jmap, {
          subject: 'message topic'
        }))
        .then(null, function(err) {
          expect(err.message).to.equal('Failed to store message with clientId expectedClientId. Error: JmapError{type=invalidArguments,description=null,method=null}');

          done();
        });
    });

  });

  describe('The destroyMessage method', function() {

    it('should throw an Error if the id is undefined', function() {
      expect(function() {
        defaultClient().destroyMessage();
      }).to.throw(Error);
    });

    it('should call setMessages with the expected id', function(done) {
      var client = defaultClient();

      client.transport.post = function(url, headers, body) {
        expect(body).to.deep.equal([['setMessages', {
          destroy: ['the id']
        }, '#0']]);
        done();

        return q.reject();
      };

      client.destroyMessage('the id');
    });

    it('should resolve the promise with nothing if the message was destroyed', function(done) {
      var client = defaultClient();

      client.transport.post = function(url, headers, body) {
        return q([['messagesSet', {
          accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
          destroyed: ['the id']
        }, '#0']]);
      };

      client.destroyMessage('the id').then(done);
    });

    it('should throw an error if the given id is not in response.destroyed', function(done) {
      var client = defaultClient();

      client.transport.post = function(url, headers, body) {
        return q([['messagesSet', {
          accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
          destroyed: [],
          notDestroyed: {
            'the id': {
              type: 'invalidArguments'
            }
          }
        }, '#0']]);
      };

      client.destroyMessage('the id').then(null, function(err) {
        expect(err).to.be.an.instanceof(Error);
        expect(err.message).to.equal('Failed to destroy the id, the reason is: JmapError{type=invalidArguments,description=null,method=null}');
        done();
      });
    });

    it('should throw an error if the given id is neither in response.destroyed nor in response.notDestroyed', function(done) {
      var client = defaultClient();

      client.transport.post = function(url, headers, body) {
        return q([['messagesSet', {
          accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
          destroyed: [],
          notDestroyed: {}
        }, '#0']]);
      };

      client.destroyMessage('the id').then(null, function(err) {
        expect(err).to.be.an.instanceof(Error);
        expect(err.message).to.equal('Failed to destroy the id, the reason is: missing');
        done();
      });
    });

  });

  describe('The destroyMessages method', function() {

    it('should throw an Error if ids is undefined', function() {
      expect(function() {
        defaultClient().destroyMessages();
      }).to.throw(Error);
    });

    it('should throw an Error if ids is not an array', function() {
      expect(function() {
        defaultClient().destroyMessages('abcd');
      }).to.throw(Error);
    });

    it('should throw an Error if ids is zero-length', function() {
      expect(function() {
        defaultClient().destroyMessages([]);
      }).to.throw(Error);
    });

    it('should call setMessages with the expected ids', function(done) {
      var client = defaultClient();

      client.transport.post = function(url, headers, body) {
        expect(body).to.deep.equal([['setMessages', {
          destroy: ['id', 'id2']
        }, '#0']]);

        done();

        return q.reject();
      };

      client.destroyMessages(['id', 'id2']);
    });

    it('should resolve the promise with a SetResponse', function(done) {
      var client = defaultClient();

      client.transport.post = function() {
        return q([['messagesSet', {
          accountId: 'b6ed15b6-5611-11e5-b11b-0026b9fac7aa',
          destroyed: ['id']
        }, '#0']]);
      };

      client.destroyMessages(['id']).then(function(response) {
        expect(response).to.be.an.instanceof(jmap.SetResponse);

        done();
      });
    });

  });

  describe('The send method', function() {

    it('should throw an Error if the message is undefined', function() {
      expect(function() {
        defaultClient().send();
      }).to.throw(Error);
    });

    it('should throw an Error if the message is null', function() {
      expect(function() {
        defaultClient().send(null);
      }).to.throw(Error);
    });

    it('should throw an Error if message has not the expected type', function() {
      expect(function() {
        defaultClient().send('message');
      }).to.throw(Error);
    });

    it('should call getMailboxWithRole to find the "outbox" mailbox id', function(done) {
      var client = defaultClient();

      client.getMailboxWithRole = function(role) {
        expect(role).to.deep.equal(jmap.MailboxRole.OUTBOX);

        done();

        return q.reject();
      };

      client.send(new jmap.OutboundMessage(jmap));
    });

    function sendReadyClient() {
      var client = defaultClient()
        .withAPIUrl('https://test')
        .withAuthenticationToken('token');

      client._generateClientId = function() {
        return 'expectedClientId';
      };
      client.getMailboxWithRole = function() {
        return q.resolve(new jmap.Mailbox(client, 2, 'outbox', { role: jmap.MailboxRole.OUTBOX }));
      };

      return client;
    }

    it('should not call getMailboxWithRole if the outbox Mailbox is already available', function(done) {
      var client = sendReadyClient();

      client.getMailboxWithRole = sinon.spy();
      client.transport.post = function() {
        return q([['messagesSet', {
          created: {
            expectedClientId: {
              blobId: 'm-ma294202da',
              id: 'ma294202da',
              size: 281,
              threadId: 'ta294202da'
            }
          }
        }, '#0']]);
      };

      client.send(new jmap.OutboundMessage(jmap), new jmap.Mailbox(jmap, 'outbox', 'outbox', { role: 'outbox' })).then(function(a) {
        expect(client.getMailboxWithRole).to.have.not.been.calledWith();

        done();
      }, done);
    });

    it('should assign the "outbox" mailbox id in mailboxIds and remove isDraft', function(done) {
      var client = sendReadyClient();

      client.transport.post = function(url, headers, body) {
        expect(body).to.deep.equal([['setMessages', {
          create: {
            expectedClientId: {
              subject: 'message topic',
              mailboxIds: [2]
            }
          }
        }, '#0']]);

        return q.reject();
      };

      client.send(new jmap.OutboundMessage(client, {
        subject: 'message topic',
        isDraft: true
      })).then(null, done);
    });

    it('should resolve the promise with returned object if clientId is in response.created', function(done) {
      var client = sendReadyClient();

      client.transport.post = function() {
        return q([['messagesSet', {
          created: {
            expectedClientId: {
              blobId: 'm-ma294202da',
              id: 'ma294202da',
              size: 281,
              threadId: 'ta294202da'
            }
          }
        }, '#0']]);
      };

      client
        .send(new jmap.OutboundMessage(jmap, {
          subject: 'message topic'
        })).then(function(ack) {
          expect(ack).to.be.an.instanceof(jmap.CreateMessageAck);
          expect(ack).to.include({
            blobId: 'm-ma294202da',
            id: 'ma294202da',
            size: 281,
            threadId: 'ta294202da'
          });

          done();
        });
    });

    it('should reject the promise if response.created does not contain the expected response format', function(done) {
      var client = sendReadyClient();

      client.transport.post = function() {
        return q([['messagesSet', {
          created: {
            expectedClientId: {
              size: 281
            }
          }
        }, '#0']]);
      };

      client
        .send(new jmap.OutboundMessage(jmap, {
          subject: 'message topic'
        })).then(null, function() {
          done();
        });
    });

    it('should reject the promise if no clientId in the response.created object', function(done) {
      var client = sendReadyClient();

      client.transport.post = function() {
        return q([['messagesSet', {
          created: {},
          notCreated: {
            otherId: {
              type: 'invalidArguments'
            }
          }
        }, '#0']]);
      };

      client
        .send(new jmap.OutboundMessage(jmap, {
          subject: 'message topic'
        })).then(null, function(err) {
          expect(err.message).to.equal('Failed to store message with clientId expectedClientId. Error: none');

          done();
        });
    });

    it('should reject the promise if no clientId in the response.created object but in response.notCreated', function(done) {
      var client = sendReadyClient();

      client.transport.post = function() {
        return q([['messagesSet', {
          created: {},
          notCreated: {
            expectedClientId: {
              type: 'invalidArguments'
            }
          }
        }, '#0']]);
      };

      client
        .send(new jmap.OutboundMessage(jmap, {
          subject: 'message topic'
        })).then(null, function(err) {
          expect(err.message).to.equal('Failed to store message with clientId expectedClientId. Error: JmapError{type=invalidArguments,description=null,method=null}');

          done();
        });
    });

  });

  describe('The getVacationResponse method', function() {

    it('should send a getVacationResponse request, passing the options', function(done) {
      var client = defaultClient();

      client.transport.post = function(url, headers, body) {
        expect(body).to.deep.equal([['getVacationResponse', {
          a: 'b'
        }, '#0']]);

        return q.reject();
      };

      client.getVacationResponse({ a: 'b' }).then(null, done);
    });

    it('should resolve the promise with returned VacationResponse instance', function(done) {
      var client = defaultClient();

      client.transport.post = function() {
        return q([['vacationResponse', {
          list: [{
            isEnabled: true,
            fromDate: '2016-06-10T17:00:00Z',
            toDate: '2016-06-20T17:00:00Z',
            subject: 'Out Of Office',
            textBody: 'Text',
            htmlBody: '<p>HTML</p>'
          }]
        }, '#0']]);
      };

      client.getVacationResponse().then(function(response) {
        expect(response).to.be.an.instanceof(jmap.VacationResponse);
        expect(response).to.shallowDeepEqual({
          id: 'singleton',
          isEnabled: true,
          fromDate: new Date(Date.UTC(2016, 5, 10, 17, 0, 0, 0)),
          toDate: new Date(Date.UTC(2016, 5, 20, 17, 0, 0, 0)),
          subject: 'Out Of Office',
          textBody: 'Text',
          htmlBody: '<p>HTML</p>'
        });

        done();
      });
    });

    it('should reject the promise if the request fails', function(done) {
      var client = defaultClient();

      client.transport.post = function() {
        return q.reject();
      };

      client.getVacationResponse().then(null, done);
    });

  });

  describe('The setVacationResponse method', function() {

    var vacation = new jmap.VacationResponse({}, {
      isEnabled: true,
      fromDate: '2016-06-10T12:00:00Z',
      textBody: 'Text'
    });

    function checkSentVacationAndAccountId(options, accountId, done) {
      var client = defaultClient();

      client.transport.post = function(url, headers, body) {
        expect(body).to.deep.equal([['setVacationResponse', {
          accountId: accountId,
          update: {
            singleton: {
              id: 'singleton',
              isEnabled: true,
              fromDate: '2016-06-10T12:00:00Z',
              textBody: 'Text'
            }
          }
        }, '#0']]);

        return q.reject();
      };

      client.setVacationResponse(vacation, options).then(null, done);
    }

    it('should throw if vacationResponse parameter is not given', function() {
      expect(function() {
        defaultClient().setVacationResponse();
      }).to.throw(Error);
    });

    it('should throw if vacationResponse parameter is not an instance of VacationResponse', function() {
      expect(function() {
        defaultClient().setVacationResponse('vacation');
      }).to.throw(Error);
    });

    it('should send a setVacationResponse request, passing the VacationResponse and accountId if defined', function(done) {
      checkSentVacationAndAccountId({ accountId: 'id' }, 'id', done);
    });

    it('should send a setVacationResponse request, passing the VacationResponse and a null accountId if not defined', function(done) {
      checkSentVacationAndAccountId({}, undefined, done);
    });

    it('should send a setVacationResponse request, passing the VacationResponse and a null accountId if no options given', function(done) {
      checkSentVacationAndAccountId(undefined, undefined, done);
    });

    it('should resolve the promise with nothing if the call succeeds', function(done) {
      var client = defaultClient();

      client.transport.post = function() {
        return q([['vacationResponseSet', {
          updated: ['singleton']
        }, '#0']]);
      };

      client.setVacationResponse(vacation).then(done);
    });

    it('should reject the promise if the request fails', function(done) {
      var client = defaultClient();

      client.transport.post = function() {
        return q.reject();
      };

      client.setVacationResponse(vacation).then(null, done);
    });

    it('should reject the promise if the call completes with an error, passing the error message', function(done) {
      var client = defaultClient();

      client.transport.post = function() {
        return q([['vacationResponseSet', {
          notUpdated: {
            singleton: {
              type: 'invalidArguments'
            }
          }
        }, '#0']]);
      };

      client.setVacationResponse(vacation).then(null, function(err) {
        expect(err.message).to.contains('Error: JmapError{type=invalidArguments,description=null,method=null}');

        done();
      });
    });

    it('should reject the promise if the call does not complete with success', function(done) {
      var client = defaultClient();

      client.transport.post = function() {
        return q([['vacationResponseSet', {}, '#0']]);
      };

      client.setVacationResponse(vacation).then(null, function(err) {
        expect(err.message).to.match(/Error: none/);

        done();
      });
    });

  });

  describe('When there is a JMAP error returned by the backend', function() {

    it('should throw a JMAP error when an error is received from the backend', function(done) {
      var client = defaultClient();

      client.transport.post = function() {
        return q([['error', { type: 'invalidArguments', description: 'The `id` property must be `singleton`.' }, '#0']]);
      };

      client.setVacationResponse(new jmap.VacationResponse({ id: 'newId' })).then(null, function(err) {
        expect(err).to.be.an.instanceof(jmap.JmapError);
        expect(err.type).to.equal('invalidArguments');
        expect(err.description).to.equal('The `id` property must be `singleton`.');
        expect(err.method).to.equal('setVacationResponse');

        done();
      });
    });

  });

});
