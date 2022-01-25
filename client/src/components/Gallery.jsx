import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GalleryEntry from './GalleryEntry.jsx';

function Gallery({ entries }) {
  const [localMouse, setLocalMouse] = useState(false)

  return (
    <div className='gallery col'>
      {entries.map((entry) => (
        <GalleryEntry key={entry._id} entry={entry} size={60} />
      ))}
    </div>
  );
}

Gallery.propTypes = { entries: PropTypes.array };

export default Gallery;
