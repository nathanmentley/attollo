import React from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

import BasePage from '../BasePage.jsx';

import PluginDefService from '../../../Services/PluginDefService.jsx';
import PluginService from '../../../Services/PluginService.jsx';

import PluginDefList from './PluginDefList.jsx';

export default class PluginsPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            PluginDefs: [],
            Plugins: []
        };
    }

    componentDidMount() {
        var self = this;    
        self.setPageTitle("Plugins", () => {
            self.setBreadCrumbs([
                {
                    title: "Dashboard",
                    url: "/"
                }
            ]);
        });

        PluginDefService.GetPluginDefs()
        .then((result) => {
            self.setState({ PluginDefs: result.data.data });
        })
        .catch((err) => {
            
        });

        PluginService.GetPlugins()
        .then((result) => {
            self.setState({ Plugins: result.data.data });
        })
        .catch((err) => {
            
        });
    }

    _render() {
        var self = this;

        return (
            <div>
                <Row>
                    <Col xs={12} md={12}>
                        <PluginDefList PluginDefs={this.state.PluginDefs} Plugins={this.state.Plugins} />
                    </Col>
                </Row>
            </div>
        );
    }
}