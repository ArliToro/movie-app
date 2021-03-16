import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import Header from "./components/Header";
import Data from "./components/Data";
import Movie from "./components/Movie";
import "./index.css";

class App extends React.Component {
    state = {
        isHeaderCollapsed: false
    }

    toggleHeader = () => {
        this.setState({isHeaderCollapsed: !this.state.isHeaderCollapsed})
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/">
                                <Header toggleHeader = {this.toggleHeader} headerCollapsed = {this.state.isHeaderCollapsed}/>
                                <Data headerCollapsed = {this.state.isHeaderCollapsed} toggleHeader = {this.toggleHeader}/>
                            </Route>
                            <Route path="/movie/:movieid" component={Movie}>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector("#root"));
