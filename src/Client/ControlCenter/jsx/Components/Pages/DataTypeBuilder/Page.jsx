import React from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import BasePage from '../BasePage.jsx';

import DataTypeDefService from '../../../Services/DataTypeDefService.jsx';

import DataTypeDefList from './DataTypeDefList.jsx';

export default class DataTypeBuilderPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            DataTypeDefs: []
        };
    }
    
    componentDidMount() {
        var self = this;

        self.setPageTitle("Data Types", () => {
            DataTypeDefService.GetDataTypeDefs().then((res) => {
                self.setState({ DataTypeDefs: res.data.data }, () => {
                    self.setBreadCrumbs([
                        {
                            title: "Dashboard",
                            url: "/"
                        },
                        {
                            title: "DataTypes",
                            url: "/DataTypes"
                        }
                    ]);
                });
            });
        });
    }

    _render() {
        return (
            <div>
                <Row>
                    <Col xs={12} md={12}>
                        <DataTypeDefList
                            DataTypeDefs={this.state.DataTypeDefs}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}