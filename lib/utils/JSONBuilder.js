'use strict';

import Utils from '../utils/Utils.js';

export default class JSONBuilder {
  /**
   * This class helps to create JSON representation from a model.
   * Usage:
   *
   *       return new JSONBuilder()
   *         .appendIfDefined('inReplyToMessageId', this.inReplyToMessageId)
   *         .appendIfDefined('isUnread', this.isUnread)
   *         .appendIfDefined('isFlagged', this.isFlagged)
   *         .build();
   *
   * @constructor
   **/
  constructor() {
    this.result = {};
  }

  /**
   * Will append the _value_ to the building object, using the _name_ as key.
   *
   * @param name {String} The name to use as key.
   * @param value {*} The value to append.
   *
   * @return this builder
   **/
  append(name, value) {
    Utils.assertRequiredParameterIsPresent(name, 'name');
    Utils.assertRequiredParameterIsPresent(value, 'value');

    this.result[name] = value;

    return this;
  }

  /**
   * If defined, it will append the _value_ to the building object, using the _name_ as key.
   *
   * @param name {String} The name to use as key.
   * @param [value] {*} The value to append.
   *
   * @return this builder
   **/
  appendIfDefined(name, value) {
    if (Utils.isDefined(value)) {
      this.append(name, value);
    }
    return this;
  }

  /**
   * If defined and not empty, it will append the _value_ array to the building object, using the _name_ as key.
   *
   * @param name {String} The name to use as key.
   * @param [value] {Array} The value to append.
   *
   * @return this builder
   **/
  appendIfNotEmpty(name, value) {
    if (value) {
      Utils.assertRequiredParameterIsArrayWithMinimumLength(value, name);
      if (value.length > 0) {
        this.append(name, value.map(item => item.toJSONObject ? item.toJSONObject() : item));
      }
    }
    return this;
  }

  /**
   * @return an object with all appended values
   **/
  build() {
    return this.result;
  }

}
