import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Other extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var template = eval("var f = function(){ return " + this.props.Block.compiledtemplate + ";}; f() ;") ;

        return template({});
    }
}