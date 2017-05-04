import React from 'react';
import { storiesOf } from '@kadira/storybook';
import CompassDocumentValidationComponent from '../src/components/compass-document-validation';
import ConnectedCompassDocumentValidationComponent from '../src/components/';

storiesOf('CompassDocumentValidationComponent', module)
  .add('connected to store', () => <ConnectedCompassDocumentValidationComponent />)
  .add('enabled', () => <CompassDocumentValidationComponent status="enabled" />)
  .add('disabled', () => <CompassDocumentValidationComponent status="disabled" />);
