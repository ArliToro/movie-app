import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import * as CategoriesActions from "../store/actions/categories";
import CategoryHeader from "./CategoryHeader";
import minus from "../assets/minus.svg";

class Header extends React.Component {
    state = {
        categoryText: "",
    };

    render() {
        return (
            <div
                className={"header-categories-wrapper " + (this.props.headerCollapsed ? "header-categories-animation" : "")}>
                <div className={"header-input"}>
                    <div className={"toggle-for-category"} onClick={this.props.toggleHeader}>
                        Home
                    </div>
                    <div className={""}>
                        <CategoryHeader/>
                    </div>
                </div>
                <div>
                    {Object.keys(this.props.categories).map((category) => {
                        return (
                            <div key={category} className={"movies-list-header"}>
                                <h2>{category}</h2>

                                {this.props.categories[category].map((movie) => {
                                    return (
                                        <div className={"movie-header-container"}>
                                            <p>
                                                {movie.show.name}
                                            </p>
                                            <img src={movie.show.image.medium} className={"background-movie-header"}/>
                                            <img src={minus} alt="" className={"delete-movie-header"}
                                                 onClick={() => this.props.removeMovieFromCategory(category, movie)}/>
                                            <Link to={"/movie/" + movie.show.id} className={"header-links"}>

                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        );

                    })}

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

export default connect(mapStateToProps, CategoriesActions)(Header);
