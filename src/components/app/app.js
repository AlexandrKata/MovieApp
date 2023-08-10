import { Component } from 'react';
import { Tabs, Pagination } from 'antd';

import SearchTab from '../searchTab';
import RatedTab from '../ratedTab';
import SearchForm from '../searchForm';
import Spinner from '../spinner';
import ErrorNetwork from '../errors/errorNetwork';
import TMDBService from '../../services/TMDBServices';
import Context from '../../context';

import 'antd/dist/reset.css';
import './app.css';

export default class App extends Component {
  state = {
    moviesList: [],
    ratedList: [],
    genres: [],
    query: null,
    loading: true,
    error: false,
    totalPages: null,
    page: null,
    totalResult: null,
    key: 'search',
  };

  TMDBService = new TMDBService();

  componentDidMount() {
    this.TMDBService.getGuestSession();
    this.setSearchMovie();
    this.setGenres();
  }

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  setSearchMovie(query, page) {
    this.TMDBService.getMovies(query, page)
      .then((item) => {
        if (item.name == 'TypeError') {
          this.setState({ error: true, loading: false });
        }
        this.setState({
          moviesList: item.results,
          totalPages: item.total_pages,
          page: item.page,
          loading: false,
          totalResult: item.total_results,
          query: query,
          id: item.results.id,
        });
      })
      .catch(this.onError);
  }

  setRatedMovies = (page) => {
    this.TMDBService.getRatedMovie(page)
      .then((item) => {
        this.setState({
          ratedList: item.results,
          totalPages: item.total_pages,
          page: item.page,
          loading: false,
        });
      })
      .catch(this.onError);
  };

  setGenres() {
    this.TMDBService.getGenres()
      .then((item) => {
        if (item.name == 'TypeError') {
          this.setState({ error: true, loading: false });
        }
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
    this.setSearchMovie(value);
  };

  onChangePage = (page) => {
    const { query, key } = this.state;
    this.setState({
      loading: true,
    });
    if (key == 'search') {
      this.setSearchMovie(query, page);
    }
    if (key == 'rated') {
      this.setRatedMovies(page);
    }
  };

  onClickTabs = (key, event) => {
    const { query } = this.state;
    this.setState({ key: key, event: event });
    if (key == 'search') {
      this.setSearchMovie(query);
    }
    if (key == 'rated') {
      this.setState({ loading: true });
      this.setRatedMovies();
    }
  };

  render() {
    const { moviesList, ratedList, genres, totalPages, page, loading, error, key, totalResult } = this.state;

    const hasDate = !(loading || error);
    const spinner = loading ? <Spinner /> : null;
    const contentSearchTab = hasDate ? <SearchTab /> : null;
    const contentRatedTab = hasDate ? <RatedTab /> : null;
    const pagination = hasDate ? (
      <Pagination
        total={totalPages}
        current={page}
        showSizeChanger={false}
        defaultPageSize="1"
        hideOnSinglePage={true}
        onChange={this.onChangePage}
      />
    ) : null;
    const messageNothingFound =
      !totalResult && !error && !spinner ? <div>Nothing found for your request: {this.state.query}</div> : null;
    const messageNetworkProblem = error ? <ErrorNetwork /> : null;
    const items = [
      {
        key: 'search',
        label: 'Search',
        children: (
          <>
            <SearchForm onSearchMovies={this.onSearchMovies} />
            {spinner}
            {messageNetworkProblem}
            {messageNothingFound}
            {contentSearchTab}
            {pagination}
          </>
        ),
      },
      {
        key: 'rated',
        label: 'Rated',
        children: (
          <>
            {spinner}
            {contentRatedTab}
            {pagination}
          </>
        ),
      },
    ];

    return (
      <Context.Provider value={{ moviesList: moviesList, genres: genres, ratedList: ratedList }}>
        <div className="app">
          <Tabs defaultActiveKey={key} centered items={items} onTabClick={this.onClickTabs}></Tabs>
        </div>
      </Context.Provider>
    );
  }
}
