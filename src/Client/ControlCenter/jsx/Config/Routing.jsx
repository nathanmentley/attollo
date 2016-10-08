import React from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import Login from '../Components/Pages/Login/Page.jsx';
import Main from '../Components/Pages/Main/Page.jsx';
import About from '../Components/Pages/About/Page.jsx';

import Error404 from '../Components/Pages/Error404/Page.jsx';

export default class Routing extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/Login" component={Login} />
                <Route path="/About" component={About} />
                <Route path="/" component={Main} />
                <Route path="*" component={Error404}/>
            </Router>
        );
    }
}