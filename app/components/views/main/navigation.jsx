'use strict';

import React from 'react';
import NavLink from '../../navigation/nav-link';

const Navigation = () => {

  return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <NavLink to="/" onlyActiveOnIndex={true} className="navbar-brand"><img alt="Brand" src="/app/assets/img/logo.jpg" width="80" height="51"/></NavLink>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to={{ pathname: '/personal',  query: { controls: true, edit: true } }}>Personal</NavLink></li>
            <li><NavLink to={{ pathname: '/ads', query: {controls: false}}}>Ads List</NavLink></li>
            <li className="dropdown">
              <NavLink to="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Menu <span className="caret"></span></NavLink>
              <ul className="dropdown-menu">
                <li><NavLink to={{ pathname: '/admin/users', query: {controls: true}}}>Admin</NavLink></li>
                <li><NavLink to={{ pathname: '/personal',  query: { controls: true, edit: true } }}>Personal</NavLink></li>
                <li role="separator" className="divider"></li>
                <li><NavLink to="/">Home</NavLink></li>
                <li role="separator" className="divider"></li>
                <li><NavLink to={{ pathname: '/ads', query: {controls: true}}}>Ads List</NavLink></li>
                <li><NavLink to={{ pathname: '/ad', query: { controls: true, edit: true } }}>Ads Detail</NavLink></li>
                <li role="separator" className="divider"></li>
                <li><NavLink to={{ pathname: '/admin/categories', query: {controls: true}}}>Categories</NavLink></li>

                <li role="separator" className="divider"></li>
                <li><NavLink to="/about">About</NavLink></li>
              </ul>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  children: React.PropTypes.node
}

// ask for `router` from context
Navigation.contextTypes = {
  router: React.PropTypes.object
};

export default Navigation;