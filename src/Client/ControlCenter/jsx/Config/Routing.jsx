import React from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import Auth from './Auth.jsx';

import Login from '../Components/Pages/Login/Page.jsx';
import Main from '../Components/Pages/Main/Page.jsx';
import About from '../Components/Pages/About/Page.jsx';

import Error404 from '../Components/Pages/Error404/Page.jsx';

export default class Routing extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/Login" component={Login} />
                <Route path="/About" component={About} onEnter={Auth.AuthRequired} />
                <Route path="/" component={Main} onEnter={Auth.AuthRequired} />
                <Route path="*" component={Error404}/>
            </Router>
        );
    }
}