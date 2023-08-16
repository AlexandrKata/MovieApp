import React from 'react';

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
