import React from 'react';
import { render } from 'react-dom';

import App from './Components/App.jsx';

window.React = React;

function clientRender(compiledTemplate) {
    return eval("var f = function(){ return " + compiledTemplate + ";}; f();");
}

render(
    (
        <App Pages={null} BlockContainers={null} Page={null} TemplateProcessor={clientRender} />
    ),
    document.getElementById('app-container')
);