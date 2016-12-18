import React from 'react';
import { render } from 'react-dom';

import App from './Components/App.jsx';

import DocumentUtils from '../../Common/jsx/Utils/DocumentUtils.jsx';

window.React = React;

DocumentUtils.OnReady(() => {
    render(
        (
            <App  />
        ),
        DocumentUtils.GetElementByID('app-container')
    );
});