import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Routing from '../Config/Routing.jsx';

import Header from './Layout/Header.jsx';
import Footer from './Layout/Footer.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var self = this;
    }

    render() {
        return(
            <Routing />
        );
    }
}