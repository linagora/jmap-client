'use strict';

/**
 * The _API_ module is the entry point of the library.<br />
 * It exports a single {@link Object} that is exposed as, either:
 * * A global `jmap` variable when jmap-client included in a web page through a `script` tag
 * * A NodeJS module when jmap-client is `require`'d in a NodeJS application
 *
 * When extending the library with new models, utility classes, etc. don't forget to update this module
 * so that your new code gets exposed in the public API.<br />
 * <br />
 * The exported object has the following properties:
 *
 * @property Client {Client} The {@link Client} class
 * @property Utils {Utils} The {@link Utils} class
 * @property JSONBuilder {JSONBuilder} The {@link JSONBuilder} class helping to serialize model to json
 * @property PromiseProvider {PromiseProvider} The {@link PromiseProvider} class
 * @property ES6PromiseProvider { ES6PromiseProvider} The {@link  ES6PromiseProvider} class
 * @property QPromiseProvider { QPromiseProvider} The {@link  QPromiseProvider} class
 * @property Transport { Transport} The {@link  Transport} class
 * @property JQueryTransport { JQueryTransport} The {@link  JQueryTransport} class
 * @property RequestTransport { RequestTransport} The {@link  RequestTransport} class
 * @property Model { Model} The {@link  Model} class
 * @property Account { Account} The {@link  Account} class
 * @property EMailer { EMailer} The {@link  EMailer} class
 * @property Mailbox { Mailbox} The {@link  Mailbox} class
 * @property MessageList { MessageList} The {@link  MessageList} class
 * @property Message { Message} The {@link  Message} class
 * @property OutboundMessage {OutboundMessage} The {@link OutboundMessage} class
 * @property CreateMessageAck {CreateMessageAck} The {@link CreateMessageAck} class
 * @property CreateMailboxAck {CreateMailboxAck} The {@link CreateMailboxAck} class
 * @property Thread { Thread} The {@link  Thread} class
 * @property MessagesSet {MessagesSet} The {@link MessagesSet} class
 * @property MailboxRole {MailboxRole} The {@link MailboxRole} class
 * @property MailboxesSet {MailboxesSet} The {@link MailboxesSet} class
 * @property AuthAccess {AuthAccess} The {@link AuthAccess} class
 * @property AuthContinuation {AuthContinuation} The {@link AuthContinuation} class
 * @property Constants {Constants} The {@link module:Constants|Constants} object
 * @property Attachment {Attachment} The {@link Attachment} class
 * @property AccountCapabilities {AccountCapabilities} The {@link AccountCapabilities} class
 * @property Capabilities {Capabilities} The {@link Capabilities} class
 * @property MailCapabilities {MailCapabilities} The {@link MailCapabilities} class
 *
 * @module API
 */
export default {
  Client: require('./client/Client'),
  Utils: require('./utils/Utils'),
  JSONBuilder: require('./utils/JSONBuilder'),
  PromiseProvider: require('./promises/PromiseProvider'),
  ES6PromiseProvider: require('./promises/ES6PromiseProvider'),
  QPromiseProvider: require('./promises/QPromiseProvider'),
  Transport: require('./transport/Transport'),
  JQueryTransport: require('./transport/JQueryTransport'),
  RequestTransport: require('./transport/RequestTransport'),
  Model: require('./models/Model'),
  Account: require('./models/Account'),
  EMailer: require('./models/EMailer'),
  Mailbox: require('./models/Mailbox'),
  MessageList: require('./models/MessageList'),
  Message: require('./models/Message'),
  OutboundMessage: require('./models/OutboundMessage'),
  CreateMessageAck: require('./models/CreateMessageAck'),
  CreateMailboxAck: require('./models/CreateMailboxAck'),
  Thread: require('./models/Thread'),
  MessagesSet: require('./models/MessagesSet'),
  MailboxRole: require('./models/MailboxRole'),
  MailboxesSet: require('./models/MailboxesSet'),
  AuthAccess: require('./models/AuthAccess'),
  AuthContinuation: require('./models/AuthContinuation'),
  Constants: require('./utils/Constants'),
  Attachment: require('./models/Attachment'),
  AccountCapabilities: require('./models/AccountCapabilities'),
  Capabilities: require('./models/Capabilities'),
  MailCapabilities: require('./models/MailCapabilities')
};
