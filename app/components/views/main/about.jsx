import React from 'react'

export default class About extends React.Component {
  render() {
    return (

        <section id="about">
            <div className="container">
              <h1 align="center">ADS Listing Services</h1>
            </div>

          <div>
            <p>
              The Ads Listings Site (ALS) provides users the ability to view and create a listing by category.
              <ul>
                <li>Anonymous user can view all advertisements.</li>
                <li>Registered User – can login/edit profile and be able to create/update/delete his own advertisement</li>
                <li>Administrator (extends Registered User) – can manage (create, edit and delete user data) all Registered Users, as well as manage category.</li>
              </ul>

              <p>The system is implemented as a Single Page Application (SPA) using this technologies: </p>
              <ul>
                <li>React.js</li>
                <li>Node.js and Hapi.js as backend </li>
                <li>MongoDB as database</li>
              </ul>
            </p>
          </div>
        </section>
    )
  }
}