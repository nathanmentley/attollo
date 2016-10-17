import React from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import Main from '../Components/Pages/Main/Page.jsx';

export default class Routing extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="*" component={Main}/>
            </Router>
        );
    }
}