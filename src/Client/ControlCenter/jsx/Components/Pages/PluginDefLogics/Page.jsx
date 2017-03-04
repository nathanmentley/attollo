import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';

import BasePage from '../BasePage.jsx';

import PluginDefLogicService from '../../../Services/PluginDefLogicService.jsx';

import PluginDefLogicList from './PluginDefLogicList.jsx';
import PluginDefLogicEditor from './PluginDefLogicEditor.jsx';

export default class PluginDefLogicsPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            PluginDefLogics: [],
	        EditingPluginDefLogic: null
        };

        this.addNewPluginDefLogic = this.addNewPluginDefLogic.bind(this);
    }

    componentDidMount() {
        this.setPageTitle("Plugins", () => {
            this.setBreadCrumbs([
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

	    PluginDefLogicService.GetPluginDefLogics(this.props.params.PluginDefID)
		    .then((res) => {
			    this.setState({ PluginDefLogics: res.data.data });
		    });
    }

	addNewPluginDefLogic() {
    }

    _render() {
    	var editor = <div/>;

	    if(this.state.EditingPluginDefLogic != null) {
		    editor = <PluginDefLogicEditor

		    />;
	    }

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

	            {editor}
            </div>
        );
    }
}