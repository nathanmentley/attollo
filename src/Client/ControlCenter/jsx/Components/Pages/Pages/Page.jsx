import React from 'react';

import BasePage from '../BasePage.jsx';

import PageList from './PageList.jsx';

export default class PagesPage extends BasePage {
    render() {
        return (
            <div>
                <PageList SiteID={this.props.params.SiteID} />
            </div>
        );
    }
}