import React from "react";
import {connect} from "react-redux";

import * as CategoriesActions from "../store/actions/categories";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";


class CategorySelector extends React.Component {
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
            <div className={'categories-wrapper'}>
                <div className={"categories"}>
                    {Object.keys(this.props.categories).map((category) => {
                        const isMovieInCategory =
                            this.props.canAddMovie &&
                            this.props.categories[category].findIndex(
                                (item) => item.id === this.props.movie.id
                            );

                        return (
                            <div key={category}>
                                <h3>{category}</h3>

                                {this.props.canAddMovie && (
                                    <div>
                                        {isMovieInCategory !== -1 ? (
                                            <img src={minus} alt="" className={"icon"}
                                                 onClick={() => this.onMovieRemove(category)}/>
                                        ) : (
                                            <img src={plus} alt="" className={"icon"}
                                                 onClick={() => this.onCategoryClick(category)}/>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className={"add-category"}>
                    <input
                        value={this.state.categoryText}
                        onChange={(event) =>
                            this.setState({categoryText: event.target.value})
                        }
                    />
                    <button onClick={this.addNewCategory}>Add Category</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
    };
};

export default connect(mapStateToProps, CategoriesActions)(CategorySelector);
