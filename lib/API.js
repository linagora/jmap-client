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
 * @property JSONBuilder {JSONBuilder} The {@link JSONBuilder} class helping to serialize model to json
 * @property PromiseProvider {PromiseProvider} The {@link PromiseProvider} class
 * @property ES6PromiseProvider { ES6PromiseProvider} The {@link  ES6PromiseProvider} class
 * @property QPromiseProvider { QPromiseProvider} The {@link  QPromiseProvider} class
 * @property Transport { Transport} The {@link  Transport} class
 * @property JQueryTransport { JQueryTransport} The {@link  JQueryTransport} class
 * @property RequestTransport { RequestTransport} The {@link  RequestTransport} class
 * @property TransportError {TransportError} The {@link TransportError} class
 * @property JmapError {JmapError} The {@link JmapError} class
 *
 * @module API
 */
export default {
  Client: require('./client/Client'),
  ES6PromiseProvider: require('./promises/ES6PromiseProvider'),
  JmapError: require('./errors/JmapError'),
  JQueryTransport: require('./transport/JQueryTransport'),
  PromiseProvider: require('./promises/PromiseProvider'),
  QPromiseProvider: require('./promises/QPromiseProvider'),
  RequestTransport: require('./transport/RequestTransport'),
  Transport: require('./transport/Transport'),
  TransportError: require('./errors/TransportError'),
  Utils: require('./utils/Utils')
};
