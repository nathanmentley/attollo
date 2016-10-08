import React from 'react';

import BasePage from '../BasePage.jsx';

import BlockDefList from './BlockDefList.jsx';

export default class PageBuilderPage extends BasePage {
    render() {
        return (
            <div>
                <BlockDefList />
            </div>
        );
    }
}