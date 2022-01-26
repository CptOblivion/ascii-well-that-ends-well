import React from 'react';
import PropTypes from 'prop-types';
import ASCIIDisplay from './ASCIIDisplay.jsx';
import CopyLogo from '../assets/icon-copy.svg';

function GalleryEntry({ entry, size, clickHandler, copyArt, deleteArt }) {

  return (
    <div className='row'>
      <div className='col'>
        <div>{entry.title ? entry.title : 'untitled'}</div>
        <div>{entry.user}</div>
        <button onClick={() => copyArt(entry)} style={{width: 'fit-content', height: 'fit-content'}}>
          <img src={CopyLogo} />
        </button>
        <button onClick={() => deleteArt(entry._id)} style={{fontSize: '1.5rem', width: 'fit-content', height: 'fit-content', color: 'red'}}>
          X
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
  deleteArt: PropTypes.func,
};

export default GalleryEntry;
