import React from 'react';
import { browserHistory } from 'react-router';

import BaseComponent from '../../BaseComponent.jsx';

export default class SiteVersionList extends BaseComponent {
    constructor(props) {
        super(props);

        this.goToPageBin = this.goToPageBin.bind(this);
    }

    goToPageBin(siteVersionId) {
        browserHistory.push("/Pages/" + siteVersionId);
    }

    render() {
        var self = this;

        return (
            <div>
                {
                    this.props.SiteVersions.map((x) => {
                        return (
                            <div key={x.id}>
                                <a onClick={() => { self.goToPageBin(x.id); }}>Version: {x.id}</a>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}