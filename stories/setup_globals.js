// Probably want a cleaner pattern to set up these globals and stores
import app from 'hadron-app';
import AppRegistry from 'hadron-app-registry';
import CollectionStore from '../electron/renderer/stores/collection-store';
import WriteStateStore from '../electron/renderer/stores/write-state-store';
global.hadronApp = app;
global.hadronApp.appRegistry = new AppRegistry();
global.hadronApp.appRegistry.registerStore('App.CollectionStore', CollectionStore);
global.hadronApp.appRegistry.registerStore('DeploymentAwareness.WriteStateStore', WriteStateStore);
