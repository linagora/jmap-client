'use strict';

export default class Model {
  /**
   * The base class for all JMAP entities.<br />
   * When implementing new entities you should always try to inherit from this.<br />
   * <br />
   * You shouldn't use this constructor directly, but rather create instances of concrete implementations.
   *
   * @constructor
   * @abstract
   *
   * @param jmap {Client} The {@link Client} instance that created this _Model_. This will be exposed as the **_jmap** property.
   */
  constructor(jmap) {
    this._jmap = jmap;
  }
}
