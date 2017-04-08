import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import BasePage from '../BasePage.jsx';

import PluginDefLogicService from '../../../Services/PluginDefLogicService.jsx';
import PluginDefLogicDefService from '../../../Services/PluginDefLogicDefService.jsx';
import PluginDefLogicTargetService from '../../../Services/PluginDefLogicTargetService.jsx';

import PluginDefLogicList from './PluginDefLogicList.jsx';
import PluginDefLogicEditor from './PluginDefLogicEditor.jsx';
import PluginDefLogicCreator from './PluginDefLogicCreator.jsx';

export default class PluginDefLogicsPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
        	CreatingPluginDefLogic: null,
            PluginDefLogics: [],
	        EditingPluginDefLogic: null,
	        PluginDefLogicDefs: [],
	        PluginDefLogicTargets: []
        };

        this.addNewPluginDefLogic = this.addNewPluginDefLogic.bind(this);
        this.showPluginCreator = this.showPluginCreator.bind(this);

	    this.updatePluginDefLogicDef = this.updatePluginDefLogicDef.bind(this);
	    this.updatePluginDefLogicTarget = this.updatePluginDefLogicTarget.bind(this);
	    this.savePluginDefLogic = this.savePluginDefLogic.bind(this);
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
	    PluginDefLogicDefService.GetPluginDefLogicDefs()
		    .then((res) => {
			    this.setState({ PluginDefLogicDefs: res.data.data });
		    });
	    PluginDefLogicTargetService.GetPluginDefLogicTargets()
		    .then((res) => {
			    this.setState({ PluginDefLogicTargets: res.data.data });
		    });
    }

	addNewPluginDefLogic() {
		PluginDefLogicService.AddPluginDefLogic({
			PluginDefLogicDefID: '',
			PluginDefLogicTargetID: '',
			PluginDefID: '',
			Content: '',
			CompiledContent: ''
		})
			.then(() => {
				PluginDefLogicService.GetPluginDefLogics(this.props.params.PluginDefID)
					.then((res) => {
						this.setState({ PluginDefLogics: res.data.data });
					});
			});
    }

    showPluginCreator() {
    	this.setState({CreatingPluginDefLogic: {
		    plugindefid: this.props.params.PluginDefID,
		    plugindeflogicdefid: this.state.PluginDefLogicDefs[0].id,
		    plugindeflogictargetid: this.state.PluginDefLogicTargets[0].id
	    }});
    }

	updatePluginDefLogicDef(value) {
		var newdef = ObjectUtils.Clone(this.state.CreatingPluginDefLogic);
		newdef.plugindeflogicdefid = value;
		this.setState({ CreatingPluginDefLogic: newdef });
	}

	updatePluginDefLogicTarget(value) {
		var newdef = ObjectUtils.Clone(this.state.CreatingPluginDefLogic);
		newdef.plugindeflogictargetid = value;
		this.setState({ CreatingPluginDefLogic: newdef });
	}

	savePluginDefLogic() {
		PluginDefLogicService.AddPluginDefLogic(this.state.CreatingPluginDefLogic)
			.then(() => {
				PluginDefLogicService.GetPluginDefLogics(this.props.params.PluginDefID)
					.then((res) => {
						this.setState({
							PluginDefLogics: res.data.data,
							CreatingPluginDefLogic: null
						});
					});
			})

	}

    _render() {
    	var editor = <div/>;

    	if(this.state.CreatingPluginDefLogic) {
		    editor = <PluginDefLogicCreator
			    Close={() => { this.setState({CreatingPluginDefLogic: null}); }}
		        PluginDefLogic={this.state.CreatingPluginDefLogic}
			    PluginDefLogicDefs={this.state.PluginDefLogicDefs}
			    PluginDefLogicTargets={this.state.PluginDefLogicTargets}
			    UpdatePluginDefLogicDef={this.updatePluginDefLogicDef}
			    UpdatePluginDefLogicTarget={this.updatePluginDefLogicTarget}
			    SavePluginDefLogic={this.savePluginDefLogic}
		    />;
	    } else if(this.state.EditingPluginDefLogic != null) {
		    editor = <PluginDefLogicEditor />;
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
                        <div className="btn btn-primary pull-right" onClick={this.showPluginCreator}>
                            <Glyphicon glyph="plus" /> Add New Plugin Logic
                        </div>
                    </Col>
                </Row>

	            {editor}
            </div>
        );
    }
}