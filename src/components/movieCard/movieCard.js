import { Component } from 'react';
import { Tag, Rate } from 'antd';
import { format } from 'date-fns';
import Proptypes from 'prop-types';

import Context from '../../context';
import TMDBService from '../../services/TMDBServices';

import './movieCard.css';
import plug from './plug.png';

export default class MovieCard extends Component {
  static contextType = Context;

  static defaultProps = {
    title: '',
    overview: '',
    vote_average: 0,
    release_date: '',
    poster_path: '',
    genre_ids: [],
    id: 0,
    rating: 0,
    genres: [],
  };

  static propTypes = {
    title: Proptypes.string,
    overview: Proptypes.string,
    vote_average: Proptypes.number,
    release_date: Proptypes.string,
    poster_path: Proptypes.string,
    genre_ids: Proptypes.arrayOf(Proptypes.number),
    id: Proptypes.number,
    rating: Proptypes.number,
    genres: Proptypes.arrayOf(Proptypes.string),
  };

  TMDBService = new TMDBService();

  setDate(date) {
    try {
      return format(new Date(date), 'MMMM dd, yyyy');
    } catch (e) {
      return '-';
    }
  }

  cutDescription(text, limit = 75) {
    text = text.trim();
    if (text.length <= limit) {
      return text;
    } else {
      text = text.slice(0, limit);
      let lastWord = text.lastIndexOf(' ');
      text = text.slice(0, lastWord);
      return `${text} ...`;
    }
  }

  getGenres(arr, arr2) {
    const newArr = arr2.filter((el) => arr.includes(el.id));
    const genres = newArr.map((item) => {
      const name = item.name;
      return <Tag key={name}>{name}</Tag>;
    });
    return genres;
  }

  onAddRated = (value) => {
    const { id } = this.props;
    this.TMDBService.postRatedMovie(id, value);
    console.log(id, value);
  };

  colorRating = () => {
    const { vote_average } = this.props;
    if (vote_average <= 3) return '#E90000';
    else if (vote_average <= 5) return '#E97E00';
    else if (vote_average <= 7) return '#E9D100';
    else return '#66E900';
  };

  render() {
    const { title, overview, vote_average, release_date, poster_path, genre_ids, id, rating } = this.props;
    const { genres } = this.context;
    const plugMovies = <img src={plug} alt="poster" />;
    const imgMovies = <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="poster" />;
    const poster = poster_path === null ? plugMovies : imgMovies;

    return (
      <li className="movie-card" id={id}>
        <div className="movie-card__poster">{poster}</div>
        <div className="movie-card__content">
          <div className="movie-card__header">
            <h1 className="movie-card__title">{title}</h1>
            <div className="movie-card__rating" style={{ borderColor: this.colorRating() }}>
              {vote_average.toFixed(1)}
            </div>
          </div>
          <div className="movie-card__date">{this.setDate(release_date)}</div>
          <div className="movie-card__genres">{this.getGenres(genre_ids, genres)}</div>
          <div className="movie-card__description">{this.cutDescription(overview)}</div>
          <div className="movie-card__stars">
            <Rate count={10} onChange={this.onAddRated} value={rating}></Rate>
          </div>
        </div>
      </li>
    );
  }
}
