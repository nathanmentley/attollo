import React from 'react';
import { Grid, Row, Col, Modal, Button, PanelGroup, Panel, ListGroup, ListGroupItem, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import CssRuleEditor from '../../Shared/CssRuleEditor.jsx';

import BaseComponent from '../../BaseComponent.jsx';

import ArrayUtils from '../../../Utils/ArrayUtils.jsx';

export default class ThemeStyleEditor extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			currentDefCode: null,
			activePanelKey: null,
			newSelector: null
		};

		this.setCurrentDefCode = this.setCurrentDefCode.bind(this);
		this.updateCurrentPanel = this.updateCurrentPanel.bind(this);

		this.close = this.close.bind(this);

		this.getValueFromCode = this.getValueFromCode.bind(this);
		this.setValueForCode = this.setValueForCode.bind(this);

		this.saveThemeStyle = this.saveThemeStyle.bind(this);

		this.addSelector = this.addSelector.bind(this);
		this.changeSelector = this.changeSelector.bind(this);
	}

	setCurrentDefCode(code) {
		this.setState({ currentDefCode: code });
	}

	updateCurrentPanel(activeKey) {
		this.setState({ activePanelKey: activeKey });
	}

	close() {
		if (this.props.Close) {
			this.props.Close();
		}
	}

	getValueFromCode(code) {
		if (this.props.ThemeStyles != null) {
			for(var i = 0; i < this.props.ThemeStyles.length; i++) {
				var themeStyle = this.props.ThemeStyles[i];

				if(themeStyle.CssRule.CssRuleDef.code == code && themeStyle.CssRule.selector == this.props.Selector) {
					return themeStyle.CssRule.value;
				}
			}
		}

		return '';
	}

	setValueForCode(code, value) {
		if (this.props.UpdateThemeStyle) {
			this.props.UpdateThemeStyle(code, value);
		}
	}

	saveThemeStyle() {
		if(this.props.SaveThemeStyle) {
			this.props.SaveThemeStyle();
		}
	}

	addSelector() {
		this.props.AddSelector(this.state.newSelector);

		this.setState({ newSelector: null });
	}

	changeSelector(event) {
		this.props.ChangeSelector(event.target.value);
	}

	render() {
		var self = this;
		var cssRuleGroups = ArrayUtils.GetUnique(this.props.CssRuleDefs, (x) => x.CssRuleDefGroup.code);

		var styleEditor = <div />;

		if(this.state.currentDefCode != null) {
			var cssRuleDef = this.props.CssRuleDefs.find((x) => { return x.code == self.state.currentDefCode; });

			styleEditor = <CssRuleEditor
				CssRuleDef={cssRuleDef}
				GetValueFromCode={self.getValueFromCode}
				SetValueForCode={self.setValueForCode}
			/>;
		}

		return (
			<Modal className="style-editor-modal" show={true} onHide={this.close}>
				<Modal.Header closeButton>
					<Modal.Title>{this.props.Theme.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<Row>
							<Col md={9}>
								{
									(this.state.newSelector != null) ?
										<FormGroup controlId="selector" >
											<ControlLabel>Selector</ControlLabel>
											<FormControl
												type="text"
												value={this.state.newSelector}
												placeholder="Selector"
												onChange={(event) => { this.setState({ newSelector: event.target.value }); }}
											/>
											<FormControl.Feedback />
											<HelpBlock />
										</FormGroup>
										:
										<FormGroup controlId="selector" >
											<ControlLabel>Selector</ControlLabel>
											<FormControl
												componentClass="select"
												value={this.props.Selector}
												placeholder="Selector"
												onChange={this.changeSelector}
											>
												{
													this.props.Selectors.map((x) => {
														return (
															<option
																key={x}
																value={x}
															>
																{x}
															</option>
														);
													})
												}
											</FormControl>
											<FormControl.Feedback />
											<HelpBlock />
											</FormGroup>
								}
							</Col>
							<Col md={3}>
								{
									(this.state.newSelector != null) ?
										<div>
											<Button bsStyle="primary" onClick={this.addSelector}>Save</Button>
											<Button bsStyle="danger" onClick={() => { this.setState({ newSelector: null }); }}>cancel</Button>
										</div>
										:
										<Button bsStyle="info" onClick={() => { this.setState({ newSelector: "" }); }}>New Selector</Button>
								}
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<PanelGroup activeKey={this.state.activePanelKey} onSelect={this.updateCurrentPanel} accordion>
									{
										cssRuleGroups.map((group) => {
											return (
												<Panel key={group} header={group} eventKey={group}>
													<ListGroup fill>
														{
															self.props.CssRuleDefs.filter((def) => { return def.CssRuleDefGroup.code == group; }).map((def) => {
																return (
																	<ListGroupItem
																		className="css-rule-def-selector"
																		key={def.id}
																		onClick={() => { self.setCurrentDefCode(def.code); }}
																	>
																		{def.name} - {def.description}
																	</ListGroupItem>
																);
															})
														}
													</ListGroup>
												</Panel>
											);
										})
									}
								</PanelGroup>
							</Col>
							<Col md={6}>
								{styleEditor}
							</Col>
						</Row>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="primary" onClick={this.saveThemeStyle}>Save</Button>
					<Button bsStyle="warning" onClick={this.close}>Cancel</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}