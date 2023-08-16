import React, { useContext } from 'react';
import { Tag, Rate } from 'antd';
import { format } from 'date-fns';
import propTypes from 'prop-types';

import { Context } from '../../context';

import './movieCard.css';
import plug from './plug.png';

export const MovieCard = ({ movie }) => {
  const { tmbdServices, genres } = useContext(Context);

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'MMMM dd, yyyy');
    } catch (e) {
      return '-';
    }
  };

  const cutDescription = (text, limit = 75) => {
    text = text.trim();
    if (text.length <= limit) {
      return text;
    } else {
      text = text.slice(0, limit);
      let lastWord = text.lastIndexOf(' ');
      text = text.slice(0, lastWord);
      return `${text} ...`;
    }
  };

  const getGenres = (genre_ids, genres) => {
    const genre_idsInGenres = genres.filter((el) => genre_ids.includes(el.id));
    const genre = genre_idsInGenres.map((item) => {
      const name = item.name;
      return <Tag key={name}>{name}</Tag>;
    });
    return genre;
  };

  const addRated = (value) => {
    tmbdServices.postRatedMovie(movie.id, value);
  };

  const colorRating = () => {
    if (movie.vote_average <= 3) return '#E90000';
    else if (movie.vote_average <= 5) return '#E97E00';
    else if (movie.vote_average <= 7) return '#E9D100';
    else return '#66E900';
  };

  const plugMovies = <img src={plug} alt="poster" />;
  const imgMovies = <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="poster" />;
  const poster = movie.poster_path === null ? plugMovies : imgMovies;

  return (
    <li className="movie-card">
      <div className="movie-card__poster">{poster}</div>
      <div className="movie-card__content">
        <div className="movie-card__header">
          <h1 className="movie-card__title">{movie.title}</h1>
          <div className="movie-card__rating" style={{ borderColor: colorRating() }}>
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
        <div className="movie-card__date">{formatDate(movie.vote_average.toFixed(1))}</div>
        <div className="movie-card__genres">{getGenres(movie.genre_ids, genres)}</div>
        <div className="movie-card__description">{cutDescription(movie.overview)}</div>
        <div className="movie-card__stars">
          <Rate count={10} value={movie.rating} onChange={addRated}></Rate>
        </div>
      </div>
    </li>
  );
};

MovieCard.propTypes = {
  movie: propTypes.shape({
    poster_path: propTypes.string,
    title: propTypes.string,
    vote_average: propTypes.number,
    genre_ids: propTypes.array,
    overview: propTypes.string,
  }),
  genre: propTypes.array,
  tmbdServices: propTypes.func,
};

MovieCard.defaultProps = {
  movie: {},
};
