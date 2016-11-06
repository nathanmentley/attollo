import React from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import Auth from './Auth.jsx';

import Login from '../Components/Pages/Login/Page.jsx';

import Sites from '../Components/Pages/Sites/Page.jsx';
import SiteVersions from '../Components/Pages/SiteVersions/Page.jsx';
import Pages from '../Components/Pages/Pages/Page.jsx';
import PageBuilder from '../Components/Pages/PageBuilder/Page.jsx';

import Users from '../Components/Pages/Users/Page.jsx';
import Account from '../Components/Pages/Account/Page.jsx';

import Dashboard from '../Components/Pages/Dashboard/Page.jsx';
import Reports from '../Components/Pages/Reports/Page.jsx';

import Error404 from '../Components/Pages/Error404/Page.jsx';

export default class Routing extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/Login" component={Login} />

                <Route path="/Sites" component={Sites} onEnter={Auth.AuthRequired} />
                <Route path="/Sites/:SiteID" component={SiteVersions} onEnter={Auth.AuthRequired} />
                <Route path="/Sites/:SiteID/:SiteVersionID" component={Pages} onEnter={Auth.AuthRequired} />
                <Route path="/Sites/:SiteID/:SiteVersionID/:PageID/:PageDefID" component={PageBuilder} onEnter={Auth.AuthRequired} />

                <Route path="/Users" component={Users} onEnter={Auth.AuthRequired} />
                <Route path="/Account" component={Account} onEnter={Auth.AuthRequired} />

                <Route path="/Dashboard" component={Dashboard} onEnter={Auth.AuthRequired} />
                <Route path="/Reports" component={Reports} onEnter={Auth.AuthRequired} />

                <Route path="/" component={Dashboard} onEnter={Auth.AuthRequired} />

                <Route path="*" component={Error404}/>
            </Router>
        );
    }
}