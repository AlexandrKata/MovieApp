import { Component } from 'react';
import { Spin } from 'antd';
import './spinner.css';

export default class Spinner extends Component {
  render() {
    return (
      <div className="spinner">
        <Spin size="large" />
      </div>
    );
  }
}
