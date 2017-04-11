import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';

import BasePage from '../BasePage.jsx';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import ThemeService from '../../../Services/ThemeService.jsx';

import ThemeCreator from './ThemeCreator.jsx';
import ThemeEditor from './ThemeEditor.jsx';
import ThemeList from './ThemeList.jsx';

export default class ThemesPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
	        CreatingTheme: null,
	        EditingTheme: null,
            Themes: []
        };

        this.addNewTheme = this.addNewTheme.bind(this);

	    this.setCreatingTheme = this.setCreatingTheme.bind(this);

	    this.setEditingTheme = this.setEditingTheme.bind(this);
	    this.saveTheme = this.saveTheme.bind(this);
	    this.deleteTheme = this.deleteTheme.bind(this);

	    this.updateName = this.updateName.bind(this);
	    this.updateCode = this.updateCode.bind(this);
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

	setCreatingTheme() {
		this.setState({CreatingTheme: {}});
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
						    }),
						    CreatingTheme: null
					    });
				    });
		    });
    }

	setEditingTheme(theme) {
		this.setState({EditingTheme: theme});
	}

	saveTheme() {
		ThemeService.UpdateTheme(this.state.EditingTheme)
			.then(() => {
				ThemeService.GetThemes()
					.then((res) => {
						this.setState({
							Themes: res.data.data.filter((x) => {
								return x.plugindefid == this.props.params.PluginDefID;
							}),
							EditingTheme: null
						});
					});
			});
	}

	deleteTheme() {
		ThemeService.DeleteTheme(this.state.EditingTheme)
			.then(() => {
				ThemeService.GetThemes()
					.then((res) => {
						this.setState({
							Themes: res.data.data.filter((x) => {
								return x.plugindefid == this.props.params.PluginDefID;
							}),
							EditingTheme: null
						});
					});
			});
	}

	updateName(value) {
		if(this.state.CreatingTheme != null) {
			var theme = ObjectUtils.Clone(this.state.CreatingTheme);
			theme.name = value;
			this.setState({ CreatingTheme: theme });
		} else if(this.state.EditingTheme != null) {
			var theme = ObjectUtils.Clone(this.state.EditingTheme);
			theme.name = value;
			this.setState({ EditingTheme: theme });
		}
	}

	updateCode(value) {
		if(this.state.CreatingTheme != null) {
			var theme = ObjectUtils.Clone(this.state.CreatingTheme);
			theme.code = value;
			this.setState({ CreatingTheme: theme });
		} else if(this.state.EditingTheme != null) {
			var theme = ObjectUtils.Clone(this.state.EditingTheme);
			theme.code = value;
			this.setState({ EditingTheme: theme });
		}
	}

    _render() {
	    var editor = <div/>;

	    if(this.state.CreatingTheme != null) {
		    editor = <ThemeCreator
			    Close={() => { this.setState({CreatingTheme: null}); }}
			    Theme={this.state.CreatingTheme}
			    SaveTheme={this.addNewTheme}
			    UpdateName={this.updateName}
			    UpdateCode={this.updateCode}
		    />;
	    } else if(this.state.EditingTheme != null) {
		    editor = <ThemeEditor
			    Close={() => { this.setState({EditingTheme: null}); }}
			    Theme={this.state.EditingTheme}
			    SaveTheme={this.saveTheme}
			    DeleteTheme={this.deleteTheme}
			    UpdateName={this.updateName}
			    UpdateCode={this.updateCode}
		    />;
	    }

        return (
            <div>
                <Row>
                    <Col xs={12} md={12}>
                        <ThemeList
                            Themes={this.state.Themes}
                            SetEditingTheme={this.setEditingTheme}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={12} className="page-action-bar">
                        <div className="btn btn-primary pull-right" onClick={this.setCreatingTheme}>
                            <Glyphicon glyph="plus" /> Add New Theme
                        </div>
                    </Col>
                </Row>

	            {editor}
            </div>
        );
    }
}