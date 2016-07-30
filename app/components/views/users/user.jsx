import React from 'react';
import $ from 'jquery';
import deepEqual from 'deep-equal';
import Modal from '../../common/modal';

class User extends React.Component {
    constructor(props, context) {
        super(props, context);

        // Initialize state
        let state = {};

        // Determine working mode flags
        state.isControls = this.props.isControls ||
            (props.location && props.location.query && props.location.query.controls === 'true');
        state.isEdit = this.props.isEdit ||
            (props.location && props.location.query && props.location.query.edit === 'true');

        // Get or create user data
        if (props.user) {
            state.user = this.props.user;

        } else {
            // Default user initialization
            state.user = {
                _id: '',
                email: '',
                password: '',
                password2: '',
                role: 'user'
            }
            // Read id from route param userId
            if (props.params && props.params.userId) {

                // Load user by id
                context.userService.getUserById(this.props.params.userId).then((user) => {
                    user.password2 = user.password;
                    let newState = this.state;
                    newState.user = user;
                    if (newState.isEdit) {
                        newState.oldUser = $.extend(true, {}, user); //needed in edit mode only for reset
                    }
                    this.setState(newState);
                });
            }
        }

        if (state.isEdit) {
            state.oldUser = $.extend(true, {}, state.user);
        }

        this.state = state;

        // Bind methods to this
        this.render = this.render.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.resetChanges = this.resetChanges.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.confirmCancelEdit = this.confirmCancelEdit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        console.log("before push: " + JSON.stringify(this));
    }

    // Class methods
    resetChanges() {
        this.setState({ user: $.extend(true, {}, this.state.oldUser) });
    }

    saveChanges() {
        let newUser =  $.extend(true, {}, this.state.user);
        //check if password is valid
        if(!newUser.password || !newUser.password2 || newUser.password !== newUser.password2 || newUser.password.length < 4) {
            $('#invalid-password').modal();
            return;
        }
        delete(newUser.password2);
        if (newUser._id) { // edit user mode
            this.context.userService.editUser(newUser).then(() => {
                //return back to users collection
                this.context.router.push({ pathname: `/admin/users`, query: { controls: true } });
            });
        } else {  // add new user mode
            this.context.userService.addNewUser(newUser).then(() => {
                //return back to users collection
                this.context.router.push({ pathname: `/admin/users`, query: { controls: true } });
            });
        }
    }

    cancelEdit() {
        if (deepEqual(this.state.user, this.state.oldUser)) {
            this.confirmCancelEdit();
        } else {
            $('#user-cancel-confirm').modal();
        }
    }

    confirmCancelEdit() {
        // reset the changes
        this.setState({ user: $.extend(true, {}, this.state.oldUser) });
        // cancel edit mode
        this.context.router.push({ pathname: `/admin/users`, query: { controls: true, edit: false } });
    }

    handleTextChange(e) {
        let user = this.state.user;
        user[e.target.name] = e.target.value;
        this.setState({ user: user });
    }

    editUser() {
        const path = { pathname: `/personal/${this.state.user._id}`, query: { controls: true, edit: true } };

        this.context.router.push(path);
    }

    deleteUser() {
        if (this.state.user._id) {
            this.context.userService.deleteUser(this.state.user._id).then((deletedUser) => {
                if (this.props.onUserDelete) this.props.onUserDelete(deletedUser._id);  // call parent's callback
                this.context.router.push({ pathname: `/admin/users`, query: { controls: true } }); //return back to users collection
            });
        }
    }

    // Render component
    render() {
        let isControls = this.state.isControls;
        let isEdit = this.state.isEdit;

        // console.log("this.context from detail: " + JSON.stringify(this.context));
        return (
            <div className="user">
                { isEdit ? (
                    <h2>{!this.state.user._id ? "Add New" : "Edit"} User</h2>
                ) : null}
                <h3 className="user-email">
                    { (isEdit) ? (
                        <input type="email" name="email" placeholder="Email here ..." className="form-control"
                               value={this.state.user.email} onChange={this.handleTextChange} />
                    ) : (
                        <span>{this.state.user.email}</span>
                    ) }
                </h3>
                <div className="row">
                    <table className="metadata table table-bordered table-striped  col-xs-12 col-md-6 col-lg-4">
                        <tbody>

                        { (isEdit) ? (
                            <tr>
                                <td>Password</td>
                                <td>
                                    <input type="password" name="password" placeholder="Password ..." className="form-control"
                                           value={this.state.user.password} onChange={this.handleTextChange} />
                                </td>
                            </tr>
                        ): null }

                        { (isEdit) ? (
                            <tr>
                                <td>Password Again</td>
                                <td>
                                    <input type="password" name="password2" placeholder="Password again ..." className="form-control"
                                           value={this.state.user.password2} onChange={this.handleTextChange} />
                                </td>
                            </tr>
                        ): null }

                        <tr>
                            <td>User Role</td>
                            <td>
                                { (isEdit) ? (
                                    <input type="text" name="role" placeholder="User's role [user or admin]" className="form-control"
                                           value={this.state.user.role} onChange={this.handleTextChange} />
                                ) :
                                    (
                                        <span>{this.state.user.role}</span>
                                    ) }
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                { isControls ?
                    (isEdit ? (
                            <div className="user-controls">
                                <button type="button" className="btn btn-success" onClick={this.saveChanges}>Save User</button>
                                <button type="button" className="btn btn-warning" onClick={this.resetChanges}>Reset User</button>
                                <button type="button" className="btn btn-default" onClick={this.cancelEdit}>Cancel Edit</button>
                            </div>
                        ) : (
                            <div className="user-controls">
                                <button type="button" className="btn btn-warning" onClick={this.editUser}>Edit User</button>
                                <button type="button" className="btn btn-danger" onClick={this.deleteUser}>Delete User</button>
                            </div>
                        )
                    ) : null
                }
                <Modal modalId="user-cancel-confirm" title="Unsaved Edits Confirmation" onConfirm={this.confirmCancelEdit}>
                    Your edits have NOT been saved.Are you sure you want to CANCEL without saving them?
                </Modal>
                <Modal modalId="invalid-password" title="Invalid Passsword" onConfirm={this.confirmCancelEdit}>
                    Passsword is invalid or doesn't match. It sholud be at least 8 characters: [A-Za-z0-9$%^&*@!]
                </Modal>
            </div>
        );
    }
}

User.propTypes = {
    params: React.PropTypes.object,
    location: React.PropTypes.object,
    user: React.PropTypes.shape({
        _id: React.PropTypes.string,
        email: React.PropTypes.string.isRequired,
        password: React.PropTypes.string.isRequired,
        role: React.PropTypes.oneOf(['user', 'admin']).isRequired
    }),
    isControls: React.PropTypes.bool,
    isEdit: React.PropTypes.bool,
    onUserDelete: React.PropTypes.func,
};

User.contextTypes = {
    userService: React.PropTypes.object,
    router: React.PropTypes.object
};

User.defaultProps = {
    role: 'user'
};

export default User;