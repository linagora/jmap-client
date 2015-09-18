'use strict';

export default class PromiseProvider {
  newPromise(resolver) {
    throw new Error('PromiseProvider is an abstract class. Please use a concrete implementation.');
  }
}
