export const setMovies = (moviesList) => {
  return {
    type: "MOVIES_FETCH_COMPLETE",
    payload: moviesList,
  };
};

export const updateMovies = (moviesList) => {
  return {
    type: "UPDATE_MOVIES",
    payload: moviesList,
  };
};
export const updatePagination = (pagination) => {
  return {
    type: "UPDATE_PAGINATION",
    payload: pagination,
  };
};
