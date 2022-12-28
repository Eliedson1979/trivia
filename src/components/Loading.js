import React from 'react';
import { bool } from 'prop-types';
import LoadingIcons from 'react-loading-icons';
import '../styles/Game.css';

function Loading({ inSettings }) {
  return (
    <LoadingIcons.Oval
      className="Loading"
      stroke={ inSettings ? '#dfe3eb' : '#282c34' }
    />
  );
}

Loading.defaultProps = { inSettings: false };
Loading.propTypes = { inSettings: bool };

export default Loading;
