import React from 'react';

import BasePage from '../BasePage.jsx';

export default class AboutPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
    }

    _render() {
        return (<div>About</div>);
    }
}