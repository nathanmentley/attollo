import React from 'react';

export default class Html extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col dangerouslySetInnerHTML={this.props.Block.compiledtemplate} />
        );
    }
}