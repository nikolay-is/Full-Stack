import React from 'react';
import $ from 'jquery';
import deepEqual from 'deep-equal';
import Modal from '../../common/modal';

class Ad extends React.Component {
    constructor(props, context) {
        super(props, context);

        // Initialize state
        let state = {};

        // Determine working mode flags
        state.isControls = this.props.isControls ||
            (props.location && props.location.query && props.location.query.controls === 'true');
        state.isEdit = this.props.isEdit ||
            (props.location && props.location.query && props.location.query.edit === 'true');

        // Get or create ad data
        if (props.ad) {
            state.ad = this.props.ad;
        } else {
            // Default ad initialization
            state.ad = {
                _id: '',
                title: '',
                category: '',
                description: '',
                author: '',
                contact_person: '',
                address: '',
                email: '',
                phone: ''
            }
            // Read id from route param ad
            if (props.params && props.params.adId) {

                // Load ad by id
                context.adService.getAdById(this.props.params.adId).then((ad) => {
                    let newState = this.state;
                    newState.ad = ad;
                    if (newState.isEdit) {
                        newState.oldAd = $.extend(true, {}, ad); //needed in edit mode only for reset
                    }
                    this.setState(newState);
                });
            }
        }

        if (state.isEdit) {
            state.oldAd = $.extend(true, {}, state.ad);
        }

        this.state = state;

        // Bind methods to this
        this.render = this.render.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.resetChanges = this.resetChanges.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.confirmCancelEdit = this.confirmCancelEdit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.editAd = this.editAd.bind(this);
        this.deleteAd = this.deleteAd.bind(this);
    }

    // Class methods
    resetChanges() {
        this.setState({ ad: $.extend(true, {}, this.state.oldAd) });
    }

    saveChanges() {
        let newAd =  $.extend(true, {}, this.state.ad);
        if (newAd._id) { // edit ad mode
            this.context.adService.editAd(newAd).then(() => {
                //return back to ads collection
                this.context.router.push({ pathname: `/ads`, query: { controls: true } });
            });
        } else {  // add new ad mode
            this.context.adService.addNewAd(newAd).then(() => {
                //return back to ads collection
                this.context.router.push({ pathname: `/ads`, query: { controls: true } });
            });
        }
    }

    cancelEdit() {
        if (deepEqual(this.state.ad, this.state.oldAd)) {
            this.confirmCancelEdit();
        } else {
            $('#ad-cancel-confirm').modal();
        }
    }

    confirmCancelEdit() {
        // reset the changes
        this.setState({ ad: $.extend(true, {}, this.state.oldAd) });
        // cancel edit mode
        this.context.router.push({ pathname: `/ads`, query: { controls: true, edit: false } });
    }

    handleTextChange(e) {
        let ad = this.state.ad;
        ad[e.target.name] = e.target.value;
        this.setState({ ad: ad });
    }

    editAd() {
        const path = { pathname: `/ad/${this.state.ad._id}`, query: { controls: true, edit: true } };
        //console.log("editAd: " + JSON.stringify(path));
        this.context.router.push(path);
    }

    deleteAd() {
        if (this.state.ad._id) {
            this.context.adService.deleteAd(this.state.ad._id).then((deletedAd) => {
                if (this.props.onAdDelete) this.props.onAdDelete(deletedAd._id);  // call parent's callback
                this.context.router.push({ pathname: `/ads`, query: { controls: true } }); //return back to ads collection
            });
        }
    }

    // Render component
    render() {
        let isControls = this.state.isControls;
        let isEdit = this.state.isEdit;

        return (

            <div className="ad">
                { isEdit ? (
                    <h2>{!this.state.ad._id ? "Add New" : "Edit"} Ad</h2>
                ) : null}
                <h3 className="ad-title">
                    { (isEdit) ? (
                        <input type="title" name="title" placeholder="Title here ..." className="form-control"
                               value={this.state.ad.title} onChange={this.handleTextChange} />
                    ) : (
                        <span>{this.state.ad.title}</span>
                    ) }
                </h3>
                <div className="row">
                    <table className="metadata table table-bordered col-xs-12 col-md-6 col-lg-4">
                        <tbody>

                        { (isEdit) ? (
                            <tr>
                                <td>Title</td>
                                <td>
                                    <input type="title" name="title" placeholder="Title ..." className="form-control"
                                           value={this.state.ad.title} onChange={this.handleTextChange} />
                                </td>
                            </tr>
                        ): null }

                        <tr>
                            <td>Category</td>
                            <td>
                                { (isEdit) ? (
                                    <input type="text" name="category" placeholder="Category ..." className="form-control"
                                           value={this.state.ad.category} onChange={this.handleTextChange} />
                                ) :
                                    (
                                        <span>{this.state.ad.category}</span>
                                    ) }
                            </td>
                        </tr>

                        <tr>
                            <td>Description</td>
                            <td>
                                { (isEdit) ? (

                                    <input type="text" name="description" placeholder="Description ..." className="form-control"
                                       value={this.state.ad.description} onChange={this.handleTextChange} />
                                ) :
                                    (
                                        <span>{this.state.ad.description}</span>
                                    ) }
                            </td>
                        </tr>
                        <tr>
                            <td>Author</td>
                            <td>
                                { (isEdit) ? (
                                    <input type="text" name="author" placeholder="Author ..." className="form-control"
                                           value={this.state.ad.author} onChange={this.handleTextChange} />
                                ) :
                                    (
                                        <span>{this.state.ad.author}</span>
                                    ) }
                            </td>
                        </tr>
                        <tr>
                            <td>Contact person</td>
                            <td>
                                { (isEdit) ? (
                                    <input type="text" name="contact_person" placeholder="Contact person ..." className="form-control"
                                           value={this.state.ad.contact_person} onChange={this.handleTextChange} />
                                ) :
                                    (
                                        <span>{this.state.ad.contact_person}</span>
                                    ) }
                            </td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>
                                { (isEdit) ? (
                                    <input type="text" name="address" placeholder="Address ..." className="form-control"
                                           value={this.state.ad.address} onChange={this.handleTextChange} />
                                ) :
                                    (
                                        <span>{this.state.ad.address}</span>
                                    ) }
                            </td>
                        </tr>

                        <tr>
                            <td>eMail</td>
                            <td>
                                { (isEdit) ? (
                                    <input type="text" name="email" placeholder="eMail ..." className="form-control"
                                           value={this.state.ad.email} onChange={this.handleTextChange} />
                                ) :
                                    (
                                        <span>{this.state.ad.email}</span>
                                    ) }
                            </td>
                        </tr>
                        <tr>
                            <td>phone</td>
                            <td>
                                { (isEdit) ? (
                                    <input type="text" name="phone" placeholder="Phone ..." className="form-control"
                                           value={this.state.ad.phone} onChange={this.handleTextChange} />
                                ) :
                                    (
                                        <span>{this.state.ad.phone}</span>
                                    ) }
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>

                { isControls ?
                    (isEdit ? (
                            <div className="ads-controls">
                                <button type="button" className="btn btn-success" onClick={this.saveChanges}>Save Ad</button>
                                <button type="button" className="btn btn-warning" onClick={this.resetChanges}>Reset Ad</button>
                                <button type="button" className="btn btn-default" onClick={this.cancelEdit}>Cancel Edit</button>
                            </div>
                        ) : (
                            <div className="ads-controls">
                                <button type="button" className="btn btn-warning" onClick={this.editAd}>Edit Ad</button>
                                <button type="button" className="btn btn-danger" onClick={this.deleteAd}>Delete Ad</button>
                            </div>
                        )
                    ) : null
                }
                <Modal modalId="ad-cancel-confirm" title="Unsaved Edits Confirmation" onConfirm={this.confirmCancelEdit}>
                    Your edits have NOT been saved.Are you sure you want to CANCEL without saving them?
                </Modal>
            </div>
        );
    }

}

Ad.propTypes = {
    params: React.PropTypes.object,
    location: React.PropTypes.object,
    ad: React.PropTypes.shape({
        _id: React.PropTypes.string,
        title: React.PropTypes.string.isRequired,
        category: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        author: React.PropTypes.string.isRequired,
        contact_person: React.PropTypes.string.isRequired,
        address: React.PropTypes.string.isRequired,
        email: React.PropTypes.string.isRequired,
        phone: React.PropTypes.string
    }),
    isControls: React.PropTypes.bool,
    isEdit: React.PropTypes.bool,
    onAdDelete: React.PropTypes.func,
};

Ad.contextTypes = {
    adService: React.PropTypes.object,
    router: React.PropTypes.object
};

Ad.defaultProps = {
    role: 'ad'
};

export default Ad;