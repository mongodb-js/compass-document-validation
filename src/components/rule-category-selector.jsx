const React = require('react');
const PropTypes = require('prop-types');
const ValidationActions = require('../actions');
const ruleCategories = require('./rule-categories');
const { FormGroup } = require('react-bootstrap');
const Select = require('react-select');
const _ = require('lodash');

// const debug = require('debug')('mongodb-compass:validation:rule-category');

/**
 * This component is a dropdown to choose one of the rules defined under
 * ./rule-categories.
 */
class RuleCategorySelector extends React.Component {

  /**
   * constructor sets the initial state.
   *
   * @param {Object} props   initial props, passed to super class.
   */
  constructor(props) {
    super(props);
    this.state = {
      hasStartedValidating: false,
      isValid: true,
      category: props.category || ''
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      category: props.category || ''
    });
  }

  onChange(dropdownOption) {
    this.setState({
      category: dropdownOption.value,
      isValid: true,
      hasStartedValidating: true
    });
    ValidationActions.setRuleCategory(this.props.id, dropdownOption.value);
  }

  isReadonlyDistro() {
    return process.env.HADRON_READONLY === 'true';
  }

  validate(force) {
    if (!force && !this.state.hasStartedValidating) {
      return true;
    }
    const isValid = this.state.category !== '';
    this.setState({
      hasStartedValidating: true,
      isValid: isValid
    });
    return isValid;
  }

  /**
   * Render RuleCategorySelector
   *
   * @returns {React.Component} The view component.
   */
  render() {
    const dropdownOptions = Object.keys(ruleCategories).map((category) => ({
      label: _.startCase(category),
      value: category
    }));

    const validationState = this.state.isValid ? null : 'error';

    return (
      <FormGroup validationState={validationState}>
        <Select
          autosize={false}
          className="rule-category-selector"
          clearable={false}
          disabled={!this.props.isWritable || this.isReadonlyDistro()}
          onChange={this.onChange.bind(this)}
          options={dropdownOptions}
          placeholder="Select category..."
          searchable={false}
          value={this.state.category}
        />
      </FormGroup>
    );
  }
}

RuleCategorySelector.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  isWritable: PropTypes.bool
};

RuleCategorySelector.displayName = 'RuleCategorySelector';

module.exports = RuleCategorySelector;
