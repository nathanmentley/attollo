import React from 'react';
import { browserHistory } from 'react-router';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.changePage = this.changePage.bind(this);
    }

    changePage(url) {
        browserHistory.push(url);
    }

    render() {
        var self = this;

        if (this.props.IsAuthenticated) {
            return (
                <div>
                    <a onClick={function() { self.changePage('/Main')} }>Main</a>
                    <a onClick={function() { self.changePage('/Sites')} }>Sites</a>
                    <a onClick={function() { self.changePage('/About')} }>About</a>
                    <a onClick={function() { self.changePage('/Login')} }>Logout</a>
                </div>
            );
        } else {
            return (<div />);
        }
    }
}