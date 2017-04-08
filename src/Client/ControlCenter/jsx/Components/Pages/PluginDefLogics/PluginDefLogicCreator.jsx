import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class PluginDefLogicCreator extends BaseComponent {
	constructor(props) {
		super(props);

		this.close = this.close.bind(this);

		this.updatePluginDefLogicDef = this.updatePluginDefLogicDef.bind(this);
		this.updatePluginDefLogicTarget = this.updatePluginDefLogicTarget.bind(this);
		this.updateTitle = this.updateTitle.bind(this);

		this.savePluginDefLogic = this.savePluginDefLogic.bind(this);
	}

	close() {
		this.props.Close();
	}

	updatePluginDefLogicDef(event) {
		this.props.UpdatePluginDefLogicDef(event.target.value);
	}

	updatePluginDefLogicTarget(event) {
		this.props.UpdatePluginDefLogicTarget(event.target.value);
	}

	updateTitle(event) {
		this.props.UpdateTitle(event.target.value);
	}

	savePluginDefLogic() {
		this.props.SavePluginDefLogic();
	}

	render() {
		return (
			<Modal show={true} onHide={this.close}>
				<Modal.Header closeButton>
					<Modal.Title>Plugin Def Logic</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormGroup
						controlId="pluginDefLogicDef"
					>
						<ControlLabel>Plugin Def Logic Def</ControlLabel>


						<FormGroup
							controlId="name"
						>
							<ControlLabel>Name</ControlLabel>
							<FormControl
								type="text"
								value={this.props.PluginDefLogic.title}
								placeholder="Enter Name"
								onChange={this.updateTitle}
							/>
							<FormControl.Feedback />
							<HelpBlock />
						</FormGroup>

						<FormControl
							componentClass="select"
							placeholder="Enter PluginDefLogicDef"
							value={this.props.PluginDefLogic.plugindeflogicdefid}
							onChange={this.updatePluginDefLogicDef}
						>
							{
								this.props.PluginDefLogicDefs.map((pluginDefLogicDef) => {
									return (
										<option
											key={pluginDefLogicDef.id}
											value={pluginDefLogicDef.id}
										>
											{pluginDefLogicDef.title}
										</option>
									);
								})
							}
						</FormControl>

						<FormControl.Feedback />
						<HelpBlock />
					</FormGroup>
					<FormGroup
						controlId="pluginDefLogicTarget"
					>
						<ControlLabel>Plugin Def Logic Target</ControlLabel>

						<FormControl
							componentClass="select"
							placeholder="Enter PluginDefLogicTarget"
							value={this.props.PluginDefLogic.plugindeflogictargetid}
							onChange={this.updatePluginDefLogicTarget}
						>
							{
								this.props.PluginDefLogicTargets.map((pluginDefLogicTarget) => {
									return (
										<option
											key={pluginDefLogicTarget.id}
											value={pluginDefLogicTarget.id}
										>
											{pluginDefLogicTarget.title}
										</option>
									);
								})
							}
						</FormControl>

						<FormControl.Feedback />
						<HelpBlock />
					</FormGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="primary" onClick={this.savePluginDefLogic}>Create</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}