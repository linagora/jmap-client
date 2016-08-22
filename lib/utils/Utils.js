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
   * Check is the `parameter` is not undefined and not null.
   *
   * @param parameter {*} The parameter to check.
   *
   * @return {Boolean} True if `parameter` is not undefined and not null.
   */
  static isDefined(parameter) {
    return typeof parameter !== 'undefined' && parameter !== null;
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
    if (!Utils.isDefined(parameter)) {
      throw new Error('The "' + name + '" parameter is required.');
    }

    return parameter;
  }

  /**
   * Asserts that the given `parameter` is present and is an object.<br />
   * This method is intended to be called when you need to validate input parameters of functions.
   *
   * @param parameter {*} The parameter to validate.
   * @param name {String} The name of the parameter, as given to the calling function.
   *   This is used to format the error message contained by the thrown {@link Error}.
   *
   * @return {*} The validated parameter, as-is.
   *
   * @throws {Error} If the parameter is not defined or is not an object.
   */
  static assertRequiredParameterIsObject(parameter, name) {
    Utils.assertRequiredParameterIsPresent(parameter, name);

    if (typeof parameter !== 'object' || Array.isArray(parameter)) {
      throw new Error('The "' + name + '" parameter is not an object.');
    }

    return parameter;
  }

  /**
   * Asserts that the given `parameter` is present and has the expected type.<br />
   * This method is intended to be called when you need to validate input parameters of functions.
   * Examples:
   *     assertRequiredParameterHasType(5, 'name', 'number') => returns 5
   *     assertRequiredParameterHasType({}, 'name', CustomClass) => throws an Error
   *
   * @param parameter {*} The parameter to validate.
   * @param name {String} The name of the parameter, as given to the calling function.
   *   This is used to format the error message contained by the thrown {@link Error}.
   * @param type {String|Type} The expected type of the parameter.
   *
   * @return {*} The validated parameter, as-is.
   *
   * @throws {Error} If the parameter is not defined or is not an object.
   */
  static assertRequiredParameterHasType(parameter, name, type) {
    Utils.assertRequiredParameterIsPresent(parameter, name);

    if (typeof type === 'string') {
      if (typeof parameter !== type) {
        throw new Error('The "' + name + '" parameter has not the expected type: ' + type);
      }
    } else if (!(parameter instanceof type)) {
      throw new Error('The "' + name + '" parameter has not the expected type: ' + type);
    }

    return parameter;
  }

  /**
   * Asserts that the given `parameter` is an {@link Array} with a minimum length.<br />
   * This method is intended to be called when you need to validate input parameters of functions.
   *
   * @param parameter {*} The parameter to validate.
   * @param name {String} The name of the parameter, as given to the calling function.
   *   This is used to format the error message contained by the thrown {@link Error}.
   * @param [length=0] {Number} The minimum required length of the array.
   *
   * @return {*} The validated parameter, as-is.
   *
   * @throws {Error} If the parameter is not an array of does not have the minimum length.
   */
  static assertRequiredParameterIsArrayWithMinimumLength(parameter, name, length) {
    if (!Array.isArray(parameter)) {
      throw new Error('The "' + name + '" parameter must be an Array.');
    }

    if (length && parameter.length < length) {
      throw new Error('The "' + name + '" parameter must have at least ' + length + ' element(s).');
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

  /**
   * Fills a URI template by substituting variables by their corresponding values.<br />
   * This supports Level 1 URI templates *only*, as per [this RFC](https://tools.ietf.org/html/rfc6570#section-1.2).
   *
   * @param uri {String} The URI template to fill.
   * @param parameters {Object} A hash of name/value pairs used for variables substitution.
   *
   * @return {String} The filled URI template.
   */
  static fillURITemplate(uri, parameters) {
    Utils.assertRequiredParameterIsPresent(uri, 'uri');

    if (!parameters) {
      return uri;
    }

    return uri.replace(/{(.+?)}/g, function(match, variable) {
      let value = parameters[variable];

      return value ? encodeURIComponent(value) : match;
    });
  }

  /**
   * Appends a query parameter to an existing URL, taking care of existing query parameters.<br />
   * This method returns `uri` as-is if `key` or `value` is not defined.
   *
   * @param uri {String} The URI to modify.
   * @param key {String} The name of the parameter to append.
   * @param value {String} The value of the parameter to append.
   *
   * @returns {String} The modified URI.
   */
  static appendQueryParameter(uri, key, value) {
    if (!uri || !key || !value) {
      return uri;
    }

    return uri + (uri.indexOf('?') > -1 ? '&' : '?') + encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }

  /**
   * Returns the value at _index_ in the given  `Array`, or the default value if the array is undefined, null,
   * if _index_ is negative or there is not enough elements in the array.
   *
   * @param array The `Array` to get the value from.
   * @param index The index of the desired value.
   * @param defaultValue The default value to return if the element cannot be found in the array.
   *
   * @returns {*} The found value or the given default.
   */
  static nthElementOrDefault(array, index, defaultValue) {
    if (Array.isArray(array) && index >= 0 && array.length > index) {
      return array[index];
    }

    return defaultValue;
  }

  static _jsonArrayToModelList(jmap, Model, array, filter) {
    if (!Array.isArray(array)) {
      return [];
    }

    if (filter) {
      array = array.filter(filter);
    }

    return array.map(Model.fromJSONObject.bind(null, jmap));
  }

  static _nullOrNewInstance(value, Model) {
    return (value && new Model(value)) || null;
  }

  static _expectedResponseFor(request) {
    return ({
      getAccounts: 'accounts',
      getMailboxes: 'mailboxes',
      getMessageList: 'messageList',
      getThreads: 'threads',
      getMessages: 'messages',
      setMessages: 'messagesSet',
      setMailboxes: 'mailboxesSet',
      getVacationResponse: 'vacationResponse',
      setVacationResponse: 'vacationResponseSet'
    })[request];
  }
}
