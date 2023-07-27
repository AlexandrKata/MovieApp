import { Component } from 'react';
import { debounce } from 'lodash';

import TMDBService from '../../services/TMDB-services';
import './search-form.css';

export default class SearchForm extends Component {
  TMDBService = new TMDBService();

  debounceChangeValue = debounce((query) => this.props.onSearchMovies(query), 2000);

  onSubmit = (e) => {
    e.preventDefault();
  };

  changeValue = (e) => {
    this.debounceChangeValue(e.target.value);
  };

  render() {
    return (
      <form className="search-form" onSubmit={this.onSubmit}>
        <input type="text" placeholder="Type to search..." className="search" onChange={this.changeValue}></input>
      </form>
    );
  }
}
