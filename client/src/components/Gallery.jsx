import React from 'react';
import PropTypes from 'prop-types';
import GalleryEntry from './GalleryEntry.jsx';

function Gallery({ entries }) {
  return (
    <div className='gallery'>
      {entries.map((entry) => (
        <GalleryEntry key={entry._id} entry={entry} />
      ))}
    </div>
  );
}

Gallery.propTypes = { entries: PropTypes.array };

export default Gallery;
