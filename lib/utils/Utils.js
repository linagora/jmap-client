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
   * @param message {String} Optionnal alternative message to display when error
   *
   * @return {*} The validated parameter, as-is.
   *
   * @throws {Error} If the parameter is not defined.
   */
  static assertRequiredParameterIsPresent(parameter, name, message = null) {
    message = message || `The ${name} parameter is required`;
    if (!Utils.isDefined(parameter)) {
      throw new Error(message);
    }

    return parameter;
  }
}
