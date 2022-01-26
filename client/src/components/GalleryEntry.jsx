import React from 'react';
import PropTypes from 'prop-types';
import ASCIIDisplay from './ASCIIDisplay.jsx';
import CopyLogo from '../assets/icon-copy.svg';

function GalleryEntry({ entry, size, clickHandler, copyArt }) {

  return (
    <div className='row'>
      <div className='col'>
        <div>{entry.title ? entry.title : 'untitled'}</div>
        <div>{entry.user}</div>
        <button onClick={() => copyArt(entry)} style={{width: 'fit-content', height: 'fit-content'}}>
          <img src={CopyLogo} />
        </button>
      </div>
      <button onClick={() => clickHandler(entry)}>
        <ASCIIDisplay entry={entry} size={size} maxFont={20} />
      </button>
    </div>
  );
}
GalleryEntry.propTypes = {
  entry: PropTypes.object,
  size: PropTypes.number,
  clickHandler: PropTypes.func,
  copyArt: PropTypes.func,
};

export default GalleryEntry;
