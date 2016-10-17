import React from 'react';

import BaseComponent from '../../BaseComponent.jsx';

export default class PageList extends BaseComponent {
    constructor(props) {
        super(props);

        this.goToPageBuilder = this.goToPageBuilder.bind(this);
        this.setEditingPage = this.setEditingPage.bind(this);
    }

    goToPageBuilder(pageId) {
        this.goToPage("/PageBuilder/" + pageId);
    }

    setEditingPage(page) {
        this.props.SetEditingPage(page);
    }

    render() {
        var self = this;

        return (
            <div>
                {
                    this.props.Pages.map((x) => {
                        return (
                            <div key={x.id}>
                                <a onClick={() => { self.setEditingPage(x); }}>{x.title}</a>
                                <span> - </span>
                                <a onClick={() => { self.goToPageBuilder(x.id); }}>edit</a>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}