import React from 'react';

export default class Other extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col dangerouslySetInnerHTML={this.props.Block.compiledtemplate} />
        );
    }
}