// TODO: COMPASS-1366 Storybook works with the shared global Compass styles...
// import '../styles/compass/index.less';
import '../styles/index.less';

import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';

setAddon(infoAddon);

// load all stories matching ../stories/*.js
const req = require.context('../stories', true, /.js$/);
function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
