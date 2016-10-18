import React from 'react';

import BaseComponent from '../../BaseComponent.jsx';

export default class SiteEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.updateName = this.updateName.bind(this);
        this.updateDomain = this.updateDomain.bind(this);

        this.saveSite = this.saveSite.bind(this);
        this.deleteSite = this.deleteSite.bind(this);
    }

    updateName(event) {
        this.props.UpdateName(event.target.value);
    }

    updateDomain(event) {
        this.props.UpdateDomain(event.target.value);
    }

    saveSite() {
        this.props.SaveSite();
    }

    deleteSite() {
        this.props.DeleteSite();
    }

    render() {
        return (
            <div>
                <input type="text" value={this.props.Site.name} onChange={this.updateName} />
                <input type="text" value={this.props.Site.domain} onChange={this.updateDomain} />
                <a className="btn btn-primary" onClick={this.saveSite}>Save</a>
                <a className="btn btn-secondary" onClick={this.deleteSite}>Delete</a>
            </div>
        );
    }
}