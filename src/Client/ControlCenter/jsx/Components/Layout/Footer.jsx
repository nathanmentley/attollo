import React from 'react';

import Config from '!json!../../config.json';

import BaseComponent from '../BaseComponent.jsx';

export default class Footer extends BaseComponent {
    render() {
        return <footer>Attollo Build: {Config.Environment} - {Config.Environment}</footer>;
    }
}