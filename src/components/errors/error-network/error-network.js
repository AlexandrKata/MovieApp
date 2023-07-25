import { Component } from 'react';
import { Alert } from 'antd';
import './error-network.css';

export default class ErrorNetwork extends Component {
  render() {
    return (
      <div className="error-network">
        <Alert
          banner={true}
          type="info"
          message="No internet connection"
          description="Try doing the following:                         
                        Check network cables, modem and router.
                        Reconnect to the Wi-Fi network.
                        Run Network Diagnostics in Windows"
        />
      </div>
    );
  }
}
