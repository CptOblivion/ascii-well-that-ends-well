import React from 'react';
import PropTypes from 'prop-types';
import CopyLogo from '../assets/icon-copy.svg';

function CopyButton({ art }) {
  function copyArt() {
    navigator.clipboard.writeText(art.ascii);
  }
  return (
    <button onClick={copyArt} style={{width: 'fit-content', height: 'fit-content'}}>
      <img src={CopyLogo} />
    </button>
  )
}

CopyButton.propTypes = { art: PropTypes.object };

export default CopyButton;
