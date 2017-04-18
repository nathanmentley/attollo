import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';

import BasePage from '../BasePage.jsx';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import CssRuleDefService from '../../../Services/CssRuleDefService.jsx';
import ThemeService from '../../../Services/ThemeService.jsx';
import ThemeCssRuleService from '../../../Services/ThemeCssRuleService.jsx';

import ThemeCreator from './ThemeCreator.jsx';
import ThemeEditor from './ThemeEditor.jsx';
import ThemeStyleEditor from './ThemeStyleEditor.jsx';
import ThemeList from './ThemeList.jsx';

export default class ThemesPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
	        CssRuleDefs: [],

	        EditingTheme: null,

	        CreatingTheme: null,

	        CssEditingTheme: null,
	        EditingThemeStyles: [],
	        EditingThemeSelectors: [],
	        EditingThemeSelector: "",

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
	    this.addSelectorToEditingTheme = this.addSelectorToEditingTheme.bind(this);
	    this.setSelectorForEditingTheme = this.setSelectorForEditingTheme.bind(this);
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
		        this.setState({ CssRuleDefs: res.data.data });
	        });
    }

	openCssEditor(theme) {
        ThemeCssRuleService.GetThemeCssRules(theme.id)
			.then((res) => {
				var selectors = res.data.data.map((x) => { return x.CssRule.selector});
				selectors = selectors.filter((v,i) => { return selectors.indexOf(v) == i; });
				var selector = selectors.length > 0 ? selectors[0] : "";

                this.setState({
                	CssEditingTheme: theme,
	                EditingThemeStyles: res.data.data,
	                EditingThemeSelectors: selectors,
	                EditingThemeSelector: selector
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

	saveThemeStyle() {
		ThemeCssRuleService.UpdateThemeCssRules(this.state.EditingThemeStyles)
			.then(() => {
				this.setState({
					CssEditingTheme: null,
					EditingThemeStyles: [],
					EditingThemeSelectors: [],
					EditingThemeSelector: ""
				});
			});
	}

	updateThemeStyle(code, value) {
		var newStyles = ObjectUtils.Clone(this.state.EditingThemeStyles);

		if (newStyles.some((x) => { return x.CssRule.CssRuleDef.code == code && x.CssRule.selector == this.state.EditingThemeSelector; })) {
			for(var i = 0; i < newStyles.length; i++) {
				var newStyle = newStyles[i];

				if(newStyle.CssRule.CssRuleDef.code == code && newStyle.CssRule.selector == this.state.EditingThemeSelector) {
					newStyle.CssRule.value = value;
				}
			}
		} else {
			newStyles.push({
				CssRule: {
					CssRuleDef: {
						code: code
					},
					value: value,
					selector: this.state.EditingThemeSelector
				},
				themeid: this.state.CssEditingTheme.id
			});
		}

		this.setState({ EditingThemeStyles: newStyles });
	}

	addSelectorToEditingTheme(selector) {
    	var selectors = ObjectUtils.Clone(this.state.EditingThemeSelectors);
    	selectors.push(selector);
    	this.setState({ EditingThemeSelectors: selectors }, () => {
    		this.setSelectorForEditingTheme(selector);
	    });
	}

	setSelectorForEditingTheme(selector) {
		this.setState({ EditingThemeSelector: selector });
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

			    Selectors={this.state.EditingThemeSelectors}
		        Selector={this.state.EditingThemeSelector}
			    AddSelector={this.addSelectorToEditingTheme}
			    ChangeSelector={this.setSelectorForEditingTheme}
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