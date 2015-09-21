'use strict';

/**
 * The {@link PromiseProvider} class is the base class for providers of {@link Promise} instances.<br />
 * A concrete implementation is required to implement {@link PromiseProvider#newPromise} so that this method
 * returns a {@link Promise} that will be used by the library to do JMAP requests and other asynchronous things.<br />
 * <br />
 * This level of abstraction allows users of the library to plug in their own implementation in order to use their
 * favorite {@link Promise} library. Implementations for [Q]{@link https://github.com/kriskowal/q}
 * and native [ES6 Promises]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise} are provided.
 *
 * @abstract
 * @class PromiseProvider
 *
 * @see ES6PromiseProvider
 * @see QPromiseProvider
 */
export default class PromiseProvider {
  /**
   * This method must be implemented by concrete {@link PromiseProvider} implementations in such a way that:
   * * A {@link Promise} is created from the _resolver_ argument and is returned.
   * * The {@link Promise} will be fulfilled when the _resolve_ function of the resolver is called.
   * * The {@link Promise} will be rejected when the _reject_ function of the resolver is called.
   *
   * @abstract
   *
   * @param resolver {Function} A {@link Function} with two arguments _resolve_ and _reject_, both functions.
   *   The first argument fulfills the promise, the second argument rejects it.
   *
   * @return {Promise}
   */
  newPromise(resolver) {
    throw new Error('PromiseProvider is an abstract class. Please use a concrete implementation.');
  }
}
