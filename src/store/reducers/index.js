import { combineReducers } from "redux";

import movies from "./moviesReducer";
import categories from "./categoriesReducer";

export default combineReducers({
  movies,
  categories,
});
