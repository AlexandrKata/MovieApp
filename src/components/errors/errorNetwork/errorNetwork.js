import { Component } from 'react';
import { Alert } from 'antd';
import './errorNetwork.css';

export default class ErrorNetwork extends Component {
  render() {
    return (
      <div className="error-network">
        <Alert
          banner={true}
          type="info"
          message="Network Error"
          description="
          server is temporarily unavailable"
        />
      </div>
    );
  }
}
