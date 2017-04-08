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
	        PluginDefLogics: [],
        	CreatingPluginDefLogic: null,
	        EditingPluginDefLogic: null,
	        PluginDefLogicDefs: [],
	        PluginDefLogicTargets: []
        };

        this.showPluginCreator = this.showPluginCreator.bind(this);
	    this.setEditingPluginDefLogic = this.setEditingPluginDefLogic.bind(this);

	    this.updatePluginDefLogicDef = this.updatePluginDefLogicDef.bind(this);
	    this.updatePluginDefLogicTarget = this.updatePluginDefLogicTarget.bind(this);
	    this.updateTitle = this.updateTitle.bind(this);
	    this.savePluginDefLogic = this.savePluginDefLogic.bind(this);

	    this.updateContent = this.updateContent.bind(this);
    }

    componentDidMount() {
        this.setPageTitle("Plugin Logic", () => {
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

    showPluginCreator() {
    	this.setState({CreatingPluginDefLogic: {
    		title: 'new logic',
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

	updateTitle(value) {
		var newdef = ObjectUtils.Clone(this.state.CreatingPluginDefLogic);
		newdef.title = value;
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

	setEditingPluginDefLogic(pluginLogicDef) {
		var def = ObjectUtils.Clone(pluginLogicDef);
    	this.setState({ EditingPluginDefLogic: def })
	}

	updateContent(value) {
		var newdef = ObjectUtils.Clone(this.state.EditingPluginDefLogic);
		newdef.content = value;
		this.setState({ EditingPluginDefLogic: newdef });
	}

    _render() {
    	var editor = <div/>;

    	if(this.state.CreatingPluginDefLogic != null) {
		    editor = <PluginDefLogicCreator
			    Close={() => { this.setState({CreatingPluginDefLogic: null}); }}
		        PluginDefLogic={this.state.CreatingPluginDefLogic}
			    PluginDefLogicDefs={this.state.PluginDefLogicDefs}
			    PluginDefLogicTargets={this.state.PluginDefLogicTargets}
			    UpdateTitle={this.updateTitle}
			    UpdatePluginDefLogicDef={this.updatePluginDefLogicDef}
			    UpdatePluginDefLogicTarget={this.updatePluginDefLogicTarget}
			    SavePluginDefLogic={this.savePluginDefLogic}
		    />;
	    } else if(this.state.EditingPluginDefLogic != null) {
		    editor = <PluginDefLogicEditor
			    Close={() => { this.setState({EditingPluginDefLogic: null}); }}
			    PluginDefLogic={this.state.EditingPluginDefLogic}
			    PluginDefLogicDefs={this.state.PluginDefLogicDefs}
			    PluginDefLogicTargets={this.state.PluginDefLogicTargets}
			    UpdateContent={this.updateContent}
			    //SavePluginDefLogic={this.savePluginDefLogic}
		    />;
	    }

        return (
            <div>
                <Row>
                    <Col xs={12} md={12}>
                        <PluginDefLogicList
                            PluginDefLogics={this.state.PluginDefLogics}
                            SetEditingPluginDefLogic={this.setEditingPluginDefLogic}
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