import React from 'react';
import PropTypes from 'prop-types';
import ASCIIDisplay from './ASCIIDisplay.jsx';
import CopyButton from './CopyButton.jsx';

function GalleryEntry({ entry, size, clickHandler }) {

  return (
    <div className='row'>
      <div className='col'>
        <div>{entry.title ? entry.title : 'untitled'}</div>
        <div>{entry.user}</div>
        <CopyButton art={entry} />
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
};

export default GalleryEntry;
