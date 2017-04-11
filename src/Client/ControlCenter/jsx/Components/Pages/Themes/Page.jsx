import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';

import BasePage from '../BasePage.jsx';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import CssRuleDefService from '../../../Services/CssRuleDefService.jsx';
import ThemeService from '../../../Services/ThemeService.jsx';

import ThemeCreator from './ThemeCreator.jsx';
import ThemeEditor from './ThemeEditor.jsx';
import ThemeStyleEditor from './ThemeStyleEditor.jsx';
import ThemeList from './ThemeList.jsx';

export default class ThemesPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
	        CssRuleDefs: [],

        	CssEditingTheme: null,
	        CreatingTheme: null,
	        EditingTheme: null,
	        EditingThemeStyles: [],

            Themes: []
        };

        this.openCssEditor = this.openCssEditor.bind(this);

        this.addNewTheme = this.addNewTheme.bind(this);

	    this.setCreatingTheme = this.setCreatingTheme.bind(this);

	    this.setEditingTheme = this.setEditingTheme.bind(this);
	    this.saveTheme = this.saveTheme.bind(this);
	    this.deleteTheme = this.deleteTheme.bind(this);

	    this.updateName = this.updateName.bind(this);
	    this.updateCode = this.updateCode.bind(this);

	    this.saveThemeStyle = this.saveThemeStyle.bind(this);
	    this.updateThemeStyle = this.updateThemeStyle.bind(this);
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


	    CssRuleDefService.GetCssRuleDefs()
		    .then((res) => {
		        self.setState({ CssRuleDefs: res.data.data });
	        });
    }

	openCssEditor(theme) {
    	this.setState({CssEditingTheme: theme});
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

	saveThemeStyle() {
    	/*
		BlockCssRuleService.UpdateBlockCssRules(this.state.EditingStyleBlockStyles)
			.then(() => {
				this.setState({ EditingStyleBlock: null,  EditingStyleBlockStyles: null });
			});
		*/
	}

	updateThemeStyle() {
    	/*
		var newBlockStyles = ObjectUtils.Clone(this.state.EditingStyleBlockStyles);

		if (newBlockStyles.some((x) => { return x.CssRule.CssRuleDef.code == code; })) {
			for(var i = 0; i < newBlockStyles.length; i++) {
				var newBlockStyle = newBlockStyles[i];

				if(newBlockStyle.CssRule.CssRuleDef.code == code) {
					newBlockStyle.CssRule.value = value;
				}
			}
		} else {
			newBlockStyles.push({
				CssRule: {
					CssRuleDef: {
						code: code
					},
					value: value,
					selector: '#' + this.state.EditingStyleBlock.id
				},
				blockid: this.state.EditingStyleBlock.id
			});
		}

		this.setState({ EditingStyleBlockStyles: newBlockStyles });
		*/
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
	    } else if(this.state.CssEditingTheme != null) {
		    editor = <ThemeStyleEditor
			    Close={() => { this.setState({CssEditingTheme: null}); }}
			    CssRuleDefs={this.state.CssRuleDefs}
			    Theme={this.state.CssEditingTheme}
			    ThemeStyles={this.state.EditingThemeStyles}
			    SaveThemeStyle={this.saveThemeStyle}
			    UpdateThemeStyle={this.updateThemeStyle}
		    />;
	    }

        return (
            <div>
                <Row>
                    <Col xs={12} md={12}>
                        <ThemeList
                            Themes={this.state.Themes}
                            SetEditingTheme={this.setEditingTheme}
                            OpenCssEditor={this.openCssEditor}
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