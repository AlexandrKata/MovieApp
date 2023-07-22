import { Component } from 'react';
import { Tabs, Pagination } from 'antd';

import MoviesList from '../movie-list';
import SearchForm from '../search-form';
import TMDBService from '../../services/TMDB-services';

import 'antd/dist/reset.css';
import './app.css';

export default class App extends Component {
  state = {
    moviesList: [],
    genres: [],
    totalPages: 0,
    page: 0,
  };
  constructor() {
    super();
    this.setMovie();
    this.setGenres();
  }
  TMDBService = new TMDBService();

  setMovie() {
    this.TMDBService.getMovies().then((item) => {
      this.setState({
        moviesList: item.results,
        totalPages: item.total_pages,
        page: item.page,
      });
    });
  }

  setGenres() {
    this.TMDBService.getGenres().then((item) => {
      this.setState({
        genres: item,
      });
    });
  }

  render() {
    const { moviesList, genres, totalPages, page } = this.state;
    return (
      <div className="app">
        <Tabs defaultActiveKey="1" centered>
          <Tabs.TabPane tab="Search" key="1">
            <SearchForm />
            <MoviesList moviesList={moviesList} genres={genres} />
            <Pagination total={totalPages} current={page} showSizeChanger={false} defaultPageSize="1" />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Rated" key="2"></Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}
