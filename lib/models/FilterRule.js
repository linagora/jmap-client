'use strict';

import Model from './Model.js';
import uuid from 'uuid/v4';
import filterRuleConditions from './filterRules/FilterRuleConditions';
import filterRuleActions from './filterRules/FilterRuleActions';
import Utils from '../utils/Utils';

class FilterRule extends Model {
  /**
   * This class represents a JMAP [FilterRule]{@link http://jmap.io/spec.html}.<br />
   * The _FilterRule_ object represents the state of incoming message filtering for an account.
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _FilterRule_.
   * @param name {String} The name of the rule
   *
   * NOTE: How to use and extend this model ?
   *  FilterRule is conceived so that a rule can be specified in a highly didactic way. For instance:
   *
   *      new jmap.FilterRule(client, 'My filter')
   *        .when.from
   *          .value('admin@open-paas.org')
   *          .comparator(jmap.FilterRule.Comparator.EXACTLY_EQUALS)
   *        .then.moveTo
   *          .mailboxId('36e4d1c0-a473-11e8-aa26-bfb5d32a28f6');
   *
   *  To achive this, it uses the builder design pattern. To extend this model with new actions and conditions,
   *  you just need to create a new class that extends AbstractConditionAction and implements
   *  AbstractConditionAction#_init and AbstractConditionAction#_toJSONObject.
   *
   *  AbstractConditionAction#_init is called by AbstractConditionAction' constructor and
   *  AbstractConditionAction#_toJSONObject is used to generate a JSON representation of the object.
   *  Then, just provide any useful property.
   *
   *  To make the new condition or action available to the builder, you need to extend FilterRuleCondition
   *  (if defining a new condition) or FilterRuleAction (if defining a new action)
   *
   * @see Model
   */
  constructor(jmap, name) {
    super(jmap);

    this.id = uuid();
    this.name = name;
    this.filterCondition = null;
    this.filterAction = null;
  }

  get then() {
    return filterRuleActions(this);
  }

  get when() {
    return filterRuleConditions(this);
  }

  toJSONObject() {
    Utils.assertRequiredParameterIsPresent(this.filterCondition, '', `Filter must have a condition. Use 'when'.`);
    Utils.assertRequiredParameterIsPresent(this.filterAction, '', `Filter must have an action. Use 'then'.`);
    this.filterCondition._validate();
    this.filterAction._validate();

    return {
      id: this.id,
      name: this.name,
      condition: this.filterCondition._toJSONObject(),
      action: this.filterAction._toJSONObject()
    };
  }

  static fromJSONObject(jmap, object) {
    throw new Error('Not implemented');
  }
}

FilterRule.ID = 'singleton';
FilterRule.Comparator = Object.freeze({
  CONTAINS: 'contains',
  NOT_CONTAINS: 'not-contains',
  EXACTLY_EQUALS: 'exactly-equals',
  NOT_EXACTLY_EQUALS: 'not-exactly-equals'
});

export default FilterRule;
