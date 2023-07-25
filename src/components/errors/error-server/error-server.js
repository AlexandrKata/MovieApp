import { Component } from 'react';
import { Alert } from 'antd';
import './error-server.css';

export default class ErrorServer extends Component {
  render() {
    return (
      <div className="error-network">
        <Alert
          banner={true}
          type="info"
          message="What's happened?"
          description="
          You have landed on a page that does not exist"
        />
      </div>
    );
  }
}
