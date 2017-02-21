import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';

import BasePage from '../BasePage.jsx';

import PluginDefLogicList from './PluginDefLogicList.jsx';

export default class PluginDefLogicsPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            PluginDefLogics: []
        };

        this.addNewPluginDefLogic = this.addNewPluginDefLogic.bind(this);
    }

    componentDidMount() {
        var self = this;    
        self.setPageTitle("Plugins", () => {
            self.setBreadCrumbs([
	            {
		            title: "Dashboard",
		            url: "/"
	            },
	            {
		            title: "Plugins",
		            url: "/PluginDefs"
	            }
            ]);
        });
    }

	addNewPluginDefLogic() {
    }

    _render() {
        return (
            <div>
                <Row>
                    <Col xs={12} md={12}>
                        <PluginDefLogicList
                            PluginDefLogics={this.state.PluginDefLogics}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={12} className="page-action-bar">
                        <div className="btn btn-primary pull-right" onClick={this.addNewPluginDefLogic}>
                            <Glyphicon glyph="plus" /> Add New Plugin Logic
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}