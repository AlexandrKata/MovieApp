import React from 'react';
import propTypes from 'prop-types';

import { MovieCard } from '../movieCard/movieCard';

import './movieList.css';

export const MovieList = ({ movies, error, query }) => {
  const elements = movies.map((movie) => {
    const { id } = movie;
    return <MovieCard key={id} movie={movie} />;
  });
  if (movies.length) {
    return <ul className="movies-list">{elements}</ul>;
  } else if (!error && query) {
    return 'no movies found';
  }
};

MovieList.propTypes = {
  movies: propTypes.array,
  error: propTypes.bool,
  query: propTypes.string,
};

MovieList.defaultProps = {
  movie: [],
  error: false,
  query: '',
};
