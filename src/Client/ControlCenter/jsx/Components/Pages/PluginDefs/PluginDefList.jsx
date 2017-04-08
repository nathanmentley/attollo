import React from 'react';
import { Table, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class PluginDefList extends BaseComponent {
    constructor(props) {
        super(props);
	    this.goToThemes = this.goToThemes.bind(this);
	    this.goToWidgetTypes = this.goToWidgetTypes.bind(this);
	    this.goToDataTypeDefs = this.goToDataTypeDefs.bind(this);
        this.goToPluginDefLogics = this.goToPluginDefLogics.bind(this);
    }

	goToThemes(pluginDef) {
		this.goToPage("/Themes/" + pluginDef.id);
	}

	goToWidgetTypes(pluginDef) {
		this.goToPage("/WidgetDefs/" + pluginDef.id);
	}

	goToDataTypeDefs(pluginDef) {
		this.goToPage("/DataTypeDefs/" + pluginDef.id);
	}

	goToPluginDefLogics(pluginDef) {
		this.goToPage("/PluginDefLogics/" + pluginDef.id);
	}

    render() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th className="action-col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.PluginDefs.filter((x) => { return x.clientid != null; }).map((x) => {
                            return (
                                <tr key={x.id}>
                                    <td>{x.code}</td>
                                    <td>{x.name}</td>
                                    <td>{x.description}</td>
                                    <td>
                                        <DropdownButton title={<Glyphicon glyph="cog"/>} id={x.id + '-action-button'}>
	                                        {
		                                        x.clientid != null ?
			                                        <MenuItem eventKey="1" onClick={() => {
				                                        this.goToThemes(x);
			                                        }}>
				                                        <Glyphicon glyph="pencil"/> Edit Plugin details
			                                        </MenuItem> :
			                                        ""
	                                        }
	                                        {
		                                        x.clientid != null ?
			                                        <MenuItem eventKey="2" onClick={() => {
				                                        this.goToThemes(x);
			                                        }}>
				                                        <Glyphicon glyph="blackboard"/> Edit Themes
			                                        </MenuItem> :
			                                        ""
	                                        }
	                                        {
		                                        x.clientid != null ?
			                                        <MenuItem eventKey="3" onClick={() => {
				                                        this.goToThemes(x);
			                                        }}>
				                                        <Glyphicon glyph="cloud"/> Edit Plugin Media
			                                        </MenuItem> :
			                                        ""
	                                        }
                                            {
                                                x.clientid != null ?
                                                    <MenuItem eventKey="4" onClick={() => {
	                                                    this.goToWidgetTypes(x);
                                                    }}>
                                                        <Glyphicon glyph="scale"/> Edit Widget Types
                                                    </MenuItem> :
                                                    ""
                                            }
                                            {
                                                x.clientid != null ?
                                                    <MenuItem eventKey="5" onClick={() => {
                                                        this.goToDataTypeDefs(x);
                                                    }}>
                                                        <Glyphicon glyph="briefcase"/> Edit Data Types
                                                    </MenuItem> :
                                                    ""
                                            }
                                            {
                                                x.clientid != null ?
                                                    <MenuItem eventKey="6" onClick={() => {
	                                                    this.goToPluginDefLogics(x);
                                                    }}>
                                                        <Glyphicon glyph="tasks"/> Edit Logic Overrides
                                                    </MenuItem> :
                                                    ""
                                            }
                                        </DropdownButton>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        );
    }
}