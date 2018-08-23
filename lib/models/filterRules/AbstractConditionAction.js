export default class AbstractConditionAction {
  constructor(filterRule) {
    this.filterRule = filterRule;
    this._init();
  }

  /**
   * Do not override
   * @returns {*}
   */
  get when() {
    return this.filterRule.when;
  }

  /**
   * Do not override
   * @returns {*}
   */
  get then() {
    return this.filterRule.then;
  }

  /**
   * Do not override
   * @returns {*|JSON|{id, name, condition, action}}
   */
  toJSONObject() {
    return this.filterRule.toJSONObject();
  }

  /**
   * Initialises the object. Called by the constructor
   * @private
   */
  _init() {
    throw new Error('_init not implemented in child class');
  }

  /**
   * Creates a JSON representation of the model
   * @private
   */
  _toJSONObject() {
    throw new Error('_toJSONObject not implemented in child class');
  }

  /**
   * Validates the object is correct with respect to JMap specification
   * Will be called by FilterRule#toJSONObject
   * @private
   */
  _validate(){
    throw new Error('_validate not implemented in child class');
  }
}
