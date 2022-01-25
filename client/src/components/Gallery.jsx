import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import GalleryEntry from './GalleryEntry.jsx';
import ASCIIDisplay from './ASCIIDisplay.jsx';
import Modal from './Modal.jsx';

function Gallery({ entries }) {
  const [localMouse, setLocalMouse] = useState(false);
  const [showArt, setShowArt] = useState(false);
  const [art, setArt] = useState({});
  const [artSize, setArtSize] = useState(0);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      setArtSize(ref.current.clientWidth);
    }
  }, [showArt, ref.current ? ref.current.clientWidth : null]);

  function clickGallery(entry) {
    setArt(entry);
    setShowArt(true);
  }

  function copyArt(art) {
    navigator.clipboard.writeText(art.ascii);
  }

  return (
    <div>
      <div className='gallery col'>
        {entries.map((entry) => (
          <GalleryEntry key={entry._id} entry={entry} size={60} clickHandler={clickGallery} />
        ))}
      </div>
      <Modal show={showArt} closeHandler={setShowArt}>
        <div className='col artZoomed' ref={ref}>
          <ASCIIDisplay entry={art} size={artSize} />
        </div>
      </Modal>
    </div>
  );
}

Gallery.propTypes = { entries: PropTypes.array };

export default Gallery;
