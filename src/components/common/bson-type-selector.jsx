const React = require('react');
const PropTypes = require('prop-types');
const Select = require('react-select');
const semver = require('semver');
const _ = require('lodash');

// const debug = require('debug')('mongodb-compass:bson-type-selector');

const BSON_TYPES = [
  {name: 'Double', number: 1, alias: 'double'},
  {name: 'Decimal128', number: 19, alias: 'decimal128'},
  {name: 'String', number: 2, alias: 'string'},
  {name: 'Object', number: 3, alias: 'object'},
  // {name: 'Array', number: 4, alias: 'array'},  // COMPASS-275 server does not support this
  {name: 'Binary data', number: 5, alias: 'binData'},
  {name: 'Undefined', number: 6, alias: 'undefined'},
  {name: 'ObjectId', number: 7, alias: 'objectid'},
  {name: 'Boolean', number: 8, alias: 'bool'},
  {name: 'Date', number: 9, alias: 'date'},
  {name: 'Null', number: 10, alias: 'null'},
  {name: 'Regular Expression', number: 11, alias: 'regex'},
  {name: 'DBPointer', number: 12, alias: 'dbPointer'},
  {name: 'JavaScript', number: 13, alias: 'javascript'},
  {name: 'Symbol', number: 14, alias: 'symbol'},
  {name: 'JavaScript (with scope)', number: 15, alias: 'javascriptWithScope'},
  {name: '32-bit integer', number: 16, alias: 'int'},
  {name: 'Timestamp', number: 17, alias: 'timestamp'},
  {name: '64-bit integer', number: 18, alias: 'long'},
  {name: 'Min key', number: -1, alias: 'minKey'},
  {name: 'Max key', number: 127, alias: 'maxKey'}
];

class BSONTypeSelector extends React.Component {

  constructor(props) {
    super(props);
    // try catch block in case semver typeerrors while remove decimal128
    // if server is < 3.4.x
    let canRemoveDecimal = false;
    try {
      canRemoveDecimal = semver.gt('3.4.0-rc0', this.props.serverVersion);
    } catch (e) {
      canRemoveDecimal = true;
    }

    if (canRemoveDecimal) {
      _.remove(BSON_TYPES, (type) => type.number === 19);
    }
  }

  onTypeClicked(dropdownOption) {
    const type = BSONTypeSelector.getTypeByNumber(dropdownOption.value);
    this.props.onTypeClicked(type);
  }

  static getTypeByNumber(typeNumber) {
    return _.find(BSON_TYPES, 'number', typeNumber);
  }

  static getTypeByAlias(typeAlias) {
    return _.find(BSON_TYPES, 'alias', typeAlias);
  }

  /**
   * Render BSONSelector component.
   *
   * @returns {React.Component} The view component.
   */
  render() {
    const dropdownOptions = BSON_TYPES.map((type) => ({
      label: type.name,
      value: type.number
    }));

    return (
      <div className="bson-type-selector">
        <label className="bson-type-selector-label">BSON Type</label>
        <Select
          autosize={false}
          className="bson-type-selector-select"
          clearable={false}
          disabled={this.props.isDisabled}
          onChange={this.onTypeClicked.bind(this)}
          options={dropdownOptions}
          placeholder="Select BSON type..."
          searchable={false}
          value={this.props.typeNumber}
        />
      </div>
    );
  }
}

BSONTypeSelector.propTypes = {
  typeNumber: PropTypes.number,
  onTypeClicked: PropTypes.func,
  serverVersion: PropTypes.string,
  isDisabled: PropTypes.bool
};

BSONTypeSelector.displayName = 'BSONTypeSelector';

module.exports = BSONTypeSelector;
