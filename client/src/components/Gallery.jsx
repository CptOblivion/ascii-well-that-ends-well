import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import GalleryEntry from './GalleryEntry.jsx';
import ASCIIDisplay from './ASCIIDisplay.jsx';
import Modal from './Modal.jsx';

function Gallery({ entries, deleteArt, toast }) {
  // const [localMouse, setLocalMouse] = useState(false);
  const [showArt, setShowArt] = useState(false);
  const [art, setArt] = useState({});
  const [artSize, setArtSize] = useState(0);
  const [deletingArt, setDeletingArt] = useState(null);

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
    try {
      navigator.clipboard.writeText(art.ascii).then(() => {
        toast('Copied art to clipboard!')
      })
    } catch {
      toast('Couldn\'t copy to clipboard')
    }
  }

  function confirmDeleteArt() {
    deleteArt(deletingArt);
    setDeletingArt(false);
  }

  return (
    <div>
      <div className='gallery col'>
        {entries.map((entry) => (
          <GalleryEntry
            key={entry._id}
            entry={entry}
            size={160}
            clickHandler={clickGallery}
            copyArt={copyArt}
            deleteArt={setDeletingArt}
          />
        ))}
      </div>
      <Modal show={showArt} closeHandler={setShowArt}>
        <div className='col artZoomed' ref={ref} onClick={() => copyArt(art)}>
          <ASCIIDisplay entry={art} size={artSize}/>
        </div>
      </Modal>
      <Modal show={deletingArt} closeHandler={setDeletingArt}>
        <div className='col artZoomed' ref={ref}>
          Are you sure? <br />
          <button onClick={confirmDeleteArt}>Delete!</button>
          <button onClick={() => setDeletingArt(null)}>Never mind!</button>
        </div>
      </Modal>
    </div>
  );
}

Gallery.propTypes = {
  entries: PropTypes.array,
  deleteArt: PropTypes.func,
  toast: PropTypes.func,

};

export default Gallery;
