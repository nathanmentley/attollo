import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Routing from '../Config/Routing.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Routing />;
    }
}