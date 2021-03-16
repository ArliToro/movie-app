import React from "react";
import {connect} from "react-redux";

import * as CategoriesActions from "../store/actions/categories";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";


class CategoryHeader extends React.Component {
    state = {
        categoryText: "",
    };

    addNewCategory = () => {
        if (!!this.state.categoryText.trim()) {
            this.props.addCategory(this.state.categoryText);
            this.onCategoryClick(this.state.categoryText);
        }
    };

    onCategoryClick = (categoryName) => {
        if (this.props.canAddMovie) {
            this.props.addMovieToCategory(categoryName, this.props.movie);
        }
    };

    onMovieRemove = (categoryName) => {
        this.props.removeMovieFromCategory(categoryName, this.props.movie);
    };

    render() {
        return (
            <div className={'categories-wrapper-header'}>
                    <input value={this.state.categoryText} onChange={(event) =>
                            this.setState({categoryText: event.target.value})
                        } />
                    <button onClick={this.addNewCategory}>Add Category</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
    };
};

export default connect(mapStateToProps, CategoriesActions)(CategoryHeader);
