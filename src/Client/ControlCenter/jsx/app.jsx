import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import Header from './Components/Layout/Header.jsx';
import Footer from './Components/Layout/Footer.jsx';

import Main from './Components/Main/Page.jsx';

render(
    (
        <div>
            <Header />

            <Router history={browserHistory}>
                <Route path="/" component={Main}>
                    <IndexRoute component={Main}/>
                    <Route path="page1" component={Main} />
                    <Route path="page2" component={Main} />
                </Route>
            </Router>

            <Footer />
        </div>
    ),
    document.getElementById('app-container"')
);