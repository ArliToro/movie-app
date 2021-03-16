import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import * as MoviesActions from "../store/actions/movies";
import * as CategoriesActions from "../store/actions/categories";
import CategorySelector from "./CategorySelector";
import svgWave from "../assets/wave.svg";
import plus from "../assets/plus.svg";
import threeDots from "../assets/more.svg";
import down from "../assets/down.svg";

class Data extends React.Component {
    state = {
        activePage: 0,
        addTo: false,
        actualMovieItem: 0
    }

    async componentDidMount() {
        const apiUrl = "http://api.tvmaze.com/schedule?country=US";
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        this.props.setMovies({
            movies: jsonData,
            moviesArray: jsonData.slice(0, this.props.moviesPerPage),
        });
        const newPagination = [];
        for (
            let i = 1;
            i <= Math.ceil(jsonData.length / this.props.moviesPerPage);
            i++
        ) {
            newPagination.push(i);
        }
        this.props.updatePagination(newPagination);
    }

    getIndex = (indexOfPage) => {
        let actualPage = indexOfPage.page - 1;
        let startIndex = actualPage * this.props.moviesPerPage;
        let finishingIndex = startIndex + this.props.moviesPerPage;
        if (finishingIndex > this.props.movies.length) {
            finishingIndex = this.props.movies.length;
        }
        const moviesArray = this.props.movies;
        this.props.updateMovies({
            moviesArray: moviesArray.slice(startIndex, finishingIndex),
        });
        this.setState({activePage: indexOfPage.page});
    };

    getYear = (year) => {
        let date = new Date(year);
        return date.getFullYear();
    }

    addToAnimation = (activeMovie) => {
            this.setState({addTo: true, actualMovieItem: activeMovie.movie.id});
    }

    closeAnimation = (activeMovie) => {
        this.setState({addTo: false, actualMovieItem: activeMovie.movie.id});
    }

    render() {
        const {loading, movies, moviesArray} = this.props;
        return (
            <div className={"main-page "+ (this.props.headerCollapsed  ? "main-page-animation" : "")}>
                {loading || !movies ? (
                    <div>Loading...</div>
                ) : (
                    <div className={'homepage'}>
                        <div className={"entry-design"}>
                            <h1 >MY MOVIE APP <br/>
                                IN YOUR HOME
                            </h1>
                            <button onClick={this.props.toggleHeader}>Categories</button>
                        </div>
                        <div className={"movies-wrapper"}>
                            <img src={svgWave} className={"svg-wave"} alt=""/>
                            <div className={"movies-container"}>
                                {moviesArray.map((movie) => (
                                    <div key={movie.id} className={"movies-items"}>
                                        <img src={movie.show.image !== null ? movie.show.image.medium : ""} alt=""/>
                                        <div className={'movie-details'}
                                             style={{marginTop: (this.state.actualMovieItem === movie.id && this.state.addTo ? "-57%" : "57%")}}>
                                            <div className={"movie-title"} title={movie.show.name}>
                                                {movie.show.name}
                                            </div>
                                            <div className={"movie-items"}>
                                                <div className={"show-more-link"}>
                                                    <Link to={"/movie/" + movie.show.id}>
                                                        <img src={threeDots} className={"icon"} alt=""/>
                                                        <h5>Show More</h5>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <h4>{this.getYear(movie.show.premiered)}</h4>
                                                    <h5>Year</h5>
                                                </div>
                                                <div>
                                                    <h4 className={"text-ellipses"}
                                                        title={movie.show.network.name}>{movie.show.network.name}</h4>
                                                    <h5>Network</h5>
                                                </div>
                                                <div>
                                                    <h4>{movie.show.network.country.code}</h4>
                                                    <h5>Country</h5>
                                                </div>
                                                <div>
                                                    <h4>{movie.show.language}</h4>
                                                    <h5>Language</h5>
                                                </div>
                                                <div className={"add-to-btn show-more-link"}
                                                     onClick={() => this.addToAnimation({movie})}>
                                                    <img src={plus} className={"icon"} alt=""/>
                                                    <h5>Add</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={'show-more ' + (this.state.actualMovieItem === movie.id && this.state.addTo ? "show-more-active" : "show-more-disabled")}>
                                            <CategorySelector canAddMovie movie={movie}/>
                                            <div className={"close-show-more"} onClick={() => this.closeAnimation({movie})}>
                                                <img src={down} className={'icon'}/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <div className={"pagination"}>
                    {this.props.pagination.map((page) => (
                        <h3 key={page} onClick={() => this.getIndex({page})}
                            style={{backgroundColor: this.state.activePage === page ? "#e50914" : "transparent"}}>
                            {page}
                        </h3>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.movies.loading,
        movies: state.movies.movies,
        moviesArray: state.movies.moviesArray,
        pagination: state.movies.pagination,
        moviesPerPage: state.movies.moviesPerPage,
    };
};

export default connect(mapStateToProps, {
    ...MoviesActions,
    ...CategoriesActions,
})(Data);
