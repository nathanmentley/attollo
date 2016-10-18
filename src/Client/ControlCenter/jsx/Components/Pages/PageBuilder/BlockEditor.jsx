import React from 'react';

import BaseComponent from '../../BaseComponent.jsx';

export default class BlockEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.updateTitle = this.updateTitle.bind(this);
        this.updateTemplate = this.updateTemplate.bind(this);

        this.saveBlock = this.saveBlock.bind(this);
        this.deleteBlock = this.deleteBlock.bind(this);
    }

    updateTitle(event) {
        this.props.UpdateTitle(event.target.value);
    }

    updateTemplate(event) {
        this.props.UpdateTemplate(event.target.value);
    }

    saveBlock() {
        this.props.SaveBlock();
    }

    deleteBlock() {
        this.props.DeleteBlock();
    }

    render() {
        return (
            <div>
                <input type="text" value={this.props.Block.title} onChange={this.updateTitle} />
                <textarea type="text" value={this.props.Block.template} onChange={this.updateTemplate} />
                <a className="btn btn-primary" onClick={this.saveBlock}>Save</a>
                <a className="btn btn-secondary" onClick={this.deleteBlock}>Delete</a>
            </div>
        );
    }
}