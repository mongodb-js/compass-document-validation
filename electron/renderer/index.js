require('babel-register')({ extensions: ['.jsx'] });

const app = require('hadron-app');
const React = require('react');
const ReactDOM = require('react-dom');
const AppRegistry = require('hadron-app-registry');

const DataService = require('mongodb-data-service');
const Connection = require('mongodb-connection-model');

process.env.HADRON_READONLY = 'true';

const ValidationComponent = require('../../lib/components');
const ValidationStore = require('../../lib/stores');
const ValidationActions = require('../../lib/actions');
const CollectionStore = require('./stores/collection-store');
const WriteStateStore = require('./stores/write-state-store');

const CONNECTION = new Connection({
  hostname: '127.0.0.1',
  port: 27017,
  ns: 'document-validation',
  mongodb_database_name: 'admin'
});

global.hadronApp = app;
global.hadronApp.instance = { build: { version: '3.4.0' }};
global.hadronApp.appRegistry = new AppRegistry();
global.hadronApp.appRegistry.registerStore('App.CollectionStore', CollectionStore);
global.hadronApp.appRegistry.registerStore('DeploymentAwareness.WriteStateStore', WriteStateStore);
global.hadronApp.appRegistry.registerStore('Validation.Store', ValidationStore);
global.hadronApp.appRegistry.registerAction('Validation.Actions', ValidationActions);

const dataService = new DataService(CONNECTION);
dataService.connect((error, ds) => {
  global.hadronApp.dataService = ds;
  global.hadronApp.appRegistry.onActivated();
  global.hadronApp.appRegistry.emit('data-service-connected', error, ds);

  ds.createCollection('document-validation.mycollection', {}, () => {
    CollectionStore.setCollection({ _id: 'document-validation.mycollection' });

    ReactDOM.render(
      React.createElement(ValidationComponent),
      document.getElementById('container')
    );
  });
});
