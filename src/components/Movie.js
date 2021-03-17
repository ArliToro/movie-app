import React from "react";
import language from "../assets/language.svg";
import loading from "../assets/loading.svg";
import placeholder from "../assets/placeholder.svg";
import video from "../assets/video.svg";
import website from "../assets/website.svg";
import camera from "../assets/video-camera.svg";

class Movie extends React.Component {
    state = {
        idOfMovie: this.props.match.params.movieid,
        loading: true,
        movie: null
    }

    async componentDidMount() {
        const apiOfMovie = "http://api.tvmaze.com/shows/" + this.state.idOfMovie;
        const response = await fetch(apiOfMovie);
        const jsonData = await response.json();
        this.setState({movie: jsonData, loading: false});
    }

    cleanText = () => {
        const summaryText = this.state.movie.summary;
        return summaryText.replace(/<\/?[^>]+(>|$)/g, "");
    }

    render() {
        return (
            <div className={"movie-page-wrapper"}>
                {this.state.loading || !this.state.movie ? (
                    <div>Loading...</div>
                ) : (
                    <div className={'movie-container-page'}>
                        <div className={"cover-container"}>
                            <img src={this.state.movie.image.original ? this.state.movie.image.original : ""}/>
                        </div>
                        <div key={this.state.movie.id} className={'movie-container'}>
                            <h1>{this.state.movie.name ? this.state.movie.name : ""}</h1>
                            <div className={"movie-all-info"}>
                                <div>
                                    <div>
                                        <h4>Language</h4>
                                        <img src={language} alt="" className={"icon"}/>
                                    </div>
                                    <h3>{this.state.movie.language ? this.state.movie.language : ""}</h3>
                                </div>
                                <div>
                                    <div>
                                        <h4>Type</h4>
                                        <img src={camera} alt="" className={"icon"}/>
                                    </div>
                                    <h3>{this.state.movie.type ? this.state.movie.type : ""}</h3>
                                </div>
                                <div>
                                    <div>
                                        <h4>Status</h4>
                                        <img src={loading} alt="" className={"icon"}/>
                                    </div>
                                    <h3>{this.state.movie.status ? this.state.movie.status : ""}</h3>
                                </div>
                                <div>
                                    <div>
                                        <h4>Official Site</h4>
                                        <img src={website} className={"icon"}/>
                                    </div>
                                    <a href={this.state.movie.officialSite ? this.state.movie.officialSite : ""} target="_blank">Website</a>
                                </div>
                                <div>
                                    <div>
                                        <h4>Network</h4>
                                        <img src={video} className={"icon"}/>
                                    </div>
                                    <h3>{this.state.movie.network ? this.state.movie.network.name : ""}</h3>
                                </div>
                                <div>
                                    <div>
                                        <h4>Country</h4>
                                        <img src={placeholder} className={"icon"}/>
                                    </div>
                                    <h3>{this.state.movie.network ? this.state.movie.network.country.code : ""}</h3>
                                </div>
                            </div>
                            <h2 className={"summary-text"}>{this.cleanText()}</h2>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Movie;
