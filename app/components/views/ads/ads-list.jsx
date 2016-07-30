import React from 'react';
import Ad from './ad';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AdList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { ads: [] }
        this.addAd = this.addAd.bind(this);
        this.handleAdDeleted = this.handleAdDeleted.bind(this);
    }

    addAd() {
        const path = { pathname: '/ad', query: { controls: true, edit: true } };
        this.context.router.push(path);
    }

    handleAdDeleted(deletedAdId) {
        // remove deleted ad
        let newAds = this.state.ads.filter((ad) => {
            return (ad._id !== deletedAdId);
        });
        this.setState({ ads: newAds });
    }

    componentDidMount() {
        this.context.adService.getAds().then((ads) => {
            this.setState({ ads: ads });
        });
    }

    render() {
        let isControls = this.props.location.query.controls === 'true';

        let adNodes = this.state.ads.map((ad) => {
            return (
                <Ad ad={ad} key={ad._id}
                      isControls={isControls} isDetails={false}
                      onAdDelete={this.handleAdDeleted} >
                </Ad>
            );
        });

        return (
            <section className="ads">
                <h2>Ads Available</h2>
                { true ? (
                    <button type="button" className="btn btn-primary" onClick={this.addAd}>Add New Ad</button>
                ) : null
                }
                <div className="adList">
                    <ReactCSSTransitionGroup transitionName="ads" transitionEnterTimeout={500} transitionLeaveTimeout={5500}>
                        {adNodes}
                    </ReactCSSTransitionGroup>
                </div>
            </section>
        );
    }
}

AdList.propTypes = {
    ads: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            _id: React.PropTypes.string,
            title: React.PropTypes.string.isRequired,
            category: React.PropTypes.string.isRequired,
            description: React.PropTypes.string.isRequired,
            author: React.PropTypes.string.isRequired,
            contact_person: React.PropTypes.string.isRequired,
            address: React.PropTypes.string.isRequired,
            email: React.PropTypes.string.isRequired,
            phone: React.PropTypes.string
        })
    ),
    location: React.PropTypes.object,
    onAdDelete: React.PropTypes.func
};

AdList.contextTypes = {
    adService: React.PropTypes.object,
    router: React.PropTypes.object
};

AdList.defaultProps = {
    isControls: true
};

export default AdList;