import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Main from './Pages/Main/Page.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Main
                Pages={this.props.Pages}
                BlockContainers={this.props.BlockContainers}
                Page={this.props.Page}
                TemplateProcessor={this.props.TemplateProcessor}
                DataTypeResolver={this.props.DataTypeResolver}
            />
        );
    }
}