import React, { Component } from 'react';
import '../styles/Settings.css';

class Settings extends Component {
//   constructor(props) {
//     super(props);
//   }
  render() {
    return (
      <h1 className='settings'
        data-testid="settings-title"
      >
        Settings
      </h1>
    );
  }
}

export default Settings;
