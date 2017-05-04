const expect = require('chai').expect;
const CompassDocumentValidationStore = require('../../lib/stores');

describe('CompassDocumentValidationStore', function() {
  beforeEach(function() {
    // reset the store to initial values
    CompassDocumentValidationStore.setState(CompassDocumentValidationStore.getInitialState());
  });

  it('should have an initial state of {status: \'enabled\'}', function() {
    expect(CompassDocumentValidationStore.state.status).to.be.equal('enabled');
  });

  describe('toggleStatus()', function() {
    it('should switch the state to {status: \'disabled\'}', function() {
      CompassDocumentValidationStore.toggleStatus();
      expect(CompassDocumentValidationStore.state.status).to.be.equal('disabled');
    });

    it('should switch the state back to {status: \'enabled\'} when used a second time', function() {
      CompassDocumentValidationStore.toggleStatus();
      CompassDocumentValidationStore.toggleStatus();
      expect(CompassDocumentValidationStore.state.status).to.be.equal('enabled');
    });
  });
});
