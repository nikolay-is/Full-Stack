'use strict';

import $ from './helpers/jquery-global';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute,  useRouterHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useQueries } from 'history';

import AdsListingSystem from './components/views/ads-listing-system';

import Ad from './components/views/ads/ad';
import AdsList from './components/views/ads/ads-list';

import User from './components/views/users/user';
import UserList from './components/views/users/user-list'

import Category from './components/views/ads/category-list';

import Home from './components/views/main/home';
import About from './components/views/main/about';

window.jQuery = $;
const appHistory = useQueries(useRouterHistory(createBrowserHistory))();

ReactDOM.render((
    <Router history={appHistory}>
        <Route path="/" component={AdsListingSystem}>
            <IndexRoute component={Home}/>
            <Route path="/admin/users" component={UserList}/>
            <Route path="/personal(/:userId)" component={User}/>
            <Route path="/admin/category" component={Category}/>
            <Route path="/ads" component={AdsList}/>
            <Route path="/ad(/:adId)" component={Ad}/>
            <Route path="/about" component={About}/>
        </Route>
    </Router>

), document.getElementById('root'));


