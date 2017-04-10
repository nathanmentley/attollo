import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';

import BasePage from '../BasePage.jsx';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import ThemeService from '../../../Services/ThemeService.jsx';

import ThemeList from './ThemeList.jsx';

export default class ThemesPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            Themes: []
        };

        this.addNewTheme = this.addNewTheme.bind(this);
    }

    componentDidMount() {
        this.setPageTitle("Themes", () => {
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

	    ThemeService.GetThemes()
		    .then((res) => {
			    this.setState({
				    Themes: res.data.data.filter((x) => {
					    return x.plugindefid == this.props.params.PluginDefID;
				    })
			    });
		    });
    }

	addNewTheme() {
    	ThemeService.AddTheme({
    		plugindefid: this.props.params.PluginDefID,
		    code: 'code',
			name: 'name'
	    })
		    .then(() => {
			    ThemeService.GetThemes()
				    .then((res) => {
					    this.setState({
						    Themes: res.data.data.filter((x) => {
							    return x.plugindefid == this.props.params.PluginDefID;
						    })
					    });
				    });
		    });
    }

    _render() {
        return (
            <div>
                <Row>
                    <Col xs={12} md={12}>
                        <ThemeList
                            Themes={this.state.Themes}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={12} className="page-action-bar">
                        <div className="btn btn-primary pull-right" onClick={this.addNewTheme}>
                            <Glyphicon glyph="plus" /> Add New Theme
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}