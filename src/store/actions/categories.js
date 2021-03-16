export const addCategory = (categoryName) => {
  return {
    type: "ADD_CATEGORY",
    payload: categoryName,
  };
};

export const addMovieToCategory = (categoryName, movie) => {
  return {
    type: "ADD_MOVIE_TO_CATEGORY",
    payload: { categoryName, movie },
  };
};

export const removeMovieFromCategory = (categoryName, movie) => {
  return {
    type: "REMOVE_MOVIE_FROM_CATEGORY",
    payload: { categoryName, movie },
  };
};
