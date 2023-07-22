import { Component } from 'react';

import MovieListItem from '../movie-list-item';
import './movie-list.css';

export default class MoviesList extends Component {
  render() {
    const { moviesList, genres } = this.props;
    const elements = moviesList.map((item) => {
      const { id, ...itemProps } = item;
      return <MovieListItem key={id} {...itemProps} genres={genres} />;
    });
    return <ul className="movies-list">{elements}</ul>;
  }
}
