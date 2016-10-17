import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Other extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col dangerouslySetInnerHTML={{__html: this.props.Block.compiledtemplate}} />
        );
    }
}