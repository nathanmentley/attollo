import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BasePage from '../BasePage.jsx';

import PageService from '../../../Services/PageService.jsx';

import HtmlBlock from '../../Blocks/Html.jsx';
import OtherBlock from '../../Blocks/Other.jsx';

export default class MainPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            Page: null
        };
    }
    
    componentDidMount() {
        var self = this;

        PageService.GetPage("").then((res) => {
            self.setState({ Page: res.data.data }); 
        });
    }
    render() {
        var self = this;

        if(this.state.Page == null) {
            return (<Grid/>);
        }else{
            return <div>MainPage</div>;
        }
    }
}