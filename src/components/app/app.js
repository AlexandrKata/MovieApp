import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Tabs, Pagination } from 'antd';

import MoviesList from '../movie-list';
import SearchForm from '../search-form';
import Spinner from '../spinner';
import ErrorNetwork from '../errors/error-network';
import ErrorFetch from '../errors/error-fetch';
import TMDBService from '../../services/TMDB-services';

import 'antd/dist/reset.css';
import './app.css';

export default class App extends Component {
  state = {
    moviesList: [],
    genres: [],
    totalPages: 0,
    page: 0,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.setMovie();
    this.setGenres();
  }

  TMDBService = new TMDBService();

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  setMovie() {
    this.TMDBService.getMovies()
      .then((item) => {
        this.setState({
          moviesList: item.results,
          totalPages: item.total_pages,
          page: item.page,
          loading: false,
        });
      })
      .catch(this.onError);
  }

  setGenres() {
    this.TMDBService.getGenres()
      .then((item) => {
        this.setState({
          genres: item,
        });
      })
      .catch(this.onError);
  }

  render() {
    const { moviesList, genres, totalPages, page, loading, error } = this.state;

    const hasDate = !(loading || error);
    const spinner = loading ? <Spinner /> : null;
    const content = hasDate ? <MoviesList moviesList={moviesList} genres={genres} /> : null;
    const pagination = hasDate ? (
      <Pagination total={totalPages} current={page} showSizeChanger={false} defaultPageSize="1" />
    ) : null;
    const items = [
      {
        key: 1,
        label: 'Search',
        children: (
          <>
            <SearchForm />
            {content}
            {pagination}
          </>
        ),
      },
      { key: 2, label: 'Rated' },
    ];
    const tabs = moviesList.length !== 0 ? <Tabs defaultActiveKey="1" centered items={items}></Tabs> : null;
    const errorFetch = tabs === null && spinner === null ? <ErrorFetch /> : null;
    const errorNetwork = Offline ? <ErrorNetwork /> : null;

    return (
      <div className="app">
        {spinner}
        {errorFetch}
        <Online>{tabs}</Online>

        <Offline>{errorNetwork}</Offline>
      </div>
    );
  }
}
