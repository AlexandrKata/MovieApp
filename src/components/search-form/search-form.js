import { Component } from 'react';
import './search-form.css';
export default class SearchForm extends Component {
  render() {
    return (
      <form className="search-form">
        <input type="text" placeholder="Type to search..." className="search"></input>
      </form>
    );
  }
}
