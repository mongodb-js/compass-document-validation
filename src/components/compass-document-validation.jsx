const React = require('react');
const CompassDocumentValidationActions = require('../actions');
const ToggleButton = require('./toggle-button');

// const debug = require('debug')('mongodb-compass:compass-document-validation');

class CompassDocumentValidationComponent extends React.Component {

  onClick() {
    CompassDocumentValidationActions.toggleStatus();
  }

  /**
   * Render RefluxCapacitor.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className="compass-document-validation">
        <h2 className="compass-document-validation-title">CompassDocumentValidationComponent</h2>
        <p><i>Compass Document Validation Plugin</i></p>
        <p>The current status is: <code>{this.props.status}</code></p>
        <ToggleButton onClick={this.onClick} />
      </div>
    );
  }
}

CompassDocumentValidationComponent.propTypes = {
  status: React.PropTypes.oneOf(['enabled', 'disabled'])
};

CompassDocumentValidationComponent.defaultProps = {
  status: 'enabled'
};

CompassDocumentValidationComponent.displayName = 'CompassDocumentValidationComponent';



module.exports = CompassDocumentValidationComponent;
