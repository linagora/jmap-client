'use strict';

class PromiseProvider {
  newPromise(resolver) {
    throw new Error('PromiseProvider is an abstract class. Please use a concrete implementation.');
  }
}
