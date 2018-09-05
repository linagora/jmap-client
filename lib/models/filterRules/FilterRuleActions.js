'use strict';

import AbstractConditionAction from './AbstractConditionAction';
import Utils from '../../utils/Utils';

class MoveTo extends AbstractConditionAction {
  _init() {
    this._mailboxId = null;
  }

  mailboxId(val) {
    this._mailboxId = val;

    return this;
  }

  _toJSONObject() {
    return {
      appendIn: {
        mailboxIds: [this._mailboxId]
      }
    };
  }

  _validate() {
    Utils.assertRequiredParameterIsPresent(this._mailboxId, '', `Mailbox id is not set. Use mailboxId()`);
  }
}

export default function filterRuleActions(filterRule) {
  /**
   * Intermediate object to inject a action the to filter
   *
   * How to extend:
   *   Create a new condition class extending {AbstractConditionAction} and make it available
   *   by defining a new getter in the returned object. For instance:
   *
   *      get moveTo() {
   *        filterRule.filterAction = new MoveTo(filterRule);
   *        return filterRule.filterAction;
   *      }
   *
   *      get delete() {
   *       filterRule.filterCondition = new Delete(filterRule);
   *       return filterRule.filterCondition
   *      }
   *
   * @param filterRule {FilterRule} The filter that is being constructed
   * @returns {AbstractConditionAction} The new condition
   */
  return {
    get moveTo() {
      filterRule.filterAction = new MoveTo(filterRule);

      return filterRule.filterAction;
    }
  };
}
