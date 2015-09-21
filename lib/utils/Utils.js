'use strict';

export default class Utils {
  constructor() {
    throw new Error('The Utils class cannot be instantiated.');
  }

  static assertRequiredParameterIsPresent(parameter, name) {
    if (!parameter) {
      throw new Error('The "' + name + '" parameter is required.');
    }

    return parameter;
  }

  static assertValidJMAPResponse(request, data) {
    function allArrayElementsAreArray(array) {
      return array.filter(function(element) {
        return !Array.isArray(element);
      }).length === 0;
    }

    if (!data || !Array.isArray(data)) {
      throw new Error('Expected an array as the JMAP response for a "' + request + '" request.');
    }

    if (data.length === 0 || !allArrayElementsAreArray(data)) {
      throw new Error('Expected an array of exactly 1 array element as the JMAP response for a "' + request + '" request.');
    }

    let expectedResponse = Utils._expectedResponseFor(request);

    if (expectedResponse && data[0][0] !== expectedResponse) {
      throw new Error('Expected "' + expectedResponse + '" as the JMAP response for a "' + request + '" request, but got "' + data[0][0] + '".');
    }

    if (!data[0][1]) {
      throw new Error('The JMAP response for a "' + request + '" request should return some data.');
    }

    return data;
  }

  static capitalize(str) {
    if (!str || typeof str !== 'string') {
      return str;
    }

    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  static _jsonArrayToModelList(jmap, Model, array) {
    return array.map(Model.fromJSONObject.bind(null, jmap));
  }

  static _expectedResponseFor(request) {
    return ({
      getAccounts: 'accounts',
      getMailboxes: 'mailboxes',
      getMessageList: 'messageList',
      getThreads: 'threads',
      getMessages: 'messages'
    })[request];
  }
}
