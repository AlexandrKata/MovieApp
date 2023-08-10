import { Component } from 'react';
import { debounce } from 'lodash';
import Proptypes from 'prop-types';

import './searchForm.css';

export default class SearchForm extends Component {
  static defaultProps = {
    onSearchMovies: () => {},
  };

  static propTypes = {
    onSearchMovies: Proptypes.func,
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  changeValue = (e) => {
    const { onSearchMovies } = this.props;
    onSearchMovies(e.target.value);
  };

  render() {
    return (
      <form className="search-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="Type to search..."
          className="search"
          onChange={debounce(this.changeValue, 600)}
        ></input>
      </form>
    );
  }
}
