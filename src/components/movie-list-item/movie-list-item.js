import { Component } from 'react';
import { Tag, Rate } from 'antd';
import { format } from 'date-fns';

import './movie-list-item.css';
import plug from './plug.png';

export default class MovieListItem extends Component {
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

  render() {
    const { title, overview, vote_average, release_date, backdrop_path, genre_ids, genres } = this.props;
    const plugMovies = <img src={plug} alt="poster" />;
    const imgMovies = <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt="poster" />;
    const poster = backdrop_path === null ? plugMovies : imgMovies;

    return (
      <li className="movie-card">
        <div className="movie-card__poster">{poster}</div>
        <div className="movie-card__content">
          <div className="movie-card__header">
            <h1 className="movie-card__title">{title}</h1>
            <div className="movie-card__rating">{vote_average.toFixed(1)}</div>
          </div>
          <div className="movie-card__date">{this.setDate(release_date)}</div>
          <div className="movie-card__genres">{this.getGenres(genre_ids, genres)}</div>
          <div className="movie-card__description">{this.cutDescription(overview)}</div>
          <div className="movie-card__stars">
            <Rate count={10}></Rate>
          </div>
        </div>
      </li>
    );
  }
}
