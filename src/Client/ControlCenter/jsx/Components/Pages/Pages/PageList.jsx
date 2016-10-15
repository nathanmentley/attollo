import React from 'react';
import { browserHistory } from 'react-router';

import PageService from '../../../Services/PageService.jsx';

import BaseComponent from '../../BaseComponent.jsx';

export default class PageList extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            Pages: []
        };
    }
    
    componentDidMount() {
        var self = this;

        PageService.GetPages(this.props.SiteID).then((res) => {
            self.setState({ Pages: res.data.data }); 
        });
    }

    goToPageBuilder(pageId) {
        browserHistory.push("/PageBuilder/" + pageId);
    }

    render() {
        var self = this;

        return (
            <div>
                {
                    this.state.Pages.map((x) => {
                        return (
                            <div key={x.id}>
                                <a onClick={() => { self.goToPageBuilder(x.id); }}>{x.title}</a>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}