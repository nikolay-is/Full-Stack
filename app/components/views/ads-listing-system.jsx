'use strict';

import React from 'react';
import Navigation from './main/navigation';

import UserService from '../../services/user.service';
import AdService from '../../services/ad.service';
import CategoryService from '../../services/category.service';

const USER_SERVICE_URL = '/api/users';
const AD_SERVICE_URL = '/api/ads'
const CATEGORIY_SERVICE_URL = '/api/categories'

class AdsListingSystem extends React.Component {
    constructor(props) {
        super(props);
        this.userServiceSingleton = new UserService(USER_SERVICE_URL);
        this.adServiceSingleton = new AdService(AD_SERVICE_URL);
        this.categoryServiceSingleton = new CategoryService(CATEGORIY_SERVICE_URL);
    }

    getChildContext() {
        return {
            userService: this.userServiceSingleton,
            adService: this.adServiceSingleton,
            categoryService: this.categoryServiceSingleton
        };
    }

    render() {

        var style = {
         backgroundImage: 'url("/app/assets/img/bkg.jpg")',
         flex: 1,
         alignSelf: 'stretch',
         width: null,
         };
        //style={style}

        return (
            <main>
                <Navigation />

                {/* Here routed components go ... */}
                <div className="container" style={style}>
                    {this.props.children}
                </div>
            </main>
        );
    }
}
AdsListingSystem.propTypes = {
    children: React.PropTypes.node
};

AdsListingSystem.childContextTypes = {
    userService: React.PropTypes.object,
    adService: React.PropTypes.object,
    categoryService: React.PropTypes.object
};


export default AdsListingSystem;