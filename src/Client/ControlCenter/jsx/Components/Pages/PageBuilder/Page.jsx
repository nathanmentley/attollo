import React from 'react';

import BasePage from '../BasePage.jsx';

import BlockDefList from './BlockDefList.jsx';
import BlockList from './BlockList.jsx';

export default class PageBuilderPage extends BasePage {
    render() {
        return (
            <div>
                <BlockDefList />
                <BlockList />
            </div>
        );
    }
}