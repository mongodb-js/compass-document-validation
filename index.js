const ValidationComponent = require('./lib/components');
const ValidationActions = require('./lib/actions');
const ValidationStore = require('./lib/stores');

/**
 * A sample role for the component.
 */
const ROLE = {
  name: 'Validation',
  component: ValidationComponent,
  order: 5,
  minimumServerVersion: '3.2.0-rc0'
};

/**
 * Activate all the components in the Compass Document Validation package.
 */
function activate(appRegistry) {
  // Register the ValidationComponent as a collection tab Role in Compass
  //
  // Note that available roles are:
  //   - Collection.Tab
  //   - CollectionStats.CollectionStatsItem
  //   - Database.Tab
  //   - Instance.Tab
  //
  appRegistry.registerRole('Collection.Tab', ROLE);
  appRegistry.registerAction('Validation.Actions', ValidationActions);
  appRegistry.registerStore('Validation.Store', ValidationStore);
}

/**
 * Deactivate all the components in the Compass Document Validation package.
 */
function deactivate() {
  global.hadronApp.appRegistry.deregisterRole('Collection.Tab', ROLE);
  global.hadronApp.appRegistry.deregisterAction('Validation.Actions');
  global.hadronApp.appRegistry.deregisterStore('Validation.Store');
}

module.exports = ValidationComponent;
module.exports.activate = activate;
module.exports.deactivate = deactivate;
