'use strict';

export default class Transport {
  post(url, headers, data) {
    throw new Error('Transport is an abstract class. Please use a concrete implementation.');
  }
}
