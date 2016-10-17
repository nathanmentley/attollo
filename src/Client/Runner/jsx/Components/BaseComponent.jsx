import React from 'react';
import { browserHistory } from 'react-router';

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    goToPage(url) {
        browserHistory.push(url);
    }
}