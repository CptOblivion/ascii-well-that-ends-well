import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GalleryEntry from './GalleryEntry.jsx';
import ASCIIDisplay from './ASCIIDisplay.jsx';
import Modal from './Modal.jsx'

function Gallery({ entries }) {
  const [localMouse, setLocalMouse] = useState(false)
  const [showArt, setShowArt] = useState(false);
  const [art, setArt] = useState({})

  function clickGallery(entry) {
    setArt(entry)
    setShowArt(true);
  }

  return (
    <div className='gallery col'>
      <Modal show={showArt} closeHandler={setShowArt} >
        {/* navigator.clipboard.writeText(entry.ascii) */}
        <div className='modalFrame col' style={{justifyConent: 'center', alignItems: 'center', height: '100%' }}>
          <ASCIIDisplay entry={art} size={document.documentElement.clientWidth / 2} />
        </div>
      </Modal>
      {entries.map((entry) => (
        <GalleryEntry key={entry._id} entry={entry} size={60} clickHandler={clickGallery}/>
      ))}
    </div>
  );
}

Gallery.propTypes = { entries: PropTypes.array };

export default Gallery;
