import React from 'react';

import BaseComponent from '../../BaseComponent.jsx';

export default class PageEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.updateTitle = this.updateTitle.bind(this);
        this.updateUrl = this.updateUrl.bind(this);

        this.savePage = this.savePage.bind(this);
        this.deletePage = this.deletePage.bind(this);
    }

    updateTitle(event) {
        this.props.UpdateTitle(event.target.value);
    }

    updateUrl(event) {
        this.props.UpdateUrl(event.target.value);
    }

    savePage() {
        this.props.SavePage();
    }

    deletePage() {
        this.props.DeletePage();
    }

    render() {
        return (
            <div>
                <input type="text" value={this.props.Page.title} onChange={this.updateTitle} />
                <input type="text" value={this.props.Page.url} onChange={this.updateUrl} />
                <a className="btn btn-primary" onClick={this.savePage}>Save</a>
                <a className="btn btn-secondary" onClick={this.deletePage}>Delete</a>
            </div>
        );
    }
}