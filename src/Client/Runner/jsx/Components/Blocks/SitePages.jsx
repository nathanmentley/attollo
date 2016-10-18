import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseBlockComponent from '../BaseBlockComponent.jsx';

import PageService from '../../Services/PageService.jsx';

export default class SitePages extends BaseBlockComponent {
    constructor(props) {
        super(props);

        this.state = {
            Pages: [],
        };
    }
    
    componentDidMount() {
        var self = this;

        PageService.GetPages().then((res) => {
            self.setState({
                Pages: res.data.data
            }); 
        });
    }
}