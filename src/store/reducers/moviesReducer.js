const initialState = {
  loading: true,
  movies: null,
  moviesArray: [],
  pagination: [],
  moviesPerPage: 5,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "MOVIES_FETCH_COMPLETE":
      state.movies = action.payload.movies;
      state.moviesArray = action.payload.moviesArray;
      state.loading = false;
      return { ...state };
    case "UPDATE_MOVIES":
      state.moviesArray = action.payload.moviesArray;
      return { ...state };
    case "UPDATE_PAGINATION":
      state.pagination = action.payload;
      return { ...state };

    default:
      return state;
  }
};
