import { Component } from 'react';
import { Alert } from 'antd';
import './error-fetch.css';

export default class ErrorNetwork extends Component {
  render() {
    return (
      <div className="error-fetch">
        <Alert
          banner={true}
          type="info"
          message="Service Unavailable"
          description="The server is temporarily unable to 
          service your request due to maintenance downtime 
          or capacity problems. Please try again later"
        />
      </div>
    );
  }
}
