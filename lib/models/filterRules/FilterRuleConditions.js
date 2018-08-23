'use strict';

import AbstractConditionAction from "./AbstractConditionAction";
import FilterRule from '../FilterRule';
import Utils from "../../utils/Utils";

class From extends AbstractConditionAction {
  _init() {
    this._comparator = null;
    this._value = null;
  }

  value(val) {
    this._value = val;
    return this;
  }

  comparator(val) {
    if (!Object.values(FilterRule.Comparator).includes(val)) {
      throw new Error(`From#comparator(): ${val} must be one of ${Object.values(FilterRule.Comparator)}`);
    }
    this._comparator = val;
    return this;
  }

  _toJSONObject() {
    return {
      field: 'from',
      comparator: this._comparator,
      value: this._value,
    };
  }

  _validate() {
    Utils.assertRequiredParameterIsPresent(this._comparator, '', 'Comprator is not set. Use comparator()');
    Utils.assertRequiredParameterIsPresent(this._value, '', 'Value is not set. Use value()');
  }
}

export default function filterRuleConditions(filterRule) {
  /**
   * Intermediate object to inject a condition the to filter
   *
   * How to extend:
   *   Create a new condition class extending {AbstractConditionAction} and make it available
   *   by defining a new getter in the returned obect. For instance:
   *
   *     get from() {
   *       filterRule.filterCondition = new From(filterRule);
   *       return filterRule.filterCondition;
   *     }
   *
   *     get subject() {
   *       filterRule.filterCondition = new Subject(filterRule);
   *       return filterRule.filterCondition
   *     }
   *
   * @param filterRule {FilterRule} The filter that is being constructed
   * @returns {AbstractConditionAction} The new condition
   */
  return {
    get from() {
      filterRule.filterCondition = new From(filterRule);
      return filterRule.filterCondition;
    }
  };
}
