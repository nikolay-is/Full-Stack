import React from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import getMarkdown from '../../../helpers/get-markdown';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = { category: [] }

        // Initialize state
        let state = {};

        // Get or create category data
        if (props.category) {
            state.category = this.props.category;
        } else {
            // Default category initialization
            state.category = {
                _id: '',
                name: ''
            }
        }

        this.state = state;

        // Bind methods to this
        this.render = this.render.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        //this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleEditCategory = this.handleEditCategory.bind(this);
        this.handleDeleteCategory = this.handleDeleteCategory.bind(this);

    }

    // Class methods
    handleTextChange(e) {
        let category = this.state.category;
        category[e.target.name] = e.target.value;
        this.setState({ category: category });
    }

    handleEditCategory() {
        if (this.props.onEdit && this.state.category)
            this.props.onEdit(this.state.category._id);
    }

    handleDeleteCategory() {
        if (this.props.onDelete && this.state.category)
            this.props.onDelete(this.state.category._id);
    }

    componentDidMount() {
        this.context.categoryService.getCategories().then((categories) => {
            this.setState({ categories: categories });
        });
    }
    // Render component
    render() {
        let isControls = this.props.isControls;
        let isInput = this.props.isEdit || this.props.isNew;
        isControls = true;
        isInput = true;

        let categoryNodes = this.state.category.map((category) => {
            return (
                <Category category={category} key={category._id}
                    isControls={isControls} isDetails={false} >
                </Category>
            );
        });
        
        return (
            <tr className="category">
                <td>
                    { isInput ? (
                        <input type="text" name="name" placeholder="Type category here ..." className="category-text form-control"
                               value={this.state.category.name} onChange={this.handleTextChange} />
                    ) : (
                        <span className="category-text" dangerouslySetInnerHTML={ getMarkdown(this.state.category.name) } />
                    ) }
                </td>

                <div className="categoryList">
                    <ReactCSSTransitionGroup transitionName="category" transitionEnterTimeout={500} transitionLeaveTimeout={5500}>
                        {categoryNodes}
                    </ReactCSSTransitionGroup>
                </div>

                { this.props.isControls ? (
                    <td className="categoryControls">
                        { isControls ?
                            (isInput ? (
                                    <div className="category-controls">
                                        <button type="button" className="btn btn-success" onClick={this.props.onSave}>OK</button>
                                        <button type="button" className="btn btn-warning" onClick={this.props.onCancel}>Cancel</button>
                                    </div>
                                ) : (
                                    <div className="category-controls">
                                        <button type="button" className="btn btn-warning" onClick={this.handleEditCategory}>Edit</button>
                                        <button type="button" className="btn btn-danger" onClick={this.handleDeleteCategory}>Delete</button>
                                    </div>
                                )
                            ) : null
                        }
                    </td>
                ) : null }
            </tr>
        );
    }
}

Category.propTypes = {
    category: React.PropTypes.shape({
        _id: React.PropTypes.string,
        //code: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired
    }),
    location: React.PropTypes.object,
    isControls: React.PropTypes.bool,
    isNew: React.PropTypes.bool,
    isEdit: React.PropTypes.bool,
    onSave: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    onEdit: React.PropTypes.func,
    onDelete: React.PropTypes.func
};

Category.contextTypes = {
    categoryService: React.PropTypes.object,
    router: React.PropTypes.object
};
    
Category.defaultProps = {
    name: 'unknown'
};

export default Category;

