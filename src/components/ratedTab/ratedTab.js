import { Component } from 'react';
import Proptypes from 'prop-types';

import MovieCard from '../movieCard';
import Context from '../../context';
import './ratedTab.css';

export default class RatedTab extends Component {
  static contextType = Context;

  static defaultProps = {
    ratedList: [],
    rating: 0,
    id: 0,
  };

  static propTypes = {
    ratedList: Proptypes.arrayOf(),
    rating: Proptypes.number,
    id: Proptypes.number,
  };

  render() {
    const { ratedList } = this.context;
    const elements = ratedList.map((item) => {
      const { id, rating, ...itemProps } = item;
      return <MovieCard key={id} {...itemProps} id={id} rating={rating} />;
    });
    return <ul className="movies-list">{elements}</ul>;
  }
}
