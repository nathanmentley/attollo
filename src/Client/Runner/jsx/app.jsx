import React from 'react';
import { render } from 'react-dom';

import App from './Components/App.jsx';

import DocumentUtils from '../../Common/jsx/Utils/DocumentUtils.jsx';

window.React = React;

DocumentUtils.OnReady(() => {
    var clientRender = (compiledTemplate) => {
        return eval("var f = function(){ return " + compiledTemplate + ";}; f();");
    };

    render(
        (
            <App
                Pages={null}
                BlockContainers={null}
                Page={null}
                TemplateProcessor={clientRender}
                DataTypes={null}
            />
        ),
        DocumentUtils.GetElementByID('app-container')
    );
});