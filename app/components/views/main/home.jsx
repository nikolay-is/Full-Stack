import React from 'react';
import NavLink from '../../navigation/nav-link';

class Home extends React.Component {

    constructor(props) {
        super(props);

        let state = {};
        this.state = state;

        // Bind methods to this
        this.render = this.render.bind(this);
        this.userAnonymous = this.userAnonymous.bind(this);
        this.userRegister = this.userRegister.bind(this);
        this.userHelp = this.userHelp.bind(this);
    }

    componentDidMount() {
        console.log("Home context " + JSON.stringify(this.context));
    }

    userAnonymous() {
        //go to ads collection
        this.context.router.push({ pathname: `/ads`, query: { controls: false } });
    }

    userRegister() {
        //go to users collection for add new User
        this.context.router.push({ pathname: `/personal`, query: { controls: true, edit: true } });
    }

    userHelp() {
        //go to users collection for add new User
        this.context.router.push({ pathname: `/about` });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <h1 className="text-center login-title">Sign in or continue to ADS</h1>
                        <div className="account-wall">
                            <img className="profile-img" src="/app/assets/img/user.png?sz=120" alt=""></img>
                            <form className="form-signin">
                                <input type="text" className="form-control" placeholder="Email" required >
                                </input>
                                <input type="password" className="form-control" placeholder="Password" required></input>
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                                <button className="btn btn-lg btn-success btn-block" type="button" onClick={this.userAnonymous}>Continue</button>
                                <button className="btn btn-lg btn-danger btn-block" type="button" onClick={this.userRegister}>Register</button>
                                <label className="checkbox pull-left">
                                    <input type="checkbox" value="remember-me" />Remember me</label>
                                <NavLink to="/about" className="pull-right need-help">Need help?</NavLink><span className="clearfix"></span>
                            </form>
                        </div>
                        <NavLink to={{ pathname: '/personal',  query: { controls: true, edit: true } }} className="text-center new-account">Create an account</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    location: React.PropTypes.object,
};

Home.contextTypes = {
    router: React.PropTypes.object
};

export default Home;