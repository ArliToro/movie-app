const initialState = {
  favorites: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      state[action.payload] = [];
      return { ...state };
    case "ADD_MOVIE_TO_CATEGORY":
      const { categoryName, movie } = action.payload;
      state[categoryName] = [...state[categoryName], movie];
      return { ...state };

    case "REMOVE_MOVIE_FROM_CATEGORY":
      state[action.payload.categoryName] = state[
        action.payload.categoryName
      ].filter((category) => category.id !== action.payload.movie.id);
      return { ...state };

    default:
      return state;
  }
};
