import { Component } from 'react';
import Proptypes from 'prop-types';

import MovieCard from '../movieCard';
import Context from '../../context';
import './searchTab.css';

export default class SearchTab extends Component {
  static contextType = Context;

  static defaultProps = {
    moviesList: [],
    id: 0,
  };

  static propTypes = {
    moviesList: Proptypes.arrayOf(),
    id: Proptypes.number,
  };

  render() {
    const { moviesList } = this.context;

    const elements = moviesList.map((item) => {
      const { id, ...itemProps } = item;

      return <MovieCard key={id} {...itemProps} id={id} />;
    });
    return <ul className="movies-list">{elements}</ul>;
  }
}
