import React from 'react';

import PageUtils from '../../../Common/jsx/Utils/PageUtils.jsx';

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);

        this.goToPage = this.goToPage.bind(this);
        this.onEnterKeyPress = this.onEnterKeyPress.bind(this);
    }

    goToPage(url) {
        PageUtils.ChangePage(url);
    }

    onEnterKeyPress(event, action) {
        if(event.charCode == 13){
            if(action) {
                action();
            }
        }
    }
}