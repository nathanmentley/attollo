import React from 'react';
import { render } from 'react-dom';

import App from './Components/App.jsx';

window.React = React;

render(
    (
        <App />
    ),
    document.getElementById('app-container')
);