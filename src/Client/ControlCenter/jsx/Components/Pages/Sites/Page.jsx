import React from 'react';

import BasePage from '../BasePage.jsx';

import SiteList from './SiteList.jsx';

export default class SitesPage extends BasePage {
    render() {
        return (
            <div>
                <SiteList />
            </div>
        );
    }
}