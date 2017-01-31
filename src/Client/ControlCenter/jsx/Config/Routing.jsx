import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Auth from './Auth.jsx';

import PageUtils from '../../../Common/jsx/Utils/PageUtils.jsx';

import Login from '../Components/Pages/Login/Page.jsx';

import Plugins from '../Components/Pages/Plugins/Page.jsx';
import DataTypeDefs from '../Components/Pages/DataTypeDefs/Page.jsx';
import DataTypeDefBuilder from '../Components/Pages/DataTypeDefBuilder/Page.jsx';

import FileSystem from '../Components/Pages/FileSystem/Page.jsx';

import Sites from '../Components/Pages/Sites/Page.jsx';
import SiteVersions from '../Components/Pages/SiteVersions/Page.jsx';
import Pages from '../Components/Pages/Pages/Page.jsx';
import PageBuilder from '../Components/Pages/PageBuilder/Page.jsx';

import DataTypes from '../Components/Pages/DataTypes/Page.jsx';
import DataTypeBuilder from '../Components/Pages/DataTypeBuilder/Page.jsx';

import Users from '../Components/Pages/Users/Page.jsx';

import Account from '../Components/Pages/Account/Page.jsx';

import Dashboard from '../Components/Pages/Dashboard/Page.jsx';

import Error404 from '../Components/Pages/Error404/Page.jsx';

export default class Routing extends React.Component {
    render() {
        return (
            <Router history={PageUtils.GetHistory()}>
                <Route path="/Login" component={Login} />

                <Route path="/Plugins" component={Plugins} onEnter={Auth.AuthRequired} />
                <Route path="/DataTypeDefs/:PluginDefID" component={DataTypeDefs} onEnter={Auth.AuthRequired} />
                <Route path="/DataTypeDefs/:PluginDefID/:DataTypeDefID" component={DataTypeDefBuilder} onEnter={Auth.AuthRequired} />

                <Route path="/FileSystem" component={FileSystem} onEnter={Auth.AuthRequired} />

                <Route path="/Sites" component={Sites} onEnter={Auth.AuthRequired} />
                <Route path="/Sites/:SiteID" component={SiteVersions} onEnter={Auth.AuthRequired} />
                <Route path="/Sites/:SiteID/:SiteVersionID" component={Pages} onEnter={Auth.AuthRequired} />
                <Route path="/Sites/:SiteID/:SiteVersionID/:PageID/:PageDefID" component={PageBuilder} onEnter={Auth.AuthRequired} />

                <Route path="/DataTypes" component={DataTypes} onEnter={Auth.AuthRequired} />
                <Route path="/DataTypes/:DataTypeDefID" component={DataTypeBuilder} onEnter={Auth.AuthRequired} />
                
                <Route path="/Users" component={Users} onEnter={Auth.AuthRequired} />

                <Route path="/Account" component={Account} onEnter={Auth.AuthRequired} />

                <Route path="/Dashboard" component={Dashboard} onEnter={Auth.AuthRequired} />
                <Route path="/" component={Dashboard} onEnter={Auth.AuthRequired} />

                <Route path="*" component={Error404}/>
            </Router>
        );
    }
}