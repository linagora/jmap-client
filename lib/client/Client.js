import ES6PromiseProvider from '../promises/ES6PromiseProvider';
import Utils from '../utils/Utils';

export default class Client {
  /**
   * The {@link Client} class is the main entry point for sending JMAP requests to a remote server.<br />
   * It uses a fluent API so that it's easy to chain calls. JMAP requests are sent using one of the _getXXX_ methods
   * that map to their equivalent in the JMAP specification. For instance, if you want to do a _getAccounts_ request,
   * you'll use the {@link Client#getAccounts} method.
   *
   * @param transport {Transport} The {@link Transport} instance used to send HTTP requests.
   * @param [promiseProvider={@link ES6PromiseProvider}] {PromiseProvider} The {@link PromiseProvider} implementation to use.
   */
  constructor(transport, promiseProvider) {
    Utils.assertRequiredParameterIsPresent(transport, 'transport');

    this.promiseProvider = promiseProvider || new ES6PromiseProvider();
    this.transport = transport;
    this.transport.promiseProvider = this.promiseProvider;
  }
}
