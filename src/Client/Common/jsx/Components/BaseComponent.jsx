import React from 'react';

import PageUtils from '../Utils/PageUtils.jsx';

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    goToPage(url) {
        PageUtils.ChangePage(url);
    }
}