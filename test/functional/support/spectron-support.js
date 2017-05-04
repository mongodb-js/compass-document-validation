const semver = require('semver');
const path = require('path');
const addValidationCommands = require('./packages/spectron-validation');
const { App } = require('hadron-spectron');

/**
 * The root Compass dir.
 */
const ROOT = path.join(__dirname, '..', '..', '..');

function addCommands(client) {
  addValidationCommands(client);
}

/**
 * Call launchCompass in beforeEach for all UI tests:
 *
 * @returns {Promise} Promise that resolves when app starts.
 */
function launchCompass() {
  return new App(ROOT).launch(addCommands);
}

/**
 * Call quitCompass in afterEach for all UI tests:

 * @param {Object} app - The running application
 * @param {Function} done - The callback to execute when finished.
 *
 * @returns {Promise}    Promise that resolves when app stops.
 */
function quitCompass(app) {
  return app.quit();
}

/**
 * Determine if index usage is enabled in the server version.
 *
 * @param {String} version - The server version.
 *
 * @returns {Boolean} If index usage is available.
 */
function isIndexUsageEnabled(version) {
  return semver.gte(version, '3.2.0');
}

module.exports.launchCompass = launchCompass;
module.exports.quitCompass = quitCompass;
module.exports.isIndexUsageEnabled = isIndexUsageEnabled;
