'use strict';

export default class Utils {
  /**
   * This class contains some useful utility methods.<br />
   * The Utils class cannot be instantiated (its constructor will throw if called), all its methods are static.
   *
   * @constructor
   */
  constructor() {
    throw new Error('The Utils class cannot be instantiated.');
  }

  /**
   * Asserts that the given `parameter` is present (read: truthy).<br />
   * This method is intended to be called when you need to validate input parameters of functions.
   *
   * @param parameter {*} The parameter to validate.
   * @param name {String} The name of the parameter, as given to the calling function.
   *   This is used to format the error message contained by the thrown {@link Error}.
   *
   * @return {*} The validated parameter, as-is.
   *
   * @throws {Error} If the parameter is not defined.
   */
  static assertRequiredParameterIsPresent(parameter, name) {
    if (!parameter) {
      throw new Error('The "' + name + '" parameter is required.');
    }

    return parameter;
  }

  /**
   * Asserts that the given `data` is a valid JMAP response.<br />
   * This method is intended to be called by instances of {@link Client}, or by any other object making JMAP requests,
   * when validation of the response is required.<br />
   * <br />
   * The following checks are made by this method:
   * * `data` is defined and is an array
   * * `data` has one or more elements, and all elements are arrays
   * * `data[0][0]` is either
   *   * the expected response string (computed with the help of the `request` parameter)
   *   * an unknown response
   * * `data[0][1]` exists
   *
   * @param request {String} The JMAP request to check the response for. This should be a valid JMAP request name.
   * @param data {*} The JMAP response to validate.
   *
   * @return {*} The data, as-is, if it is detected as a valid JMAP response.
   *
   * @throws {Error} If the received data is not a valid JMAP response.
   */
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

  /**
   * Capitalizes the given {@link String}, that is, returns the same string with the first character in uppercase.<br />
   * If `undefined`, `null`, the _empty string_ or something else that a string is given, the argument is returned as-is.
   *
   * @param str {String} The {@link String} to capitalize.
   *
   * @return {String} The capitalized {@link String}.
   */
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
