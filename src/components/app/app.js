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
    searchMoviesList: [],
    genres: [],
    totalPages: 0,
    page: 0,
    loading: true,
    error: false,
    query: null,
    id: null,
    fetch: true,
  };

  componentDidMount() {
    this.setMovie();
    this.setGenres();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setMovie();
    }
  }

  TMDBService = new TMDBService();

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  setMovie(query, page) {
    this.TMDBService.getMovies(query, page)
      .then((item) => {
        if (item instanceof TypeError) {
          this.setState({ fetch: false, loading: false });
        }
        if (item.results.length === 0) {
          this.setState({ moviesList: [], loading: false, query: query });
        } else {
          this.setState({
            moviesList: item.results,
            totalPages: item.total_pages,
            page: item.page,
            loading: false,
            id: item.results[0].id,
            query: query,
            fetch: true,
          });
        }
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

  onSearchMovies = (value) => {
    this.setState({
      loading: true,
    });
    this.setMovie(value);
  };

  onChangePage = (page) => {
    this.setState({
      loading: true,
    });
    this.setMovie(this.state.query, page);
  };

  render() {
    const { moviesList, genres, totalPages, page, loading, error, fetch } = this.state;

    const hasDate = !(loading || error);
    const moviesListLength = moviesList.length === 0;
    const spinner = loading ? <Spinner /> : null;
    const content = hasDate ? <MoviesList moviesList={moviesList} genres={genres} /> : null;
    const pagination =
      hasDate && !moviesListLength ? (
        <Pagination
          total={totalPages}
          current={page}
          showSizeChanger={false}
          defaultPageSize="1"
          onChange={(e) => this.onChangePage(e)}
        />
      ) : null;
    const searchMessage = moviesListLength ? <div>No results found for your search: {this.state.query}</div> : null;
    const items = [
      {
        key: 1,
        label: 'Search',
        children: (
          <>
            <SearchForm onSearchMovies={this.onSearchMovies} />
            {searchMessage}
            {content}
            {pagination}
          </>
        ),
      },
      { key: 2, label: 'Rated' },
    ];
    const tabs = fetch && spinner === null ? <Tabs defaultActiveKey="1" centered items={items}></Tabs> : null;
    const errorFetch = !fetch ? <ErrorFetch /> : null;
    const errorNetwork = Offline ? <ErrorNetwork /> : null;

    return (
      <div className="app">
        {errorFetch}
        {spinner}
        <Online>{tabs}</Online>

        <Offline>{errorNetwork}</Offline>
      </div>
    );
  }
}
