#
# ADS

#

# Listing System

# v

#

# 0.

# 1

# .

# 0

The **Ads Listings Site** (ALS) provides users the ability to view and createalisting by category and location. Users can register and login to view advertisements or create their own.

The system will be developed as a _Single Page Application (SPA)_ using **React.js** as front-end, and **Node.js + hapi** as backend technologies and MongoDB as database.

## **Project Configuration**

Please choose the MongoDB data folder and specify it in _package.json_ in scripts section, _&#39;mongo&#39;_ script. By default it uses Z:/mongo-data folder.

## **Runnung The Demo**

In order to start the project instal latest _Node.js_ and from console run:

npm install

npm start

Alternatively you can selectively start the individual application components:

- MongoDB - npm run mongo
- js + hapi.js serrvices - npm run services (if you don&#39;t need automatic server restarting on change - use node instead of nodemon in the script)
- webpack-dev-server with HMR (Hot Module Replacement) - npm run webpack

## **Project Decription and Main Components**

Application provides following functionality:

- _Anonymous users_ can only view all advertisement without registration.
- _Registered User (_extends _Anonymous User)_ – can login/edit profile and be able to create/update/delete his own advertisement.
- _Instructors_ can create tests and see the students&#39; test results.
- _Administrator (_extends _Registered User) –_ can manage (create, edit and delete user data) all _Registered Users_, as well as manage category.

JavaScript (ECMAScript 6) client part is available in /app folder. It uses _Webpack_ and _webpack-dev-server_ with HMR (Hot Module Replacement). Configuration is specified in webpack.config.js.

Client side application is developed as _Singe Page App (SPA)_. The app entry point is index.js, which imports _react-router_ configuration specified in main-router.jsx. The top-level application component is ads-listing-system.jsx (React JSX + ES6).

Server side is implemented using _hapi.js (_ [_http://hapijs.com/_](http://hapijs.com/)_)__Node_ framework and resides in /ads\_api forlder. The ads API is proxied by webpack-dev-server configuration to port 9000 (configurable). Main server class is server.js.

Two main features are implemented both on client and server side in this version of the project:

- User management
- Advertisement management

The server side implementation for two features are in user.routes.js and handlersUser.js (for User management), ads.routes.js and handlersAds(for Advertisement management) and category.routes.js and handlersCategory.js (for Category management).

Client side implementation uses React ES6 components and resides id /app/componets/views/users, and /app/componets/views/ads accordingly.