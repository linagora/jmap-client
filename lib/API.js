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
 * @property Thread { Thread} The {@link  Thread} class
 * @property MailboxRole {MailboxRole} The {@link MailboxRole} class
 * @property SetResponse {SetResponse} The {@link SetResponse} class
 * @property AuthAccess {AuthAccess} The {@link AuthAccess} class
 * @property AuthContinuation {AuthContinuation} The {@link AuthContinuation} class
 * @property Constants {Constants} The {@link module:Constants|Constants} object
 * @property Attachment {Attachment} The {@link Attachment} class
 * @property Capabilities {Capabilities} The {@link Capabilities} class
 * @property MailCapabilities {MailCapabilities} The {@link MailCapabilities} class
 * @property ServerCapabilities {ServerCapabilities} The {@link ServerCapabilities} class
 * @property VacationResponse {VacationResponse} The {@link VacationResponse} class
 * @property TransportError {TransportError} The {@link TransportError} class
 * @property JmapError {JmapError} The {@link JmapError} class
 *
 * @module API
 */
export default {
  Account: require('./models/Account'),
  Attachment: require('./models/Attachment'),
  AuthAccess: require('./models/AuthAccess'),
  AuthContinuation: require('./models/AuthContinuation'),
  AuthMethod: require('./models/AuthMethod'),
  Capabilities: require('./models/Capabilities'),
  Client: require('./client/Client'),
  CreateMessageAck: require('./models/CreateMessageAck'),
  Constants: require('./utils/Constants'),
  EMailer: require('./models/EMailer'),
  ES6PromiseProvider: require('./promises/ES6PromiseProvider'),
  FilterRule: require('./models/FilterRule'),
  JmapError: require('./errors/JmapError'),
  JQueryTransport: require('./transport/JQueryTransport'),
  JSONBuilder: require('./utils/JSONBuilder'),
  Mailbox: require('./models/Mailbox'),
  MailboxRole: require('./models/MailboxRole'),
  MailCapabilities: require('./models/MailCapabilities'),
  Message: require('./models/Message'),
  MessageList: require('./models/MessageList'),
  Model: require('./models/Model'),
  OutboundMessage: require('./models/OutboundMessage'),
  PromiseProvider: require('./promises/PromiseProvider'),
  QPromiseProvider: require('./promises/QPromiseProvider'),
  RequestTransport: require('./transport/RequestTransport'),
  ServerCapabilities: require('./models/ServerCapabilities'),
  SetResponse: require('./models/SetResponse'),
  Thread: require('./models/Thread'),
  Transport: require('./transport/Transport'),
  TransportError: require('./errors/TransportError'),
  Utils: require('./utils/Utils'),
  VacationResponse: require('./models/VacationResponse'),
};
