'use strict';

/* global JmapConnection: false */

class Jmap {
  constructor(transport) {
    this.transport = transport;
  }

  setTransport(transport) {
    this.transport = transport;
  }

  getTransport() {
    return this.transport;
  }

  connect() {
    return new JmapConnection(this.transport);
  }
}
