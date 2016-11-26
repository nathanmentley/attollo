import React from 'react';
import { browserHistory } from 'react-router';

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);

        this.goToPage = this.goToPage.bind(this);
        this.onEnterKeyPress = this.onEnterKeyPress.bind(this);
    }

    goToPage(url) {
        browserHistory.push(url);
    }

    onEnterKeyPress(event, action) {
        if(event.charCode == 13){
            if(action) {
                action();
            }
        }
    }
}